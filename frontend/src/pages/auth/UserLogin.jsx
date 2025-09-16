import React, { useState } from 'react';
import styles from '../../styles/StudentLogin.module.css';
import { loginUser } from '../../api/axios';

const StudentLogin = () => {
  const [loginData, setLoginData] = useState({
    rollNo: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(loginData)
    alert(response.data.message);
    if(response.status === 200){
        window.location.reload()
    }
    
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Student Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="rollNo" className={styles.label}>Roll Number</label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              value={loginData.rollNo}
              onChange={handleInputChange}
              className={styles.input}
              required
              placeholder="Enter your roll number"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              className={styles.input}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className={styles.options}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
              Remember me
            </label>
            <a href="#forgot" className={styles.forgotLink}>Forgot Password?</a>
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>

          <div className={styles.registerPrompt}>
            <p>Don't have an account? <a href="#register" className={styles.registerLink}>Register here</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;