import React, { useEffect, useState } from 'react';
import { getAllBookings, getCourts, deleteBooking } from '../../services/api';
import './BookingList.css';
import { toast } from 'react-toastify';

function puedeCancelar(fecha, hora_inicio, estado) {
  if (estado !== 'activa') return false;
  const ahora = new Date();
  const fechaHoraReserva = new Date(`${fecha}T${hora_inicio}`);
  const diffMs = fechaHoraReserva - ahora;
  const diffHoras = diffMs / (1000 * 60 * 60);
  return diffHoras > 2;
}

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [courts, setCourts] = useState([]);

  const cargar = () => {
    getAllBookings().then(res => setBookings(res.data));
    getCourts().then(res => setCourts(res.data));
  };

  useEffect(() => {
    cargar();
  }, []);

  const getCourtName = (b) => {
    // Si viene populado desde MongoDB
    if (b.id_cancha && typeof b.id_cancha === 'object' && b.id_cancha.nombre) return b.id_cancha.nombre;
    // Si solo viene el id
    return b.id_cancha || 'Cancha';
  };

  const handleCancel = async (id, fecha, hora_inicio) => {
    if (!window.confirm('¿Seguro que deseas cancelar esta reserva?')) return;
    try {
      await deleteBooking(id);
      toast.success('Reserva cancelada correctamente');
      cargar();
    } catch (err) {
      toast.error('No se pudo cancelar la reserva');
    }
  };

  return (
    <div className="booking-list">
      <h1 className="booking-title">Reservas existentes</h1>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Cancha</th>
            <th>Fecha</th>
            <th>Hora inicio</th>
            <th>Hora fin</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id}>
              <td>{getCourtName(b)}</td>
              <td>{b.fecha}</td>
              <td>{b.hora_inicio}</td>
              <td>{b.hora_fin}</td>
              <td>{b.estado}</td>
              <td>
                {puedeCancelar(b.fecha, b.hora_inicio, b.estado) ? (
                  <button className="cancel-btn" onClick={() => handleCancel(b._id, b.fecha, b.hora_inicio)}>
                    Cancelar
                  </button>
                ) : (
                  <span style={{ color: '#888', fontSize: '0.9em' }}>No disponible</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 