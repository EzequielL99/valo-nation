import { TrashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";

const roleList = {
  user: "usuario",
  admin: "administrador",
};

export default function UserListItem({ user }) {
  const { auth } = useAuth();
  return (
    <>
      <td>{user.usuario}</td>
      <td>{user.email}</td>
      <td>
        <span
          className={`text-capitalize border tag-role rounded-pill px-4 py-2 ${
            user.role.toLowerCase() === "admin" ? "admin" : ""
          }`}
        >
          {roleList[user.role.toLowerCase()]}
        </span>
      </td>
      <td>
        {auth.currentUser.email !== user.email && (
          <button className="btn btn-outline-danger p-3">
            <TrashIcon className="icon" />
          </button>
        )}
      </td>
    </>
  );
}
