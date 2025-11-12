import React, { useState } from "react";
import axios from "axios";
import ContactTable from "../Component/ContactTable";
import CreateEventsDialog from "../Dialogs/CreateEventsDialog";
import ViewEventsDialog from "../Dialogs/ViewEventsDialog";
import EmergencyNoticeDialog from "../Dialogs/EmergencyNoticeDialog";
const School = () => {
  const [formData, setFormData] = useState({
    schoolName: "",
    academicSession: "",
    address: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);
  const handleOpen = (type) => setOpenDialog(type);
  const handleClose = () => setOpenDialog(null);

  const boxes = [
    {
      title: "Create Events",
      color: "from-purple-500 to-indigo-500",
      icon: "📅",
    },
    {
      title: "View Events",
      color: "from-green-500 to-emerald-500",
      icon: "👀",
    },
    {
      title: "Emergency Notice",
      color: "from-red-500 to-pink-500",
      icon: "🚨",
    },
  ];

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/admin/update-school",
        formData
      );

      setMessage({
        type: "success",
        text: data.message || "School updated successfully!",
      });
      setFormData({
        schoolName: "",
        academicSession: "",
        address: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to update school. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
  {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-100/50 mb-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">
          🏫 School Management
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your school details, academic sessions, and contact info here.
        </p>

        {/* 3 Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {boxes.map((box) => (
            <div
              key={box.title}
              onClick={() => handleOpen(box.title)}
              className={`cursor-pointer bg-gradient-to-r ${box.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center`}
            >
              <div className="text-4xl mb-3">{box.icon}</div>
              <h2 className="text-lg font-semibold tracking-wide">{box.title}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog Components */}
      {openDialog === "Create Events" && (
        <CreateEventsDialog onClose={handleClose} />
      )}
      {openDialog === "View Events" && (
        <ViewEventsDialog onClose={handleClose} />
      )}
      {openDialog === "Emergency Notice" && (
        <EmergencyNoticeDialog onClose={handleClose} />
      )}

      {/* Main Form */}
      <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-10 shadow-2xl border border-purple-100/50 overflow-hidden">
        {/* Gradient Top Line */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl -mr-32 -mt-32"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            ✨ Update School Details
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              { label: "School Name", name: "schoolName", type: "text" },
              { label: "Academic Session", name: "academicSession", type: "text" },
              { label: "Address", name: "address", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "text" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label}`}
                  className="p-3 rounded-xl border border-purple-100 focus:ring-2 focus:ring-purple-400 outline-none bg-white/70 shadow-inner text-gray-800"
                  required
                />
              </div>
            ))}

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-105 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Updating..." : "Update School"}
              </button>
            </div>
          </form>

          {message && (
            <div
              className={`mt-6 p-4 rounded-xl font-medium text-center ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
      <ContactTable/>
    </>
  );
};

export default School;
