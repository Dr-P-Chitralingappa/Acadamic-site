import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Patents() {
  const [patents, setPatents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatents();
  }, []);

  const fetchPatents = async () => {
    try {
      const { data, error } = await supabase
        .from("patents")
        .select("*")
        .order("year", { ascending: false });

      if (error) throw error;
      setPatents(data || []);
    } catch (err) {
      console.error("Error fetching patents:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">

      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <h1
          className="text-4xl md:text-5xl font-extrabold
          bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
          bg-clip-text text-transparent"
        >
          Patents
        </h1>

        <p className="mt-4 text-slate-400 max-w-2xl">
          List of published and granted patents highlighting research and innovation contributions.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">

        {loading && (
          <div className="text-slate-400">Loading patents...</div>
        )}

        {!loading && patents.length === 0 && (
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-slate-400">
            No patents available yet.
          </div>
        )}

        {!loading && patents.length > 0 && (
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg overflow-hidden">

            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-sm text-slate-300">

                <thead className="bg-white/10 text-slate-200 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4 w-16 text-left">S.No</th>
                    <th className="px-6 py-4 w-72 text-left">Title</th>
                    <th className="px-6 py-4 w-40 text-left">Patent No</th>
                    <th className="px-6 py-4 w-24 text-left">Year</th>
                    <th className="px-6 py-4 w-32 text-left">Status</th>
                    <th className="px-6 py-4 w-28 text-center">Link</th> {/* ✅ NEW */}
                  </tr>
                </thead>

                <tbody>
                  {patents.map((p, index) => (
                    <tr
                      key={p.id}
                      className="border-t border-white/10 hover:bg-white/5 transition"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-200">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-medium text-indigo-200 leading-snug break-words">
                          {p.title}
                        </p>
                      </td>

                      <td className="px-6 py-4 break-all">
                        {p.patent_number || "—"}
                      </td>

                      <td className="px-6 py-4">
                        {p.year || "—"}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs bg-indigo-500/20 text-indigo-300">
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
                            className="
                              inline-block px-4 py-1 rounded-lg
                              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                              text-white text-xs font-semibold
                              hover:scale-105 transition-all
                            "
                          >
                            View
                          </a>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        )}
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Dr. P. Chitralingappa · Patents
      </footer>
    </div>
  );
}
