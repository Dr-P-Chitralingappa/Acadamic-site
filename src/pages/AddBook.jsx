import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AddBook() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    publisher: "",
    year: "",
    isbn: "",
    link: "", // ✅ NEW
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("books").insert([
      {
        title: form.title.trim(),
        publisher: form.publisher.trim(),
        year: form.year ? Number(form.year) : null,
        isbn: form.isbn.trim() || null,
        link: form.link.trim() || null, // ✅ NEW
      },
    ]);

    if (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book");
      return;
    }

    alert("Book added successfully!");
    navigate("/admin/books");
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 min-h-[calc(100vh-64px)] p-6 flex justify-center">

      {/* CARD */}
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Add New Book
          </h1>
          <p className="text-slate-400 mt-2">
            Enter book publication details
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TITLE */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Book Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Enter book title"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* PUBLISHER */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Publisher
            </label>
            <input
              type="text"
              name="publisher"
              value={form.publisher}
              onChange={handleChange}
              required
              placeholder="Enter publisher name"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* YEAR */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Publication Year
            </label>
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              required
              placeholder="e.g. 2024"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* ISBN */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              ISBN (optional)
            </label>
            <input
              type="text"
              name="isbn"
              value={form.isbn}
              onChange={handleChange}
              placeholder="978-XXXXXXXXXX"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* 🔗 BOOK LINK (NEW) */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Book Link
            </label>
            <input
              type="url"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="Publisher page / Google Books / PDF link"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/books")}
              className="px-6 py-3 rounded-xl border border-white/20 text-slate-300 hover:bg-white/10 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-all"
            >
              Save Book
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
