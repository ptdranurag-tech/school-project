import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [schoolName, setSchoolName] = useState("Loading...");
  const [user, setUser] = useState(null); // { name, role }
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Fetch School Name
  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/get-school");
        const data = await res.json();
        if (data?.school?.schoolName) {
          setSchoolName(data.school.schoolName);
        } else {
          setSchoolName("My School");
        }
      } catch (error) {
        console.error("Error fetching school:", error);
        setSchoolName("My School");
      }
    };
    fetchSchool();
  }, []);

  // ✅ Check token & decode user (update on location change)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ name: decoded.name, role: decoded.role });
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  // ✅ Disable back navigation (only allow logout)
  useEffect(() => {
    const handleBack = (event) => {
      event.preventDefault();
      window.history.pushState(null, "", window.location.href);
    };

    if (user) {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handleBack);
    }

    return () => window.removeEventListener("popstate", handleBack);
  }, [user]);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white/80 backdrop-blur-xl shadow-xl sticky top-0 z-50 border-b border-purple-200/50 rounded-b-3xl relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 via-transparent to-indigo-50/50"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
      
      <div className="relative z-10 flex items-center justify-between w-full">
        {/* 🏫 Left: School Name with premium styling */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
            <span className="text-xl">🏫</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {schoolName}
          </h1>
        </div>

        {/* 🌐 Center Navigation (show only if no user) */}
        {!user ? (
          <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-full p-1 border border-purple-100/50 shadow-md">
            <Link 
              to="/" 
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                location.pathname === '/' 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                location.pathname === '/about' 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                location.pathname === '/contact' 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Contact
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center text-white font-bold text-sm">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="text-gray-700 font-medium">
              Welcome, <span className="font-bold text-purple-700">{user.name}</span>
              <span className="text-xs text-gray-500 ml-2 capitalize">({user.role})</span>
            </div>
          </div>
        )}

        {/* 🔐 Right: Auth or Logout */}
        {!user ? (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="text-purple-700 font-semibold hover:text-purple-900 transition-all px-4 py-2 rounded-lg hover:bg-purple-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-105 transform"
            >
              Register
            </Link>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:scale-105 transform"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
