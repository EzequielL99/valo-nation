import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export default function CategoryCard({
  title,
  description,
  image,
  navigateTo,
}) {
  const {darkMode} = useTheme();

  return (
    <div className={`${darkMode ? 'bg-dark-subtle shadow text-white' : 'bg-dark text-light'} mx-auto category-card rounded-4 px-4 py-5 d-flex flex-column`}>
      <div className="card-image mb-5 text-center">
        <img src={image} className="img-fluid" alt={title} />
      </div>
      <div className="card-info text-center">
        <h3 className="text-uppercase mb-3">{title}</h3>
        <p className="mb-4">{description}</p>
      </div>
      <Link
        to={navigateTo}
        className="btn btn-lg w-100 btn-outline-light mt-auto"
        aria-label="Ver los productos"
      >
        Ver todos
      </Link>
    </div>
  );
}
