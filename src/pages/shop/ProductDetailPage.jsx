import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";

import ProductInfoSection from "../../components/shop/ProductInfoSection";
import ProductCartController from "../../components/shop/ProductCartController";
import Loader from "../../components/Loader";

import useValorantAPI from "../../api/useValorantAPI";

import { getProductInfo } from "../../utils/index";

export default function ProductDetailPage() {
  const { id } = useParams();

  const [weaponInfo, setWeaponInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { getWeaponById } = useValorantAPI();

  useEffect(() => {
    setIsError(false);

    getWeaponById(id)
      .then((weaponInfo) => {
        const objProduct = getProductInfo(weaponInfo);

        setIsLoading(false);
        setWeaponInfo(objProduct);
      })
      .catch((error) => {
        console.error("Product Detail Page component error: ", error.message);
        setIsLoading(false);
        setIsError(true);
      });
  }, [isLoading]);

  return (
    <main className="py-5 page-product-detail">
      {isLoading && (
        <div className="container text-center min-vh-100 d-flex flex-column justify-content-center">
          <Loader className="mx-auto my-4" />
          <p className="h2">Consultando datos del producto...</p>
        </div>
      )}
      {!isLoading && !isError && (
        <>
          <div className="container py-5">
            <div className="row">
              <div className="col-12">
                <Link
                  to="/shop"
                  className="link-primary text-decoration-none d-flex align-items-center gap-1 text-uppercase"
                >
                  <i>
                    <ChevronDoubleLeftIcon className="icon" />
                  </i>
                  <span>Volver</span>
                </Link>
              </div>
            </div>
            <div className="row py-3">
              <div className="col-md-6">
                <div className="product-image bg-dark-subtle p-3 rounded-3 h-100 d-grid justify-content-center align-items-center">
                  <img
                    src={weaponInfo.img}
                    className="img-fluid"
                    alt={weaponInfo.name}
                  />
                </div>
              </div>
              <div className="col-md-6 ps-5">
                <div className="product-details mb-5">
                  <p className="fs-5 border d-inline-block border-1 border-primary text-primary rounded-pill px-3 py-2 mb-3">
                    {weaponInfo.category}
                  </p>
                  <h2 className="h1 fw-bolder mb-4 title">{weaponInfo.name}</h2>
                  <p className="h1 fw-bold mb-4 price">${weaponInfo.price}</p>

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

          <div className="container py-5">
            <h2 className="h1 fw-bolder text-primary text-center mb-5">
              ASPECTOS ESPECIALES
            </h2>
            {weaponInfo.skins.length > 0 ? (
              <div className="row">
                {weaponInfo.skins.map((skinData) => (
                  <div className="col-3" key={skinData.uuid}>
                    <div className="card">
                      <div
                        className="card-img-top bg-dark-subtle text-center d-flex align-items-center justify-content-center overflow-hidden"
                        style={{ minHeight: "20rem" }}
                      >
                        <img
                          className="img-fluid w-75"
                          src={skinData.displayIcon}
                          alt={skinData.displayName}
                        />
                      </div>
                      <div className="card-body">
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
