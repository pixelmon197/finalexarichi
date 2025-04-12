import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../App.css';

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
    <div className="p-6 max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Panel</h1>

      <div className="flex justify-between mb-6">
        <Link
          to="/create-user-new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Crear nuevo usuario
        </Link>
        <Link
          to="/login"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
        >
          Cerrar sesión
        </Link>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full bg-gray-50 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-5 text-left">ID</th>
              <th className="py-3 px-5 text-left">Nombre</th>
              <th className="py-3 px-5 text-left">Correo</th>
              <th className="py-3 px-5 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-100">
                <td className="py-2 px-5">{user.id}</td>
                <td className="py-2 px-5">{user.name}</td>
                <td className="py-2 px-5">{user.email}</td>
                <td className="py-2 px-5 text-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold mb-4">Editar Usuario</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              type="text"
              placeholder="Nombre"
              value={editForm.nombre}
              onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
              className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Correo"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={editForm.rol}
              onChange={(e) => setEditForm({ ...editForm, rol: e.target.value })}
              className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona un rol</option>
              <option value="admin">admin</option>
              <option value="user">user</option>
              <option value="manager">manager</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button
              onClick={submitEdit}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditingUser(null)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPanel;
