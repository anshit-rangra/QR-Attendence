import React, { useState } from 'react';
import styles from '../../styles/StudentLogin.module.css';
import { loginUser } from '../../api/axios';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/Loader'

const StudentLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    id: '',
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

    setIsLoading(true)
    const response = await loginUser(loginData)
    setIsLoading(false)
    
    alert(response.data.message);
    if(response.status === 200){
        window.location.reload()
    }
    
  };

  if(isLoading) return <Loader />

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="id" className={styles.label}>ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={loginData.id}
              onChange={handleInputChange}
              className={styles.input}
              required
              placeholder="Enter your id here"
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
            <p>Are you Admin ? <NavLink to="/admin/login" className={styles.registerLink}>Login here</NavLink></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;