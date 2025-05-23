import { UserIcon } from "@heroicons/react/24/outline";
import CartPopover from "./shop/CartPopover";
import { useMemo, useState } from "react";
import CartButton from "./shop/CartButton";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useValoNation } from "../hooks/useValoNation";

export default function Header() {
  const { pathname } = useLocation();
  const [showCart, setShowCart] = useState(false);
  const { auth } = useValoNation();

  const isShop = useMemo(() => pathname === "/shop", [pathname]);

  return (
    <div className="container">
      <nav
        className="position-relative z-3 navbar navbar-expand-md px-4 py-3 rounded-bottom rounded-bottom-3"
        data-bs-theme="dark"
      >
        <div className="container px-0 justify-content-md-between">
          <Link to="/" className="navbar-brand">
            <span className="fw-bold text-primary">VALO</span>-NATION
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse flex-md-grow-0"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              {auth.currentUser.role === "admin" && (
                <li className="nav-item d-md-none my-3">
                  <NavLink
                    to="/admin"
                    className="text-decoration-none text-white fw-bold"
                  >
                    ADMIN
                  </NavLink>
                </li>
              )}

              <li className="nav-item d-md-none mb-3">
                <NavLink
                  to={auth.currentUser ? "/profile" : "/auth/login"}
                  className="text-decoration-none text-white fw-bold"
                >
                  {auth.currentUser ? "MI PERFIL" : "INGRESAR"}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link text-primary" : "nav-link"
                  }
                >
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive ? "nav-link text-primary" : "nav-link"
                  }
                >
                  Tienda
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "nav-link text-primary" : "nav-link"
                  }
                >
                  Contacto
                </NavLink>
              </li>
            </ul>
          </div>

          <ul className="navbar-nav gap-3 d-none d-md-flex">
            <li className="nav-item">
              <NavLink
                to="/admin"
                className="btn btn-outline-primary rounded-pill text-uppercase px-4"
              >
                ADMIN
              </NavLink>
            </li>
            {isShop && (
              <li className="nav-item">
                <CartButton showCart={showCart} setShowCart={setShowCart} />
              </li>
            )}
            <li className="nav-item">
              <NavLink
                to="/profile"
                className="btn btn-outline-primary rounded-circle py-2"
              >
                <UserIcon className="icon" />
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {isShop && (
        <>
          <CartButton
            showCart={showCart}
            setShowCart={setShowCart}
            floatingButton={true}
          />
          <CartPopover showCart={showCart} setShowCart={setShowCart} />
        </>
      )}
    </div>
  );
}
