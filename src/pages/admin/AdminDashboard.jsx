import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // const logout = () => {
  //   localStorage.removeItem("isAdmin");
  //   navigate("/admin/login");
  // };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      <button onClick={() => navigate("/admin/publications")}>
        Manage Publications
      </button>
      <br /><br />

      <button onClick={() => navigate("/admin/patents")}>
        Manage Patents
      </button>
      <br /><br />

      <button onClick={() => navigate("/admin/books")}>
        Manage Books
      </button>
      <br /><br />

      {/* <button onClick={logout}>Logout</button> */}
    </div>
  );
}
