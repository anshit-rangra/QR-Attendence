// TeacherDashboard.jsx
import React, { useEffect, useState } from 'react';
import { FaQrcode, FaCalendarAlt, FaUserCheck, FaUserTimes, FaChartBar, FaTimes } from 'react-icons/fa';
import styles from '../../styles/TeacherDashboard.module.css';
import { deleteQR, generateQR, getClass, getUser } from '../../api/axios';
import Loader from '../../components/Loader'

const TeacherDashboard = () => {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [qrCode, setQrCode] = useState(null);
  const [classData, setClassData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getClassData() {
      setIsLoading(true)
      const response = await getUser();
      setSubjects(response.data.user.subjects);
      setSelectedSubject(response.data.user.subjects[0] || "");
      const dataClass = await getClass(response.data.user.subjects[0]);
      setClassData(dataClass.data.classData || []);
      setIsLoading(false) 
    }
    getClassData();
  }, []);

  // Filter data by selected date and subject
  const filteredData = classData?.filter(item => {
    const itemDate = new Date(item.date).toISOString().split('T')[0];
    const dateMatches = itemDate === selectedDate;
    const subjectMatches = selectedSubject === 'all' || item.subject === selectedSubject;
    
    return dateMatches && subjectMatches;
  });

  // Count attendance stats
  const presentCount = filteredData.filter(item => item.status === 'present').length;
  const absentCount = filteredData.filter(item => item.status === 'absent').length;
  const totalStudents = filteredData.length;
  const attendanceRate = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;


  // Generate QR code
  const generateQRCode = async () => {
    setIsLoading(true)
    const response = await generateQR(selectedSubject);
    setIsLoading(false)
    
    if (response.status === 201) {
      setQrCode(response.data.qrImage);
    } else {
      console.log(response.message);
      alert("QR code did not generate");
    }
  };

  // Deactivate QR code
  const deactivateQRCode = async() => {
    setIsLoading(true)
    const response = await deleteQR(selectedSubject)
    setIsLoading(false)

    if(response.status === 200){
      setQrCode(null);
      alert("QR code deactivate sucessfully")
      window.location.reload()
    }

  };

  const handleSubject = async (e) => {
    
    setSelectedSubject(e.target.value)
    setIsLoading(true)
    const dataClass = await getClass(e.target.value);
    setIsLoading(false)
    console.log(dataClass.data.classData)
    setClassData(dataClass.data.classData || []);
  }

  if(isLoading) return <Loader />

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Teacher Dashboard</h1>
        <div className={styles.controls}>
          <div className={styles.dateSelector}>
            <FaCalendarAlt className={styles.icon} />
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className={styles.dateInput}
            />
          </div>
          <div className={styles.subjectSelector}>
            <select 
              value={selectedSubject} 
              onChange={handleSubject}
              className={styles.subjectDropdown}
            >
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <div className={styles.qrSection}>
            <h2><FaQrcode className={styles.icon} /> Attendance QR Code</h2>
            <div className={styles.qrContainer}>
              {qrCode ? (
                <img src={qrCode} alt="Attendance QR Code" className={styles.qrImage} />
              ) : (
                <div className={styles.qrPlaceholder}>
                  <FaQrcode size={50} />
                  <p>Generate a QR code for students to scan</p>
                </div>
              )}
            </div>
            <div className={styles.qrButtons}>
              <button onClick={generateQRCode} className={styles.generateButton}>
                Generate QR Code
              </button>
              {qrCode && (
                <button onClick={deactivateQRCode} className={styles.deactivateButton}>
                  <FaTimes /> Deactivate QR
                </button>
              )}
            </div>
          </div>

          <div className={styles.stats}>
            <h2><FaChartBar className={styles.icon} /> Attendance Summary</h2>
            <div className={styles.statCards}>
              <div className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.present}`}>
                  <FaUserCheck />
                </div>
                <div className={styles.statInfo}>
                  <h3>{presentCount}</h3>
                  <p>Present</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.absent}`}>
                  <FaUserTimes />
                </div>
                <div className={styles.statInfo}>
                  <h3>{absentCount}</h3>
                  <p>Absent</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.total}`}>
                  <FaUserCheck />
                </div>
                <div className={styles.statInfo}>
                  <h3>{attendanceRate}%</h3>
                  <p>Attendance Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <h2>Attendance Records for {new Date(selectedDate).toLocaleDateString()}</h2>
          {selectedSubject !== 'all' && <p>Subject: {selectedSubject}</p>}
          <div className={styles.attendanceTable}>
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((record) => (
                    <tr key={record._id}>
                      <td>{record.studentId}</td>
                      <td>{record.name}</td>
                      <td>{record.subject}</td>
                      <td>
                        <span className={`${styles.status} ${styles[record.status]}`}>
                          {record.status}
                        </span>
                      </td>
                      <td>{new Date(record.date).toLocaleTimeString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.noData}>No attendance records for this date</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;