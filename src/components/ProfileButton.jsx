import { NavLink, Link } from "react-router-dom";
import {
  UserIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../hooks/useAuth";

export default function ProfileButton({ mobile = false }) {
  const { auth, authDispatch } = useAuth();

  if (auth.currentUser) {
    return mobile ? (
      <NavLink to="/profile" className="btn btn-outline-light rounded-pill">
        MI PERFIL
      </NavLink>
    ) : (
      <div className="dropstart">
        <button
          className="btn btn-outline-primary rounded-circle py-2"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <UserIcon className="icon" />
        </button>
        <ul className="dropdown-menu p-0 top-100 pt-3">
          <li className="pb-2 px-4">
            <p className="dropdown-header p-0 m-0 fs-5">
              Hola {auth.currentUser.username}!
            </p>
          </li>
          <li>
            <NavLink
              className="dropdown-item link-dark text-decoration-none fs-5 px-4 py-3"
              to="/profile"
            >
              Mi perfil
            </NavLink>
          </li>
          <li>
            <Link
              onClick={(e) => {
                e.preventDefault();
                authDispatch({ type: "logout" });
              }}
              className="dropdown-item link-dark text-decoration-none fs-5 px-4 pt-2 pb-3"
              to="/profile"
            >
              Cerrar Sesión
            </Link>
          </li>
        </ul>
      </div>
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
        className="btn btn-primary rounded-pill py-2 px-3"
      >
        Iniciar Sesión
      </NavLink>
    );
  }
}
