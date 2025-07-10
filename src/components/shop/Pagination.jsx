import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../hooks/useTheme";

const itemsPerPage = 9;

export default function Pagination({ products, setVisibleProducts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { darkMode } = useTheme();

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    setVisibleProducts(
      products.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center my-5 pagination">
      <button
        className="btn btn-outline-primary p-2"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="icon" />
      </button>

      <div className="list-unstyled d-flex gap-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            className={`btn ${
              darkMode ? "btn-outline-light" : "btn-outline-dark"
            } px-3 py-2 ${i + 1 === currentPage ? "active" : ""}`}
            key={i + 1}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        className="btn btn-outline-primary p-2"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon className="icon" />
      </button>
    </div>
  );
}
