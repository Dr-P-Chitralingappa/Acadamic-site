import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link, useNavigate } from "react-router-dom";

export default function AdminPublications() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching publications:", error);
      setData([]);
    } else {
      setData(data || []);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this publication?");
    if (!ok) return;

    const { error } = await supabase
      .from("publications")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      alert("Failed to delete publication");
    } else {
      setData((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-8">

      {/* ===== PAGE HEADER ===== */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Publications
          </h1>
          <p className="text-slate-400 mt-2">
            Manage all research publications displayed on the public website
          </p>
        </div>

        <Link to="/admin/publications/add">
          <button className="mt-4 md:mt-0 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-all">
            + Add Publication
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
                <th className="px-6 py-4">Publisher</th>
                <th className="px-6 py-4">Year</th>
                <th className="px-6 py-4">ISSN / ISBN</th>
                <th className="px-6 py-4 text-center">Link</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-slate-400">
                    No publications found
                  </td>
                </tr>
              )}

              {data.map((p, i) => (
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
                    {p.publisher || "—"}
                  </td>

                  <td className="px-6 py-4">
                    {p.year || "—"}
                  </td>

                  <td className="px-6 py-4">
                    {p.issn_isbn || "—"}
                  </td>

                  {/* 🔗 LINK COLUMN */}
                  <td className="px-6 py-4 text-center">
                    {p.link ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex px-4 py-2 rounded-lg
                                   bg-gradient-to-r from-indigo-500 to-purple-500
                                   text-white text-xs font-semibold
                                   hover:scale-105 transition-all"
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
                        onClick={() => navigate(`/admin/publications/edit/${p.id}`)}
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

      {/* ===== FOOTER NOTE ===== */}
      <div className="mt-8 text-center text-slate-500 text-sm">
        All changes here will be reflected on the public academic profile.
      </div>
    </div>
  );
}
