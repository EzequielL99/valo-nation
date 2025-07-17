import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { auth } = useAuth();

  return auth.currentUser ? children : <Navigate to="/auth/login?302" />;
}
