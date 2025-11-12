import React, { useEffect, useState } from "react";

const Footer = () => {
  const [school, setSchool] = useState({ schoolName: "My School", academicSession: "" });

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/get-school");
        const data = await res.json();
        if (data?.school) {
          setSchool({
            schoolName: data.school.schoolName,
            academicSession: data.school.academicSession,
          });
        }
      } catch (error) {
        console.error("Error fetching school:", error);
      }
    };
    fetchSchool();
  }, []);

  return (
    <footer className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white py-8 mt-20 border-t border-purple-700/50 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏫</span>
            <p className="text-sm font-medium">
              © {new Date().getFullYear()} <span className="font-bold text-purple-200">{school.schoolName}</span>. All Rights Reserved.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <p className="text-sm">
              Academic Session: <span className="font-semibold text-purple-200">{school.academicSession}</span>
            </p>
            <div className="h-4 w-px bg-purple-600"></div>
            <p className="text-xs text-purple-300">
              Made with ❤️ for Education
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
