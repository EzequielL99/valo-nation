import { useMemo } from "react";
import { useCart } from "../../hooks/useCart";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import CartQuantityController from "../../components/shop/CartQuantityController";

export default function CartPage() {
  const { cart, cartDispatch } = useCart();
  const { darkMode } = useTheme();

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
                  className={`${
                    darkMode
                      ? "bg-dark-subtle text-light"
                      : "bg-white text-dark"
                  } cart-item shadow mb-5 rounded-4 d-flex justify-content-between gap-4 align-items-stretch p-3 position-relative`}
                  key={product.id}
                >
                  <div className="image-wrapper">
                    <div className="bg-body-secondary rounded-3">
                      <img
                        src={product.img}
                        className="img-fluid"
                        alt={product.name}
                      />
                    </div>
                  </div>
                  <div className="flex-grow-1 d-flex flex-column justify-content-between py-3">
                    <h2 className="h3">{product.name}</h2>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="p-0 m-0 text-center fw-bold fs-1 text-primary">${product.price}</p>
                      <CartQuantityController product={product} />
                    </div>
                  </div>
                  <button
                    className="btn p-2 position-absolute text-danger top-0 end-0 m-1"
                    onClick={() =>
                      cartDispatch({
                        type: "remove-from-cart",
                        payload: { itemId: product.id },
                      })
                    }
                  >
                    <XMarkIcon className="icon" />
                  </button>
                </li>
              ))}

              <div className={`row ${darkMode ? "text-light" : "text-dark"}`}>
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className={`${darkMode ? 'text-white-50' : 'text-black-50'} p-0 m-0`}>Subtotal</p>
                    <span className="fw-bolder fs-1 text-primary">${cartTotal}</span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="cart-actions">
                    <button className="btn d-block d-md-inline-block fs-2 btn-primary mb-3">
                      Pagar
                    </button>
                    <button
                      onClick={() => cartDispatch({ type: "clear-cart" })}
                      className={`${darkMode ? 'link-light' : 'link-dark'} btn fs-4`}
                    >
                      Vaciar carrito
                    </button>
                  </div>
                </div>
                <div className="col-12 text-center py-5">
                  <p className="mb-4">Quiero seguir comprando...</p>
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
