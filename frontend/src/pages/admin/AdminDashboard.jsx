import React, { useEffect, useState } from 'react';
import styles from '../../styles/AdminDashboard.module.css';
import { useNavigate } from 'react-router-dom';
import { getCounts } from '../../api/axios';
import Loader from '../../components/Loader'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [noOfCounts, setNoOfCounts] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getInfoCounts() {
      setIsLoading(true)
      const response = await getCounts()
      setIsLoading(false)
      setNoOfCounts(response.data)
    }
    getInfoCounts()
  },[])

  if(isLoading) return <Loader />

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <p className={styles.subtitle}>Manage your educational institution</p>
      </header>
      
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <h3>Teachers</h3>
          <p className={styles.statNumber}>{noOfCounts ? noOfCounts.teachers : 0}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Students</h3>
          <p className={styles.statNumber}>{noOfCounts ? noOfCounts.students : 0}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Subjects</h3>
          <p className={styles.statNumber}>{noOfCounts ? noOfCounts.subjects : 0}</p>
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
          
          <button onClick={() => navigate('/create/subject')} className={styles.primaryButton}>
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