import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AddPatent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    patent_number: "",
    year: "",
    status: "",
    link: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("patents").insert([
      {
        title: form.title.trim(),
        patent_number: form.patent_number.trim(),
        year: form.year ? Number(form.year) : null,
        status: form.status,
        link: form.link.trim() || null,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Failed to add patent");
      return;
    }

    alert("Patent added successfully");
    navigate("/admin/patents");
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-8 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent mb-6">
          Add Patent
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Patent Title"
            required
            className={inputClass}
          />

          <input
            name="patent_number"
            value={form.patent_number}
            onChange={handleChange}
            placeholder="Patent Number"
            required
            className={inputClass}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="Year"
              className={inputClass}
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Status</option>
              <option value="Filed">Filed</option>
              <option value="Published">Published</option>
              <option value="Granted">Granted</option>
            </select>
          </div>

          <input
            type="url"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="Patent document / official link"
            className={inputClass}
          />

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/patents")}
              className="px-6 py-3 rounded-xl bg-slate-700/50 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-semibold hover:scale-105 transition"
            >
              Save Patent
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
