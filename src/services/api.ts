import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Añadir token a todas las solicitudes si está disponible
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;