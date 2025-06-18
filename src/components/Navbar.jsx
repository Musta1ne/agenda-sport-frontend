import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdHome, MdSportsTennis, MdCalendarMonth, MdDarkMode, MdLightMode, MdMenu, MdClose } from 'react-icons/md';
import './Navbar.css';

export default function Navbar({ theme, toggleTheme }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar-wrapper">
      <div className="navbar-content">
        {/* Menú hamburguesa solo visible en móvil */}
        <button className="navbar-hamburger" onClick={() => setMenuOpen(true)} aria-label="Abrir menú">
          <MdMenu size={28} />
        </button>
        <div className="navbar-links">
          <Link to="/" className={`pill-btn${location.pathname === '/' ? ' active' : ''}`}><MdHome size={20} /> Inicio</Link>
          <Link to="/courts" className={`pill-btn${location.pathname.startsWith('/courts') ? ' active' : ''}`}><MdSportsTennis size={20} /> Canchas</Link>
          <Link to="/bookings" className={`pill-btn${location.pathname.startsWith('/bookings') ? ' active' : ''}`}><MdCalendarMonth size={20} /> Reservas</Link>
        </div>
        <button className="theme-circle" onClick={toggleTheme} aria-label="Cambiar modo">
          {theme === 'light' ? <MdDarkMode size={22} /> : <MdLightMode size={22} />}
        </button>
      </div>
      {/* Menú lateral/modal para móvil */}
      {menuOpen && (
        <div className="navbar-mobile-menu-bg" onClick={() => setMenuOpen(false)}>
          <div className="navbar-mobile-menu" onClick={e => e.stopPropagation()}>
            <button className="navbar-mobile-close" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
              <MdClose size={28} />
            </button>
            <Link to="/" className={`mobile-btn${location.pathname === '/' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}><MdHome size={22} /> Inicio</Link>
            <Link to="/courts" className={`mobile-btn${location.pathname.startsWith('/courts') ? ' active' : ''}`} onClick={() => setMenuOpen(false)}><MdSportsTennis size={22} /> Canchas</Link>
            <Link to="/bookings" className={`mobile-btn${location.pathname.startsWith('/bookings') ? ' active' : ''}`} onClick={() => setMenuOpen(false)}><MdCalendarMonth size={22} /> Reservas</Link>
            <button className="theme-circle mobile-theme" onClick={toggleTheme} aria-label="Cambiar modo">
              {theme === 'light' ? <MdDarkMode size={22} /> : <MdLightMode size={22} />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
} 