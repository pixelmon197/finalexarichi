import axios from 'axios';

// Configuración base de la API
const api = axios.create({
  baseURL: 'https://3.149.8.252:8443', // Cambia esto por la URL de tu API en producción
  headers: { 
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación en los headers  
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
