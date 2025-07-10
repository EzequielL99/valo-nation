import { useMemo, useRef, useState, useEffect } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";

const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

export default function ProductCartController({ weaponInfo }) {
  const { cart, cartDispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const btnIncrementRef = useRef(null);
  const btnDecrementRef = useRef(null);

  useEffect(() => {
    // Filtrar por producto
    const cartProduct = cart.find((item) => item.id === weaponInfo.id);

    if (cartProduct) {
      setQuantity(cartProduct.quantity);

      // Habilitar Botones
      btnIncrementRef.current.disabled = false;
      btnDecrementRef.current.disabled = false;
    }
  }, [cart]);

  const handleChangeQuantity = (increment = false) => {
    // Incrementar
    if (increment) {
      btnIncrementRef.current.disabled = true;
      btnDecrementRef.current.disabled = true;

      if (quantity == MAX_ITEMS) {
        toast.error("Alcanzaste el máximo permitido", {
          autoClose: 1200,
        });
      }

      cartDispatch({
        type: "increase-quantity",
        payload: {
          itemId: weaponInfo.id,
        },
      });
    } else {
      if (quantity == MIN_ITEMS) {
        toast.info("El producto fue eliminado de tu carrito", {
          autoClose: 1200,
        });
      }
      cartDispatch({
        type: "decrease-quantity",
        payload: {
          itemId: weaponInfo.id,
        },
      });
    }
  };

  const itemExists = useMemo(
    () => cart.some((cartItem) => cartItem.id === weaponInfo.id),
    [cart]
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (itemExists) return;

    cartDispatch({ type: "add-to-cart", payload: { item: weaponInfo } });
    setQuantity(1);
  };

  return (
    <>
      {itemExists ? (
        <div className="d-flex gap-2 align-items-center input-quantity mb-3">
          <button
            className="btn btn-outline-primary p-2"
            onClick={() => handleChangeQuantity()}
            ref={btnDecrementRef}
          >
            <i>
              <MinusIcon className="icon" />
            </i>
          </button>
          <span className="py-2 px-4 rounded-3 bg-light border border-3 border-primary text-dark">
            {quantity}
          </span>
          <button
            className="btn btn-outline-primary p-2"
            onClick={() => handleChangeQuantity(true)}
            ref={btnIncrementRef}
          >
            <i>
              <PlusIcon className="icon" />
            </i>
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCart} className="btn btn-primary add-to-cart fs-3">
          Agregar al carrito
        </button>
      )}
    </>
  );
}
