import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  return (
    <div className="shadow rounded-3 bg-white product-item d-flex align-items-center gap-2 mb-5 px-4 py-3">
      <div className="img">
        <img src={product.img} alt={product.name} className="img-fluid" />
      </div>
      <h3 className="m-0 p-0 flex-grow-1 text-center">{product.name}</h3>
      <p className="m-0 p-0 flex-grow-1">$ {product.price}</p>
      <div className="d-flex align-items-center gap-3">
        <Link to={`/admin/products/${product.id}/edit`} className="btn btn-outline-info p-3"> 
          <PencilSquareIcon className="icon" />
        </Link>
        <button className="btn btn-outline-danger p-3">
          <TrashIcon className="icon" />
        </button>
      </div>
    </div>
  );
}
