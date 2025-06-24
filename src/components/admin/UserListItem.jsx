import { TrashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const roleList = {
  user: "usuario",
  admin: "administrador",
};

export default function UserListItem({ user }) {
  const { auth, authDispatch } = useAuth();

  const handleDeleteUser = () => {
    authDispatch({ type: "delete", payload: { email: user.email } });
    toast.info('Usuario eliminado', {
      autoClose: 1300
    });
  };
  return (
    <>
      <td>{user.username}</td>
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
          <button
            className="btn btn-outline-danger p-3"
            onClick={handleDeleteUser}
          >
            <TrashIcon className="icon" />
          </button>
        )}
      </td>
    </>
  );
}
