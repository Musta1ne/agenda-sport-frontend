import React, { useEffect, useState } from 'react';
import { getAllBookings, deleteBooking, getCourts } from '../../services/api';

const BookingAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getAllBookings();
      setBookings(res.data);
    } catch (err) {
      setError('Error al cargar reservas');
    }
    setLoading(false);
  };

  const fetchCourts = async () => {
    try {
      const res = await getCourts();
      setCourts(res.data);
    } catch {}
  };

  useEffect(() => { fetchBookings(); fetchCourts(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta reserva?')) return;
    setLoading(true);
    try {
      await deleteBooking(id, true);
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al eliminar reserva');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Reservas</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      {loading ? <p>Cargando...</p> : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th><th>Cancha</th><th>Usuario</th><th>Teléfono</th><th>Fecha</th><th>Inicio</th><th>Fin</th><th>Estado</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td data-label="ID">{b.id}</td>
                  <td data-label="Cancha">{courts.find(c=>c.id===b.id_cancha)?.nombre || b.id_cancha}</td>
                  <td data-label="Usuario">{b.nombre_usuario}</td>
                  <td data-label="Teléfono">{b.telefono}</td>
                  <td data-label="Fecha">{b.fecha}</td>
                  <td data-label="Inicio">{b.hora_inicio}</td>
                  <td data-label="Fin">{b.hora_fin}</td>
                  <td data-label="Estado">{b.estado}</td>
                  <td data-label="Acciones">
                    <button className="admin-btn delete" onClick={()=>handleDelete(b.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingAdmin; 