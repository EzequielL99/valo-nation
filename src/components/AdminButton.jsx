import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export default function AdminButton({ className }) {
  const { auth } = useAuth();

  return auth.currentUser?.role === "admin" ? (
    <NavLink to="/admin/dashboard" className={className}>
      ADMIN
    </NavLink>
  ) : (
    <></>
  );
}
