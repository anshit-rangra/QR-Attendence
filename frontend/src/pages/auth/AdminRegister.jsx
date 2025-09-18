// AdminRegister.jsx
import React, { useState } from 'react';
import styles from '../../styles/AdminRegister.module.css';
import { NavLink } from 'react-router-dom';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    center: '',
    phone: '',
    password: '',
    securityKey: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration Data:', formData);
    // Here you would typically send the data to your backend
    alert('Registration submitted! (Check console for data)');
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerCard}>
        <h1 className={styles.title}>Admin Registration</h1>
        <p className={styles.subtitle}>Create your administrator account</p>
        
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
          </div>
          
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="center"
              placeholder="Center Name"
              value={formData.center}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className={styles.input}
            />
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
          </div>
          
          <div className={styles.inputGroup}>
            <input
              type="password"
              name="securityKey"
              placeholder="Security Key"
              value={formData.securityKey}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          
          <button type="submit" className={styles.registerBtn}>
            Register
          </button>
        </form>
        
        <div className={styles.links}>
          <p className={styles.linkText}>
            Have already admin account? <NavLink to="/admin/login" className={styles.link}>Login here</NavLink>
          </p>
          <p className={styles.linkText}>
            Are you a user? <NavLink to="/login" className={styles.link}>Login here</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;