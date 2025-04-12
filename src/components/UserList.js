import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

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
        <div className="userlist-container">
            <h2 className="title">Listado de Usuarios</h2>

            <Link to="/UserPanel">
                <button className="button">Ir al panel de usuarios</button>
            </Link>

            {error && <p className="error-message">{error}</p>}

            <ul className="user-list">
                {Array.isArray(users) && users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id} className="user-item">
                            <strong>{user.name}</strong>
                        </li>
                    ))
                ) : (
                    <p className="no-users">No hay usuarios disponibles.</p>
                )}
            </ul>
        </div>
    );
};

export default UserList;
