import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://reservas-backend-tau.vercel.app/api';
console.log('API_URL:', API_URL);

// Canchas
export const getCourts = () => axios.get(`${API_URL}/courts`);
export const getCourtAvailability = (id) => axios.get(`${API_URL}/courts/${id}/availability`);
export const getCourtBookings = (id) => axios.get(`${API_URL}/courts/${id}/bookings`);
export const getCourtBlocks = (id) => axios.get(`${API_URL}/courts/${id}/blocks`);

// Reservas
export const createBooking = (data) => axios.post(`${API_URL}/bookings`, data);
export const getBooking = (id) => axios.get(`${API_URL}/bookings/${id}`);
export const updateBooking = (id, data) => axios.put(`${API_URL}/bookings/${id}`, data);
export const deleteBooking = (id) => axios.delete(`${API_URL}/bookings/${id}`);
export const getAllBookings = () => axios.get(`${API_URL}/bookings`);

// Deportes
export const getSports = () => axios.get(`${API_URL}/sports`);

// Bloqueos
export const createBlock = (data) => axios.post(`${API_URL}/blocks`, data); 