export default function WeaponItem({ weapon, addToCart }) {
  const { uuid, displayIcon, displayName, shopData } = weapon;

  const objWeapon = {
    id: uuid, 
    img: displayIcon,
    name: displayName,
    category: shopData !== null ? shopData.category : 'Knife',
    price: shopData !== null ? shopData.cost : 0
  }

  return (
    <div className="col-6 col-md-4 p-md-3 mt-4 mt-md-0">
      <div className="weapon-card border border-light-subtle rounded-4 p-3 p-md-4">
        <div className="d-flex justify-content-end align-items-center">
          <span className="tag-category fs-6 px-3 py-2 border border-light-subtle rounded-pill">
            {objWeapon.category}
          </span>
        </div>
        <div className="weapon-img mb-4 position-relative">
          <span className="rounded-circle position-absolute top-50 start-50 translate-middle z-1"></span>
          <img
            src={objWeapon.img}
            className="img-fluid z-2 position-absolute top-50 start-50"
            alt=""
          />
        </div>
        <div className="weapon-info">
          <div className="d-md-flex text-center justify-content-between align-items-center mb-4">
            <h3 className="p-0 m-0 mb-2 mb-md-0 text-uppercase">{objWeapon.name}</h3>
            <p className="price text-primary h1 fw-bold p-0 m-0">
              {objWeapon.price === 0 ? 'FREE' : objWeapon.price}
            </p>
          </div>
          <div className="actions mb-md-0">
            <button className="btn btn-lg btn-primary w-100 mb-3" onClick={() => addToCart(objWeapon)}>
              Agregar al carrito
            </button>
            <a href="#" className="d-block fs-4 text-decoration-none text-center">
              Ver más
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
