import { Navigate } from "react-router-dom";
import { useValoNation } from "../../hooks/useValoNation";

export default function PrivateRoute({ adminPage = false, children }) {
  const { auth } = useValoNation();

  // Pagina de Admin - NO AUTORIZADO
  if (adminPage && auth.currentUser && auth.currentUser?.role !== "admin")
    return <Navigate to="/" replace />;

  // Pagina que require sesión iniciada
  if (!auth.currentUser) return <Navigate to="/auth/login" replace />;

  // Todo OK - Avanza
  return children;
}
