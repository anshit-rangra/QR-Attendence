// src/pages/UserProfile/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import styles from '../../styles/UserProfile.module.css';
import Loader from '../../components/Loader';
import { getUser, getSubjects } from '../../api/axios';
import Cookies from 'js-cookie'

// Parse subjects from user data into [{ code, name }] and dedupe by code (prefer one with a name)
const normalizeSubjects = (subjects) => {
  if (!Array.isArray(subjects)) return [];

  const parsed = subjects
    .map((item) => {
      if (!item) return null;

      if (typeof item === 'object') {
        const code = String(item.code || item.subjectCode || item.id || '').toUpperCase();
        const name = String(item.name || item.title || item.subjectName || '').trim();
        return code || name ? { code, name } : null;
      }

      if (typeof item === 'string') {
        const t = item.trim();
        // "CA101 Digital Fundamental" | "CA101 - Digital Fundamental" | "CA101"
        const match = t.match(/^([A-Za-z]{2,}\d{2,})(?:[\s:-]+(.+))?$/);
        if (match) {
          const code = match[1].toUpperCase();
          const name = (match[2] || '').trim();
          return { code, name };
        }
        // If not a code pattern, treat as name-only
        return { code: '', name: t };
      }

      return null;
    })
    .filter(Boolean);

  // Deduplicate by code (prefer entries that already have a name)
  const byCode = new Map();
  const nameOnly = new Map();

  parsed.forEach((s) => {
    if (s.code) {
      const existing = byCode.get(s.code);
      if (!existing) {
        byCode.set(s.code, s);
      } else if (!existing.name && s.name) {
        byCode.set(s.code, s);
      }
    } else if (s.name) {
      const key = s.name.toLowerCase();
      if (!nameOnly.has(key)) nameOnly.set(key, s);
    }
  });

  const result = [...byCode.values(), ...nameOnly.values()];
  // Optional: keep a stable ordering
  result.sort(
    (a, b) =>
      (a.code || '').localeCompare(b.code || '') ||
      (a.name || '').localeCompare(b.name || '')
  );
  return result;
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
     console.log('Logging out...');
    Cookies.remove("admin")
    Cookies.remove("attendanceToken")
    Cookies.remove("role")
    window.location.reload()
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getUser();
        if (response.status !== 200) {
          alert('Some error occur');
          window.location.reload();
          return;
        }

        const incoming = response.data?.user;
        
        if(!incoming.role) incoming.role = 'student'
        if (!incoming) throw new Error('Invalid user data');

        switch (incoming.role) {
          case 'admin':
            setUser({
              _id: incoming._id,
              email: incoming.email,
              center: incoming.center,
              phone: incoming.phone,
              boss: incoming.boss || null,
            });
            setRole('admin');
            break;

          case 'student':
            setUser({
              _id: incoming._id,
              id: incoming.id,
              name: incoming.name,
              course: incoming.course,
              subjects: incoming.subjects,
              boss: incoming.boss || null,
              center: incoming.center || null,
            });
            setRole('student');
            break;

          case 'teacher':
            setUser({
              _id: incoming._id,
              id: incoming.id,
              name: incoming.name,
              subjects: incoming.subjects,
              boss: incoming.boss || null, // { _id, email, center, phone, ... }
              center: incoming.center || null,
            });
            setRole('teacher');
            break;

          default:
            throw new Error('Unknown user type');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Normalize subjects and fetch names using getSubjects({ adminId, subjects })
  useEffect(() => {
    if (!user) return;

    const normalized = normalizeSubjects(user.subjects);
    setSubjects(normalized);

    // Which codes need names?
    const codesToFetch = Array.from(
      new Set(normalized.filter((s) => s && s.code && !s.name).map((s) => s.code))
    );

    // Who is the admin for this lookup?
    const adminId = role === 'admin' ? user?._id : "68caa23ae2a5edb15b4ba51c";

    if (!codesToFetch.length || !adminId) {
      setSubjectsLoading(false);
      return;
    }

    let cancelled = false;
    setSubjectsLoading(true);

    // Call axios helper. Expected: POST returns { subjects: [...] }
    getSubjects( adminId,  JSON.stringify(codesToFetch) ) 
      .then((resp) => {
        if (cancelled) return;
        
        const payload = resp?.data;
        const details = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.subjects)
          ? payload.subjects
          : [];

        const map = new Map();
        details.forEach((d) => {
          const code = String(d.code || '').toUpperCase();
          const name = String(d.name || d.title || '').trim();
          if (code && name) map.set(code, name);
        });

        setSubjects((prev) => {
          const merged = prev.map((s) =>
            s.code && !s.name && map.has(s.code) ? { ...s, name: map.get(s.code) } : s
          );
          // Optional: sort for stable UI
          return merged
            .slice()
            .sort(
              (a, b) =>
                (a.code || '').localeCompare(b.code || '') ||
                (a.name || '').localeCompare(b.name || '')
            );
        });
      })
      .catch((err) => {
        console.error('Failed to fetch subjects via getSubjects:', err);
      })
      .finally(() => {
        if (!cancelled) setSubjectsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user, role]);

  const renderSubjects = () => {
    if (!subjects || subjects.length === 0) return '—';
    return (
      <>
        {subjectsLoading && <div className={styles.inlineHint}>Loading subject names…</div>}
        <div className={styles.subjectGrid}>
          {subjects.map((s, idx) => (
            <div key={`${s.code}-${s.name}-${idx}`} className={styles.subjectCard}>
              <span className={styles.subjectBadge}>{s.code || '—'}</span>
              <div className={styles.subjectTitle}>{s.name || '—'}</div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderOrganizationSection = () => {
    const center = user?.center || user?.boss?.center || '—';
    const bossEmail = user?.boss?.email || '—';
    const bossPhone = user?.boss?.phone || '—';
    const hasBoss = Boolean(user?.boss);

    return (
      <div className={styles.detailsSection}>
        <h2>Organization</h2>
        <div className={styles.detailItem}>
          <span className={styles.label}>Center</span>
          <span className={styles.value}>{center}</span>
        </div>
        {hasBoss && (
          <>
            <div className={styles.detailItem}>
              <span className={styles.label}>Boss Email</span>
              <span className={styles.value}>{bossEmail}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Boss Phone</span>
              <span className={styles.value}>{bossPhone}</span>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderUserDetails = () => {
    if (!user) return null;

    switch (role) {
      case 'admin':
        return (
          <>
            <div className={styles.detailsSection}>
              <h2>Admin Profile</h2>
              <div className={styles.detailItem}>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>{user.email || '—'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Center</span>
                <span className={styles.value}>{user.center || '—'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Phone</span>
                <span className={styles.value}>{user.phone || '—'}</span>
              </div>
            </div>
            {renderOrganizationSection()}
          </>
        );

      case 'student':
        return (
          <>
            <div className={styles.detailsSection}>
              <h2>Student Profile</h2>
              <div className={styles.detailItem}>
                <span className={styles.label}>ID</span>
                <span className={styles.value}>{user.id || '—'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Name</span>
                <span className={styles.value}>{user.name || '—'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Course</span>
                <span className={styles.value}>{user.course || '—'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Subjects</span>
                <div className={styles.value}>{renderSubjects()}</div>
              </div>
            </div>
            {renderOrganizationSection()}
          </>
        );

      case 'teacher':
        return (
          <>
            <div className={styles.detailsSection}>
              <h2>Teacher Profile</h2>
              <div className={styles.detailItem}>
                <span className={styles.label}>ID</span>
                <span className={styles.value}>{user.id || '—'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Name</span>
                <span className={styles.value}>{user.name || '—'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Subjects</span>
                <div className={styles.value}>{renderSubjects()}</div>
              </div>
            </div>
            {renderOrganizationSection()}
          </>
        );

      default:
        return <div>Unknown user role</div>;
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className={styles.userProfileContainer}>
        <div className={styles.profileCard}>
          <header className={styles.profileHeader}>
            <div className={styles.headerInner}>
              <h1>User Profile</h1>
              <div className={styles.headerActions}>
                <div className={styles.roleBadge}>Error</div>
                <button
                  type="button"
                  className={styles.logoutButton}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </header>
          <div className={styles.errorMessage}>
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button className={styles.retryButton} onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.userProfileContainer}>
      <div className={styles.profileCard}>
        <header className={styles.profileHeader}>
          <div className={styles.headerInner}>
            <h1>User Profile</h1>
            <div className={styles.headerActions}>
              <div className={styles.roleBadge}>{role}</div>
              <button
                type="button"
                className={styles.logoutButton}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <section className={styles.userDetails}>
          <div className={styles.bodyInner}>{renderUserDetails()}</div>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;