import Footer from "./components/Footer";
import Header from "./components/Header";

export default function ValoNationApp() {
  return (
    <>
      <div className="container-fluid header-hero position-relative">
        <Header />
        <h1 className="text-center page-title fw-bolder bottom-0 start-50 position-absolute translate-middle-x">SHOP</h1>
      </div>

      <Footer />
    </>
  );
}
