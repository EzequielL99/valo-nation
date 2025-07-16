import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../hooks/useTheme";
import { toast } from "react-toastify";
import { useState } from "react";

export default function SearchBar() {
  const { darkMode } = useTheme();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(searchValue.trim() === '') return;

    console.warn('BUSQUEDA EN DESARROLLO PROFE JEJ');

    toast.info(`Buscando armamento ${searchValue}`, {
      autoClose: 1200,
    });
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div
      className={`${
        darkMode ? "dark text-light" : ""
      } d-md-flex search-bar justify-content-between align-items-center`}
    >
      <p className="p-0 m-0 h1 text-center text-md-start mb-4 mb-md-0">
        Consulta tu armamento
      </p>
      <form
        onSubmit={handleSubmit}
        className="d-md-none flex-column d-flex justify-content-between align-items-center"
        noValidate
      >
        <div
          className={`${
            darkMode ? "bg-dark-subtle" : "bg-white"
          } px-5 py-2 d-inline-flex 
          align-items-center justify-content-center gap-2 w-100`}
        >
          <MagnifyingGlassIcon className="icon" />
          <input
            name="inputSearch"
            type="text"
            value={searchValue}
            onChange={handleChange}
            className="bg-transparent"
            placeholder="Buscar armamento"
          />
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-outline-primary mt-3 w-100"
        >
          Buscar
        </button>
      </form>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="d-none d-md-flex rounded-pill border p-2 justify-content-between align-items-center"
      >
        <div className="d-inline-flex align-items-center justify-content-between gap-1 ps-1">
          <MagnifyingGlassIcon className="icon" />
          <input
            name="inputSearch"
            type="text"
            value={searchValue}
            onChange={handleChange}
            className="bg-transparent border-0"
            placeholder="Buscar armamento"
          />
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-outline-primary rounded-pill"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
