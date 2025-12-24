import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    const { data, error } = await supabase
      .from("users")
      .select("id, email")
      .eq("email", email)
      .eq("password_hash", password)
      .single();

    setLoading(false);

    if (error || !data) {
      setError("Invalid email or password");
      return;
    }

    // LOGIN SUCCESS
    localStorage.setItem("isAdmin", "true");
    localStorage.setItem("adminEmail", data.email);

    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 flex items-center justify-center px-4">

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-extrabold
            bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
            bg-clip-text text-transparent"
          >
            Admin Login
          </h1>
          <p className="text-slate-400 mt-2">
            Authorized access only
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 px-4 py-2 rounded-lg bg-red-500/20 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <div className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
              text-white placeholder-slate-400 focus:outline-none
              focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
              text-white placeholder-slate-400 focus:outline-none
              focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-6 py-3 rounded-xl font-semibold
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            text-white shadow-lg hover:scale-105 transition-all disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
