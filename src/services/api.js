import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://reservas-backend-bkg0.onrender.com/api';
console.log('API_URL:', API_URL);

// Configurar axios con timeout y manejo de errores
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// Canchas
export const getCourts = () => api.get('/courts');
export const getCourtAvailability = (id) => api.get(`/courts/${id}/availability`);
export const getCourtBookings = (id) => api.get(`/courts/${id}/bookings`);
export const getCourtBlocks = (id) => api.get(`/courts/${id}/blocks`);

// Reservas
export const createBooking = (data) => api.post('/bookings', data);
export const getBooking = (id) => api.get(`/bookings/${id}`);
export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data);
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);
export const getAllBookings = () => api.get('/bookings');

// Deportes
export const getSports = () => api.get('/sports');

// Bloqueos
export const createBlock = (data) => api.post('/blocks', data); 