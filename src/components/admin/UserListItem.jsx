import { TrashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { toast } from "react-toastify";

const roleList = {
  user: "usuario",
  admin: "administrador",
};

export default function UserListItem({ user }) {
  const { auth, deleteUser } = useAuth();
  const { darkMode } = useTheme();

  const handleDeleteUser = () => {
    const response = deleteUser(user.email);

    console.log(response);

    if (response.success) {
      toast.info("Usuario eliminado", {
        autoClose: 1300,
      });
    } else {
      toast.error(response.error, {
        autoClose: 1200,
      });
    }
  };
  return (
    <>
      <td data-label="Usuario">{user.username}</td>
      <td data-label="E-mail">{user.email}</td>
      <td data-label="Rol">
        <span
          className={`${darkMode ? 'dark' : ''} text-capitalize border tag-role rounded-pill px-4 py-2 ${
            user.role.toLowerCase() === "admin" ? "admin" : ""
          }`}
        >
          {roleList[user.role.toLowerCase()]}
        </span>
      </td>
      <td data-label="Acciones">
        {auth.currentUser.email !== user.email && (
          <button
            className={`${darkMode ? 'btn-danger' : 'btn-outline-danger'} btn w-auto p-3`}
            onClick={handleDeleteUser}
            aria-label="Eliminar usuario"
          >
            <TrashIcon className="icon" />
          </button>
        )}
      </td>
      <td className="blank"></td>
    </>
  );
}
