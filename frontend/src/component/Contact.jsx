// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Contact = () => {
//   const [school, setSchool] = useState({
//     schoolName: "My School",
//     address: "123, Default Street",
//     email: "info@myschool.com",
//     phone: "+91 99999 99999",
//   });

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState("");

//   // ✅ Fetch school details
//   useEffect(() => {
//     const fetchSchool = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:5000/api/admin/get-school");
//         if (data?.school) setSchool(data.school);
//       } catch (error) {
//         console.error("Error fetching school:", error);
//       }
//     };
//     fetchSchool();
//   }, []);

//   // ✅ Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatus("");

//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/api/admin/getInTouchContact",
//         formData
//       );
//       setStatus(data.message || "Message sent successfully!");
//       setFormData({ name: "", email: "", message: "" });
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setStatus("Failed to send message. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800 py-20 px-6 relative overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative z-10 max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-6">
//             <span className="text-sm font-semibold text-purple-700">Get in Touch</span>
//           </div>
//           <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
//             Contact Us
//           </h1>
//           <p className="text-xl text-gray-600">{school.schoolName}</p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Contact Information Card */}
//           <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-purple-100/50 relative overflow-hidden">
//             <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
//             <div className="relative z-10">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
//                 <span className="text-3xl">📞</span>
//                 <span>Contact Information</span>
//               </h2>
              
//               <div className="space-y-6">
//                 {[
//                   { icon: '📍', label: 'Address', value: school.address || "Not available", color: 'from-blue-500 to-cyan-500' },
//                   { icon: '📧', label: 'Email', value: school.email || "Not available", color: 'from-purple-500 to-pink-500' },
//                   { icon: '📞', label: 'Phone', value: school.phone || "Not available", color: 'from-indigo-500 to-purple-500' },
//                 ].map((contact, index) => (
//                   <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-purple-50/30 border border-purple-100/50 hover:shadow-md transition-all">
//                     <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
//                       <span className="text-2xl">{contact.icon}</span>
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm font-semibold text-gray-600 mb-1">{contact.label}</p>
//                       <p className="text-gray-800 font-medium">{contact.value}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Contact Form Card */}
//           <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-purple-100/50 relative overflow-hidden">
//             <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500"></div>
//             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
//             <div className="relative z-10">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
//                 <span className="text-3xl">✉️</span>
//                 <span>Send Message</span>
//               </h2>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Your Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Enter your name"
//                     required
//                     className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Your Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email"
//                     required
//                     className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Your Message
//                   </label>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     placeholder="Enter your message"
//                     rows="4"
//                     required
//                     className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white/50 backdrop-blur-sm resize-none"
//                   ></textarea>
//                 </div>
                
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transform ${
//                     loading ? "opacity-60 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center">
//                       <span className="animate-spin mr-2">⏳</span>
//                       Sending...
//                     </span>
//                   ) : (
//                     "Send Message"
//                   )}
//                 </button>
//               </form>

//               {status && (
//                 <div
//                   className={`mt-6 p-4 rounded-xl text-center text-sm font-medium ${
//                     status.toLowerCase().includes("success") || status.toLowerCase().includes("successfully")
//                       ? "bg-green-50 text-green-700 border border-green-200"
//                       : "bg-red-50 text-red-700 border border-red-200"
//                   }`}
//                 >
//                   {status}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;
import React, { useEffect, useState } from "react";
import axios from "axios";

const Contact = () => {
  const [school, setSchool] = useState({
    schoolName: "My School",
    address: "123, Default Street",
    email: "info@myschool.com",
    phone: "+91 99999 99999",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [latestContact, setLatestContact] = useState(null);
  const [contactLoading, setContactLoading] = useState(true);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/get-school");
        if (data?.school) setSchool(data.school);
      } catch (error) {
        console.error("Error fetching school:", error);
      }
    };
    fetchSchool();
  }, []);

  useEffect(() => {
    const fetchLatestContact = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/admin/getInTouchContactLatest"
        );
        
        if (data?.success && data?.data) {
          setLatestContact(data.data);
        }
      } catch (error) {
        console.error("Error fetching latest contact:", error);
      } finally {
        setContactLoading(false);
      }
    };
    
    fetchLatestContact();
  }, [status]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/getInTouchContact",
        formData
      );
      setStatus(data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800 py-20 px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-700">Get in Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600">{school.schoolName}</p>
        </div>

        {/* ✅ Changed to 3-column grid: Contact Info | Send Message | Latest Message */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information Card */}
          <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-purple-100/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <span className="text-3xl">📞</span>
                <span>Contact Info</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  { icon: '📍', label: 'Address', value: school.address || "Not available", color: 'from-blue-500 to-cyan-500' },
                  { icon: '📧', label: 'Email', value: school.email || "Not available", color: 'from-purple-500 to-pink-500' },
                  { icon: '📞', label: 'Phone', value: school.phone || "Not available", color: 'from-indigo-500 to-purple-500' },
                ].map((contact, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-purple-50/30 border border-purple-100/50 hover:shadow-md transition-all">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <span className="text-2xl">{contact.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 mb-1">{contact.label}</p>
                      <p className="text-gray-800 font-medium text-sm">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-purple-100/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <span className="text-3xl">✉️</span>
                <span>Send Message</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white/50 backdrop-blur-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white/50 backdrop-blur-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    rows="4"
                    required
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white/50 backdrop-blur-sm resize-none"
                  ></textarea>
                </div>
                
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
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>

              {status && (
                <div
                  className={`mt-6 p-4 rounded-xl text-center text-sm font-medium ${
                    status.toLowerCase().includes("success") || status.toLowerCase().includes("successfully")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {status}
                </div>
              )}
            </div>
          </div>

          {/* ✅ Latest Contact Message Box - Compact Size, Right Side */}
          <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-6 border border-purple-100/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500"></div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <span className="text-2xl">💬</span>
                <span>Latest Message</span>
              </h2>

              {contactLoading ? (
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-600">Loading...</p>
                </div>
              ) : !latestContact ? (
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <p className="text-sm text-yellow-700">No messages yet</p>
                </div>
              ) : (
                <div className="space-y-3 bg-gradient-to-br from-gray-50 to-purple-50/30 p-4 rounded-xl border border-purple-100/50">
                  {/* Name */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {latestContact.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-600">Name</p>
                      <p className="text-gray-800 font-medium text-sm truncate">{latestContact.name}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Email</p>
                    <p className="text-gray-800 text-sm truncate">{latestContact.email}</p>
                  </div>

                  {/* Message */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Message</p>
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">{latestContact.message}</p>
                  </div>

                  {/* Timestamp */}
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      {new Date(latestContact.createdAt).toLocaleString('en-IN', {
                        dateStyle: 'short',
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
