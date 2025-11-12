import React, { useEffect, useState } from "react";

const About = () => {
  const [school, setSchool] = useState({ schoolName: "My School" });

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/get-school");
        const data = await res.json();
        if (data?.school) setSchool(data.school);
      } catch (error) {
        console.error("Error fetching school:", error);
      }
    };
    fetchSchool();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 text-gray-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-700">About Our School</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            {school.schoolName}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 md:p-12 border border-purple-100/50 relative overflow-hidden">
          {/* Decorative gradient top bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500"></div>
          
          {/* Background gradient effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="relative z-10 space-y-8">
            <p className="text-xl leading-relaxed text-gray-700 text-center font-medium">
              Welcome to <span className="font-bold text-purple-700">{school.schoolName}</span> — where education meets inspiration.
              We are dedicated to fostering academic excellence and holistic development among our students.
            </p>

            <div className="space-y-6 text-gray-700">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100/50">
                <p className="text-lg leading-relaxed">
                  Since our founding, we have been committed to providing quality education, modern facilities,
                  and a nurturing environment that helps each student achieve their full potential.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50">
                <p className="text-lg leading-relaxed">
                  Our teachers are passionate about creating an engaging and inclusive learning atmosphere
                  that prepares students for the challenges of tomorrow.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100/50">
                <p className="text-lg leading-relaxed">
                  At <span className="font-semibold text-purple-700">{school.schoolName}</span>, we believe education is not only about learning facts but also
                  developing values, curiosity, and confidence to make a positive impact on society.
                </p>
              </div>
            </div>

            {/* Mission Values Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: '🎯', title: 'Our Mission', desc: 'Excellence in Education' },
                { icon: '💡', title: 'Our Vision', desc: 'Shaping Future Leaders' },
                { icon: '❤️', title: 'Our Values', desc: 'Integrity & Excellence' },
              ].map((item, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100/50 hover:shadow-lg transition-all">
                  <span className="text-4xl mb-3 block">{item.icon}</span>
                  <h3 className="font-bold text-purple-700 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
