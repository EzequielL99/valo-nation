import { Link, NavLink } from "react-router-dom";
import {
  HomeIcon,
  ArchiveBoxIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  SparklesIcon,
  UsersIcon,
  ChevronDoubleLeftIcon,
  RectangleGroupIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function AdminSidebar({ children }) {
  const [expandSidebar, setExpandSidebar] = useState(true);

  return (
    <aside className="min-vh-100">
      <nav className="h-100 d-flex flex-column bg-light border-end shadow-sm">
        <div className="p-4 pb-2 d-flex justify-content-between align-items-center">
          <Link to="/" className="brand p-0 text-decoration-none text-dark">
            <span className="fw-bold text-primary">VALO</span>-NATION
          </Link>
          <button className="btn p-2 rounded-2">
            <ChevronDoubleLeftIcon className="icon" />
          </button>
        </div>

        <ul className="list-unstyled px-3">{children}</ul>

        <div className="border-top mt-auto d-flex align-items-center p-3">
          <div className="icon bg-dark text-white p-4">JD</div>
          <div className="d-flex justify-content-between align-items-center ms-3">
            <div className="pe-5 me-5 d-flex flex-column justify-content-center">
              <h4 className="fw-bold m-0 p-0">John Doe</h4>
              <span className="fs-6 text-black-50">admin@admin.com</span>
            </div>
            <EllipsisVerticalIcon className="icon" />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function AdminSidebarItem({ icon, text, to }) {
  return (
    <li className="rounded-2">
      <NavLink to={to} className={({isActive}) => ('d-flex align-items-center py-2 px-3' + (isActive ? 'text-primary' : '')) }>
        {icon}
        <span>{text}</span>
      </NavLink>
    </li>
  );
}
/* ---------------------------------- EMLV ---------------------------------- */
