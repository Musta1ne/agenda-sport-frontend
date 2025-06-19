import React, { useState } from 'react';
import CourtAdmin from '../components/Admin/CourtAdmin';
import BlockAdmin from '../components/Admin/BlockAdmin';
import BookingAdmin from '../components/Admin/BookingAdmin';
import ScheduleAdmin from '../components/Admin/ScheduleAdmin';
import './AdminPanel.css';

const AdminPanel = () => {
  const [tab, setTab] = useState('courts');

  // Solo mostrar el botón si está en producción
  const isProd = !import.meta.env.DEV;
  // Usar la URL absoluta del backend para evitar problemas en Vercel
  const apiUrl = import.meta.env.VITE_API_URL || 'https://reservas-backend-bkg.onrender.com/api';
  const downloadUrl = apiUrl.replace(/\/$/, '') + '/bookings/download-json';

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      {isProd && (
        <div style={{ marginBottom: 18 }}>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn view"
            style={{ fontSize: '1.05rem', marginBottom: 8 }}
          >
            <span style={{ fontSize: '1.2em', marginRight: 6 }}>⬇️</span>
            Descargar reservas (JSON)
          </a>
        </div>
      )}
      <div className="admin-tabs">
        <button className={tab === 'courts' ? 'active' : ''} onClick={() => setTab('courts')}>Canchas</button>
        <button className={tab === 'schedules' ? 'active' : ''} onClick={() => setTab('schedules')}>Horarios Fijos</button>
        <button className={tab === 'blocks' ? 'active' : ''} onClick={() => setTab('blocks')}>Bloqueos</button>
        <button className={tab === 'bookings' ? 'active' : ''} onClick={() => setTab('bookings')}>Reservas</button>
      </div>
      <div className="admin-content">
        {tab === 'courts' && <CourtAdmin />}
        {tab === 'schedules' && <ScheduleAdmin />}
        {tab === 'blocks' && <BlockAdmin />}
        {tab === 'bookings' && <BookingAdmin />}
      </div>
    </div>
  );
};

export default AdminPanel; 