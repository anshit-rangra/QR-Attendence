import React, { useState } from 'react';
import styles from '../../styles/TeacherRegister.module.css';
import { registerTeacher } from '../../api/axios';

const TeacherRegister = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    subject: '',
    name: ''
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
    const response = await registerTeacher(formData)

    alert(response.data.message);
    if(response.status === 201){
        window.location.reload()
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerCard}>
        <h1 className={styles.title}>Teacher Registration</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="id" className={styles.label}>Teacher ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="Enter your teacher ID"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="subject" className={styles.label}>Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="Enter the subject you teach"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="Create a secure password"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherRegister;