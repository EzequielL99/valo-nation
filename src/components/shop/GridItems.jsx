import { useEffect, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import useValorantAPI from "../../api/useValorantAPI";
import ItemCard from "./ItemCard";
import Loader from "../Loader";

export default function GridItems() {
  const [weapons, setWeapons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { fetchWeapons } = useValorantAPI();

  useEffect(() => {
    if(isError) setIsError(!isError);

    fetchWeapons()
      .then((weaponsList) => {
        setIsLoading(false);
        setWeapons(weaponsList);
      })
      .catch((error) => {
        console.error("Error con API:", error.message);
        setIsError(true);
        setIsLoading(false);
      });
  }, [isLoading]);

  return (
    <div className="col-12 col-md-10">
      {isLoading && <Loader className="mx-auto my-4" />}

      {isError && (
        <div className="text-danger text-center py-5">
          <i className="d-block fs-4">
            <ExclamationTriangleIcon className="w-25" />
          </i>
          <p className="pt-4 mb-5">
            Oops! Tuvimos algunos problemas para cargar los productos.
          </p>
          <button className="btn btn-outline-primary text-uppercase" onClick={() => setIsLoading(true)}>reintentar</button>
        </div>
      )}

      {!isLoading && !isError && weapons.length === 0 ? (
        <p className="d-flex justify-content-center align-items-center h-100 p-0 m-0 text-center text-danger h1">
          NO HAY PRODUCTOS
        </p>
      ) : (
        <div className="row">
          {weapons.map((weapon) => (
            <ItemCard key={weapon.uuid} weapon={weapon} />
          ))}
        </div>
      )}
    </div>
  );
}
