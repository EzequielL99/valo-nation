import { NavLink } from "react-router-dom";
import { useValoNation } from "../hooks/useValoNation";
export default function AdminButton({ className }) {
  const { auth } = useValoNation();

  return auth.currentUser?.role === "admin" ? (
    <NavLink to="/admin/dashboard" className={className}>
      ADMIN
    </NavLink>
  ) : (
    <></>
  );
}
