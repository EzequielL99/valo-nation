import Header from "./Header";

export default function Heading({ title, cart, deleteFromCart, clearCart }) {
  return (
    <header className="container-fluid header-hero position-relative">
      <Header cart={cart} deleteFromCart={deleteFromCart} clearCart={clearCart} />
      <h1 className="text-center page-title fw-bolder position-absolute translate-middle text-uppercase">
        {title}
      </h1>
    </header>
  );
}
