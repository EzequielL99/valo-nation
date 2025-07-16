import { Helmet } from "react-helmet";
import CategoryList from "../../components/shop/CategoryList";
import GridItems from "../../components/shop/GridItems";
import SearchBar from "../../components/shop/SearchBar";
import { useTheme } from "../../hooks/useTheme";

export default function ShopPage() {
  const { darkMode } = useTheme();

  return (
    <>
      <Helmet>
        <title>Tienda de Valo-Nation</title>
        <meta
          name="description"
          content="Compra fácil y seguro las mejores réplicas de armamento"
        />
      </Helmet>
      <section className="container-fluid hero d-flex flex-column align-items-center justify-content-center">
        <div className="container text-white text-center">
          <h1 className="text-uppercase fw-bold">Tienda</h1>
        </div>
      </section>

      <main
        className={`${
          darkMode ? "bg-dark" : "bg-light"
        } container min-vh-100 rounded-3 position-relative z-2 shop-container p-5`}
      >
        <SearchBar />
        <div className="row mt-4">
          <CategoryList />
          <GridItems />
        </div>
      </main>
    </>
  );
}
