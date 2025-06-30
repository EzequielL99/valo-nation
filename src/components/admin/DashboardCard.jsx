export default function DashboardCard({ title, number }) {
  return (
    <article className="p-4 bg-white shadow bo-dashboard-card text-dark rounded-4 d-flex flex-column justify-content-center align-items-center">
      <p className="fw-bold text-primary number my-1 p-0">{number}</p>
      <h3 className="fs-1 my-1 p-0 text-center">{title}</h3>
    </article>
  );
}
