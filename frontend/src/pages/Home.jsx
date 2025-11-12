import React, { useEffect, useState } from "react";

const Home = () => {
  const [school, setSchool] = useState({ schoolName: "Loading...", academicSession: "" });

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 text-gray-800">
      {/* Hero Section with premium styling */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 px-6 bg-gradient-to-br from-purple-700 via-indigo-600 to-purple-800 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mt-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mb-48"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold tracking-wide drop-shadow-2xl mb-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
            {school.schoolName}
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-medium text-purple-100 mb-8">
            Academic Session: <span className="font-bold text-white">{school.academicSession}</span>
          </p>
          <button className="mt-8 bg-white text-purple-700 font-bold px-8 py-4 rounded-full shadow-2xl hover:bg-purple-50 hover:scale-110 transition-all duration-300 transform">
            Explore More →
          </button>
        </div>
      </section>

      {/* About Section with premium styling */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full mb-4">
            <span className="text-sm font-semibold text-purple-700">About Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to {school.schoolName}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            At <span className="font-semibold text-purple-700">{school.schoolName}</span>, we believe that education is not just about books — it's about
            nurturing minds, building confidence, and preparing future leaders. Our dedicated teachers
            and innovative learning programs create a strong foundation for every student's success.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            Join a legacy of excellence and discover a place where curiosity meets creativity,
            and learning is a joyful journey.
          </p>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <img
            src="https://img.freepik.com/free-vector/school-building-concept-illustration_114360-18745.jpg"
            alt="school"
            className="relative rounded-3xl shadow-2xl w-full transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* Highlights Section with premium cards */}
      <section className="bg-gradient-to-b from-white to-purple-50/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg">Discover what makes us special</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Experienced Teachers',
                description: 'Learn from passionate educators who inspire creativity and critical thinking.',
                icon: '👨‍🏫',
                gradient: 'from-purple-500 to-indigo-500',
                bgGradient: 'from-purple-50 to-indigo-50'
              },
              {
                title: 'Modern Classrooms',
                description: 'Our campus is equipped with modern facilities that enhance learning and comfort.',
                icon: '🏫',
                gradient: 'from-indigo-500 to-purple-500',
                bgGradient: 'from-indigo-50 to-purple-50'
              },
              {
                title: 'Holistic Learning',
                description: 'From academics to arts and sports — we focus on overall student growth.',
                icon: '🎓',
                gradient: 'from-purple-500 to-pink-500',
                bgGradient: 'from-purple-50 to-pink-50'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}>
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
