import axios from 'axios';

// Usar localhost en desarrollo, URL de producción en producción
const API_URL = import.meta.env.DEV 
  ? 'http://localhost:5000/api'
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

// ===== DEPORTES =====
export const getSports = () => api.get('/sports');
export const getSportById = (id) => api.get(`/sports/${id}`);
export const createSport = (data) => api.post('/sports', data);
export const updateSport = (id, data) => api.put(`/sports/${id}`, data);
export const deleteSport = (id) => api.delete(`/sports/${id}`);

// ===== CANCHAS =====
export const getCourts = () => api.get('/courts');
export const getCourtById = (id) => api.get(`/courts/${id}`);
export const getCourtAvailability = (id, fecha) => api.get(`/courts/${id}/availability`, { params: { fecha } });
export const getCourtBookings = (id) => api.get(`/courts/${id}/bookings`);
export const createCourt = (data) => api.post('/courts', data);
export const updateCourt = (id, data) => api.put(`/courts/${id}`, data);
export const deleteCourt = (id) => api.delete(`/courts/${id}`);

// ===== RESERVAS =====
export const getAllBookings = () => api.get('/bookings');
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const createBooking = (data) => api.post('/bookings', data);
export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data);
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

// ===== HORARIOS =====
export const getSchedules = () => api.get('/schedules');
export const getScheduleById = (id) => api.get(`/schedules/${id}`);
export const createSchedule = (data) => api.post('/schedules', data);
export const updateSchedule = (id, data) => api.put(`/schedules/${id}`, data);
export const deleteSchedule = (id) => api.delete(`/schedules/${id}`); 