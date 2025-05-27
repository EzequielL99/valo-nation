import { Link, NavLink } from "react-router-dom";

export default function AdminHeader() {
  return (
    <header className="bg-dark sticky-top">
      <div className="container">
        <nav
          className="position-relative z-3 navbar bg-dark navbar-expand-md py-3 rounded-bottom rounded-bottom-3"
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
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                      isActive ? "nav-link text-primary" : "nav-link"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "nav-link text-primary" : "nav-link"
                    }
                  >
                    Volver al sitio
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
/* ---------------------------------- EMLV ---------------------------------- */
