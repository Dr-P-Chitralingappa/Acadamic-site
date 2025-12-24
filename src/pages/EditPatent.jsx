import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function EditPatent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    patent_number: "",
    year: "",
    status: "",
    link: "", // ✅ NEW
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatent();
    // eslint-disable-next-line
  }, []);

  const fetchPatent = async () => {
    const { data, error } = await supabase
      .from("patents")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Fetch error:", error);
      alert("Failed to load patent");
      navigate("/admin/patents");
      return;
    }

    setForm({
      title: data.title || "",
      patent_number: data.patent_number || "",
      year: data.year || "",
      status: data.status || "",
      link: data.link || "", // ✅ NEW
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
      .from("patents")
      .update({
        title: form.title.trim(),
        patent_number: form.patent_number.trim(),
        year: form.year ? Number(form.year) : null,
        status: form.status || null,
        link: form.link.trim() || null, // ✅ NEW
      })
      .eq("id", id);

    if (error) {
      console.error("Update error:", error);
      alert("Failed to update patent");
      return;
    }

    alert("Patent updated successfully!");
    navigate("/admin/patents");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
        <p className="text-slate-400">Loading patent details…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 flex justify-center px-6 py-12">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Edit Patent
          </h1>
          <p className="mt-2 text-slate-400">
            Update patent details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TITLE */}
          <div>
            <label className="block text-slate-300 mb-1">
              Patent Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* PATENT NUMBER */}
          <div>
            <label className="block text-slate-300 mb-1">
              Patent Number <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="patent_number"
              value={form.patent_number}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* YEAR + STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="Year"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white focus:ring-2 focus:ring-purple-500"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Status</option>
              <option value="Filed">Filed</option>
              <option value="Published">Published</option>
              <option value="Granted">Granted</option>
            </select>
          </div>

          {/* 🔗 LINK (NEW) */}
          <div>
            <label className="block text-slate-300 mb-1">
              Patent Link
            </label>
            <input
              type="url"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://patentoffice.gov.in/..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/patents")}
              className="px-6 py-3 rounded-xl bg-slate-700/50 text-white hover:bg-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition"
            >
              Update Patent
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
