import React, { useState } from 'react';
import CourtAdmin from '../components/Admin/CourtAdmin';
import SportAdmin from '../components/Admin/SportAdmin';
import BookingAdmin from '../components/Admin/BookingAdmin';
import ScheduleAdmin from '../components/Admin/ScheduleAdmin';
import './AdminPanel.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('canchas');

  const renderContent = () => {
    switch (activeTab) {
      case 'canchas':
        return <CourtAdmin />;
      case 'deportes':
        return <SportAdmin />;
      case 'reservas':
        return <BookingAdmin />;
      case 'horarios':
        return <ScheduleAdmin />;
      default:
        return <CourtAdmin />;
    }
  };

  return (
    <div className="admin-panel">
      <ToastContainer 
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="admin-header">
        <h1>Panel de Administración</h1>
      </div>
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'canchas' ? 'active' : ''}`} 
          onClick={() => setActiveTab('canchas')}
        >
          Canchas
        </button>
        <button 
          className={`tab-btn ${activeTab === 'deportes' ? 'active' : ''}`} 
          onClick={() => setActiveTab('deportes')}
        >
          Deportes
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reservas' ? 'active' : ''}`} 
          onClick={() => setActiveTab('reservas')}
        >
          Reservas
        </button>
        <button 
          className={`tab-btn ${activeTab === 'horarios' ? 'active' : ''}`} 
          onClick={() => setActiveTab('horarios')}
        >
          Horarios Fijos
        </button>
      </div>
      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel; 