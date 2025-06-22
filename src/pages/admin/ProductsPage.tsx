import { useEffect, useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import useValorantAPI from "../../api/useValorantAPI";
import { getProductInfo } from "../../utils";
import Loader from "../../components/Loader";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import ProductItem from "../../components/admin/ProductItem";

export default function ProductsPage() {
  const { state, dispatch } = useProduct();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { fetchWeapons } = useValorantAPI();

  useEffect(() => {
    fetchWeapons()
      .then((weaponsList) => {
        setIsLoading(false);

        // Aplicar Formato
        const products = weaponsList.map((weapon) => getProductInfo(weapon));

        dispatch({ type: "SET_PRODUCTS", payload: products });
      })
      .catch((error) => {
        console.error("Error con API:", error.message);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="mb-5 text-primary">Productos</h1>
      {isLoading && (
        <div className="container text-center">
          <Loader className="mx-auto my-4" />
          <p>Cargando productos...</p>
        </div>
      )}

      {isError && (
        <div className="text-danger text-center py-5">
          <i className="d-block fs-4">
            <ExclamationTriangleIcon className="w-25" />
          </i>
          <p className="pt-4 mb-5">
            Oops! Tuvimos algunos problemas para cargar los productos.
          </p>
          <button
            className="btn btn-outline-primary text-uppercase"
            onClick={() => setIsLoading(true)}
          >
            reintentar
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {state.products.length > 0 ? (
            <div className="row">
              {state.products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}

              {state.customProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="d-flex justify-content-center align-items-center h-100 p-0 m-0 text-center text-danger h1">
              NO HAY PRODUCTOS
            </p>
          )}
        </>
      )}
    </>
  );
}
