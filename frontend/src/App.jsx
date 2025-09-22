import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import LogoutButton from './components/Logout'
import Loader from './components/Loader'

// Lazy-loaded pages
const UserLogin = lazy(() => import('./pages/auth/UserLogin'))
const AdminRegister = lazy(() => import('./pages/auth/AdminRegister'))
const AdminLogin = lazy(() => import('./pages/auth/AdminLogin'))
const UserDashboard = lazy(() => import('./pages/others/StudentDashboard'))
const TeacherDashboard = lazy(() => import('./pages/others/TeacherDashboard'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const TeacherRegister = lazy(() => import("./pages/admin/auth/TeacherRegister"))
const StudentRegister = lazy(() => import("./pages/admin/auth/StudentRegister"))
const UserProfile = lazy(() => import("./pages/others/UserProfile"))
const AddSubject = lazy(() => import("./pages/admin/AddSubject"))


const App = () => {
  const token = Cookies.get('attendanceToken') || Cookies.get("admin")
  const role = Cookies.get('role')
  

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
      {  (token && role) ? <LogoutButton /> : "" }
        <Routes>
          <Route path="/login" element={ token ? <Navigate to={'/student'} /> : <UserLogin /> } /> 

          <Route path='/register' element={ token ? <Navigate to={'/student'} /> : <AdminRegister /> } />

          <Route path='/admin/login' element={ token ? <Navigate to={'/student'} /> : <AdminLogin /> } />

          <Route path="/user/profile" element={token ? <UserProfile /> : <Navigate to={'/login'} /> } />


          <Route path="/student" element={(token && (role === 'student')) ? <UserDashboard /> : (token && (role === 'teacher')) ? <Navigate to={'/teacher'} /> : (token && (role === 'admin')) ? <Navigate to={'/admin'} />  : <Navigate to={'/login'} />} /> 

          <Route path="/teacher" element={( token && ( role === 'teacher' )) ? <TeacherDashboard /> : token && (role === 'student') ? <Navigate to={'/student'} /> : (token && (role === 'admin')) ? <Navigate to={'/admin'} /> : <Navigate to={'/login'} />} />

          <Route path="/admin" element={(token && (role === 'admin')) ? <AdminDashboard /> : token ? <Navigate to={'/student'} /> : <Navigate to={'/teacher'} />} />

          <Route path='/register/student' element={(token && (role === 'admin')) ? <StudentRegister /> : <Navigate to={'/user'} /> }  />
          <Route path='/register/teacher' element={(token && (role === 'admin')) ? <TeacherRegister /> : <Navigate to={'/user'} /> }  />
          <Route path='/create/subject' element={(token && (role === 'admin')) ? <AddSubject /> : <Navigate to={'/user'} /> }  />



          <Route path="*" element={(token && (role === 'student')) ? <Navigate to={'/student'} /> : (token && (role === 'teacher')) ? <Navigate to={'/teacher'} /> : <Navigate to={'/login'} />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
