import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function CategoryList() {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <>
      <div className="col-12 d-lg-none d-flex justify-content-end justify-content-md-start mb-md-3">
        <button
          className="btn btn-outline-light d-flex gap-1 align-items-center"
          onClick={() => setShowFilter(!showFilter)}
        >
          <Bars3CenterLeftIcon className="icon me-2" />
          Filtros
        </button>
      </div>
      <div className="col col-lg-2">
        <div className={`categories-wrapper ${showFilter ? "active" : ''}`}>
          <h3 className="h2 mb-3 my-4 text-center text-md-start">Categorías</h3>
          <div
            className="d-flex flex-column flex-md-row gap-2 justify-content-md-between category-list"
            role="group"
            aria-label="Vertical button group"
          >
            <button type="button" className="btn text-start text-white py-3 text-center text-md-start">
              Todas las armas
            </button>
            <button type="button" className="btn text-start text-white py-3 text-center text-md-start">
              Fusil de asalto
            </button>
            <button type="button" className="btn text-start text-white py-3 text-center text-md-start">
              Subfusil
            </button>
            <button type="button" className="btn text-start text-white py-3 text-center text-md-start">
              Armas pesadas
            </button>
            <button type="button" className="btn text-start text-white py-3 text-center text-md-start">
              Francotirador
            </button>
            <button type="button" className="btn text-start text-white py-3 text-center text-md-start">
              Pistolas
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
