import { Link, useLocation } from "react-router-dom";

export default function PublicNavbar() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const linkClass = (path) =>
    `relative text-sm font-medium transition-all
     ${
       location.pathname === path
         ? "text-indigo-400"
         : "text-slate-300 hover:text-white"
     }
     after:absolute after:left-0 after:-bottom-1 after:h-[2px]
     after:w-0 after:bg-gradient-to-r after:from-indigo-400 after:to-purple-400
     after:transition-all hover:after:w-full`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Academic Portfolio
        </Link>

        {/* MENU */}
        <div className="flex items-center gap-8">

          <Link to="/" className={linkClass("/")}>Home</Link>

          <Link to="/research" className={linkClass("/research")}>
            My Research
          </Link>

          {/* Publications Dropdown */}
          <div className="relative group">
            <span
              className={`cursor-pointer text-sm font-medium transition-all ${
                location.pathname.startsWith("/publications")
                  ? "text-indigo-400"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Publications
            </span>

            <div className="absolute left-0 mt-3 w-48 rounded-xl bg-slate-900 border border-white/10 shadow-xl
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <Link
                to="/publications/journals"
                className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white rounded-t-xl"
              >
                Journals
              </Link>
              <Link
                to="/publications/conferences"
                className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white rounded-b-xl"
              >
                Conferences
              </Link>
            </div>
          </div>

          <Link to="/books" className={linkClass("/books")}>Books</Link>
          <Link to="/patents" className={linkClass("/patents")}>Patents</Link>
          <Link to="/teaching" className={linkClass("/teaching")}>Teaching</Link>
          <Link to="/funding" className={linkClass("/funding")}>Funded Projects</Link>

          {/* ADMIN LOGIN */}
          {!isAdminRoute && (
            <Link
              to="/admin/login"
              className="ml-4 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                         text-white text-sm font-semibold shadow-lg hover:scale-105 transition-all"
            >
              Admin Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}
