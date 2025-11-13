// pages/PrincipalManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Pencil, 
  Trash2, 
  Search,
  X,
  Mail,
  Calendar,
  Shield,
  RefreshCw
} from "lucide-react";

const PrincipalManagement = () => {
  const [principals, setPrincipals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPrincipal, setEditingPrincipal] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "principal", // Added role field
  });

  // Available roles for dropdown
  const availableRoles = [
    { value: "principal", label: "Principal" },
    { value: "vicePrincipal", label: "Vice Principal" },
    { value: "management", label: "Management" },
    { value: "teacher", label: "Teacher" },
    { value: "student", label: "Student" },
  ];

  // Fetch All Staff and Filter Principals
  const fetchPrincipals = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/TotalStaffWholeSchool", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const principalList = res.data.TotalStaff?.filter(staff => staff.role === "principal") || [];
      setPrincipals(principalList);
    } catch (error) {
      console.error("Error fetching principals:", error);
      showMessage("error", "Failed to fetch principals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrincipals();
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleEdit = (principal) => {
    setEditingPrincipal(principal);
    setFormData({
      name: principal.name,
      email: principal.email,
      password: "",
      role: principal.role, // Set current role
    });
    setShowEditModal(true);
  };

  // Handle Update Principal (including role change)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updateData = {
        name: formData.name,
        email: formData.email,
        role: formData.role, // Include role in update
      };
      
      if (formData.password) {
        updateData.password = formData.password;
      }

      await axios.put(
        `http://localhost:5000/api/admin/updateStaff/${editingPrincipal._id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      showMessage("success", "✅ Principal updated successfully!");
      setShowEditModal(false);
      resetForm();
      fetchPrincipals();
    } catch (error) {
      showMessage("error", "❌ Failed to update principal");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this principal?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/deleteStaff/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMessage("success", "🗑️ Principal deleted successfully!");
      fetchPrincipals();
    } catch (error) {
      showMessage("error", "❌ Failed to delete principal");
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "principal",
    });
    setEditingPrincipal(null);
  };

  const filteredPrincipals = principals.filter(principal =>
    principal.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    principal.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    const colors = {
      principal: "bg-blue-100 text-blue-700",
      vicePrincipal: "bg-teal-100 text-teal-700",
      management: "bg-purple-100 text-purple-700",
      teacher: "bg-indigo-100 text-indigo-700",
      student: "bg-pink-100 text-pink-700",
    };
    return colors[role] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl px-6 py-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Shield className="h-8 w-8" />
              Principal Management
            </h1>
            <p className="text-blue-100 text-sm mt-2">
              Manage school principals • Total: {principals.length}
            </p>
          </div>
        </div>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div
          className={`p-4 rounded-xl text-center font-medium animate-fade-in ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Principals Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
          </div>
        ) : filteredPrincipals.length === 0 ? (
          <div className="text-center py-20">
            <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No principals found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Created At</th>
                  <th className="px-6 py-4 text-center text-sm font-bold uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrincipals.map((principal, index) => (
                  <tr
                    key={principal._id}
                    className={`border-b hover:bg-blue-50 transition-all ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                          {principal.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{principal.name}</p>
                          <p className="text-xs text-gray-500">ID: {principal._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{principal.email}</span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className={`${getRoleBadgeColor(principal.role)} px-3 py-1 rounded-full text-xs font-semibold uppercase`}>
                        {principal.role === "vicePrincipal" ? "Vice Principal" : principal.role}
                      </span>
                    </td>

                    {/* Created At */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {new Date(principal.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(principal)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all shadow-md"
                          title="Edit Principal"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(principal._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all shadow-md"
                          title="Delete Principal"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-2xl w-full max-w-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Pencil className="h-6 w-6 text-blue-600" />
                Edit Principal
              </h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter principal name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter email address"
                />
              </div>

              {/* Role Change - NEW FEATURE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Change Role *
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {availableRoles.map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  ⓘ Changing role will move this user to a different category
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password (leave blank to keep current)
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter new password or leave blank"
                />
                <p className="text-xs text-gray-500 mt-1">
                  ⓘ Only fill this if you want to change the password
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all shadow-md flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Update Principal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrincipalManagement;
