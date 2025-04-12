import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateUser = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !email || !password || !rol) {
            setError('Por favor, complete todos los campos');
            return;
        }

        try {
            const response = await axios.post('https://3.149.8.252:8443/api/login', {
                nombre,
                email,
                password,
                rol,
            });

            console.log('Usuario creado:', response.data);

            navigate('/login');

        } catch (error) {
            setError('Error al crear el usuario');
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="Create-user-container">
            <h2>Crear Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Rol</label>
                    <select value={rol} onChange={(e) => setRol(e.target.value)} required>
                        <option value="">Selecciona un rol</option>
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                        <option value="manager">manager</option>
                    </select>
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
};

export default CreateUser;
