import React, { useState } from 'react';
import CourtAdmin from '../components/Admin/CourtAdmin';
import BookingAdmin from '../components/Admin/BookingAdmin';
import ScheduleAdmin from '../components/Admin/ScheduleAdmin';
import './AdminPanel.css';

const AdminPanel = () => {
  const [tab, setTab] = useState('courts');

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      <div className="admin-tabs">
        <button className={tab === 'courts' ? 'active' : ''} onClick={() => setTab('courts')}>Canchas</button>
        <button className={tab === 'schedules' ? 'active' : ''} onClick={() => setTab('schedules')}>Horarios Fijos</button>
        <button className={tab === 'bookings' ? 'active' : ''} onClick={() => setTab('bookings')}>Reservas</button>
      </div>
      <div className="admin-content">
        {tab === 'courts' && <CourtAdmin />}
        {tab === 'schedules' && <ScheduleAdmin />}
        {tab === 'bookings' && <BookingAdmin />}
      </div>
    </div>
  );
};

export default AdminPanel; 