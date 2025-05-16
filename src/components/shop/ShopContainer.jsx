import CategoryList from "./CategoryList";
import GridItems from "./GridItems";
import SearchBar from "./SearchBar";

export default function ShopContainer({cartDispatch}) {
  return (
    <div className="container min-vh-100 bg-dark rounded-3 position-relative z-2 shop-container p-5">
      <SearchBar />
      <div className="row mt-5">
        <CategoryList />
        <GridItems cartDispatch={cartDispatch} />
      </div>
    </div>
  )
}
