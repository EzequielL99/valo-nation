import { useAuth } from "../../hooks/useAuth";
import UserListItem from "./UserListItem";
import { useTheme } from "../../hooks/useTheme";

export default function UsersList() {
  const { users } = useAuth();
  const { darkMode } = useTheme();

  return (
    <table className={`${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'} rounded-4 shadow bo-table-users`} aria-label="Tabla de usuarios">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.email}>
            <UserListItem user={user} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
