import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

export default function ProductItem({ product, index }) {
  const { state, dispatch } = useProduct();
  const { darkMode } = useTheme();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsHidden(state.hiddenProducts.includes(product.id));
  }, [state.hiddenProducts]);

  const handleHideProduct = () => {
    dispatch({ type: "HIDE_PRODUCT", payload: product.id });
  };

  const handleUnhideProduct = () => {
    dispatch({ type: "UNHIDE_PRODUCT", payload: product.id });
  };

  return (
    <tr>
      <td data-label="#">
        {index}
      </td>
      <td data-label="Producto">
        <div
          className="img"
          style={{
            backgroundImage: `url(${product.img})`,
          }}
        ></div>
      </td>
      <td data-label="Descripcion">
        <p>{product.name}</p>
      </td>
      <td data-label="Precio">$ {product.price}</td>
      <td data-label="Estado">
        <span
          className={`p-2 px-4 rounded-pill ${
            isHidden
              ? (darkMode ? 'bg-danger' : 'text-danger border border-danger')
              : (darkMode ? 'bg-success' : 'text-success border border-success')
          }`}
        >
          {isHidden ? "OCULTO" : "ACTIVO"}
        </span>
      </td>

      <td data-label="Acciones">
        <div className="d-flex align-items-center gap-3">
          <Link
            to={`/admin/products/${product.id}/edit`}
            className={`btn ${darkMode ? 'btn-info' : 'btn-outline-info'} p-2`}
            aria-label="Editar producto"
          >
            <PencilSquareIcon className="icon" />
          </Link>
          {!isHidden ? (
            <button
              className={`btn ${darkMode ? 'btn-danger' : 'btn-outline-danger'} p-2`}
              onClick={() => handleHideProduct()}
              aria-label="Ocultar producto"
            >
              <EyeSlashIcon className="icon" />
            </button>
          ) : (
            <button
              className={`btn ${darkMode ? 'btn-success' : 'btn-outline-success'} p-2`}
              onClick={() => handleUnhideProduct()}
              aria-label="Mostrar producto"
            >
              <EyeIcon className="icon" />
            </button>
          )}
        </div>
      </td>

      <td className="blank"></td>
    </tr>
  );
}
