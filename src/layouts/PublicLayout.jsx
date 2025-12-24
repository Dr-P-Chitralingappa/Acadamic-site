import PublicNavbar from "../components/PublicNavbar";
import PublicSidebar from "../components/PublicSidebar";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div style={{ display: "flex" }}>
      <PublicSidebar />

      <div style={{ flex: 1 }}>
        <PublicNavbar />
        <Outlet />
      </div>
    </div>
  );
}
