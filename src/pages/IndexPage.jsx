import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";

const itemCategories = [
  {
    title: "MELEE",
    description: "Armamento cuerpo a cuerpo definitivo",
    img: "./img/melee-icon.png",
    urlTo: '/shop'
  },
  {
    title: "RIFLES DE ASALTO",
    description: "Potencia, cadencia y precisión. Los mejores AR.",
    img: "./img/ar-icon.png",
    urlTo: '/shop'
  },
  {
    title: "PISTOLAS",
    description: "Eficiente: Económicas y Letales.",
    img: "./img/pistol-icon.png",
    urlTo: '/shop'
  },
];

export default function IndexPage() {
  return (
    <>
      <section className="container-fluid index-hero d-flex flex-column align-items-center justify-content-center">
        <div className="container text-white text-center">
          <h1 className="text-uppercase fw-bold">Domina la batalla</h1>
          <p>Adquiere las mejores réplicas del armamento de Valorant.</p>
          <Link to="/shop" className="btn btn-lg btn-primary">
            Explorar Tienda
          </Link>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="text-center text-uppercase text-primary">Productos Destacados</h2>
        <div className="row mt-4">
          {itemCategories.map((item) => (
            <div className="col-12 p-3" key={item.title}>
              <CategoryCard
                title={item.title}
                description={item.description}
                image={item.img}
                navigateTo={item.urlTo}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="container-fluid bg-dark weapon-details">
        <div className="container img-weapon">
          <div className="ripple">
            <p className="ripple-tooltip" title='Armamento con accesorios'></p>
          </div>
        </div>
      </section>
    </>
  );
}
