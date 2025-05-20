import CategoryList from "../../components/shop/CategoryList";
import GridItems from "../../components/shop/GridItems";
import SearchBar from "../../components/shop/SearchBar";

export default function ShopPage() {
  return (
    <>
      <main className="container min-vh-100 bg-dark text-light rounded-3 position-relative z-2 shop-container p-5">
        <SearchBar />
        <div className="row mt-5">
          <CategoryList />
          <GridItems />
        </div>
      </main>
    </>
  );
}
