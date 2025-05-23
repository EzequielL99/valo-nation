import { NavLink } from "react-router-dom";
import { useValoNation } from "../hooks/useValoNation";
import {
  UserIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function ProfileButton({ mobile = false }) {
  const { auth, authDispatch } = useValoNation();

  if (auth.currentUser) {
    return mobile ? (
      <NavLink to="/profile" className="btn btn-outline-light rounded-pill">
        MI PERFIL
      </NavLink>
    ) : (
      <div class="dropstart">
        <button
          class="btn btn-outline-primary rounded-circle py-2"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <UserIcon className="icon" />
        </button>
        <ul class="dropdown-menu top-100 px-4 py-3">
          <li className="pb-2">
            <p className="dropdown-header p-0 m-0 fs-5">
              Hola {auth.currentUser.usuario}!
            </p>
          </li>
          <li className="pb-2">
            <NavLink class="dropdown-item" className='link-primary text-decoration-none fs-5' to="/profile">
              Mi perfil
            </NavLink>
          </li>
          <li>
              <button onClick={() => authDispatch({ type: "logout" })} className="btn m-0 p-0 text-capitalize fs-5 link-primary">Salir</button>
          </li>
        </ul>
      </div>

      // <NavLink
      //   to="/profile"
      //   className="btn btn-outline-primary rounded-circle py-2"
      // >
      //   <UserIcon className="icon" />
      // </NavLink>
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
