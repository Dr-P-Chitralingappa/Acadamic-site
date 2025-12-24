import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const linkClass = (path) =>
    `relative px-3 py-2 rounded-lg text-sm font-medium transition-all
     ${
       location.pathname.startsWith(path)
         ? "text-white bg-white/10"
         : "text-slate-300 hover:text-white hover:bg-white/5"
     }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* LEFT: ADMIN LINKS */}
        <div className="flex items-center gap-2">
          <Link to="/admin/publications" className={linkClass("/admin/publications")}>
            Publications
          </Link>
          <Link to="/admin/patents" className={linkClass("/admin/patents")}>
            Patents
          </Link>
          <Link to="/admin/books" className={linkClass("/admin/books")}>
            Books
          </Link>
        </div>

        {/* RIGHT: DASHBOARD + LOGOUT */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
          >
            Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-semibold
                       bg-gradient-to-r from-red-500 to-pink-500
                       text-white shadow-lg hover:scale-105 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
