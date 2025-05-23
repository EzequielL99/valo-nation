import { Link } from "react-router-dom";

export default function CategoryCard({
  title,
  description,
  image,
  navigateTo,
}) {
  return (
    <div className="mx-auto category-card bg-dark text-light rounded-2 px-4 py-5">
      <div className="card-image mb-5 text-center">
        <img src={image} className="img-fluid" alt={title} />
      </div>
      <div className="card-info text-center">
        <h3 className="text-uppercase mb-3">{title}</h3>
        <p className="mb-4">{description}</p>
        <Link to={navigateTo} className="btn btn-lg w-100 btn-outline-light">
          Ver todos
        </Link>
      </div>
    </div>
  );
}
