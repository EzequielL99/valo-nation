import { useMemo } from "react";
import { useCart } from "../../hooks/useCart";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../hooks/useTheme";

const MIN_ITEMS = parseInt(import.meta.env.VITE_MIN_PRODUCTS);
const MAX_ITEMS = parseInt(import.meta.env.VITE_MAX_PRODUCTS);

export default function CartQuantityController({ product }) {
  const { cartDispatch } = useCart();
  const { darkMode } = useTheme();

  const handleChangeQuantity = (increment = false) => {
    // Incrementar
    if (increment) {
      cartDispatch({
        type: "increase-quantity",
        payload: {
          itemId: product.id,
        },
      });
    } else {
      cartDispatch({
        type: "decrease-quantity",
        payload: {
          itemId: product.id,
        },
      });
    }
  };

  const disabledIncrementButton = useMemo(
    () => product.quantity === MAX_ITEMS,
    [product.quantity]
  );

  const disabledDecrementButton = useMemo(
    () => product.quantity === MIN_ITEMS,
    [product.quantity]
  );

  return (
    <div className={`${ darkMode ? 'border-light' : 'border-dark-subtle' } d-flex align-items-center border rounded-3 quantity-controller`}>
      <button
        onClick={() => handleChangeQuantity()}
        className="btn text-primary border-"
        disabled={disabledDecrementButton}
      >
        <i>
          <MinusIcon className="icon" />
        </i>
      </button>
      <span className="py-1 px-2">{product.quantity}</span>
      <button
        onClick={() => handleChangeQuantity(true)}
        className="btn text-primary"
        disabled={disabledIncrementButton}
      >
        <i>
          <PlusIcon className="icon" />
        </i>
      </button>
    </div>
  );
}
