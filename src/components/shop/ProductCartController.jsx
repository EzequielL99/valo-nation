import { useMemo, useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useValoNation } from "../../hooks/useValoNation";

const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

export default function ProductCartController({ weaponInfo }) {
  const { cart, cartDispatch } = useValoNation();
  const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = (increment = false) => {
    // Incrementar
    if (increment) {
      if (quantity >= MAX_ITEMS) return setQuantity(MAX_ITEMS);

      const newQuantity = quantity + 1;

      cartDispatch({
        type: "update-quantity",
        payload: {
          itemId: weaponInfo.id,
          newQuantity,
        },
      });
      setQuantity(newQuantity);
    } else {
      if (quantity <= MIN_ITEMS) {
        cartDispatch({
          type: "remove-from-cart",
          payload: { itemId: weaponInfo.id },
        });

        return;
        // return setQuantity(MIN_ITEMS);
      } else {
        const newQuantity = quantity - 1;

        cartDispatch({
          type: "update-quantity",
          payload: {
            itemId: weaponInfo.id,
            newQuantity,
          },
        });
        setQuantity(newQuantity);
      }
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
          >
            <i>
              <MinusIcon className="icon" />
            </i>
          </button>
          <span className="py-2 px-4 rounded-3 bg-light border border-3 border-primary">
            {quantity}
          </span>
          <button
            className="btn btn-outline-primary p-2"
            onClick={() => handleChangeQuantity(true)}
          >
            <i>
              <PlusIcon className="icon" />
            </i>
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCart} className="btn btn-primary fs-3">
          Agregar al carrito
        </button>
      )}
    </>
  );
}
