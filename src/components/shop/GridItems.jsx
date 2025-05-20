import { useEffect, useState } from "react";
import useValorantAPI from "../../api/useValorantAPI";
import ItemCard from "./ItemCard";
import Loader from "../Loader";

export default function GridItems() {
  const [weapons, setWeapons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { fetchWeapons } = useValorantAPI();

  useEffect(() => {
    fetchWeapons().then((weaponsList) => {
      setIsLoading(false);
      setWeapons(weaponsList);
    });
  }, []);

  return (
    <div className="col-12 col-md-10">
      {isLoading && <Loader className='mx-auto my-4' />}

      {!isLoading && weapons.length === 0 ? (
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
