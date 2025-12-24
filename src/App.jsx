import { Routes, Route, Navigate } from "react-router-dom";

// ===== PUBLIC COMPONENTS =====
import Navbar from "./components/PublicNavbar";

// ===== PUBLIC PAGES =====
import Home from "./pages/Home";
import Publications from "./pages/Publications";
import Books from "./pages/Books";
import Patents from "./pages/Patents";
import Teaching from "./pages/Teaching";
// import CV from "./pages/CV";
import EditPublication from "./pages/EditPublication";
import EditBook from "./pages/EditBook";
import EditPatent from "./pages/EditPatent";
import Funding from "./pages/Funding";



// ===== ADMIN PAGES =====
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddPublication from "./pages/AddPublication";
import AddPatent from "./pages/AddPatent";
import AddBook from "./pages/AddBook";
import MyResearch from "./pages/MyResearch";


// ===== ADMIN LIST PAGES =====
import AdminPublications from "./pages/admin/AdminPublications";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminPatents from "./pages/admin/AdminPatents";

// ===== ADMIN LAYOUT & PROTECTION =====
import AdminLayout from "./layouts/AdminLayout";
import ProtectedAdmin from "./components/ProtectedAdmin";

// ---------- PUBLIC LAYOUT ----------
function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

// ---------- APP ROUTES ----------
export default function App() {
  return (
    <Routes>

      {/* ===== PUBLIC ROUTES ===== */}
<Route path="/" element={<MainLayout><Home /></MainLayout>} />

<Route path="/research" element={<MainLayout><MyResearch /></MainLayout>} />

<Route
  path="/publications"
  element={<MainLayout><Publications /></MainLayout>}
/>

<Route
  path="/publications/journals"
  element={<MainLayout><Publications type="journal" /></MainLayout>}
/>

<Route
  path="/publications/conferences"
  element={<MainLayout><Publications type="conference" /></MainLayout>}
/>

<Route path="/books" element={<MainLayout><Books /></MainLayout>} />
<Route path="/patents" element={<MainLayout><Patents /></MainLayout>} />
<Route path="/teaching" element={<MainLayout><Teaching /></MainLayout>} />
<Route path="/funding" element={<MainLayout><Funding /></MainLayout>} />

      {/* <Route path="/cv" element={<MainLayout><CV /></MainLayout>} /> */}

      {/* Redirect /login → admin login */}
      <Route path="/login" element={<Navigate to="/admin/login" replace />} />

      {/* ===== ADMIN LOGIN ===== */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ===== ADMIN (PROTECTED) ===== */}
      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <AdminLayout />
          </ProtectedAdmin>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="/admin/publications/edit/:id" element={<EditPublication />} />
        <Route
  path="/admin/books/edit/:id"
  element={<EditBook />}
/>
<Route
  path="/admin/patents/edit/:id"
  element={<EditPatent />}
/>

        <Route path="publications" element={<AdminPublications />} />
        <Route path="patents" element={<AdminPatents />} />
        <Route path="books" element={<AdminBooks />} />
        


        <Route path="publications/add" element={<AddPublication />} />
        <Route path="patents/add" element={<AddPatent />} />
        <Route path="books/add" element={<AddBook />} />
      </Route>

    </Routes>
  );
}
