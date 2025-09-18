// AddSubject.jsx
import React, { useState } from 'react';
import styles from '../../styles/AddSubject.module.css';
import { useNavigate } from 'react-router-dom';
import { createSubject } from '../../api/axios';

const AddSubject = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    code: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission here
    const response = await createSubject(formData)
    if(response.status === 201){
        alert("Subject created sucessfully")
        navigate("/admin")
    }else {
        alert(response.data.message)
    }
    // Reset form
    setFormData({ code: '', name: '' });
  };

  const handleBack = () => {
    // Handle back navigation
    navigate("/admin")
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.707 17.707L16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"/>
          </svg>
        </button>
        <div className={styles.logo}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13.5h2v7h-2v-7zm0 9h2v2h-2v-2z"/>
          </svg>
          <span>EduManage</span>
        </div>
      </header>

      <div className={styles.formContainer}>
        <h1 className={styles.title}>Add New Subject</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="code" className={styles.label}>
              Subject Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter subject code"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Subject Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter subject name"
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Add Subject
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubject;