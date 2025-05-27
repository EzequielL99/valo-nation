export default function ProductInfoSection({ weaponStats }) {
  return (
    <div className="product-info">
      <h3 className="h1 text-uppercase fw-bold text-primary mb-3">Caracteristicas</h3>
      <ul className="list-unstyled text-dark">
        <li className="mb-2"><span className="fw-bold">Tiempo equipado:</span> {weaponStats.equipTimeSeconds}</li>
        <li className="mb-2"><span className="fw-bold">Cadencia:</span> {weaponStats.fireRate}</li>
        <li className="mb-2"><span className="fw-bold">Precisión:</span> {weaponStats.firstBulletAccuracy}</li>
        <li className="mb-2"><span className="fw-bold">Cargador:</span> {weaponStats.magazineSize}</li>
        <li className="mb-2"><span className="fw-bold">Tiempo de recarga:</span> {weaponStats.reloadTimeSeconds}s</li>
      </ul>
    </div>
  );
}
