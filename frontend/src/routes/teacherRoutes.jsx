// teacherRoutes.jsx
import { Navigate } from 'react-router-dom'
import TeacherDashboard from '../pages/TeacherDashboard'
import Cookies from 'js-cookie'

const token = Cookies.get("attendanceToken")
const role = Cookies.get("role")

export const teacherRoutes = [
	{ path: '/teacher', element: (token && (role === "teacher")) ? <TeacherDashboard /> : token && (role === 'student') ? <Navigate to={'/user'} /> : <Navigate to={'/login'} /> },
]

export default teacherRoutes
