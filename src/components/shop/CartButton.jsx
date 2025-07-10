import { useMemo } from "react";
import { useCart } from "../../hooks/useCart";
import { useTheme } from "../../hooks/useTheme";

// Icons
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

export default function CartButton() {
  const { cart } = useCart();
  const { darkMode } = useTheme();

  const cartItemsQuantity = useMemo(() => cart.length, [cart]);

  return (
    <NavLink
      to="/shop/cart"
      className={({ isActive }) =>
        `btn btn-outline-primary rounded-circle py-2 position-relative btn-carrito ${
          isActive ? "active" : ""
        }`
      }
    >
      <ShoppingCartIcon className="icon" />
      {cartItemsQuantity > 0 && (
        <span className={`position-absolute top-0 start-100 translate-middle badge rounded-circle ${darkMode ? 'bg-light text-dark' : 'bg-dark text-light'}`}>
          {cartItemsQuantity}
        </span>
      )}
    </NavLink>
  );
}
