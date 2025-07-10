import { useEffect, useMemo, useState } from "react";
import CartButton from "./shop/CartButton";
import { Link, NavLink, useLocation } from "react-router-dom";
import AdminButton from "./AdminButton";
import ProfileButton from "./ProfileButton";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import {
  Bars3BottomRightIcon,
  ChatBubbleBottomCenterIcon,
  CommandLineIcon,
  HomeIcon,
  MoonIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import MobileNavMenu, { MobileNavMenuItem } from "./MobileNavMenu";

export default function Header() {
  const { auth, logout } = useAuth();
  const { pathname } = useLocation();
  const { darkMode, toggleTheme } = useTheme();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (showMobileMenu) setShowMobileMenu(false);
  }, [pathname]);

  const isShop = useMemo(() => pathname.includes("/shop"), [pathname]);

  return (
    <header className={`${darkMode ? "bg-dark" : "bg-light"} sticky-top`}>
      <nav className="container py-3">
        <div className="row align-items-center">
          <div className="col-12 col-md-4 d-flex justify-content-between align-items-center px-4">
            <Link
              to="/"
              className={`${darkMode ? "text-light" : ""} navbar-brand m-0 p-0`}
            >
              <span className="fw-bold text-primary">VALO</span>-NATION
            </Link>

            <button
              className={`${
                darkMode ? "btn-outline-light" : "btn-outline-dark"
              } btn`}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Bars3BottomRightIcon className="icon" />
            </button>
          </div>

          <div
            className={`${
              showMobileMenu ? "show" : ""
            } col-12 col-md-4 d-md-flex justify-content-center mobile-menu overflow-hidden`}
          >
            <ul className="d-none d-md-flex flex-row gap-4 list-unstyled p-2 p-md-0 m-0 align-items-center">
              <li className="py-2 p-md-0">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-primary" : ""} ${
                      darkMode ? "link-light" : ""
                    }`
                  }
                >
                  Inicio
                </NavLink>
              </li>
              <li className="py-2 p-md-0">
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-primary" : ""} ${
                      darkMode ? "link-light" : ""
                    }`
                  }
                >
                  Tienda
                </NavLink>
              </li>
              <li className="py-2 p-md-0">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-primary" : ""} ${
                      darkMode ? "link-light" : ""
                    }`
                  }
                >
                  Contacto
                </NavLink>
              </li>
            </ul>

            {/* Mobile Menu */}
            <ul className="d-md-none list-unstyled p-2 text-center m-0 p-0 pt-4">
              {auth.currentUser?.role === "admin" && (
                <li className="py-2">
                  <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "text-primary" : ""} ${
                        darkMode ? "link-light" : ""
                      }`
                    }
                  >
                    Administración
                  </NavLink>
                </li>
              )}

              {auth.currentUser ? (
                <>
                  <li className="py-2">
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "text-primary" : ""} ${
                          darkMode ? "link-light" : ""
                        }`
                      }
                    >
                      Mi Perfil
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <button
                      onClick={() => logout()}
                      className="btn w-100 link-primary"
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              ) : (
                <li className="py-2">
                  <NavLink to="/auth/login" className="nav-link link-primary">
                    Iniciar Sesión
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          <div className="col-4 d-none d-md-flex justify-content-end">
            <ul className="list-unstyled m-0 p-0 gap-3 d-flex align-items-center">
              <li className="nav-item">
                <AdminButton className="btn btn-outline-primary rounded-pill text-uppercase px-4" />
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-primary rounded-circle"
                  onClick={() => toggleTheme()}
                >
                  {darkMode ? (
                    <SunIcon className="icon" />
                  ) : (
                    <MoonIcon className="icon" />
                  )}
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

      <MobileNavMenu>
        <MobileNavMenuItem icon={<HomeIcon />} url="/" text="Inicio" />
        <MobileNavMenuItem
          icon={<ShoppingBagIcon />}
          url="/shop"
          text="Tienda"
        />
        <MobileNavMenuItem
          icon={<ShoppingCartIcon />}
          url="/shop/cart"
          text="Carrito"
          isCart={true}
        />
        <li className="text-center position-relative z-2">
          <a
            onClick={() => toggleTheme()}
            className="m-0 p-0 d-flex flex-column"
          >
            <i>{darkMode ? <SunIcon /> : <MoonIcon />}</i>
            <span className="text">{darkMode ? "Claro" : "Oscuro"}</span>
          </a>
        </li>
        <MobileNavMenuItem
          icon={<ChatBubbleBottomCenterIcon />}
          url="/contact"
          text="Ayuda"
        />
      </MobileNavMenu>
    </header>
  );
}
/* ---------------------------------- EMLV ---------------------------------- */
