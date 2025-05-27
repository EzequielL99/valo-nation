import { useValoNation } from "../../hooks/useValoNation";
import { Link } from "react-router-dom";
import { getProductInfo } from "../../utils";

export default function ItemCard({ weapon }) {
  const { cartDispatch } = useValoNation();
  const objProduct = getProductInfo(weapon);

  return (
    <div className="col-6 col-md-4 py-md-3 mt-4 mt-md-0">
      <div className="weapon-card border border-dark-subtle rounded-4 p-3">
        <div className="d-flex justify-content-end align-items-center">
          <span className="tag-category fs-6 px-3 py-2 border border-dark-subtle rounded-pill">
            {objProduct.category}
          </span>
        </div>
        <div className="weapon-img mb-4 position-relative">
          <span className="rounded-circle position-absolute top-50 start-50 translate-middle z-1"></span>
          <img
            src={objProduct.img}
            className="img-fluid z-2 position-absolute top-50 start-50"
            alt=""
          />
        </div>
        <div className="weapon-info">
          <div className="d-md-flex text-center justify-content-between align-items-center mb-4">
            <h3 className="p-0 m-0 mb-2 mb-md-0 text-uppercase">
              {objProduct.name}
            </h3>
            <p className="price text-primary h1 fw-bold p-0 m-0">
              ${objProduct.price}
            </p>
          </div>
          <div className="actions mb-md-0">
            <button
              className="btn btn-lg btn-primary w-100 mb-3"
              onClick={() =>
                cartDispatch({
                  type: "add-to-cart",
                  payload: { item: objProduct },
                })
              }
            >
              Agregar al carrito
            </button>
            <Link
              to={`/shop/${objProduct.id}`}
              className="d-block fs-4 text-decoration-none text-center link-primary"
            >
              Ver más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
