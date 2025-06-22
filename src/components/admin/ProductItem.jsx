import { EyeIcon, EyeSlashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useEffect, useState } from "react";

export default function ProductItem({ product }) {
  const { state, dispatch } = useProduct();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsHidden(state.hiddenProducts.includes(product.id))
  }, [state.hiddenProducts])

  const handleHideProduct = () => {
    dispatch({type: 'HIDE_PRODUCT', payload: product.id})
  }

  const handleUnhideProduct = () => {
    dispatch({type: 'UNHIDE_PRODUCT', payload: product.id})
  }

  return (
    <div className="shadow rounded-3 bg-white product-item d-flex align-items-center gap-2 mb-5 px-4 py-3">
      <div className="img">
        <img src={product.img} alt={product.name} className="img-fluid" />
      </div>
      <h3 className="m-0 p-0 flex-grow-1 text-center">{product.name}</h3>
      <p className="m-0 p-0">$ {product.price}</p>
      <div className="flex-grow-1 text-center">
        <span className={`border p-2 px-4 rounded-pill ${isHidden ? 'text-danger border-danger' : 'text-success border-success'}`}>
          {isHidden ? 'OCULTO' : 'ACTIVO'}
        </span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <Link to={`/admin/products/${product.id}/edit`} className="btn btn-outline-info p-3"> 
          <PencilSquareIcon className="icon" />
        </Link>
        {!isHidden ? (
        <button className="btn btn-outline-danger p-3" onClick={() => handleHideProduct()}>
          <EyeSlashIcon className="icon" />
        </button>
        ) : (
        <button className="btn btn-outline-success p-3" onClick={() => handleUnhideProduct()}>
          <EyeIcon className="icon" />
        </button>
        )}
      </div>
    </div>
  );
}
