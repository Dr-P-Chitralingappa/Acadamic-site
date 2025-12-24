import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AddPublication() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    publisher: "",
    year: "",
    doi: "",
    issn_isbn: "",
    // pdf_url: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from("publications").insert([
        {
          title: form.title.trim(),
          publisher: form.publisher.trim(),
          year: form.year ? Number(form.year) : null,
          doi: form.doi.trim() || null,
          issn_isbn: form.issn_isbn.trim() || null,
          // pdf_url: form.pdf_url || null,
        },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        alert("Error adding publication");
        setSubmitting(false);
        return;
      }

      alert("Publication added successfully!");
      navigate("/admin/publications");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 flex justify-center px-6 py-12">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Add Publication
          </h1>
          <p className="mt-2 text-slate-400">
            Add a new journal or conference publication
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

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
              className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

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
              className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-300 mb-1">Year</label>
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="2024"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">ISSN / ISBN</label>
              <input
                name="issn_isbn"
                value={form.issn_isbn}
                onChange={handleChange}
                placeholder="ISSN or ISBN"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">DOI</label>
            <input
              name="doi"
              value={form.doi}
              onChange={handleChange}
              placeholder="Digital Object Identifier"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/*
            PDF upload intentionally disabled
            <input
              name="pdf_url"
              value={form.pdf_url}
              onChange={handleChange}
            />
          */}

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
              disabled={submitting}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-all disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Save Publication"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
