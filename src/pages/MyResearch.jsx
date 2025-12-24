export default function MyResearch() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-16 text-white">
      <div className="max-w-7xl mx-auto">

        {/* PAGE TITLE */}
        <h1
          className="text-4xl font-extrabold mb-8
          bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
          bg-clip-text text-transparent"
        >
          My Research
        </h1>

        {/* CONTENT CARD */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 space-y-10">

          {/* RESEARCH AREAS */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
              Research Areas
            </h2>

            <ul className="grid sm:grid-cols-2 gap-3 text-slate-300 list-disc list-inside">
              <li>Artificial Intelligence</li>
              <li>Machine Learning</li>
              <li>Internet of Things (IoT)</li>
              <li>Wireless Sensor Networks</li>
              <li>Network Security</li>
              <li>Drone Technologies</li>
            </ul>
          </section>

          {/* RESEARCH FOCUS */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
              Research Focus
            </h2>

            <p className="text-slate-300 leading-relaxed text-lg">
              My research focuses on designing intelligent, scalable, and secure
              systems using Artificial Intelligence and Machine Learning.
              I actively work on IoT-based applications, wireless communication
              systems, and AI-driven solutions that address real-world societal
              and industrial challenges.
            </p>
          </section>

          {/* ONGOING & FUNDED WORK */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
              Ongoing & Funded Work
            </h2>

            <p className="text-slate-300 leading-relaxed text-lg">
              I am actively involved in government and industry-funded research
              projects, interdisciplinary collaborations, mentoring
              undergraduate and postgraduate students, and publishing scholarly
              work in reputed national and international journals and
              conferences.
            </p>
          </section>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/10 mt-20 py-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Dr. P. Chitralingappa · My Research
      </footer>
    </div>
  );
}
