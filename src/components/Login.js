import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// En App.jsx o App.tsx
import '../App.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Por favor, ingrese todos los campos.');
            return;
        }

        try {
            const response = await axios.post('https://3.149.8.252:8443/api/login', {
                email,
                password,
            });

            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user)); // 🟢 Guarda el usuario también
    
            window.location.href = '/users';
        } catch (error) {
            setError('Email o contraseña incorrectos.');
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
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
                {error && <div className="error">{error}</div>}
                <button type="submit">Iniciar sesión</button>
            </form>
            <Link to="/Create-user">Crear usuario</Link>
        </div>
    );
};

export default Login;
