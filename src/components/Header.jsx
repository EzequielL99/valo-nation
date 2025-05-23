import CartPopover from "./shop/CartPopover";
import { useMemo, useState } from "react";
import CartButton from "./shop/CartButton";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useValoNation } from "../hooks/useValoNation";
import AdminButton from "./AdminButton";
import ProfileButton from "./ProfileButton";

export default function Header() {
  const { pathname } = useLocation();
  const [showCart, setShowCart] = useState(false);
  const { auth, authDispatch } = useValoNation();

  const isShop = useMemo(() => pathname === "/shop", [pathname]);

  return (
    <div className="container bg-dark sticky-top">
      <nav
        className="position-relative z-3 navbar bg-dark navbar-expand-md px-4 py-3 rounded-bottom rounded-bottom-3"
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

              <li className="nav-item d-md-none py-4 border-top border-primary">
                <div className="d-flex justify-content-between align-items-center">
                  <AdminButton className="btn btn-outline-light rounded-pill" />

                  <ProfileButton mobile={true} />

                  {auth.currentUser && (
                    <button
                      className="btn btn-outline-light rounded-pill"
                      onClick={() => authDispatch({ type: "logout" })}
                    >
                      SALIR
                    </button>
                  )}
                </div>
              </li>
            </ul>
          </div>

          <ul className="navbar-nav gap-3 d-none d-md-flex align-items-center">
            <li className="nav-item">
              <AdminButton className="btn btn-outline-primary rounded-pill text-uppercase px-4" />
            </li>
            {isShop && (
              <li className="nav-item">
                <CartButton showCart={showCart} setShowCart={setShowCart} />
              </li>
            )}
            <li className="nav-item">
              <ProfileButton />
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
/* ---------------------------------- EMLV ---------------------------------- */
