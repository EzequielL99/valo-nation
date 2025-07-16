import { useTheme } from "../../hooks/useTheme";

export default function SubTotal({ description, value }) {
  const { darkMode } = useTheme();
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <p className={`${darkMode ? "text-white-50" : "text-black-50"} p-0 m-0`}>
        {description}
      </p>
      <span className={`${darkMode ? "text-white-50" : "text-black-50"} fs-1`}>${value}</span>
    </div>
  );
}
