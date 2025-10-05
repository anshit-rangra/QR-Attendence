# 📸 QR-Based Attendance System

A **QR Code-based Attendance System** built using **React.js**, **Express.js**, and **MongoDB**, designed to simplify and automate attendance marking for students and teachers.

---

## 🚀 Features

- **Admin Panel**
  - Admin can register **teachers**, **students**, and **subjects**.
  - Admin assigns subjects to specific teachers and students.

- **Teacher Dashboard**
  - Teachers can **log in** using their credentials.
  - Can **generate QR codes** for their assigned subjects only.
  - Can **deactivate QR codes** after attendance session ends.

- **Student Dashboard**
  - Students can **log in** using their credentials.
  - Can **scan QR codes** to mark attendance.
  - Can only mark attendance for their **assigned subjects**.

- **QR Code Validation**
  - Each QR code is **unique** for a session.
  - Students from other subjects **cannot scan** or mark attendance.
  - Once the teacher deactivates the QR, attendance marking **closes automatically**.

---

## 🧠 How It Works

1. **Admin** registers all users (teachers & students) and assigns subjects.  
2. **Teacher** logs in and generates a **QR code** for their class.  
3. **Students** scan the QR using the app to mark attendance.  
4. When the teacher **deactivates** the QR code, attendance is finalized.  
5. The system records attendance in **MongoDB** and shows reports accordingly.

---

## 🛠️ Tech Stack

| Layer | Technology Used |
|-------|------------------|
| Frontend | React.js |
| Backend | Express.js (Node.js) |
| Database | MongoDB |
| Authentication | JWT (JSON Web Token) |
| QR Handling | `qrcode` / `react-qr-scanner` libraries |

---



## 🧪 Demo Credentials

Use these sample credentials to explore the system 👇

### 👑 Admin Login

Email: anshit22rangra@gmail.com

Password: anshit


### 👨‍🏫 Teacher Login


id: K72

Password: anshit


### 👨‍🎓 Student Login

id: H250176

Password: anshit



*(You can update these credentials in your seed data or MongoDB collection.)*

---

## 🌐 Hosted Link

🔗 **Live Demo:** [https://qr-attendence-by5k.onrender.com](https://qr-attendence-by5k.onrender.com)

---
