import React, { useState } from 'react';
import styles from '../../../styles/TeacherRegister.module.css';
import { useNavigate } from 'react-router-dom';
import { registerTeacher } from '../../../api/axios';
import Loader from '../../../components/Loader'

const TeacherRegister = () => {
  const navigate = useNavigate();
  const [isLoading , setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    subjects: [],
    name: ''
  });
  const [currentSubject, setCurrentSubject] = useState('');

  const onBack = () => {
    navigate("/admin");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubjectChange = (e) => {
    setCurrentSubject(e.target.value);
  };

  const addSubject = () => {
    if (currentSubject.trim() && !formData.subjects.includes(currentSubject.trim())) {
      setFormData(prevState => ({
        ...prevState,
        subjects: [...prevState.subjects, currentSubject.trim()]
      }));
      setCurrentSubject('');
    }
  };

  const removeSubject = (index) => {
    setFormData(prevState => ({
      ...prevState,
      subjects: prevState.subjects.filter((_, i) => i !== index)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSubject();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true)
    const response = await registerTeacher(formData)
    setIsLoading(false)
    
    alert(response.data.message || "Error occur !!")
    if(response.status === 201){
      navigate("/admin")
    }
  };

  if(isLoading) return <Loader />

  return (
    <div className={styles.container}>
      <div className={styles.registerCard}>
        <button className={styles.backButton} onClick={onBack}>
          <svg className={styles.backIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        
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
            <label htmlFor="subject" className={styles.label}>Subjects</label>
            <div className={styles.subjectInputContainer}>
              <input
                type="text"
                id="subject"
                value={currentSubject}
                onChange={handleSubjectChange}
                onKeyPress={handleKeyPress}
                className={styles.input}
                placeholder="Enter a subject and press Enter/Add"
              />
              <button 
                type="button" 
                onClick={addSubject}
                className={styles.addButton}
              >
                Add
              </button>
            </div>
            
            {formData.subjects.length > 0 && (
              <div className={styles.subjectsList}>
                {formData.subjects.map((subject, index) => (
                  <div key={index} className={styles.subjectItem}>
                    <span>{subject}</span>
                    <button 
                      type="button" 
                      onClick={() => removeSubject(index)}
                      className={styles.removeButton}
                    >
                      ×
                    </button>
                  </div>
                ))}
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