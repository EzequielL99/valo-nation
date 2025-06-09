import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SidebarDropdown({ children, title, icon }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <li>
      <button
        className={`btn-dropdown ${showDropdown ? "opened" : ""}`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {icon}
        {title}
        <span>
          <ChevronDownIcon className="icon dropdown-icon" />
        </span>
      </button>
      <ul className={`sub-menu ${showDropdown ? "show" : ""}`}>{children}</ul>
    </li>
  );
}
