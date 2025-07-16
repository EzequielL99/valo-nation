import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useCart } from "../hooks/useCart";
import { useMemo } from "react";

export default function MobileNavMenu({ children }) {
  const { darkMode } = useTheme();

  return (
    <nav
      className={`${
        darkMode ? "bg-dark dark-mode" : "bg-light"
      } bottom-menu position-fixed bottom-0 start-0 w-100 d-lg-none`}
    >
      <div className="container">
        <ul className="m-0 d-flex justify-content-between align-items-center list-unstyled">
          {children}
        </ul>
      </div>
    </nav>
  );
}

export function MobileNavMenuItem({ icon = null, text, url, isCart = false }) {
  const { darkMode } = useTheme();
  const { cart } = useCart();

  const cartQuantity = useMemo(() => cart.length, [cart]);

  return (
    <li className="text-center position-relative z-2">
      <NavLink
        to={url}
        className={({ isActive }) => `${
          isActive ? "active" : ""
        } position-relative flex-column d-flex 
        justify-content-center align-items-center w-100`}
        end
      >
        <i className={`${darkMode ? "dark-mode border-dark" : "border-light"}`}>
          {icon !== null && icon}
        </i>
        <span className="text">
          {`${text}`}
          {isCart && cartQuantity > 0 ? ` (${cartQuantity})` : ""}
        </span>
      </NavLink>
    </li>
  );
}
