import React, { useEffect, useState } from 'react';
import { getCourtAvailability } from '../../services/api';
import { MdClose, MdAccessTime } from 'react-icons/md';
import './CourtAvailability.css';

function getHourOptions(horarios, tipoCancha) {
  const options = [];
  
  horarios.forEach(horario => {
    const start = parseInt(horario.hora_inicio.split(':')[0]);
    const end = parseInt(horario.hora_fin.split(':')[0]);
    
    if (tipoCancha === 'Pádel') {
      // Para Pádel, mostrar turnos de 1:30h
      let hora = start;
      while (hora < end) {
        const horaInicio = hora.toString().padStart(2, '0') + ':00';
        const horaFin = (hora + 1.5).toString().padStart(2, '0') + ':30';
        options.push({
          inicio: horaInicio,
          fin: horaFin,
          duracion: '1:30h'
        });
        hora += 1.5;
      }
    } else {
      // Para Fútbol 5 y 7, mostrar turnos de 1h
      for (let h = start; h < end; h++) {
        const horaInicio = h.toString().padStart(2, '0') + ':00';
        const horaFin = (h + 1).toString().padStart(2, '0') + ':00';
        options.push({
          inicio: horaInicio,
          fin: horaFin,
          duracion: '1h'
        });
      }
    }
  });
  
  return options;
}

export default function CourtAvailability({ id, onClose }) {
  const [data, setData] = useState(null);
  const [fecha, setFecha] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    getCourtAvailability(id).then(res => setData(res.data));
  }, [id]);

  if (!data) return null;

  const reservas = data.reservas ? data.reservas.filter(r => r.fecha === fecha) : [];
  const bloqueos = data.bloqueos ? data.bloqueos.filter(b => b.fecha === fecha) : [];
  const horarios = data.horarios || [];
  const tipoCancha = data.tipo || 'Fútbol 5';
  
  const horas = getHourOptions(horarios, tipoCancha);
  
  const estadoHora = (horaInicio) => {
    if (reservas.some(r => r.hora_inicio === horaInicio)) return 'reservado';
    if (bloqueos.some(b => b.hora_inicio === horaInicio)) return 'bloqueado';
    return 'disponible';
  };

  return (
    <div className="ca-overlay">
      <div className="ca-modal">
        <button className="ca-close-btn" onClick={onClose} title="Cerrar">
          <MdClose size={22} />
        </button>
        <h3 className="ca-title">
          <MdAccessTime className="ca-title-icon" size={22} /> Disponibilidad - {tipoCancha}
        </h3>
        <label className="ca-label">
          Fecha:
          <input className="ca-date-input" type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
        </label>
        <div className="ca-horas-grid">
          {horas.map((hora, index) => (
            <div key={id + '-' + fecha + '-' + hora.inicio} className={`ca-hora ${estadoHora(hora.inicio)}`}>
              <div className="ca-hora-tiempo">{hora.inicio} - {hora.fin}</div>
              <div className="ca-hora-duracion">({hora.duracion})</div>
              <div className="ca-hora-estado">
                {estadoHora(hora.inicio) === 'disponible' ? 'Disponible' : 
                 estadoHora(hora.inicio) === 'reservado' ? 'Reservado' : 'Bloqueado'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 