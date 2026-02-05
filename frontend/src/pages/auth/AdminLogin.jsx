// AdminLogin.jsx
import React, { useState } from 'react';
import styles from '../../styles/AdminLogin.module.css';
import { NavLink } from 'react-router-dom';
import { adminLogin } from '../../api/axios';
import Loader from '../../components/Loader'

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true)
    const response = await adminLogin(formData)
    setIsLoading(false)
    
    if(response.status === 200){
      window.location.reload()
    }
    alert(response.data.message)
  };

  if(isLoading) return <Loader />

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Admin Login</h1>
          <p className={styles.subtitle}>Access your administrator account</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <span className={styles.inputIcon}>📧</span>
          </div>
          
          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <span className={styles.inputIcon}>🔒</span>
          </div>
          
          <div className={styles.rememberForgot}>
            <label className={styles.remember}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
              Remember me
            </label>
            <a href="#forgot" className={styles.forgotLink}>Forgot Password?</a>
          </div>
          
          <button type="submit" className={styles.loginBtn}>
            Login
          </button>
        </form>
        
        <div className={styles.links}>
          <p className={styles.linkText}>
            Not registered yet? <NavLink to="/register" className={styles.link}>Register as Admin here</NavLink>
          </p>
          <p className={styles.linkText}>
            Are you a user? <NavLink to="/login" className={styles.link}>Login here</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;