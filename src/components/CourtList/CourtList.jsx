import React from 'react';
import { useAppContext } from '../../context/AppContext';
import CourtAvailability from '../CourtAvailability/CourtAvailability';
import { FaFutbol, FaTableTennis } from 'react-icons/fa';
import './CourtList.css';

const canchaIcons = {
  'Fútbol 5': <FaFutbol className="court-icon-svg" size={28} />,
  'Fútbol 7': <FaFutbol className="court-icon-svg" size={28} />,
  'Pádel': <FaTableTennis className="court-icon-svg" size={28} />,
};

export default function CourtList() {
  const { 
    courts, 
    loading, 
    errors, 
    ui,
    setSelectedCourt,
    setShowAvailabilityModal 
  } = useAppContext();

  if (loading.courts) {
    return (
      <div className="court-list-grid">
        <div className="loading-message">Cargando canchas...</div>
      </div>
    );
  }

  if (errors.courts) {
    return (
      <div className="court-list-grid">
        <div className="court-error">
          <p>{errors.courts}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="court-list-grid">
      {courts.length === 0 ? (
        <div className="no-courts-message">
          No hay canchas disponibles en este momento.
        </div>
      ) : (
        courts.map(court => (
          <div className="court-card" key={court.id}>
            <div className="court-img-wrap">
              <img 
                className="court-img" 
                src={court.imagen} 
                alt={court.tipo}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Cancha';
                }}
              />
              <span className="court-icon">
                {canchaIcons[court.tipo] || canchaIcons['Fútbol 5']}
              </span>
            </div>
            <div className="court-info">
              <div className="court-type">{court.tipo}</div>
              <div className="court-name">{court.nombre}</div>
              <div className="court-price">${court.precio?.toLocaleString() || 'N/A'}</div>
              <button 
                className="court-btn" 
                onClick={() => {
                  setSelectedCourt(court);
                  setShowAvailabilityModal(true);
                }}
              >
                Ver disponibilidad
              </button>
            </div>
          </div>
        ))
      )}
      {ui.showAvailabilityModal && ui.selectedCourt && (
        <CourtAvailability 
          id={ui.selectedCourt.id} 
          onClose={() => {
            setSelectedCourt(null);
            setShowAvailabilityModal(false);
          }} 
        />
      )}
    </div>
  );
} 