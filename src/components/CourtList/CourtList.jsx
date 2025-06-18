import React, { useEffect, useState } from 'react';
import { getCourts } from '../../services/api';
import CourtAvailability from '../CourtAvailability/CourtAvailability';
import { FaFutbol, FaTableTennis } from 'react-icons/fa';
import './CourtList.css';

const canchaIcons = {
  'Fútbol 5': <FaFutbol className="court-icon-svg" size={28} />,
  'Fútbol 7': <FaFutbol className="court-icon-svg" size={28} />,
  'Pádel': <FaTableTennis className="court-icon-svg" size={28} />,
};

export default function CourtList() {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getCourts();
        
        if (Array.isArray(res.data)) {
          setCourts(res.data);
        } else {
          setCourts([]);
          setError('Formato de datos inesperado');
        }
      } catch (err) {
        console.error('Error fetching courts:', err);
        setCourts([]);
        setError('No se pudieron cargar las canchas. Verifica tu conexión.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  if (loading) {
    return (
      <div className="court-list-grid">
        <div className="loading-message">Cargando canchas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="court-list-grid">
        <div className="court-error">
          <p>{error}</p>
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
                onClick={() => setSelectedCourt(court.id)}
              >
                Ver disponibilidad
              </button>
            </div>
          </div>
        ))
      )}
      {selectedCourt && (
        <CourtAvailability 
          id={selectedCourt} 
          onClose={() => setSelectedCourt(null)} 
        />
      )}
    </div>
  );
} 