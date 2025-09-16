// userRoutes.jsx
import UserDashboard from '../pages/UserDashboard'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const token = Cookies.get("attendanceToken")
const role = Cookies.get("role")


export const userRoutes = [
	{ path: '/user', element: (token && (role === 'student')) ? <UserDashboard /> : (token && (role === 'teacher')) ? <Navigate to={'/teacher'} /> : <Navigate to={'/login'} /> },

    { path: '*', element: (token && (role === 'student')) ? <Navigate to={'/user'} /> : <Navigate to={'/teacher'} /> }
]

export default userRoutes
