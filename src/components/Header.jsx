import { useMemo } from "react";
import CartButton from "./shop/CartButton";
import { Link, NavLink, useLocation } from "react-router-dom";
import AdminButton from "./AdminButton";
import ProfileButton from "./ProfileButton";
import { useAuth } from "../hooks/useAuth";
import { MoonIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const { pathname } = useLocation();
  const { auth, logout } = useAuth();

  const isShop = useMemo(() => pathname.includes("/shop"), [pathname]);

  return (
    <header className="bg-light sticky-top">
      <nav className="container py-3">
        <div className="row align-items-center">
          <div className="col-4">
            <Link to="/" className="navbar-brand p-0 m-0">
              <span className="fw-bold text-primary">VALO</span>-NATION
            </Link>
          </div>

          <div className="col-4 d-flex justify-content-center">
            <ul className="d-flex flex-row gap-4 list-unstyled p-0 m-0 align-items-center">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link text-primary" : "nav-link"
                  }
                >
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive ? "nav-link text-primary" : "nav-link"
                  }
                >
                  Tienda
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "nav-link text-primary" : "nav-link"
                  }
                >
                  Contacto
                </NavLink>
              </li>

              <li className="nav-item d-md-none py-4 border-top border-primary">
                <div className="d-flex justify-content-between align-items-center">
                  <AdminButton className="btn btn-outline-light rounded-pill" />

                  <ProfileButton mobile={true} />

                  {auth.currentUser && (
                    <button
                      className="btn btn-outline-light rounded-pill"
                      onClick={() => logout()}
                    >
                      SALIR
                    </button>
                  )}
                </div>
              </li>
            </ul>
          </div>

          <div className="col-4 d-flex justify-content-end">
            <ul className="list-unstyled m-0 p-0 gap-3 d-none d-md-flex align-items-center">
              <li className="nav-item">
                <AdminButton className="btn btn-outline-primary rounded-pill text-uppercase px-4" />
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-primary rounded-circle">
                  <MoonIcon className="icon" />
                </button>
              </li>
              {isShop && (
                <li className="nav-item">
                  <CartButton />
                </li>
              )}
              <li className="nav-item">
                <ProfileButton />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
/* ---------------------------------- EMLV ---------------------------------- */
