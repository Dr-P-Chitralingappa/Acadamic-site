// import { Navigate } from "react-router-dom";

// export default function ProtectedAdmin({ children }) {
//   const isAdmin = localStorage.getItem("isAdmin");

//   if (!isAdmin) {
//     return <Navigate to="/admin/login" replace />;
//   }

//   return children;
// }
export default function ProtectedAdmin({ children }) {
  // TEMP: bypass auth for development
  return children;
}

