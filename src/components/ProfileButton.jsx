import { NavLink } from "react-router-dom";
import { useValoNation } from "../hooks/useValoNation";
import {
  UserIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function ProfileButton({ mobile = false }) {
  const { auth } = useValoNation();

  if (auth.currentUser) {
    return mobile ? (
      <NavLink to="/profile" className="btn btn-outline-light rounded-pill">
        MI PERFIL
      </NavLink>
    ) : (
      <NavLink
        to="/profile"
        className="btn btn-outline-primary rounded-circle py-2"
      >
        <UserIcon className="icon" />
      </NavLink>
    );
  } else {
    // No hay usuario activo
    return mobile ? (
      <NavLink to="/auth/login" className="btn btn-outline-light rounded-pill">
        INGRESAR
      </NavLink>
    ) : (
      <NavLink
        to="/auth/login"
        className="btn btn-outline-primary rounded-circle py-2"
      >
        <ArrowRightEndOnRectangleIcon className="icon" />
      </NavLink>
    );
  }
}
