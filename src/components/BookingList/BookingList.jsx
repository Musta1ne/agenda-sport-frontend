import React, { useEffect, useState } from 'react';
import { getAllBookings, getCourts, deleteBooking } from '../../services/api';
import './BookingList.css';
import { toast } from 'react-toastify';
import { MdRefresh, MdInfo } from 'react-icons/md';

function puedeCancelar(fecha, hora_inicio, estado) {
  if (estado !== 'activa' && estado !== 'confirmada') return false;
  const ahora = new Date();
  const fechaHoraReserva = new Date(`${fecha}T${hora_inicio}`);
  const diffMs = fechaHoraReserva - ahora;
  const diffHoras = diffMs / (1000 * 60 * 60);
  return diffHoras > 2;
}

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargar = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [bookingsRes, courtsRes] = await Promise.all([
        getAllBookings(),
        getCourts()
      ]);
      
      setBookings(bookingsRes.data || []);
      setCourts(courtsRes.data || []);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Error al cargar las reservas');
      toast.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const getCourtName = (booking) => {
    // Si viene populado desde el backend
    if (booking.cancha_nombre) return booking.cancha_nombre;
    
    // Si solo viene el id, buscar en la lista de canchas
    const court = courts.find(c => c.id === booking.id_cancha);
    return court ? court.nombre : 'Cancha no encontrada';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmada':
        return 'status-confirmed';
      case 'activa':
        return 'status-active';
      case 'cancelada':
        return 'status-cancelled';
      case 'pendiente':
        return 'status-pending';
      default:
        return 'status-default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmada':
        return 'Confirmada';
      case 'activa':
        return 'Activa';
      case 'cancelada':
        return 'Cancelada';
      case 'pendiente':
        return 'Pendiente';
      default:
        return status;
    }
  };

  // Ordenar por fecha y hora (más recientes primero)
  const sortedBookings = bookings.sort((a, b) => {
    const dateA = new Date(`${a.fecha}T${a.hora_inicio}`);
    const dateB = new Date(`${b.fecha}T${b.hora_inicio}`);
    return dateB - dateA;
  });

  if (loading) {
    return (
      <div className="booking-list">
        <div className="loading-message">
          <MdRefresh className="loading-icon" />
          Cargando reservas...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="booking-list">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={cargar} className="retry-btn">
            <MdRefresh /> Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-list">
      <div className="booking-header">
        <h1 className="booking-title">📋 Tabla de Reservas</h1>
      </div>

      <div className="booking-stats">
        <div className="stat-item">
          <span className="stat-number">{bookings.length}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item active">
          <span className="stat-number">{bookings.filter(b => b.estado === 'activa' || b.estado === 'confirmada').length}</span>
          <span className="stat-label">Activas</span>
        </div>
        <div className="stat-item cancelled">
          <span className="stat-number">{bookings.filter(b => b.estado === 'cancelada').length}</span>
          <span className="stat-label">Canceladas</span>
        </div>
      </div>
      
      {sortedBookings.length === 0 ? (
        <div className="no-bookings-message">
          <MdInfo className="info-icon" />
          <p>No hay reservas registradas.</p>
          <p>¡Haz tu primera reserva desde el formulario!</p>
        </div>
      ) : (
        <div className="bookings-table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Cancha</th>
                <th>Fecha</th>
                <th>Horario</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {sortedBookings.map(booking => (
                <tr key={booking.id} className="booking-row">
                  <td className="court-name">{getCourtName(booking)}</td>
                  <td className="booking-date">
                    {new Date(booking.fecha).toLocaleDateString('es-ES', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="booking-time">
                    {booking.hora_inicio} - {booking.hora_fin}
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusColor(booking.estado)}`}>
                      {getStatusText(booking.estado)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="booking-info">
        <h3>📞 Información importante</h3>
        <div className="info-content">
          <p><strong>¿Deseas cancelar tu turno?</strong></p>
          <p>Debes comunicarte al <a href="tel:3564563421" className="phone-link">3564 563421</a> con al menos <b>2 horas de anticipación</b>.</p>
          <p>De lo contrario, el turno será cobrado.</p>
        </div>
      </div>
    </div>
  );
} 