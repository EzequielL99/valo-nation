import { useEffect, useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import useValorantAPI from "../../api/useValorantAPI";
import { getProductInfo } from "../../utils";
import Loader from "../../components/Loader";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import ProductItem from "../../components/admin/ProductItem";
import { useTheme } from "../../hooks/useTheme";
import Pagination from "../../components/shop/Pagination";
import { Helmet } from "react-helmet";

export default function ProductsPage() {
  const { dispatch, allProducts } = useProduct();
  const { darkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { fetchWeapons } = useValorantAPI();

  // Paginacion
  const [visibleProducts, setVisibleProducts] = useState([]);

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
      <Helmet>
        <title>Admin | Productos</title>
        <meta
          name="description"
          content="Crea, edita y releva el estado de los productos del sistema."
        />
      </Helmet>
      <h1 className="mb-5 text-primary text-center text-lg-start text-uppercase fw-bold">
        Productos
      </h1>
      {isLoading && (
        <div className="container text-center">
          <Loader className="mx-auto my-4" />
          <p className={darkMode ? "text-white" : "text-dark"}>
            Cargando productos...
          </p>
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
          {allProducts.length > 0 ? (
            <>
              <table
                className={`${
                  darkMode ? "bg-dark text-white" : "bg-white text-dark"
                } rounded-4 shadow bo-table-products`}
              >
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleProducts.map((product, index) => (
                    <ProductItem
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>

              <Pagination
                products={allProducts}
                setVisibleProducts={setVisibleProducts}
              />
            </>
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
