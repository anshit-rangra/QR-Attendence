import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import styles from '../../../styles/StudentRegister.module.css';
import { registerStudent } from '../../../api/axios';
import Loader from '../../../components/Loader';

const StudentRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
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

    setIsLoading(true)
    const response = await registerStudent(formData)
    setIsLoading(false)
    console.log(response)
    alert(response.data.message);
    if(response.status === 201){
      navigate("/admin")
    }
  };

  const handleBack = () => {
    navigate('/admin'); // Go back to previous page
  };

  if(isLoading) return <Loader />

  return (
    <div className={styles.container}>
      <div className={styles.registerCard}>
        {/* Back Button with Icon */}
        <button className={styles.backButton} onClick={handleBack}>
          <FaArrowLeft className={styles.backIcon} />
        </button>
        
        <h1 className={styles.title}>Student Registration</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="id" className={styles.label}>Roll Number</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
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