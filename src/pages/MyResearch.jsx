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

          {/* RESEARCH FOCUS */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
              Ph.D. Research
            </h2>

            <p className="text-slate-300 leading-relaxed text-lg">
              <b>Title: Development of Competitive Approaches to Secure Data Transmission and 
              Elongate the Lifetime of Wireless Sensor Networks.</b>
              <br></br>
              The objective of my Ph.D. research is to increase network lifetime and 
              reduce energy consumption through efficient cluster head selection, while 
              enabling secure and reliable data transmission without affecting energy efficiency.<br></br>

              <b>The proposed Protocols:</b><br></br>
              
              The first protocol, <b>EECFP-FL</b>, uses fuzzy logic–based decision making for intelligent 
              cluster head selection, ensuring balanced clustering and optimal utilization of 
              residual energy to extend network lifetime. <br></br>
              
              The second protocol, <b>EECP-SDT</b>, builds upon the energy-efficient clustering framework 
              by incorporating secure data transmission mechanisms, enabling reliable and secure 
              communication without compromising energy efficiency.
            </p>
          </section>

          {/* RESEARCH AREAS */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
              Research Areas
            </h2>

            <ul className="grid sm:grid-cols-2 gap-3 text-slate-300 list-disc list-inside">
              <li>Wireless Sensor Networks</li>
              <li>Internet of Things (IoT)</li>
              <li>Network Security</li>
              <li>Artificial Intelligence</li>
              <li>Machine Learning</li>
              <li>Drone Technologies</li>
            </ul>
          </section>

          

          {/* ONGOING & FUNDED WORK 
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
          </section>*/}

        </div>
      </div>

      {/* FOOTER */}
  <footer className="border-t border-white/10 py-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Dr. P. Chitralingappa · Academic Portfolio
      </footer>
    </div>
  );
}
