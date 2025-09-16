import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import teacherRoutes from './routes/teacherRoutes'

const routes = [
  ...authRoutes,
  ...userRoutes,
  ...teacherRoutes,
]

const router = createBrowserRouter(routes)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
