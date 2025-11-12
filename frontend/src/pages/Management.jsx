import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserFromToken } from '../utiles/Auth'
import DashboardLayout from '../Component/DashboardLayout'

const Management = () => {
  const [school, setSchool] = useState(null)
  const user = getUserFromToken()

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/get-school')
        setSchool(data.school)
      } catch (error) {
        console.error('Error fetching school:', error)
      }
    }
    fetchSchool()
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header with premium styling */}
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl px-8 py-6 border border-purple-100/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              💼 Management Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Welcome back, <span className="font-semibold text-amber-700">{user?.name || "Management"}</span>
            </p>
          </div>
        </div>

        {/* Stats Cards with gradients */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Finance', value: '-', icon: '💰', gradient: 'from-amber-500 to-orange-500', bgGradient: 'from-amber-50 to-orange-50' },
            { title: 'Students', value: '-', icon: '🎓', gradient: 'from-orange-500 to-red-500', bgGradient: 'from-orange-50 to-red-50' },
            { title: 'School', value: school?.schoolName || "Loading...", icon: '🏫', gradient: 'from-red-500 to-pink-500', bgGradient: 'from-red-50 to-pink-50' },
          ].map((stat, index) => (
            <div key={index} className={`bg-gradient-to-br ${stat.bgGradient} backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-purple-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden group`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity`}></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{stat.icon}</span>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                </div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions with premium styling */}
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-purple-100/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <span className="text-3xl">⚡</span>
              <span>Quick Actions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Finance Management', icon: '💰', gradient: 'from-amber-500 to-orange-500' },
                { label: 'View Students', icon: '🎓', gradient: 'from-orange-500 to-red-500' },
                { label: 'Reports', icon: '📈', gradient: 'from-red-500 to-pink-500' },
                { label: 'Settings', icon: '⚙️', gradient: 'from-amber-600 to-orange-600' },
              ].map((action, index) => (
                <button
                  key={index}
                  className={`group relative bg-gradient-to-r ${action.gradient} text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    <span className="text-xl">{action.icon}</span>
                    <span>{action.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Management