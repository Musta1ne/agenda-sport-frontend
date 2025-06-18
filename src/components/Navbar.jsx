import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdHome, MdSportsTennis, MdCalendarMonth, MdDarkMode, MdLightMode } from 'react-icons/md';
import './Navbar.css';

export default function Navbar({ theme, toggleTheme }) {
  const location = useLocation();
  return (
    <nav className="navbar-wrapper">
      <div className="navbar-content">
        <div className="navbar-links">
          <Link to="/" className={`pill-btn${location.pathname === '/' ? ' active' : ''}`}><MdHome size={20} /> Inicio</Link>
          <Link to="/courts" className={`pill-btn${location.pathname.startsWith('/courts') ? ' active' : ''}`}><MdSportsTennis size={20} /> Canchas</Link>
          <Link to="/bookings" className={`pill-btn${location.pathname.startsWith('/bookings') ? ' active' : ''}`}><MdCalendarMonth size={20} /> Reservas</Link>
        </div>
        <button className="theme-circle" onClick={toggleTheme} aria-label="Cambiar modo">
          {theme === 'light' ? <MdDarkMode size={22} /> : <MdLightMode size={22} />}
        </button>
      </div>
    </nav>
  );
} 