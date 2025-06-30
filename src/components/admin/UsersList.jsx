import { useAuth } from "../../hooks/useAuth";
import UserListItem from "./UserListItem";

export default function UsersList() {
  const { users } = useAuth();

  return (
    <table className="bg-white rounded-4 shadow bo-table-users">
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
