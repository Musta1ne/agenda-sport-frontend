import React, { useEffect, useState } from 'react';
import { getCourts } from '../services/api';
import { FaFutbol, FaTableTennis } from 'react-icons/fa';
import CourtAvailability from '../components/CourtAvailability/CourtAvailability';
import './Courts.css';

export default function Courts() {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCourts()
      .then(res => {
        if (Array.isArray(res.data)) {
          setCourts(res.data);
          setError(null);
        } else {
          setCourts([]);
          setError('No se pudieron cargar las canchas.');
        }
      })
      .catch((err) => {
        console.error('Error loading courts:', err);
        setCourts([]);
        setError('No se pudieron cargar las canchas.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="courts-container">
        <h1 className="courts-title">Nuestras Canchas</h1>
        <div className="courts-loading">Cargando canchas...</div>
      </div>
    );
  }

  return (
    <div className="courts-container">
      <h1 className="courts-title">Nuestras Canchas</h1>
      <div className="courts-wrap">
        {error && <div className="court-error">{error}</div>}
        {(Array.isArray(courts) ? courts : []).map(court => {
          const tipo = court.tipo ? court.tipo.toLowerCase() : 'fútbol 5';
          return (
            <div className="cancha-card" key={court.id}>
              <img className="cancha-img" src={court.imagen} alt={court.nombre} />
              <div className="cancha-info">
                {tipo.includes('pádel') ? <FaTableTennis size={32} color="#00e676" /> : <FaFutbol size={32} color="#2196f3" />}
                <h2 className="cancha-tipo">{court.nombre}</h2>
                <div className="cancha-superficie">{court.tipo || 'Fútbol 5'} - {court.tipo_superficie}</div>
                <div className="cancha-precio">Precio: ${court.precio?.toLocaleString()}</div>
                <button 
                  className="cancha-btn consultar-btn" 
                  onClick={() => setSelectedCourt(court.id)}
                >
                  Consultar Disponibilidad
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {selectedCourt && (
        <CourtAvailability id={selectedCourt} onClose={() => setSelectedCourt(null)} />
      )}
    </div>
  );
} 