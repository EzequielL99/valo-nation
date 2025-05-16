import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo} from "react";

export default function CartPopover({
  cart,
  clearCart,
  deleteFromCart,
  showCart,
  setShowCart
}) {

  useEffect(() => {
    if(showCart && cart.length === 0){
      setTimeout(() => {
        setShowCart(false);
      }, 2000)
    } 
  }, [showCart, cart])

  const cartIsEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return (
    <div
      className={`z-3 carrito position-fixed p-4 bg-dark text-white ${showCart && 'active'}`}
      role="dialog"
      id="popoverCarrito"
      aria-label="Carrito de compras"
    >
      {!cartIsEmpty ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((weapon) => (
                <tr key={weapon.id}>
                  <td className="">
                    <img
                      src={weapon.img}
                      alt={weapon.name}
                      className="img-fluid"
                    />
                  </td>
                  <td className="">{weapon.name}</td>
                  <td className="">{weapon.price}</td>
                  <td className="">{weapon.quantity}</td>
                  <td className="">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => deleteFromCart(weapon.id)}
                    >
                      <TrashIcon className="icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-end mt-4">
            Total a pagar: <span className="fw-bold">${cartTotal}</span>
          </p>
          <button
            className="btn btn-primary w-100 mt-3 text-uppercase"
            onClick={() => clearCart()}
          >
            Vaciar carrito
          </button>
        </>
      ) : (
        <p className="p-0 m-0 text-center text-primary">Tu carrito está vacío</p>
      )}
    </div>
  );
}
