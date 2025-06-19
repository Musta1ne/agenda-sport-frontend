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
      await deleteBooking(id);
      fetchBookings();
    } catch (err) {
      setError('Error al eliminar reserva');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Reservas</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      {loading ? <p>Cargando...</p> : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th><th>Cancha</th><th>Usuario</th><th>Teléfono</th><th>Fecha</th><th>Inicio</th><th>Fin</th><th>Estado</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{courts.find(c=>c.id===b.id_cancha)?.nombre || b.id_cancha}</td>
                <td>{b.nombre_usuario}</td>
                <td>{b.telefono}</td>
                <td>{b.fecha}</td>
                <td>{b.hora_inicio}</td>
                <td>{b.hora_fin}</td>
                <td>{b.estado}</td>
                <td>
                  <button onClick={()=>handleDelete(b.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingAdmin; 