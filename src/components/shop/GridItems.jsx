import { useEffect, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import useValorantAPI from "../../api/useValorantAPI";
import ItemCard from "./ItemCard";
import Loader from "../Loader";
import { getProductInfo } from "../../utils";
import { useProduct } from "../../hooks/useProduct";
import Pagination from "./Pagination";
import { useTheme } from "../../hooks/useTheme";
import { useSearchParams } from "react-router-dom";

export default function GridItems() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { dispatch, shopProducts } = useProduct();
  const { darkMode } = useTheme();

  // Paginacion
  const [visibleProducts, setVisibleProducts] = useState([]);

  const { fetchWeapons } = useValorantAPI();

  useEffect(() => {
    // Todos los productos
    if (!searchQuery || searchQuery.trim() === "") {
      setProducts(shopProducts);
    } else {
      setProducts(
        shopProducts.filter((product) => product.category == searchQuery)
      );
    }
  }, [searchQuery, shopProducts]);

  useEffect(() => {
    if (isError) setIsError(!isError);

    fetchWeapons()
      .then((weaponsList) => {
        // Aplicar Formato
        const products = weaponsList.map((weapon) => getProductInfo(weapon));

        dispatch({ type: "SET_PRODUCTS", payload: products });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error con API:", error.message);
        setIsError(true);
        setIsLoading(false);
      });
  }, [isLoading]);

  return (
    <div className="col-12 col-lg-10">
      {isLoading && (
        <div className="container text-center my-5">
          <Loader className="mx-auto mb-4" />
          <p>Consultando productos...</p>
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
          {shopProducts.length === 0 ? (
            <p className="d-flex justify-content-center align-items-center h-100 p-0 m-0 text-center text-danger h1">
              NO HAY PRODUCTOS
            </p>
          ) : (
            <>
              <div className={`${darkMode ? "dark" : ""} row`}>
                {visibleProducts.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>

              <Pagination
                products={products}
                setVisibleProducts={setVisibleProducts}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
