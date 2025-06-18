import React, { useEffect, useState } from 'react';
import { getCourts } from '../../services/api';
import CourtAvailability from '../CourtAvailability/CourtAvailability';
import { FaFutbol, FaTableTennis } from 'react-icons/fa';
import './CourtList.css';

const canchaIcons = {
  'Fútbol 5': <FaFutbol className="court-icon-svg" size={28} />, // azul por CSS
  'Fútbol 7': <FaFutbol className="court-icon-svg" size={28} />, // azul por CSS
  'Pádel': <FaTableTennis className="court-icon-svg" size={28} />, // azul por CSS
};

export default function CourtList() {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);

  useEffect(() => {
    getCourts().then(res => setCourts(res.data));
  }, []);

  return (
    <div className="court-list-grid">
      {courts.map(court => (
        <div className="court-card" key={court._id}>
          <div className="court-img-wrap">
            <img className="court-img" src={court.imagen} alt={court.tipo} />
            <span className="court-icon">{canchaIcons[court.tipo] || canchaIcons['Fútbol 5']}</span>
          </div>
          <div className="court-info">
            <div className="court-type">{court.tipo}</div>
            <div className="court-name">{court.nombre}</div>
            <button className="court-btn" onClick={() => setSelectedCourt(court._id)}>
              Ver disponibilidad
            </button>
          </div>
        </div>
      ))}
      {selectedCourt && (
        <CourtAvailability id={selectedCourt} onClose={() => setSelectedCourt(null)} />
      )}
    </div>
  );
} 