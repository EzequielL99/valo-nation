import { useMemo } from "react";
import { useValoNation } from "../../hooks/useValoNation";
// Icons
import {
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function CartButton({
  showCart,
  setShowCart,
  floatingButton = false,
}) {
  const { cart } = useValoNation();

  const toggleCart = (e) => {
    e.preventDefault();

    setShowCart(!showCart);
  };

  const cartItemsQuantity = useMemo(() => cart.length, [cart]);

  return floatingButton ? (
    <a
      href="#"
      className="btn btn-primary rounded-circle py-2 position-fixed z-3 d-md-none end-0 bottom-0 translate-middle"
      onClick={toggleCart}
    >
      {showCart ? (
        <XMarkIcon className="icon" />
      ) : (
        <ShoppingCartIcon className="icon" />
      )}
      {cartItemsQuantity > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-light text-dark">
          {cartItemsQuantity}
        </span>
      )}
    </a>
  ) : (
    <a
      href="#"
      className={`btn btn-outline-primary rounded-circle py-2 position-relative btn-carrito ${showCart ? 'active' : ''}`}
      onClick={toggleCart}
    >
      <ShoppingCartIcon className="icon" />
      {cartItemsQuantity > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-light text-dark">
          {cartItemsQuantity}
        </span>
      )}
    </a>
  );
}
