import {
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import CartPopover from "./shop/CartPopover";
import { useState } from "react";

export default function Header({ cart, deleteFromCart, clearCart }) {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = (e) => {
    e.preventDefault();

    setShowCart(!showCart);
  };

  return (
    <div className="container">
      <nav
        className="position-relative z-3 navbar navbar-expand-md px-4 py-3 rounded-bottom rounded-bottom-3"
        data-bs-theme="dark"
      >
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
          <div
            className="collapse navbar-collapse flex-md-grow-0"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Tienda
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Ayuda
                </a>
              </li>

              <li className="nav-item d-md-none my-2">
                <a
                  href="#"
                  className="text-decoration-none text-primary fw-bold"
                >
                  ADMIN
                </a>
              </li>
              <li className="nav-item d-md-none mb-3">
                <a
                  href="#"
                  className="text-decoration-none text-primary fw-bold"
                >
                  MI PERFIL
                </a>
              </li>
            </ul>
          </div>

          <ul className="navbar-nav gap-3 d-none d-md-flex">
            <li className="nav-item">
              <a
                href="#"
                className="btn btn-outline-primary rounded-pill text-uppercase px-4"
              >
                admin
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="btn btn-outline-primary rounded-circle py-2 position-relative btn-carrito"
              >
                <ShoppingCartIcon className="icon" />
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="btn btn-outline-primary rounded-circle py-2"
              >
                <UserIcon className="icon" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <a
        href="#"
        className="btn btn-primary rounded-circle py-2 position-fixed z-3 d-md-none end-0 bottom-0 translate-middle"
        onMouseEnter={() => setShowCart(true)}
        onClick={toggleCart}
      >
        {showCart ? (
          <XMarkIcon className="icon" />
        ) : (
          <ShoppingCartIcon className="icon" />
        )}
      </a>
      <CartPopover
        cart={cart}
        deleteFromCart={deleteFromCart}
        clearCart={clearCart}
        showCart={showCart}
        setShowCart={setShowCart}
      />
    </div>
  );
}
