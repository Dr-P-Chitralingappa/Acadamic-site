import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-8">
      
      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Manage publications, patents, and books of the academic portfolio
          </p>
        </div>

        {/* <button
          onClick={logout}
          className="mt-6 md:mt-0 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-lg hover:scale-105 transition-all"
        >
          Logout
        </button> */}
      </div>

      {/* ===== QUICK ACTION CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        
        {/* Publications */}
        <div className="group bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-indigo-500/30 transition-all">
          <h2 className="text-2xl font-bold text-indigo-300 mb-3">
            Publications
          </h2>
          <p className="text-slate-300 mb-6">
            Add and manage research papers, journals, and conference articles.
          </p>
          <button
            onClick={() => navigate("/admin/publications/add")}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:scale-[1.03] transition-all"
          >
            + Add Publication
          </button>
        </div>

        {/* Patents */}
        <div className="group bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-purple-500/30 transition-all">
          <h2 className="text-2xl font-bold text-purple-300 mb-3">
            Patents
          </h2>
          <p className="text-slate-300 mb-6">
            Manage intellectual property, innovations, and patent records.
          </p>
          <button
            onClick={() => navigate("/admin/patents/add")}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:scale-[1.03] transition-all"
          >
            + Add Patent
          </button>
        </div>

        {/* Books */}
        <div className="group bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-pink-500/30 transition-all">
          <h2 className="text-2xl font-bold text-pink-300 mb-3">
            Books
          </h2>
          <p className="text-slate-300 mb-6">
            Add authored or edited academic books and chapters.
          </p>
          <button
            onClick={() => navigate("/admin/books/add")}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold hover:scale-[1.03] transition-all"
          >
            + Add Book
          </button>
        </div>
      </div>

      {/* ===== INFO SECTION ===== */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h3 className="text-3xl font-bold text-white mb-4">
          Dashboard Overview
        </h3>
        <p className="text-slate-300 text-lg leading-relaxed">
          This admin dashboard allows you to securely manage all academic
          records including publications, patents, and books. Any updates made
          here will automatically reflect on the public academic portfolio.
        </p>
        <p className="text-slate-400 mt-4">
          Please ensure accuracy and authenticity while editing records, as
          this information represents official academic contributions.
        </p>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="mt-10 text-center text-slate-500">
        © {new Date().getFullYear()} Academic Portfolio Admin Panel
      </div>

    </div>
  );
}
