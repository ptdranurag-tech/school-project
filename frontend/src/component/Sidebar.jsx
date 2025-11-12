import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logoutUser, getUserFromToken } from '../utiles/Auth'

const Sidebar = ({ role }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = getUserFromToken()

  // Role-based menu items
  const menuItems = {
    owner: [
      { path: '/owner-dashboard', label: 'Dashboard', icon: '🏠' },
      { path: '/owner-dashboard/school', label: 'School Info', icon: '🏫' },
      { path: '/owner-dashboard/principals', label: 'Principals', icon: '👔' },
      { path: '/owner-dashboard/teachers', label: 'Teachers', icon: '👨‍🏫' },
      { path: '/owner-dashboard/students', label: 'Students', icon: '🎓' },
      { path: '/owner-dashboard/settings', label: 'Settings', icon: '⚙️' },
    ],
    principal: [
      { path: '/principal-dashboard', label: 'Dashboard', icon: '🏠' },
      { path: '/principal-dashboard/teachers', label: 'Teachers', icon: '👨‍🏫' },
      { path: '/principal-dashboard/students', label: 'Students', icon: '🎓' },
      { path: '/principal-dashboard/attendance', label: 'Attendance', icon: '📊' },
      { path: '/principal-dashboard/reports', label: 'Reports', icon: '📈' },
      { path: '/principal-dashboard/settings', label: 'Settings', icon: '⚙️' },
    ],
    vicePrincipal: [
      { path: '/vice-principal-dashboard', label: 'Dashboard', icon: '🏠' },
      { path: '/vice-principal-dashboard/teachers', label: 'Teachers', icon: '👨‍🏫' },
      { path: '/vice-principal-dashboard/students', label: 'Students', icon: '🎓' },
      { path: '/vice-principal-dashboard/attendance', label: 'Attendance', icon: '📊' },
      { path: '/vice-principal-dashboard/reports', label: 'Reports', icon: '📈' },
    ],
    management: [
      { path: '/management-dashboard', label: 'Dashboard', icon: '🏠' },
      { path: '/management-dashboard/finance', label: 'Finance', icon: '💰' },
      { path: '/management-dashboard/students', label: 'Students', icon: '🎓' },
      { path: '/management-dashboard/reports', label: 'Reports', icon: '📈' },
      { path: '/management-dashboard/settings', label: 'Settings', icon: '⚙️' },
    ],
    teacher: [
      { path: '/teacher-dashboard', label: 'Dashboard', icon: '🏠' },
      { path: '/teacher-dashboard/students', label: 'My Students', icon: '🎓' },
      { path: '/teacher-dashboard/attendance', label: 'Attendance', icon: '📊' },
      { path: '/teacher-dashboard/grades', label: 'Grades', icon: '📝' },
      { path: '/teacher-dashboard/assignments', label: 'Assignments', icon: '📚' },
    ],
    student: [
      { path: '/student-dashboard', label: 'Dashboard', icon: '🏠' },
      { path: '/student-dashboard/attendance', label: 'My Attendance', icon: '📊' },
      { path: '/student-dashboard/grades', label: 'My Grades', icon: '📝' },
      { path: '/student-dashboard/assignments', label: 'Assignments', icon: '📚' },
      { path: '/student-dashboard/profile', label: 'Profile', icon: '👤' },
    ],
  }

  const items = menuItems[role] || []
  const isActive = (path) => {
    const currentPath = location.pathname
    // Exact match - highest priority
    if (currentPath === path) return true
    
    // Check if current path is a sub-route of this menu item
    if (currentPath.startsWith(path + '/')) {
      // Check if there's a more specific menu item that matches better
      // (i.e., a menu item with a longer path that also matches)
      const moreSpecificMatch = items.find(
        item => 
          item.path !== path && 
          item.path.length > path.length &&
          (currentPath === item.path || currentPath.startsWith(item.path + '/'))
      )
      // Only activate if no more specific match exists
      return !moreSpecificMatch
    }
    return false
  }

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white shadow-2xl z-40 flex flex-col backdrop-blur-xl border-r border-purple-700/50">
      {/* Header with gradient */}
      <div className="p-6 border-b border-purple-600/30 flex-shrink-0 bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white capitalize tracking-tight">
              {role} Dashboard
            </h2>
            <p className="text-xs text-purple-200/80 font-medium">
              {user?.name || 'User'}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items - Scrollable with custom scrollbar */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent">
        <div className="space-y-1">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/50 transform scale-[1.02]'
                  : 'text-purple-100 hover:bg-purple-700/40 hover:text-white hover:transform hover:scale-[1.01] hover:shadow-md'
              }`}
            >
              {/* Active indicator */}
              {isActive(item.path) && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
              )}
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className={`text-2xl relative z-10 transition-transform duration-300 ${
                isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'
              }`}>
                {item.icon}
              </span>
              <span className={`font-semibold relative z-10 transition-all duration-300 ${
                isActive(item.path) ? 'text-white' : 'text-purple-100 group-hover:text-white'
              }`}>
                {item.label}
              </span>
              {/* Arrow indicator for active item */}
              {isActive(item.path) && (
                <span className="ml-auto text-white opacity-70">→</span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Logout Button with premium styling */}
      <div className="p-4 border-t border-purple-600/30 flex-shrink-0 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 hover:scale-105 active:scale-95 transform"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar

