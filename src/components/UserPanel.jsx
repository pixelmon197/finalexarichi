import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserPanel = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    nombre: "",
    email: "",
    rol: "",
  });
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://3.149.8.252:8443/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.data;
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setError("Error al obtener los usuarios");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({
      nombre: user.name,
      email: user.email,
      rol: user.rol || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://3.149.8.252:8443/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
    }
  };

  const submitEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://3.149.8.252:8443/api/users/${editingUser}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Error al editar usuario:", err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Panel</h1>

      <div className="flex justify-end mb-4">
        <Link
          to="/create-user-new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Crear nuevo usuario
        </Link>
        <br></br>
        <Link
          to="/login"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Cerrar cesion 
        </Link>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Correo</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Editar Usuario</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={editForm.nombre}
            onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="email"
            placeholder="Correo"
            value={editForm.email}
            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            className="border px-2 py-1 mr-2"
          />
          <select
            value={editForm.rol}
            onChange={(e) => setEditForm({ ...editForm, rol: e.target.value })}
            className="border px-2 py-1 mr-2"
          >
            <option value="">Selecciona un rol</option>
            <option value="admin">admin</option>
            <option value="user">user</option>
            <option value="manager">manager</option>
          </select>
          <button
            onClick={submitEdit}
            className="bg-green-500 text-white px-4 py-1 rounded mr-2"
          >
            Guardar
          </button>
          <button
            onClick={() => setEditingUser(null)}
            className="bg-gray-400 text-white px-4 py-1 rounded"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPanel;
