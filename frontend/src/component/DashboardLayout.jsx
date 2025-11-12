import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { getUserRole, isAuthenticated } from '../utiles/Auth'

const DashboardLayout = ({ children }) => {
  const role = getUserRole()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Prevent back button navigation when on dashboard
    if (!isAuthenticated()) {
      return // Don't prevent if not authenticated
    }

    // Method to prevent back navigation by manipulating history
    const preventBack = () => {
      // Get current path dynamically
      const currentPath = window.location.pathname
      // Replace current history entry
      window.history.replaceState(
        { key: 'dashboard', timestamp: Date.now() },
        '',
        currentPath
      )
      // Push a duplicate state so back button stays on same page
      window.history.pushState(
        { key: 'dashboard', timestamp: Date.now() },
        '',
        currentPath
      )
    }

    // Initialize: prevent back navigation on mount
    preventBack()

    // Handle browser back/forward button
    const handlePopState = (event) => {
      if (isAuthenticated()) {
        // Check if user is trying to navigate away from dashboard
        if (!window.location.pathname.includes('-dashboard')) {
          // User tried to go back to a non-dashboard page
          // Redirect them back to their dashboard
          const roleRoutes = {
            owner: '/owner-dashboard',
            principal: '/principal-dashboard',
            vicePrincipal: '/vice-principal-dashboard',
            management: '/management-dashboard',
            teacher: '/teacher-dashboard',
            student: '/student-dashboard',
          }
          const redirectPath = roleRoutes[role] || '/owner-dashboard'
          navigate(redirectPath, { replace: true })
          preventBack()
        } else {
          // User is still on dashboard but tried to go back
          // Prevent it by pushing state again
          preventBack()
        }
      }
    }

    // Add event listener
    window.addEventListener('popstate', handlePopState)

    // Also prevent back on focus (when user switches tabs and comes back)
    const handleFocus = () => {
      if (isAuthenticated() && !window.location.pathname.includes('-dashboard')) {
        const roleRoutes = {
          owner: '/owner-dashboard',
          principal: '/principal-dashboard',
          vicePrincipal: '/vice-principal-dashboard',
          management: '/management-dashboard',
          teacher: '/teacher-dashboard',
          student: '/student-dashboard',
        }
        const redirectPath = roleRoutes[role] || '/owner-dashboard'
        navigate(redirectPath, { replace: true })
        preventBack()
      }
    }

    window.addEventListener('focus', handleFocus)

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('focus', handleFocus)
    }
  }, [location.pathname, role, navigate])

  // This effect is handled by ProtectedRoute and PublicRoute in App.jsx
  // So we don't need to duplicate the logic here

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-indigo-50/30">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content with premium styling */}
      <div className="flex-1 ml-72">
        {/* Top gradient bar */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500"></div>
        
        <main className="p-8 min-h-screen">
          {/* Animated background pattern */}
          <div className="fixed inset-0 -z-10 opacity-5 pointer-events-none" 
               style={{
                 backgroundImage: `radial-gradient(circle at 2px 2px, purple 1px, transparent 0)`,
                 backgroundSize: '40px 40px'
               }}
          ></div>
          
          {/* Content with smooth animations */}
          <div className="animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

