import { useMemo } from "react";
import { useCart } from "../../hooks/useCart";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, cartDispatch } = useCart();

  const cartIsEmpty = useMemo(() => cart.length === 0, [cart]);

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );
  return (
    <main className="min-vh-100">
      <div className="container py-5">
        <ul className="cart-list list-unstyled m-0 p-0">
          {!cartIsEmpty ? (
            <>
              {cart.map((product) => (
                <li
                  className="bg-light shadow mb-5 rounded-4 d-flex justify-content-between align-items-center p-5"
                  key={product.id}
                >
                  <img
                    src={product.img}
                    className="img-fluid"
                    alt={product.name}
                    style={{ maxWidth: "20rem" }}
                  />
                  <h2 className="text-center">{product.name}</h2>
                  <p className="p-0 m-0 text-center">{product.price}</p>
                  <p className="p-0 m-0 text-center">{product.quantity}</p>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-outline-primary p-2"
                      onClick={() =>
                        cartDispatch({
                          type: "remove-from-cart",
                          payload: { itemId: product.id },
                        })
                      }
                    >
                      <TrashIcon className="icon" />
                    </button>
                  </div>
                </li>
              ))}

              <div className="row">
                <div className="col-12 text-end">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="cart-actions">
                      <button className="btn fs-2 btn-primary me-4 px-5">
                        Pagar
                      </button>
                      <button
                        onClick={() => cartDispatch({ type: "clear-cart" })}
                        className="btn fs-2 btn-outline-secondary"
                      >
                        Vaciar carrito
                      </button>
                    </div>
                    <p className="fs-1 text-uppercase">
                      Total a pagar:{" "}
                      <span className="fw-bolder text-primary">
                        ${cartTotal}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-12 text-center py-5">
                  <p className="mb-4">¿Sabés qué? Quiero seguir comprando...</p>
                  <Link
                    to="/shop"
                    className="btn btn-primary px-4 py-3 text-uppercase"
                  >
                    Ver más productos
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center my-5">
              <p className="h2 text-primary mb-5">
                Tu carrito está vacío, busquemos a tu compañera ideal...
              </p>
              <Link
                to="/shop"
                className="btn btn-primary px-4 fs-3 py-3 text-uppercase"
              >
                Ir a la tienda
              </Link>
            </div>
          )}
        </ul>
      </div>
    </main>
  );
}
