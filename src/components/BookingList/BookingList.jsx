import React, { useEffect, useState } from 'react';
import { getAllBookings, getCourts, deleteBooking } from '../../services/api';
import './BookingList.css';
import { toast } from 'react-toastify';

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

  const handleCancel = async (id, fecha, hora_inicio) => {
    if (!window.confirm('¿Seguro que deseas cancelar esta reserva?')) return;
    
    try {
      await deleteBooking(id);
      toast.success('Reserva cancelada correctamente');
      cargar();
    } catch (err) {
      console.error('Error cancelling booking:', err);
      toast.error('No se pudo cancelar la reserva');
    }
  };

  if (loading) {
    return (
      <div className="booking-list">
        <div className="loading-message">Cargando reservas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="booking-list">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={cargar} className="retry-btn">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-list">
      <h1 className="booking-title">Reservas existentes</h1>
      
      {bookings.length === 0 ? (
        <div className="no-bookings-message">
          <p>No hay reservas registradas.</p>
          <p>¡Haz tu primera reserva desde el formulario!</p>
        </div>
      ) : (
        <>
          <div className="bookings-grid">
            {bookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <h3>{getCourtName(booking)}</h3>
                  <span className={`status-badge ${getStatusColor(booking.estado)}`}>
                    {booking.estado}
                  </span>
                </div>
                
                <div className="booking-details">
                  <div className="booking-info">
                    <strong>Fecha:</strong> {new Date(booking.fecha).toLocaleDateString('es-ES')}
                  </div>
                  <div className="booking-info">
                    <strong>Horario:</strong> {booking.hora_inicio} - {booking.hora_fin}
                  </div>
                  {booking.nombre_usuario && (
                    <div className="booking-info">
                      <strong>Cliente:</strong> {booking.nombre_usuario}
                    </div>
                  )}
                  {booking.telefono && (
                    <div className="booking-info">
                      <strong>Teléfono:</strong> {booking.telefono}
                    </div>
                  )}
                  {booking.comentario && (
                    <div className="booking-info">
                      <strong>Comentario:</strong> {booking.comentario}
                    </div>
                  )}
                </div>
                
                {puedeCancelar(booking.fecha, booking.hora_inicio, booking.estado) && (
                  <button 
                    className="cancel-btn"
                    onClick={() => handleCancel(booking.id, booking.fecha, booking.hora_inicio)}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="booking-cancel-info">
            <strong>¿Deseas cancelar tu turno?</strong><br />
            Debes comunicarte al <a href="tel:3564563421">3564 563421</a> con al menos <b>2 horas de anticipación</b>.<br />
            De lo contrario, el turno será cobrado.
          </div>
        </>
      )}
    </div>
  );
} 