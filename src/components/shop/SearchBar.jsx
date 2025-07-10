import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../hooks/useTheme";

export default function SearchBar() {
  const { darkMode } = useTheme();

  return (
    <div className={`${darkMode ? 'dark text-light' : ''} d-md-flex search-bar justify-content-between align-items-center`}>
      <p className="p-0 m-0 h1 text-center text-md-start mb-4 mb-md-0">Consulta tu armamento</p>
      <form action="#" className="rounded-pill border p-2 d-flex justify-content-between align-items-center">
        <div className="d-inline-flex align-items-center justify-content-between gap-1 ps-1">
          <MagnifyingGlassIcon className="icon" />
          <input
            type="text"
            className="bg-transparent border-0"
            placeholder="Buscar armamento"
          />
        </div>
        <button type="submit" className="btn btn-lg btn-outline-primary rounded-pill">
          Buscar
        </button>
      </form>
    </div>
  );
}
