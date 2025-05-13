import React from "react";

export default function Header() {
  return (
    <header className="container">
      <nav className="navbar bg-dark navbar-expand-md px-4 py-3 rounded-bottom rounded-bottom-3" data-bs-theme="dark">
        <div className="container px-0 justify-content-md-between">
          <a href="#" className="navbar-brand">
            <span className="fw-bold text-primary">VALO</span>-NATION
          </a>
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
          <div className="collapse navbar-collapse flex-md-grow-0" id="navbarSupportedContent">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="#" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">Shop</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">Help</a>
                </li>
            </ul>
          </div>

          <ul className="navbar-nav gap-3">
            <li className="nav-item">
                <a href="#" className="btn btn-outline-primary rounded-pill text-uppercase">admin</a>
            </li>
            <li className="nav-item">
                <a href="#" className="btn btn-outline-primary rounded-circle">K</a>
            </li>
            <li className="nav-item">
                <a href="#" className="btn btn-outline-primary rounded-circle">P</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
