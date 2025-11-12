
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserFromToken } from "../utiles/Auth";
import DashboardLayout from "../Component/DashboardLayout";
import { Routes, Route } from "react-router-dom";
import School from "./School";

const OwnerDashboard = () => {
  const [school, setSchool] = useState(null);
  const [totals, setTotals] = useState({
    principal: 0,
    vicePrincipal: 0,
    management: 0,
    teacher: 0,
    student: 0,
  });
  const [loading, setLoading] = useState(true);
  const user = getUserFromToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🏫 Fetch School Info
        const schoolRes = await axios.get("http://localhost:5000/api/admin/get-school");
        setSchool(schoolRes.data.school);

        // 👥 Fetch Total Staff + Students
        const totalRes = await axios.get("http://localhost:5000/api/admin/TotalStaffWholeSchool");
        const staffList = totalRes.data?.TotalStaff || [];

        // 🧮 Count totals per role (excluding owner)
        const counts = {
          principal: staffList.filter((u) => u.role === "principal").length,
          vicePrincipal: staffList.filter((u) => u.role === "vicePrincipal").length,
          management: staffList.filter((u) => u.role === "management").length,
          teacher: staffList.filter((u) => u.role === "teacher").length,
          student: staffList.filter((u) => u.role === "student").length,
        };
        setTotals(counts);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const DashboardHome = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl px-8 py-6 border border-purple-100/50 relative overflow-hidden">
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

      {/* Total Summary Cards (owner removed) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { label: "Principal", value: totals.principal, color: "from-blue-500 to-indigo-500", icon: "👔" },
          { label: "Vice Principal", value: totals.vicePrincipal, color: "from-teal-500 to-emerald-500", icon: "🧑‍💼" },
          { label: "Management", value: totals.management, color: "from-purple-500 to-indigo-500", icon: "🏢" },
          { label: "Teachers", value: totals.teacher, color: "from-indigo-500 to-purple-500", icon: "👨‍🏫" },
          { label: "Students", value: totals.student, color: "from-pink-500 to-rose-500", icon: "🎓" },
        ].map((item, index) => (
          <div
            key={index}
            className={`relative bg-gradient-to-br ${item.color} text-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-all duration-300 overflow-hidden`}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center space-x-4">
              <span className="text-4xl">{item.icon}</span>
              <div>
                <p className="text-sm uppercase tracking-wide text-white/80">{item.label}</p>
                <p className="text-3xl font-bold">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* School Overview */}
      <section className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-purple-100/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <span className="text-3xl">🏫</span>
            <span>School Overview</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "School Name", value: school?.schoolName, icon: "📚" },
              { label: "Academic Session", value: school?.academicSession, icon: "📅" },
              { label: "Address", value: school?.address || "N/A", icon: "📍" },
              { label: "Email", value: school?.email || "N/A", icon: "📧" },
              { label: "Phone", value: school?.phone || "N/A", icon: "📞" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100/50 hover:shadow-md transition-all duration-300"
              >
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
    </div>
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center mt-20 text-gray-600">Loading Dashboard...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="school" element={<School />} />
      </Routes>
    </DashboardLayout>
  );
};

export default OwnerDashboard;
