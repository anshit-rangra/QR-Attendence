import React from 'react';
import styles from '../../styles/AdminDashboard.module.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <p className={styles.subtitle}>Manage your educational institution</p>
      </header>
      
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <h3>Teachers</h3>
          <p className={styles.statNumber}>42</p>
        </div>
        <div className={styles.statCard}>
          <h3>Students</h3>
          <p className={styles.statNumber}>1,245</p>
        </div>
        <div className={styles.statCard}>
          <h3>Subjects</h3>
          <p className={styles.statNumber}>28</p>
        </div>
        <div className={styles.statCard}>
          <h3>Classes</h3>
          <p className={styles.statNumber}>36</p>
        </div>
      </div>
      
      <div className={styles.actionsContainer}>
        <h2 className={styles.sectionTitle}>Management Actions</h2>
        
        <div className={styles.buttonGrid}>
          <button onClick={() => navigate('/register/teacher')} className={styles.primaryButton}>
            <span className={styles.buttonIcon}>+</span>
            Add New Teacher
          </button>
          
          <button onClick={() => navigate('/register/student')} className={styles.primaryButton}>
            <span className={styles.buttonIcon}>+</span>
            Add New Student
          </button>
          
          <button className={styles.primaryButton}>
            <span className={styles.buttonIcon}>+</span>
            Add New Subject
          </button>
          
          <button className={styles.secondaryButton}>
            <span className={styles.buttonIcon}>📚</span>
            Manage Classes
          </button>
          
          <button className={styles.secondaryButton}>
            <span className={styles.buttonIcon}>📊</span>
            View Reports
          </button>
          
          <button className={styles.secondaryButton}>
            <span className={styles.buttonIcon}>⚙️</span>
            System Settings
          </button>
        </div>
      </div>
      
      <div className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <span className={styles.activityIcon}>👤</span>
            <div className={styles.activityDetails}>
              <p>New teacher account created</p>
              <span className={styles.activityTime}>2 hours ago</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <span className={styles.activityIcon}>📝</span>
            <div className={styles.activityDetails}>
              <p>Mathematics subject updated</p>
              <span className={styles.activityTime}>Yesterday</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <span className={styles.activityIcon}>🎓</span>
            <div className={styles.activityDetails}>
              <p>5 new students enrolled</p>
              <span className={styles.activityTime}>2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;