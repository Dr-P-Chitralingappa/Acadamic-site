import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AdminPatents() {
  const [patents, setPatents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatents();
  }, []);

  const fetchPatents = async () => {
    const { data, error } = await supabase
      .from("patents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching patents:", error);
      setPatents([]);
    } else {
      setPatents(data || []);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this patent?");
    if (!ok) return;

    const { error } = await supabase
      .from("patents")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      alert("Failed to delete patent");
    } else {
      setPatents((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-8">

      {/* ===== PAGE HEADER ===== */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Patents
          </h1>
          <p className="text-slate-400 mt-2">
            Manage intellectual property and patent records
          </p>
        </div>

        <Link to="/admin/patents/add">
          <button className="mt-4 md:mt-0 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold shadow-lg hover:scale-105 transition-all">
            + Add Patent
          </button>
        </Link>
      </div>

      {/* ===== TABLE CARD ===== */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-300">

            {/* TABLE HEAD */}
            <thead className="bg-white/10 text-slate-200 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Patent No</th>
                <th className="px-6 py-4">Year</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Link</th> {/* ✅ NEW */}
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {patents.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-slate-400">
                    No patents found
                  </td>
                </tr>
              )}

              {patents.map((p, i) => (
                <tr
                  key={p.id}
                  className="border-t border-white/10 hover:bg-white/5 transition-all"
                >
                  <td className="px-6 py-4 font-semibold text-slate-200">
                    {i + 1}
                  </td>

                  <td className="px-6 py-4 max-w-xs">
                    <p className="font-medium text-white truncate">
                      {p.title}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    {p.patent_number || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {p.year || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                      {p.status || "—"}
                    </span>
                  </td>

                  {/* 🔗 LINK COLUMN */}
                  <td className="px-6 py-4 text-center">
                    {p.link ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-semibold hover:bg-indigo-500/30 transition"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => navigate(`/admin/patents/edit/${p.id}`)}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-semibold hover:scale-105 transition-all"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-semibold hover:scale-105 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="mt-8 text-center text-slate-500 text-sm">
        Patent records maintained here will appear on the public academic profile.
      </div>
    </div>
  );
}
