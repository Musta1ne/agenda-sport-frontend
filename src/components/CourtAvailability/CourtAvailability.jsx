import React, { useEffect, useState } from 'react';
import { getCourtAvailability } from '../../services/api';
import { MdClose, MdAccessTime, MdCheckCircle, MdCancel } from 'react-icons/md';
import './CourtAvailability.css';

export default function CourtAvailability({ id, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fecha, setFecha] = useState(() => new Date().toISOString().slice(0, 10));

  const fetchAvailability = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCourtAvailability(id, fecha);
      setData(res.data);
    } catch (err) {
      console.error('Error al cargar disponibilidad:', err);
      setError('Error al cargar la disponibilidad');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, [id, fecha]); // Actualizar cuando cambie la fecha o el id

  if (loading) {
    return (
      <div className="ca-overlay">
        <div className="ca-modal">
          <div className="ca-loading">Cargando disponibilidad...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ca-overlay">
        <div className="ca-modal">
          <button className="ca-close-btn" onClick={onClose} title="Cerrar">
            <MdClose size={22} />
          </button>
          <div className="ca-error">{error}</div>
        </div>
      </div>
    );
  }

  if (!data || !data.availability) {
    return (
      <div className="ca-overlay">
        <div className="ca-modal">
          <button className="ca-close-btn" onClick={onClose} title="Cerrar">
            <MdClose size={22} />
          </button>
          <div className="ca-error">No se encontraron horarios para esta cancha</div>
        </div>
      </div>
    );
  }

  const { court, availability } = data;

  // Calcular estadísticas
  const total_horarios = availability.length;
  const disponibles = availability.filter(h => h.estado === 'disponible').length;
  const reservados = availability.filter(h => h.estado === 'reservado').length;

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'disponible':
        return <MdCheckCircle className="ca-icon-disponible" />;
      case 'reservado':
        return <MdCancel className="ca-icon-reservado" />;
      default:
        return null;
    }
  };

  const getEstadoClass = (estado) => {
    switch (estado) {
      case 'disponible':
        return 'disponible';
      case 'reservado':
        return 'reservado';
      default:
        return '';
    }
  };

  return (
    <div className="ca-overlay">
      <div className="ca-modal">
        <button className="ca-close-btn" onClick={onClose} title="Cerrar">
          <MdClose size={22} />
        </button>
        
        <h3 className="ca-title">
          <MdAccessTime className="ca-title-icon" size={22} /> 
          Disponibilidad - {court?.nombre || 'Cancha'}
        </h3>

        <div className="ca-info">
          <div className="ca-info-item">
            <span className="ca-info-label">Tipo:</span>
            <span className="ca-info-value">{court?.tipo}</span>
          </div>
          <div className="ca-info-item">
            <span className="ca-info-label">Precio:</span>
            <span className="ca-info-value">${court?.precio?.toLocaleString()}</span>
          </div>
        </div>

        <div className="ca-stats">
          <div className="ca-stat">
            <span className="ca-stat-number">{total_horarios}</span>
            <span className="ca-stat-label">Total</span>
          </div>
          <div className="ca-stat disponible">
            <span className="ca-stat-number">{disponibles}</span>
            <span className="ca-stat-label">Disponibles</span>
          </div>
          <div className="ca-stat reservado">
            <span className="ca-stat-number">{reservados}</span>
            <span className="ca-stat-label">Reservados</span>
          </div>
        </div>

        <label className="ca-label">
          Fecha:
          <input 
            className="ca-date-input" 
            type="date" 
            value={fecha} 
            onChange={e => setFecha(e.target.value)} 
          />
        </label>

        <div className="ca-horas-grid">
          {availability.map((horario, index) => (
            <div 
              key={`${index}-${horario.hora_inicio}`} 
              className={`ca-hora ${getEstadoClass(horario.estado)}`}
            >
              <div className="ca-hora-header">
                {getEstadoIcon(horario.estado)}
                <span className="ca-hora-tiempo">
                  {horario.hora_inicio} - {horario.hora_fin}
                </span>
              </div>
              <div className="ca-hora-estado">
                {horario.estado === 'disponible' && 'Disponible'}
                {horario.estado === 'reservado' && 'Reservado'}
              </div>
              {horario.details && horario.estado === 'reservado' && (
                <div className="ca-hora-detalle">
                  Reservado por: {horario.details.nombre_usuario}
                </div>
              )}
            </div>
          ))}
        </div>

        {availability.length === 0 && (
          <div className="ca-empty">
            No hay horarios disponibles para esta cancha
          </div>
        )}
      </div>
    </div>
  );
} 