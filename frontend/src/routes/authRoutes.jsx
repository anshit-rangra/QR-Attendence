// authRoutes.jsx
// Client-side auth routes
import React from 'react'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import TeacherRegister from '../pages/auth/TeacherRegister'
import TeacherLogin from '../pages/auth/TeacherLogin'
import Cookies from "js-cookie"
import { Navigate } from 'react-router-dom'

const token  = Cookies.get("attendanceToken")

export const authRoutes = [
	{ path: '/register', element: token ? <Navigate to={'/'} /> : <UserRegister /> },
	{ path: '/login', element: token ? <Navigate to={'/'} /> : <UserLogin /> },
	{ path: '/teacher/register', element: token ? <Navigate to={'/'} /> : <TeacherRegister /> },
	{ path: '/teacher/login', element: token ? <Navigate to={'/'} /> : <TeacherLogin /> },
]

export default authRoutes
