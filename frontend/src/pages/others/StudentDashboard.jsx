// UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { FaQrcode, FaCalendarAlt, FaUserCheck, FaUserTimes, FaChartBar } from 'react-icons/fa';
import { Html5QrcodeScanner } from 'html5-qrcode';
import styles from '../../styles/UserDashboard.module.css';
import { attendClass, attendClasses } from '../../api/axios';
import Loader from '../../components/Loader'

const UserDashboard = () => {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [cameraError, setCameraError] = useState('');
  const [attendanceData, setAttendanceData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      const response = await attendClasses()
      setAttendanceData(response.data.attendanceData)
      setIsLoading(false)
    }
    getData()
  }, [])
  
  // Sample data
 

  // Filter data by selected date
  const filteredData = attendanceData.filter(item => {
    const itemDate = new Date(item.date).toISOString().split('T')[0];
    return itemDate === selectedDate;
  });

  // Count attendance stats
  const presentCount = filteredData.filter(item => item.status === 'present').length;
  const absentCount = filteredData.filter(item => item.status === 'absent').length;
  const totalRecords = filteredData.length;
  const attendanceRate = totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0;

  // Initialize scanner
  useEffect(() => {
    let html5QrcodeScanner;
    
    if (showScanner) {
      // Clear any previous result
      setScanResult('');
      setCameraError('');
      
      try {
        html5QrcodeScanner = new Html5QrcodeScanner(
          "qr-reader",
          { 
            fps: 10, 
            qrbox: { width: 250, height: 250 },
            supportedScanTypes: [] // Support all formats
          },
          false
        );
        
        html5QrcodeScanner.render(
          async (decodedText) => {
            // Successfully scanned
            setScanResult(decodedText);
            setShowScanner(false);
            html5QrcodeScanner.clear();
            
            setIsLoading(true)
            console.log(decodedText)
            const response = await attendClass(decodedText)
            setIsLoading(false)
            if(response.status === 200){
            alert(response.data.message);
            window.location.reload()
            }else {
              alert(response.message)
            }

          },
          (error) => {
            // Scanning error (not necessarily camera error)
            if (error.includes('No MultiFormat Readers')) {
              // This is a library-specific error we can ignore
              return;
            }
            console.error("Scan error:", error);
          }
        );
      } catch (error) {
        setCameraError(`Scanner initialization error: ${error.message}`);
        console.error("Scanner initialization error:", error);
      }
    }
    
    // Cleanup function
    return () => {
      if (html5QrcodeScanner) {
        try {
          html5QrcodeScanner.clear();
        } catch (error) {
          console.error("Error cleaning up scanner:", error);
        }
      }
    };
  }, [showScanner]);

  const openScanner = () => {
    setShowScanner(true);
    setCameraError('');
  };

  const closeScanner = () => {
    setShowScanner(false);
  };

  if(isLoading) return <Loader />

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Student Dashboard</h1>
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
          <div className={styles.scannerSection}>
            <h2><FaQrcode className={styles.icon} /> Mark Attendance</h2>
            {showScanner ? (
              <div className={styles.scannerWrapper}>
                <div id="qr-reader" className={styles.qrReader}></div>
                <button 
                  onClick={closeScanner} 
                  className={styles.cancelButton}
                >
                  Cancel Scan
                </button>
              </div>
            ) : (
              <div className={styles.scannerPlaceholder}>
                <FaQrcode size={50} />
                <p>Scan QR code to mark your attendance</p>
                <button 
                  onClick={openScanner} 
                  className={styles.scanButton}
                >
                  Open Scanner
                </button>
                {cameraError && (
                  <div className={styles.cameraError}>
                    {cameraError}
                  </div>
                )}
                {scanResult && (
                  <div className={styles.scanResult}>
                    <p>Last scanned: {scanResult}</p>
                  </div>
                )}
              </div>
            )}
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
                  <FaChartBar />
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
          <h2>Your Attendance Records for {new Date(selectedDate).toLocaleDateString()}</h2>
          <div className={styles.attendanceTable}>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData?.map((record) => (
                    <tr key={record._id}>
                      <td>{record.subject}</td>
                      <td>
                        <span className={`${styles.status} ${styles[record.status]}`}>
                          {record.status}
                        </span>
                      </td>
                      <td>{new Date(record.date).toLocaleDateString()}</td>
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

export default UserDashboard;