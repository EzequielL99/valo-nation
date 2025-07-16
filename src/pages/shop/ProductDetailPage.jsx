import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";

import ProductInfoSection from "../../components/shop/ProductInfoSection";
import ProductCartController from "../../components/shop/ProductCartController";
import Loader from "../../components/Loader";

import { useProduct } from "../../hooks/useProduct";
import { useTheme } from "../../hooks/useTheme";
import { Helmet } from "react-helmet";

export default function ProductDetailPage() {
  const { id } = useParams();

  const [weaponInfo, setWeaponInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { state } = useProduct();
  const { darkMode } = useTheme();

  useEffect(() => {
    setIsError(false);

    try {
      // Buscar entre productos MODIFICADOS
      let item = state.modifiedProducts.find((item) => item.id == id);

      if (!item) {
        // Buscar entre productos CUSTOM
        item = state.customProducts.find((item) => item.id == id);

        if (!item) {
          // Buscar entre productos API
          item = state.products.find((item) => item.id == id);

          if (!item) throw new Error("No se encontró el producto solicitado.");
        }
      }

      setIsLoading(false);
      setWeaponInfo(item);
    } catch (error) {
      console.error("Product Detail Page - Error: ", error.message);
      setIsLoading(false);
      setIsError(true);
    }
  }, [isLoading]);

  return (
    <main
      className={`${darkMode ? "dark" : ""} py-md-5 p-3 page-product-detail`}
    >
      <Helmet>
        <title>Producto - {weaponInfo.name}</title>
        <meta
          name="description"
          content={`Detalle del producto ${weaponInfo.name}`}
        />
      </Helmet>
      {isLoading && (
        <div className="container text-center min-vh-100 d-flex flex-column justify-content-center">
          <Loader className="mx-auto my-4" />
          <p className="h2">Consultando datos del producto...</p>
        </div>
      )}
      {!isLoading && !isError && (
        <>
          <div className="container py-md-5">
            <div className="row">
              <div className="col-12">
                <Link
                  to="/shop"
                  className="link-primary text-decoration-none d-flex align-items-center gap-1 text-uppercase"
                  aria-label="Volver a la tienda"
                >
                  <i>
                    <ChevronDoubleLeftIcon className="icon" />
                  </i>
                  <span>Volver</span>
                </Link>
              </div>
            </div>
            <div className="row py-3">
              <div className="col-md-6 d-md-flex align-items-md-center justify-content-md-center col-img">
                <div
                  className={`${
                    darkMode ? "bg-dark-subtle" : "bg-white"
                  } product-image p-3 rounded-3 h-100 d-grid justify-content-center align-items-center`}
                >
                  <img
                    src={weaponInfo.img}
                    className="img-fluid"
                    alt={weaponInfo.name}
                  />
                </div>
              </div>
              <div
                className={`col-md-6 ps-md-5 py-3 ${
                  darkMode ? "text-light" : ""
                }`}
              >
                <div className="product-details mb-5">
                  <p className="fs-5 category border d-inline-block border-1 border-primary text-primary rounded-pill px-3 py-2 mb-3">
                    {weaponInfo.category}
                  </p>
                  <h2 className="fw-bolder text-center text-lg-start mb-2 title">
                    {weaponInfo.name}
                  </h2>
                  <p className="fw-bold mb-4 text-center text-lg-start price text-primary fw-bolder">
                    ${weaponInfo.price}
                  </p>

                  <ProductCartController weaponInfo={weaponInfo} />
                </div>

                {weaponInfo.stats ? (
                  <ProductInfoSection weaponStats={weaponInfo.stats} />
                ) : (
                  <p>No se encontraron detalles del armamento</p>
                )}
              </div>
            </div>
          </div>

          <div
            className={`container py-md-5 py-3 ${darkMode ? "text-light" : ""}`}
          >
            <h2 className="h1 fw-bolder text-primary text-center mb-5">
              ASPECTOS ESPECIALES
            </h2>
            {weaponInfo.skins?.length > 0 ? (
              <div className="row">
                {weaponInfo.skins.map((skinData) => (
                  <div className="col-3" key={skinData.uuid}>
                    <div
                      className={`${
                        darkMode ? "bg-dark text-white" : "bg-white text-dark"
                      } card`}
                      aria-label="Diseño personalizado del armamento"
                    >
                      <div
                        className="card-img-top text-center d-flex align-items-center justify-content-center overflow-hidden"
                        style={{ minHeight: "20rem" }}
                      >
                        <img
                          className="img-fluid w-75"
                          src={skinData.displayIcon}
                          alt={skinData.displayName}
                        />
                      </div>
                      <div
                        className={`${
                          darkMode ? "bg-dark-subtle" : "bg-light"
                        } card-body`}
                      >
                        <h4 className="card-title">{skinData.displayName}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">
                Aún no se han desarrollado aspectos especiales para este
                armamento.
              </p>
            )}
          </div>
        </>
      )}
    </main>
  );
}
