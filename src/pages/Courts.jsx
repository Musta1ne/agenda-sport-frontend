import React, { useEffect, useState } from 'react';
import { getCourts } from '../services/api';
import { FaFutbol, FaTableTennis } from 'react-icons/fa';
import CourtAvailability from '../components/CourtAvailability/CourtAvailability';
import './Courts.css';

export default function Courts() {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);

  useEffect(() => {
    getCourts().then(res => setCourts(res.data));
  }, []);

  return (
    <>
      <h1 className="courts-title">Nuestras Canchas</h1>
      <div className="courts-wrap">
        {courts.map(court => {
          const tipo = court.tipo ? court.tipo.toLowerCase() : 'fútbol 5';
          return (
            <div className="cancha-card" key={court._id}>
              <img className="cancha-img" src={court.imagen} alt={court.nombre} />
              <div className="cancha-info">
                {tipo.includes('pádel') ? <FaTableTennis size={32} color="#00e676" /> : <FaFutbol size={32} color="#2196f3" />}
                <h2 className="cancha-tipo">{court.nombre}</h2>
                <div className="cancha-superficie">{court.tipo || 'Fútbol 5'} - {court.tipo_superficie}</div>
                <button className="cancha-btn" onClick={() => setSelectedCourt(court._id)}>Ver disponibilidad</button>
              </div>
            </div>
          );
        })}
      </div>
      {selectedCourt && (
        <CourtAvailability id={selectedCourt} onClose={() => setSelectedCourt(null)} />
      )}
    </>
  );
} 