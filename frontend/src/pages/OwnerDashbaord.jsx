import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserFromToken } from "../utiles/Auth";
import DashboardLayout from "../component/DashboardLayout";

const OwnerDashboard = () => {
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = getUserFromToken();

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/get-school");
        setSchool(data.school);
      } catch (error) {
        console.error("Error fetching school:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchool();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center mt-20 text-gray-600">Loading Dashboard...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header with premium styling */}
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl px-8 py-6 border border-purple-100/50 relative overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              👑 Owner Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Welcome back, <span className="font-semibold text-purple-700">{user?.name || "Owner"}</span>
            </p>
          </div>
        </div>

        {/* School Overview Card with glassmorphism */}
        <section className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-purple-100/50 relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <span className="text-3xl">🏫</span>
              <span>School Overview</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'School Name', value: school?.schoolName, icon: '📚' },
                { label: 'Academic Session', value: school?.academicSession, icon: '📅' },
                { label: 'Address', value: school?.address || "N/A", icon: '📍' },
                { label: 'Email', value: school?.email || "N/A", icon: '📧' },
                { label: 'Phone', value: school?.phone || "N/A", icon: '📞' },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100/50 hover:shadow-md transition-all duration-300">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                    <p className="text-lg font-semibold text-gray-800 mt-1">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions with premium cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              title: 'Manage Principals', 
              description: 'Add, remove, or update principal profiles.', 
              gradient: 'from-purple-600 to-indigo-600',
              icon: '👔',
              buttonText: 'View Principals'
            },
            { 
              title: 'Manage Teachers', 
              description: 'Assign classes and monitor teacher performance.', 
              gradient: 'from-indigo-600 to-purple-600',
              icon: '👨‍🏫',
              buttonText: 'View Teachers'
            },
            { 
              title: 'View Students', 
              description: 'Check student records, attendance, and results.', 
              gradient: 'from-purple-500 to-pink-500',
              icon: '🎓',
              buttonText: 'View Students'
            },
          ].map((card, index) => (
            <div 
              key={index}
              className={`group relative bg-gradient-to-br ${card.gradient} text-white rounded-2xl shadow-xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden`}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-4xl">{card.icon}</span>
                  <h3 className="text-xl font-bold">{card.title}</h3>
                </div>
                <p className="text-sm opacity-90 mb-4 leading-relaxed">{card.description}</p>
                <button className="bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50 shadow-lg">
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default OwnerDashboard;
