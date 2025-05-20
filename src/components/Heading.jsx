import Header from "./Header";

export default function Heading() {
  return (
    <header className="container-fluid header-hero position-relative">
      <Header />
      <h1 className="text-center page-title fw-bolder position-absolute translate-middle text-uppercase text-white">
        PAGE
      </h1>
    </header>
  );
}
