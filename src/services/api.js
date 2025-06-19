import axios from 'axios';

// Usar localhost en desarrollo, URL de producción en producción
const API_URL = import.meta.env.DEV 
  ? 'http://localhost:3001/api'
  : import.meta.env.VITE_API_URL;

console.log('API_URL:', API_URL);
console.log('Environment:', import.meta.env.DEV ? 'development' : 'production');

// Configurar axios con timeout y manejo de errores
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 segundos
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

// Administración de canchas
export const createCourt = (data) => api.post('/courts', data);
export const updateCourt = (id, data) => api.put(`/courts/${id}`, data);
export const deleteCourt = (id) => api.delete(`/courts/${id}`);

// Administración de bloqueos/horarios
export const getBlocks = () => api.get('/blocks');
export const updateBlock = (id, data) => api.put(`/blocks/${id}`, data);
export const deleteBlock = (id) => api.delete(`/blocks/${id}`);

// Horarios fijos
export const getSchedules = () => api.get('/schedules');
export const createSchedule = (data) => api.post('/schedules', data);
export const updateSchedule = (id, data) => api.put(`/schedules/${id}`, data);
export const deleteSchedule = (id) => api.delete(`/schedules/${id}`); 