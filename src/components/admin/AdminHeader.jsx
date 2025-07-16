import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function AdminHeader() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header
      className={`${
        darkMode ? "bg-dark text-white" : "bg-light text-dark"
      } sticky-top d-lg-none py-4`}
    >
      <div className="container">
        <nav>
          <div className="container px-0 d-flex align-items-center justify-content-between">
            <Link to="/" className="navbar-brand">
              <span className="fw-bold text-primary">VALO</span>-NATION
            </Link>

            <button
              className={`${
                darkMode ? "btn-outline-light" : "btn-outline-dark"
              } btn p-2`}
              onClick={() => toggleTheme()}
              aria-label={
                darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
              }
            >
              {darkMode ? (
                <SunIcon className="icon" />
              ) : (
                <MoonIcon className="icon" />
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
/* ---------------------------------- EMLV ---------------------------------- */
