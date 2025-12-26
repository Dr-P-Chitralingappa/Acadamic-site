import React from "react";

export default function Teaching() {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white min-h-screen">

      {/* ================= HEADER ================= */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold
          bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
          bg-clip-text text-transparent">
          Teaching
        </h1>

        <p className="mt-4 text-slate-400 max-w-2xl">
          Courses taught, academic expertise, and detailed syllabus for Full Stack AI Development.
        </p>
      </section>

      {/* ================= COURSES TAUGHT ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-indigo-300 mb-6">
          Courses Taught
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Java Programming",
            "Python Programming",
            "Android Application Development",
            "Computer Networks",
            "Wireless Sensor Networks",
            "Artificial Intelligence",
            "Machine Learning",
            "Deep Learning",
            "Full Stack AI Development",
          ].map((course, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-xl border border-white/10
              rounded-xl px-4 py-3 shadow hover:scale-[1.03] transition-all"
            >
              <span className="text-slate-200 text-sm font-medium">
                {course}
              </span>
            </div>
          ))}
        </div>
      </section>


      {/* ================= FOOTER ================= */}
       <footer className="border-t border-white/10 py-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Dr. P. Chitralingappa · Academic Portfolio
      </footer>
    </div>
  );
}
