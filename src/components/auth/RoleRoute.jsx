import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function RoleRoute({ requiredRole, children }) {
  const { auth } = useAuth();

  if (!auth.currentUser) return <Navigate to="/auth/login" />;

  if (auth.currentUser?.role.toUpperCase() !== requiredRole) return <Navigate to="/unauthorized" />;

  return children;
}
