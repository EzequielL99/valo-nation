export default function DashboardCard({ title, number }) {
  return (
    <article className="p-4 bg-dark dashboard-card text-white rounded-4 d-flex flex-column justify-content-center align-items-center">
      <p className="fw-bold text-primary number my-1 p-0">{number}</p>
      <h3 className="fs-1 my-1 p-0">{title}</h3>
    </article>
  );
}
