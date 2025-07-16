import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import ProductCartController from "./ProductCartController";

export default function ItemCard({ item }) {
  const { darkMode } = useTheme();

  return (
    <div className="col-12 col-md-6 col-lg-4 py-md-3 mt-4 mt-md-0">
      <div className={`weapon-card ${darkMode ? 'bg-dark-subtle shadow-sm' : 'border border-dark-subtle'} rounded-4 p-3 p-md-5`}>
        <div className="d-flex justify-content-end align-items-center">
          <span className="tag-category fs-6 px-3 py-2 border border-dark-subtle rounded-pill">
            {item.category}
          </span>
        </div>
        <div className="weapon-img mb-4 position-relative">
          <span className="rounded-circle position-absolute top-50 start-50 translate-middle z-1"></span>
          <img
            src={item.img}
            className="img-fluid z-2 position-absolute top-50 start-50"
            alt=""
          />
        </div>
        <div className="weapon-info">
          <div className="d-md-flex text-center justify-content-between align-items-center mb-4">
            <h3 className="p-0 m-0 mb-2 mb-md-0 text-uppercase text-nowrap">
              {item.name.length > 10
                ? item.name.substring(0, 9) + "..."
                : item.name}
            </h3>
            <p className="price text-primary h1 fw-bold p-0 m-0">
              ${item.price}
            </p>
          </div>
          <div className="actions mb-md-0">
            <ProductCartController weaponInfo={item}/>
            <Link
              to={`/shop/${item.id}`}
              className="d-block fs-4 mt-3 mb-2 text-decoration-none text-center link-primary"
            >
              Ver más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
