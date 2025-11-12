import React from 'react'
import Navbar from './component/Navbar'
import { Route, Routes, Navigate, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './component/Footer'
import About from './component/About'
import Contact from './component/Contact'
import Register from './pages/Regsiter'
import Login from './pages/Login'
import ProtectedRoute from './utiles/ProtectedRoute'
import OwnerDashboard from './pages/OwnerDashbaord'
import PrincipalDashbaord from './pages/PrincipalDashbaord'
import VicePrincipal from './pages/VicePrincipal'
import Management from './pages/Management'
import Teacher from './pages/Teacher'
import Student from './pages/Student'
import { isAuthenticated, getUserRole } from './utiles/Auth'

// Public Route Guard - Redirect to dashboard if already logged in
const PublicRoute = ({ element: Component }) => {
  if (isAuthenticated()) {
    const userRole = getUserRole()
    const roleRoutes = {
      owner: '/owner-dashboard',
      principal: '/principal-dashboard',
      vicePrincipal: '/vice-principal-dashboard',
      management: '/management-dashboard',
      teacher: '/teacher-dashboard',
      student: '/student-dashboard',
    }
    const redirectPath = roleRoutes[userRole] || '/'
    return <Navigate to={redirectPath} replace />
  }
  return <Component />
}

// 404 Not Found Component
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-12 border border-purple-100/50 relative overflow-hidden">
          {/* Decorative gradient top bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500"></div>
          
          {/* Background gradient effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="relative z-10">
            <div className="text-9xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent mb-6">
              404
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Oops! The page you're looking for doesn't exist.
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transform"
            >
              <span>🏠</span>
              <span>Go to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const App = () => {
  const location = useLocation()
  const isDashboardPage = location.pathname.includes('-dashboard')

  return (
    <>
      {!isDashboardPage && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={<PublicRoute element={Login} />}
        />
        <Route
          path="/register"
          element={<PublicRoute element={Register} />}
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/owner-dashboard/*"
          element={
            <ProtectedRoute
              element={OwnerDashboard}
              allowedRoles={['owner']}
            />
          }
        />

        <Route
          path="/principal-dashboard/*"
          element={
            <ProtectedRoute
              element={PrincipalDashbaord}
              allowedRoles={['principal']}
            />
          }
        />
        <Route
          path="/vice-principal-dashboard/*"
          element={
            <ProtectedRoute
              element={VicePrincipal}
              allowedRoles={['vicePrincipal']}
            />
          }
        />
        <Route
          path="/management-dashboard/*"
          element={
            <ProtectedRoute
              element={Management}
              allowedRoles={['management']}
            />
          }
        />
        <Route
          path="/teacher-dashboard/*"
          element={
            <ProtectedRoute
              element={Teacher}
              allowedRoles={['teacher']}
            />
          }
        />
        <Route
          path="/student-dashboard/*"
          element={
            <ProtectedRoute
              element={Student}
              allowedRoles={['student']}
            />
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isDashboardPage && <Footer />}
    </>
  )
}

export default App