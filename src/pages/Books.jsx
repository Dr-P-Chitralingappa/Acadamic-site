import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("year", { ascending: false });

    if (!error) {
      setBooks(data || []);
    } else {
      console.error(error);
      setBooks([]);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 flex items-center justify-center text-slate-400">
        Loading books…
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
          Books
        </h1>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-sm text-slate-300">

              <thead className="bg-white/10 text-slate-200 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4 w-16 text-left">S.No.</th>
                  <th className="px-6 py-4 w-64 text-left">Title</th>
                  <th className="px-6 py-4 w-56 text-left">Publisher</th>
                  <th className="px-6 py-4 w-24 text-left">Year</th>
                  <th className="px-6 py-4 w-40 text-left">ISBN</th>
                  <th className="px-6 py-4 w-28 text-center">Link</th>
                </tr>
              </thead>

              <tbody>
                {books.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      No books available
                    </td>
                  </tr>
                )}

                {books.map((b, i) => (
                  <tr
                    key={b.id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-200">
                      {i + 1}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium text-white leading-snug break-words">
                        {b.title}
                      </p>
                    </td>

                    <td className="px-6 py-4 break-words">
                      {b.publisher || "—"}
                    </td>

                    <td className="px-6 py-4">
                      {b.year || "—"}
                    </td>

                    <td className="px-6 py-4 break-all">
                      {b.isbn || "—"}
                    </td>

                    {/* 🔗 LINK COLUMN */}
                    <td className="px-6 py-4 text-center">
                      {b.link ? (
                        <a
                          href={b.link}
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
  © {new Date().getFullYear()} Dr. P. Chitralingappa · Books
</footer>

    </div>
  );
}
