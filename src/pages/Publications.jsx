import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Publications() {
  const location = useLocation();

  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Determine type from URL
  const isJournalPage = location.pathname.includes("/journals");
  const isConferencePage = location.pathname.includes("/conferences");

  const pageTitle = isJournalPage
    ? "Journal Publications"
    : isConferencePage
    ? "Conference Publications"
    : "Publications";

  useEffect(() => {
    fetchPublications();
    // eslint-disable-next-line
  }, [location.pathname]);

  const fetchPublications = async () => {
    setLoading(true);

    let query = supabase
      .from("publications")
      .select("*")
      .order("year", { ascending: false });

    // ✅ Apply filter ONLY when needed
    if (isJournalPage) {
      query = query.eq("type", "journal");
    } else if (isConferencePage) {
      query = query.eq("type", "conference");
    }

    const { data, error } = await query;

    if (!error) {
      setPublications(data || []);
    } else {
      console.error(error);
      setPublications([]);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 flex items-center justify-center text-slate-400">
        Loading publications…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-16">
      <div className="max-w-7xl mx-auto">

        <h1
          className="text-4xl font-extrabold mb-8
          bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
          bg-clip-text text-transparent"
        >
          {pageTitle}
        </h1>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-sm text-slate-300">

              <thead className="bg-white/10 text-slate-200 uppercase text-xs tracking-wider">
                <tr align="center">
                  <th className="px-6 py-4 w-16 text-left">S.No.</th>
                  <th className="px-6 py-4 w-[26rem] text-left">Title</th>
                  <th className="px-6 py-4 w-52 text-left">Publisher</th>
                  <th className="px-6 py-4 w-20 text-left">Year</th>
                  <th className="px-6 py-4 w-60 text-left">DOI</th>
                  <th className="px-6 py-4 w-40 text-left">ISSN / ISBN</th>
                  <th className="px-6 py-4 w-28 text-center">Link</th>
                </tr>
              </thead>

              <tbody>
                {publications.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      No publications available
                    </td>
                  </tr>
                )}

                {publications.map((pub, index) => (
                  <tr
                    key={pub.id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-200">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium text-white leading-snug break-words">
                        {pub.title}
                      </p>
                    </td>

                    <td className="px-6 py-4 break-words">
                      {pub.publisher || "—"}
                    </td>

                    <td className="px-6 py-4">
                      {pub.year || "—"}
                    </td>

                    <td className="px-6 py-4 break-all">
                      {pub.doi ? (
                        <a
                          href={
                            pub.doi.startsWith("http")
                              ? pub.doi
                              : `https://doi.org/${pub.doi}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-300 hover:text-indigo-400 underline underline-offset-2"
                        >
                          {pub.doi}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td className="px-6 py-4 break-all">
                      {pub.issn_isbn || "—"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {pub.link ? (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center
                                     px-4 py-2 rounded-lg
                                     bg-gradient-to-r from-indigo-500 to-purple-500
                                     text-white text-xs font-semibold
                                     hover:scale-105 transition"
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
      </div>
         <footer className="border-t border-white/10 mt-20 py-6 text-center text-slate-500 text-sm">
  © {new Date().getFullYear()} Dr. P. Chitralingappa · {pageTitle}
</footer>


    </div>
  );
}
