import { UserPlusIcon } from "@heroicons/react/24/outline";
import UsersList from "../../components/admin/UsersList";
import NewUserModal from "../../components/admin/NewUserModal";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function UsersPage() {
  const [modal, setModal] = useState(false);

  return (
    <>
    <Helmet>
      <title>Admin | Usuarios</title>
      <meta name="description" content="Crea, elimina y releva usuarios" />
    </Helmet>
      <div className="d-md-flex justify-content-between align-items-center mb-5">
        <h1 className="text-primary text-center text-md-start mb-4 mb-md-0">Usuarios</h1>
        <button className="btn btn-primary d-flex gap-2 align-items-center justify-content-center p-4" onClick={() => setModal(true)}>
          <UserPlusIcon className="icon" />
          <span className="fs-3">Crear Usuario</span>
        </button>
      </div>
      <UsersList />
      <NewUserModal modal={modal} setModal={setModal} />
    </>
  );
}
