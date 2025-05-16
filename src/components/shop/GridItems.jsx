import { useEffect, useState } from "react";
import useValorant from "../../api/useValorant";
import WeaponItem from "./WeaponItem";

export default function GridItems({addToCart}) {
  const [weapons, setWeapons] = useState([]);

  const { fetchWeapons } = useValorant();

  useEffect(() => {
    fetchWeapons().then((weaponsList) => {
      setWeapons(weaponsList);
    });
  }, []);

  return (
    <div className="col-12 col-md-10">
      {weapons.length === 0 ? (
        <p className="d-flex justify-content-center align-items-center h-100 p-0 m-0 text-center text-danger h1">
          NO HAY PRODUCTOS
        </p>
      ) : (
        <div className="row">
          {weapons.map((weapon) => (
            <WeaponItem key={weapon.uuid} weapon={weapon} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
