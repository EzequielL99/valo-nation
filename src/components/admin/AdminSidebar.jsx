import { Link, NavLink } from "react-router-dom";
import {
  ChevronDoubleLeftIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export default function AdminSidebar({ children }) {
  const [expandedMenu, setExpandedMenu] = useState(true);
  const { auth } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <aside
      className={`min-vh-100 ${
        darkMode ? "bg-dark text-white" : "bg-white text-dark"
      } bo-aside d-none d-lg-block`}
    >
      <nav
        aria-label="Menú de navegación lateral"
        className={`h-100 d-flex flex-column border-end ${
          darkMode ? "border-danger" : ""
        } shadow-sm ${expandedMenu ? "expanded" : ""}`}
      >
        <div className="p-4 pb-2 d-flex justify-content-between align-items-center">
          <Link
            to="/"
            className={`brand overflow-hidden p-0 text-decoration-none ${
              darkMode ? "text-white" : "text-dark"
            }`}
            aria-label="Sitio web principal de Valo-Nation"
          >
            <span className="fw-bold text-primary">VALO</span>-NATION
          </Link>
          <button
            className={`btn p-3 rounded-2 btn-expand-menu ${
              darkMode ? "text-white" : "text-dark"
            }`}
            onClick={() => setExpandedMenu((prev) => !prev)}
            aria-label="Ocultar/Mostrar menú lateral"
          >
            <ChevronDoubleLeftIcon className="icon" />
          </button>
        </div>

        <ul className="list-unstyled px-3">{children}</ul>

        <div
          className={`border-top ${
            darkMode ? "border-danger" : ""
          } mt-auto d-flex align-items-center p-3 user-wrapper`}
        >
          <div
            className={`icon ${
              darkMode ? "bg-light text-dark" : "bg-dark text-white"
            } text-uppercase p-4`}
          >
            {auth.currentUser.username.substring(0, 1)}
          </div>
          <div className="d-flex justify-content-between align-items-center ms-3 overflow-hidden user-data">
            <div className="pe-5 me-5 d-flex flex-column justify-content-center">
              <h4 className="fw-bold m-0 p-0">{auth.currentUser.username}</h4>
              <span
                className={`fs-6 ${darkMode ? "text-light" : "text-black-50"}`}
              >
                {auth.currentUser.email}
              </span>
            </div>
            <button
              onClick={() => toggleTheme()}
              className="p-2 btn btn-outline-primary rounded-circle"
              aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {darkMode ? (
                <SunIcon className="icon" />
              ) : (
                <MoonIcon className="icon" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function AdminSidebarItem({ icon, text, to }) {
  return (
    <li className="rounded-2 sidebar-item">
      <NavLink
        to={to}
        className={({ isActive }) =>
          "rounded-3 d-flex align-items-center p-3 text-decoration-none " +
          (isActive ? "text-primary" : "")
        }
      >
        {icon}
        <span className="m-0 p-0 ms-3 text">{text}</span>
      </NavLink>
    </li>
  );
}
/* ---------------------------------- EMLV ---------------------------------- */
