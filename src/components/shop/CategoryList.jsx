import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useSearchParams } from "react-router-dom";

const categories = [
  {
    key: "Heavy Weapons",
    value: "Arma pesada",
  },
  {
    key: "Rifles",
    value: "Rifle de asalto",
  },
  {
    key: "Shotguns",
    value: "Escopetas",
  },
  {
    key: "Pistols",
    value: "Pistolas",
  },
  {
    key: "SMGs",
    value: "Ametralladoras",
  },
  {
    key: "Sniper Rifles",
    value: "Francotirador",
  },
  {
    key: "Melee",
    value: "Cuerpo a cuerpo",
  },
];

export default function CategoryList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [showFilter, setShowFilter] = useState(false);
  const { darkMode } = useTheme();

  const handleSearch = (filterValue) => {
    setSearchParams({ q: filterValue });
  };

  return (
    <>
      <div className="col-12 d-lg-none d-flex justify-content-end justify-content-md-start mb-md-3">
        <button
          className={`${
            darkMode ? "btn-outline-light" : "btn-outline-dark"
          } btn d-flex gap-1 align-items-center justify-content-center w-100`}
          onClick={() => setShowFilter(!showFilter)}
          aria-label="Filtro de productos"
        >
          <Bars3CenterLeftIcon className="icon me-2" />
          Filtros
        </button>
      </div>
      <div className="col col-lg-2">
        <section
          className={`${darkMode ? "dark" : ""} categories-wrapper ${
            showFilter ? "active" : ""
          }`}
          aria-label="Filtros"
        >
          <h3 className="h2 mb-3 my-4 text-center text-lg-start">Categorías</h3>
          <div
            className="d-flex flex-column flex-md-row flex-lg-column gap-2 justify-content-md-between category-list"
            role="group"
            aria-label="Vertical button group"
          >
            <button
              type="button"
              className="btn text-start py-3 text-center text-md-start"
              onClick={() => handleSearch("")}
              aria-label="Filtro: Todos los productos"
            >
              Todas las armas
            </button>
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={`${searchQuery === cat.key ? 'active' : ''} btn text-start py-3 text-center text-md-start`}
                onClick={() => handleSearch(cat.key)}
                aria-label={`Filtro: ${cat.value}`}
              >
                {cat.value}
              </button>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
