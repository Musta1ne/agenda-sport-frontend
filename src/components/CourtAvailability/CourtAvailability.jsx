import React, { useEffect, useState } from 'react';
import { getCourtAvailability } from '../../services/api';
import { MdClose, MdAccessTime } from 'react-icons/md';
import './CourtAvailability.css';

function getHourOptions(start, end) {
  const options = [];
  for (let h = start; h < end; h++) {
    options.push(h.toString().padStart(2, '0') + ':00');
  }
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
  // data.horarios puede ser un array
  const horarios = Array.isArray(data.horarios) && data.horarios.length ? data.horarios[0] : null;
  let horas = [];
  if (horarios) {
    const start = parseInt(horarios.hora_inicio.split(':')[0]);
    const end = parseInt(horarios.hora_fin.split(':')[0]);
    horas = getHourOptions(start, end);
  }
  const estadoHora = h => {
    if (reservas.some(r => r.hora_inicio === h)) return 'reservado';
    if (bloqueos.some(b => b.hora_inicio === h)) return 'bloqueado';
    return 'disponible';
  };

  return (
    <div className="ca-overlay">
      <div className="ca-modal">
        <button className="ca-close-btn" onClick={onClose} title="Cerrar">
          <MdClose size={22} />
        </button>
        <h3 className="ca-title">
          <MdAccessTime className="ca-title-icon" size={22} /> Disponibilidad
        </h3>
        <label className="ca-label">
          Fecha:
          <input className="ca-date-input" type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
        </label>
        <div className="ca-horas-grid">
          {horas.map(h => (
            <div key={id + '-' + fecha + '-' + h} className={`ca-hora ${estadoHora(h)}`}>
              {h} - {estadoHora(h) === 'disponible' ? 'Disponible' : estadoHora(h) === 'reservado' ? 'Reservado' : 'Bloqueado'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 