import React, { useState } from 'react';
import styles from '../../styles/TeacherLogin.module.css';
import { loginTeacher } from '../../api/axios';

const TeacherLogin = () => {
  const [loginData, setLoginData] = useState({
    id: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginTeacher(loginData)

    if(response.status === 200){
      alert(response.data.message);
        window.location.reload()
    }else {
      alert(response.message)
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1 className={styles.title}>Teacher Login</h1>
          <p className={styles.subtitle}>Access your teaching dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="id" className={styles.label}>Teacher ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={loginData.id}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="Enter your teacher ID"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className={styles.options}>
            <label className={styles.remember}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
              Remember me
            </label>
            <a href="#" className={styles.forgot}>Forgot password?</a>
          </div>

          <button type="submit" className={styles.loginButton}>
            Sign In
          </button>
        </form>
        
        <div className={styles.footer}>
          <p>Don't have an account? <a href="#" className={styles.link}>Contact Administrator</a></p>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;