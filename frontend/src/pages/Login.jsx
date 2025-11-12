import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // // ✅ Handle login
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setStatus("");

  //   try {
  //     const { data } = await axios.post("http://localhost:5000/api/auth/login", formData);

  //     if (data?.token) {
  //       localStorage.setItem("token", data.token);

  //       // ✅ Decode token to get role
  //       const decoded = jwtDecode(data.token);
  //       const userRole = decoded?.role;

  //       setStatus("Login successful!");

  //       // ✅ Role-based navigation
  //       switch (userRole) {
  //         case "owner":
  //           navigate("/owner-dashboard");
  //           break;
  //         case "principal":
  //           navigate("/principal-dashboard");
  //           break;
  //         case "vicePrincipal":
  //           navigate("/vice-principal-dashboard");
  //           break;
  //         case "management":
  //           navigate("/management-dashboard");
  //           break;
  //         case "teacher":
  //           navigate("/teacher-dashboard");
  //           break;
  //         case "student":
  //           navigate("/student-dashboard");
  //           break;
  //         default:
  //           navigate("/");
  //           break;
  //       }
  //     } else {
  //       setStatus("Invalid credentials!");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     setStatus(error.response?.data?.message || "Login failed. Try again!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setStatus("");

  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", formData);
    const data = response.data;

    // ✅ Fix: token is inside data.data.token
    const token = data?.data?.token;

    if (token) {
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const userRole = decoded?.role;

      setStatus("Login successful!");

      // ✅ Navigate by role
      switch (userRole) {
        case "owner":
          navigate("/owner-dashboard");
          break;
        case "principal":
          navigate("/principal-dashboard");
          break;
        case "vicePrincipal":
          navigate("/vice-principal-dashboard");
          break;
        case "management":
          navigate("/management-dashboard");
          break;
        case "teacher":
          navigate("/teacher-dashboard");
          break;
        case "student":
          navigate("/student-dashboard");
          break;
        default:
          navigate("/");
          break;
      }
    } else {
      setStatus("Invalid credentials!");
    }
  } catch (error) {
    console.error("Login error:", error);
    setStatus(error.response?.data?.message || "Login failed. Try again!");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-purple-100/50 relative overflow-hidden">
          {/* Decorative gradient top bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500"></div>
          
          {/* Background gradient effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 mb-4 shadow-lg">
                <span className="text-3xl">🔐</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">Login to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>

              {/* Role */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Your Role</option>
                  <option value="owner">Owner</option>
                  <option value="principal">Principal</option>
                  <option value="vicePrincipal">Vice Principal</option>
                  <option value="management">Management</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transform ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">⏳</span>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {status && (
              <div
                className={`mt-6 p-4 rounded-xl text-center text-sm font-medium ${
                  status.toLowerCase().includes("success")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {status}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
