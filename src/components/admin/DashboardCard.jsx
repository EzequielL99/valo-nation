import {useTheme} from '../../hooks/useTheme';

export default function DashboardCard({ title, number }) {
  const {darkMode} = useTheme();

  return (
    <article className={`${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'} p-4 mb-5 shadow bo-dashboard-card rounded-4 d-flex flex-column justify-content-center align-items-center`}>
      <p className="fw-bold text-primary number my-1 p-0">{number}</p>
      <h3 className="fs-1 my-1 p-0 text-center">{title}</h3>
    </article>
  );
}
