import React, { useState } from 'react';
import styles from '../../styles/StudentRegister.module.css';
import { registerUser } from '../../api/axios';

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    course: '',
    subjects: [],
    password: ''
  });

  const [currentSubject, setCurrentSubject] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubjectAdd = () => {
    if (currentSubject.trim() !== '') {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, currentSubject.trim()]
      });
      setCurrentSubject('');
    }
  };

  const handleSubjectRemove = (index) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects.splice(index, 1);
    setFormData({
      ...formData,
      subjects: updatedSubjects
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const response = await registerUser(formData)
    console.log(response)
    alert(response.data.message);
    if(response.status === 201){
        window.location.reload()
    }
    
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerCard}>
        <h1 className={styles.title}>Student Registration</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="rollNo" className={styles.label}>Roll Number</label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="course" className={styles.label}>Course</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Subject Codes</label>
            <div className={styles.subjectInputContainer}>
              <input
                type="text"
                value={currentSubject}
                onChange={(e) => setCurrentSubject(e.target.value)}
                className={styles.subjectInput}
                placeholder="Enter subject code"
              />
              <button 
                type="button" 
                onClick={handleSubjectAdd}
                className={styles.addButton}
              >
                Add
              </button>
            </div>
            
            {formData.subjects.length > 0 && (
              <div className={styles.subjectList}>
                <p className={styles.addedSubjectsTitle}>Added Subjects:</p>
                <ul className={styles.subjectUl}>
                  {formData.subjects.map((subject, index) => (
                    <li key={index} className={styles.subjectItem}>
                      <span className={styles.subjectCode}>{subject}</span>
                      <button 
                        type="button" 
                        onClick={() => handleSubjectRemove(index)}
                        className={styles.removeButton}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.input}
              required
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

export default StudentRegister;