import { Outlet, Navigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminLayout() {
  const isAdmin = localStorage.getItem("isAdmin");

  if (!isAdmin) return <Navigate to="/login" replace />;

  return (
    <div>
      <AdminNavbar />
      <div style={{ padding: 24 }}>
        <Outlet />
      </div>
    </div>
  );
}
