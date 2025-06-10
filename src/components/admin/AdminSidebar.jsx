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
  const [expandedMenu, setExpandedMenu] = useState(true);

  return (
    <aside className="min-vh-100">
      <nav className={`h-100 d-flex flex-column bg-light border-end shadow-sm ${expandedMenu ? 'expanded' : ''}`}>
        <div className="p-4 pb-2 d-flex justify-content-between align-items-center">
          <Link to="/" className="brand overflow-hidden p-0 text-decoration-none text-dark">
            <span className="fw-bold text-primary">VALO</span>-NATION
          </Link>
          <button className="btn p-3 rounded-2 btn-expand-menu" onClick={() => setExpandedMenu(prev => !prev)}>
            <ChevronDoubleLeftIcon className="icon" />
          </button>
        </div>

        <ul className="list-unstyled px-3">{children}</ul>

        <div className="border-top mt-auto d-flex align-items-center p-3 user-wrapper">
          <div className="icon bg-dark text-white p-4">JD</div>
          <div className="d-flex justify-content-between align-items-center ms-3 overflow-hidden user-data">
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
    <li className="rounded-2 sidebar-item">
      <NavLink to={to} className={({isActive}) => ('rounded-3 d-flex align-items-center p-3 text-decoration-none ' + (isActive ? 'text-primary' : '')) }>
        {icon}
        <span className="m-0 p-0 ms-3 text">{text}</span>
      </NavLink>
    </li>
  );
}
/* ---------------------------------- EMLV ---------------------------------- */
