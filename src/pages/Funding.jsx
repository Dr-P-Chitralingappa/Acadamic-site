export default function Funding() {
  const projects = [
    {
      title:
        "Next-Gen Classrooms: AR & VR Revolution for Advancing Cognitive Skills",
      agency: "NCSTC Division (DST)",
      year: "Ongoing",
      role: "Principal Investigator",
      description:
        "Next-Gen Classrooms AR & VR Revolution for Advancing Cognitive Skills under NCSTC Division, Reference No: TPN/113833 on 31-03-2024. (Project Cost: Rs. 35,44,000/-).",
    },
    {
      title:
        "A Cognitive Psychology–Inspired Dual-System Reasoning Framework for Safe and Adaptive Decision-Making in Autonomous Vehicles",
      agency:
        "ANRF – MAHA: AISE (Anusandhan National Research Foundation – Mission for Advancement in High-Impact Areas: Artificial Intelligence for Science & Engineering)",
      year: "Ongoing",
      role: "Co-Investigator",
      description:
        "A Cognitive Psychology–Inspired Dual-System Reasoning Framework for Safe and Adaptive Decision-Making in Autonomous Vehicles under ANRF – MAHA: AISE. (Project Cost: Rs. 1 Crore).",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Funded Research Projects
        </h1>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg"
>
              <h2 className="text-xl font-bold text-indigo-300">
                {project.title}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                <strong>Funding Agency:</strong> {project.agency}
              </p>

              <p className="text-sm text-slate-400">
                <strong>Status / Date:</strong> {project.year}
              </p>

              <p className="text-sm text-slate-400">
                <strong>Role:</strong> {project.role}
              </p>

              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <footer className="border-t border-white/10 mt-20 py-6 text-center text-slate-500 text-sm">
  © {new Date().getFullYear()} Dr. P. Chitralingappa · Funded Research Projects
</footer>

    </div>
  );
}
