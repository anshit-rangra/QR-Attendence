// TeacherDashboard.jsx
import React, { useEffect, useState } from 'react';
import { FaQrcode, FaCalendarAlt, FaUserCheck, FaUserTimes, FaChartBar } from 'react-icons/fa';
import styles from '../styles/TeacherDashboard.module.css';
import { generateQR, getClass } from '../api/axios';

const TeacherDashboard = () => {
  const [selectedDate, setSelectedDate] = useState('2025-09-16');
  const [qrCode, setQrCode] = useState(null);
  const [classData ,  setClassData] = useState([])

useEffect(() => {
    async function getClassData(){
        const response = await getClass();
        
        setClassData(response.data.classData || [])
    }
    getClassData()
},[])
  


  // Filter data by selected date
  const filteredData = classData?.filter(item => {
    const itemDate = new Date(item.date).toISOString().split('T')[0];
    return itemDate === selectedDate;
  });

  // Count attendance stats
  const presentCount = filteredData.filter(item => item.status === 'present').length;
  const absentCount = filteredData.filter(item => item.status === 'absent').length;
  const totalStudents = filteredData.length;
  const attendanceRate = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

  // Generate QR code (mock function)
  const generateQRCode = async () => {
    
    const response = await generateQR()
    
    if(response.status === 201){

      setQrCode(response.data.qrImage)
    }else {
      console.log(response.message)
      alert("QR code did not generate")
    }

  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Teacher Dashboard</h1>
        <div className={styles.dateSelector}>
          <FaCalendarAlt className={styles.icon} />
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            className={styles.dateInput}
          />
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
            <button onClick={generateQRCode} className={styles.generateButton}>
              Generate QR Code
            </button>
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
          <div className={styles.attendanceTable}>
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
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
                    <td colSpan="4" className={styles.noData}>No attendance records for this date</td>
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