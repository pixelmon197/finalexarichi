import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 👈 Asegúrate de importar esto

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              setError('No estás autenticado');
              return;
            }
      
            const response = await axios.get('https://3.149.8.252:8443/api/users', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      
            console.log('Respuesta de usuarios:', response.data);
      
            // Asegurar que users sea array
            const data = response.data.data;
            setUsers(Array.isArray(data) ? data : []);
      
          } catch (error) {
            setError('Error al obtener los usuarios');
            setUsers([]);
          }
        };
      
        fetchUsers();
      }, []);

    return (
        <div className="container">
            <h2>Listado de Usuarios</h2>

            {/* 👉 Botón o link para ir a UserPanel */}
            <Link to="/UserPanel">
                <button style={{ marginBottom: '10px' }}>Ir al panel de usuarios</button>
            </Link>

            {error && <p className="error">{error}</p>}
            <ul>
                {Array.isArray(users) && users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))
                ) : (
                    <p>No hay usuarios disponibles.</p>
                )}
            </ul>
        </div>
    );
};

export default UserList;
