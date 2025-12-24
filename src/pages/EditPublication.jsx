import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function EditPublication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "journal", // ✅ NEW
    title: "",
    publisher: "",
    year: "",
    doi: "",
    issn_isbn: "",
    link: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublication();
    // eslint-disable-next-line
  }, []);

  const fetchPublication = async () => {
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      alert("Failed to load publication");
      navigate("/admin/publications");
      return;
    }

    setForm({
      type: data.type || "journal", // ✅ NEW
      title: data.title || "",
      publisher: data.publisher || "",
      year: data.year || "",
      doi: data.doi || "",
      issn_isbn: data.issn_isbn || "",
      link: data.link || "",
    });

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("publications")
      .update({
        type: form.type, // ✅ NEW
        title: form.title.trim(),
        publisher: form.publisher.trim(),
        year: form.year ? Number(form.year) : null,
        doi: form.doi.trim() || null,
        issn_isbn: form.issn_isbn.trim() || null,
        link: form.link.trim() || null,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to update publication");
      return;
    }

    alert("Publication updated successfully!");
    navigate("/admin/publications");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
        <p className="text-slate-400">Loading publication details…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 flex justify-center px-6 py-12">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Edit Publication
          </h1>
          <p className="mt-2 text-slate-400">
            Update publication details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TYPE */}
          <div>
            <label className="block text-slate-300 mb-1">
              Publication Type <span className="text-red-400">*</span>
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900/70
                         border border-white/10 text-white
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="journal">Journal</option>
              <option value="conference">Conference</option>
            </select>
          </div>

          {/* TITLE */}
          <div>
            <label className="block text-slate-300 mb-1">
              Publication Title <span className="text-red-400">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Publication title"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/70
                         border border-white/10 text-white
                         placeholder-slate-500 focus:outline-none
                         focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* PUBLISHER */}
          <div>
            <label className="block text-slate-300 mb-1">
              Publisher / Journal <span className="text-red-400">*</span>
            </label>
            <input
              name="publisher"
              value={form.publisher}
              onChange={handleChange}
              required
              placeholder="Publisher or journal name"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/70
                         border border-white/10 text-white
                         placeholder-slate-500 focus:outline-none
                         focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* YEAR + ISSN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-300 mb-1">Year</label>
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="2024"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/70
                           border border-white/10 text-white
                           placeholder-slate-500 focus:outline-none
                           focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">ISSN / ISBN</label>
              <input
                name="issn_isbn"
                value={form.issn_isbn}
                onChange={handleChange}
                placeholder="ISSN or ISBN"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/70
                           border border-white/10 text-white
                           placeholder-slate-500 focus:outline-none
                           focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* DOI */}
          <div>
            <label className="block text-slate-300 mb-1">DOI</label>
            <input
              name="doi"
              value={form.doi}
              onChange={handleChange}
              placeholder="Digital Object Identifier"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/70
                         border border-white/10 text-white
                         placeholder-slate-500 focus:outline-none
                         focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* LINK */}
          <div>
            <label className="block text-slate-300 mb-1">
              Publication Link
            </label>
            <input
              type="url"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://journal.org/article or PDF link"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/70
                         border border-white/10 text-white
                         placeholder-slate-500 focus:outline-none
                         focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/publications")}
              className="px-6 py-3 rounded-xl bg-slate-700/50 text-white hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                         text-white font-semibold shadow-lg hover:scale-105 transition-all"
            >
              Update Publication
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
