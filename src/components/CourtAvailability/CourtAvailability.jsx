import React, { useEffect, useState } from 'react';
import { getCourtAvailability } from '../../services/api';
import { MdClose, MdAccessTime, MdCheckCircle, MdCancel, MdBlock } from 'react-icons/md';
import './CourtAvailability.css';

export default function CourtAvailability({ id, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fecha, setFecha] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    getCourtAvailability(id)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar disponibilidad:', err);
        setError('Error al cargar la disponibilidad');
        setLoading(false);
      });
  }, [id]);

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

  if (!data || !data.horarios) {
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

  const { cancha, horarios, total_horarios, disponibles, reservados, bloqueados } = data;

  // Filtrar horarios por fecha (si aplica)
  const horariosFiltrados = horarios.filter(horario => {
    // Si el horario es para todos los días, mostrarlo siempre
    if (horario.dia_semana === 'todos') return true;
    // Aquí podrías agregar lógica para días específicos si es necesario
    return true;
  });

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'disponible':
        return <MdCheckCircle className="ca-icon-disponible" />;
      case 'reservado':
        return <MdCancel className="ca-icon-reservado" />;
      case 'bloqueado':
        return <MdBlock className="ca-icon-bloqueado" />;
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
      case 'bloqueado':
        return 'bloqueado';
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
          Disponibilidad - {cancha?.nombre || 'Cancha'}
        </h3>

        <div className="ca-info">
          <div className="ca-info-item">
            <span className="ca-info-label">Tipo:</span>
            <span className="ca-info-value">{cancha?.tipo}</span>
          </div>
          <div className="ca-info-item">
            <span className="ca-info-label">Precio:</span>
            <span className="ca-info-value">${cancha?.precio?.toLocaleString()}</span>
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
          <div className="ca-stat bloqueado">
            <span className="ca-stat-number">{bloqueados}</span>
            <span className="ca-stat-label">Bloqueados</span>
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
          {horariosFiltrados.map((horario, index) => (
            <div 
              key={`${horario.id}-${horario.hora_inicio}`} 
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
                {horario.estado === 'bloqueado' && 'Bloqueado'}
              </div>
              {horario.reserva && (
                <div className="ca-hora-detalle">
                  Reservado por: {horario.reserva.nombre_usuario}
                </div>
              )}
              {horario.bloqueo && (
                <div className="ca-hora-detalle">
                  Bloqueado: {horario.bloqueo.motivo}
                </div>
              )}
            </div>
          ))}
        </div>

        {horariosFiltrados.length === 0 && (
          <div className="ca-empty">
            No hay horarios disponibles para esta cancha
          </div>
        )}
      </div>
    </div>
  );
} 