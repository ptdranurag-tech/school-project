// Component/ViewAllEmergencyDialog.jsx
import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

const ViewAllEmergencyDialog = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);
  const [editingNotice, setEditingNotice] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
    roles: [],
    expiryDate: "",
  });
  const [message, setMessage] = useState("");

  const fetchEmergencyNotices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/viewEmergencyNotice", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const sorted = res.data.TotalEmergencyNotice.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotices(sorted);
      } else {
        setError("No emergency notices found.");
      }
    } catch (err) {
      setError("Error fetching emergency notices.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchEmergencyNotices();
      setMessage("");
    }
  }, [isOpen]);

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setEditForm({
      title: notice.title,
      description: notice.description,
      category: notice.category,
      roles: notice.roles || [],
      expiryDate: notice.expiryDate ? notice.expiryDate.split("T")[0] : "",
    });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/updateEmergencyNotice/${editingNotice._id}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Notice updated successfully!");
      setEditingNotice(null);
      fetchEmergencyNotices();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("❌ Failed to update notice.");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/deleteEmergencyNotice/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("🗑️ Notice deleted successfully!");
      fetchEmergencyNotices();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("❌ Failed to delete notice.");
      console.error(err);
    }
  };

  return (
    <Transition show={isOpen}>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        {/* Dialog Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">📢 All Emergency Notice</h2>
                <button
                  onClick={onClose}
                  className="text-white text-2xl hover:bg-white/20 rounded px-2"
                >
                  ×
                </button>
              </div>
              {!loading && notices.length > 0 && (
                <p className="text-white/90 text-sm mt-1">
                  Total: {notices.length} notice{notices.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            {/* Message */}
            {message && (
              <div
                className={`px-6 py-2 text-center text-sm font-medium ${
                  message.includes("❌") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                }`}
              >
                {message}
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-auto p-6">
              {loading ? (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-rose-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading...</p>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-red-600 text-lg">{error}</p>
                </div>
              ) : notices.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-600">No notices found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-bold">
                          TITLE
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-bold">
                          CATEGORY
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-bold">
                          ROLES
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-bold">
                          EXPIRY
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-bold">
                          CREATED BY
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {notices.map((notice, index) => (
                        <tr key={notice._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 px-4 py-3">
                            <p className="font-semibold text-gray-800 text-sm">{notice.title}</p>
                            <p className="text-xs text-gray-600 mt-1">{notice.description}</p>
                          </td>
                          <td className="border border-gray-300 px-4 py-3">
                            <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                              {notice.category}
                            </span>
                          </td>
                          <td className="border border-gray-300 px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {notice.roles?.map((role, idx) => (
                                <span
                                  key={idx}
                                  className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded capitalize"
                                >
                                  {role}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            {notice.expiryDate
                              ? new Date(notice.expiryDate).toLocaleDateString("en-IN")
                              : "—"}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700 capitalize">
                            {notice.createdBy}
                          </td>
                          <td className="border border-gray-300 px-4 py-3">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleEdit(notice)}
                                className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-4 py-2 rounded"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(notice._id)}
                                className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded"
                              >
                                Delete
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

            {/* Footer */}
            <div className="bg-gray-100 px-6 py-4 rounded-b-xl border-t">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>

        {/* Edit Modal - FIXED: Won't close on input click */}
        {editingNotice && (
          <Transition show={true}>
            <Dialog
              open={true}
              onClose={() => setEditingNotice(null)}
              className="relative z-[60]"
            >
              {/* Backdrop */}
              <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

              {/* Modal Container with stopPropagation */}
              <div 
                className="fixed inset-0 flex items-center justify-center p-4"
                onClick={() => setEditingNotice(null)} // Close on backdrop click
              >
                <Dialog.Panel 
                  className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6"
                  onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
                >
                  <Dialog.Title className="text-xl font-bold mb-4 text-gray-800">
                    ✏️ Edit Notice
                  </Dialog.Title>

                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="">Select Category</option>
                        <option value="Weather Warning">Weather Warning</option>
                        <option value="School Rules Update">School Rules Update</option>
                        <option value="Emergency">Emergency</option>
                        <option value="Important">Important</option>
                        <option value="General">General</option>
                      </select>
                    </div>

                    {/* Expiry Date */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        value={editForm.expiryDate}
                        onChange={(e) => setEditForm({ ...editForm, expiryDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={() => setEditingNotice(null)}
                      className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium"
                    >
                      Update
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </Dialog>
          </Transition>
        )}
      </Dialog>
    </Transition>
  );
};

export default ViewAllEmergencyDialog;
