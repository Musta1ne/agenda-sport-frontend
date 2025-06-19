import React from 'react';
import { FaFutbol, FaTableTennis, FaArrowRight, FaCalendarCheck, FaUserCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const deportes = [
  {
    tipo: 'Fútbol 5',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTWyHaf8n4fbpp9KJJRxriCbnVNH436V_soQ&s',
    icon: <FaFutbol size={32} color="#2196f3" />,
    path: '/courts?type=futbol5',
    color: '#e3f0ff'
  },
  {
    tipo: 'Fútbol 7',
    img: 'https://www.record.com.mx/sites/default/files/articulos/2023/10/15/pexels-pixabay-274506_1-20.jpg',
    icon: <FaFutbol size={32} color="#2196f3" />,
    path: '/courts?type=futbol7',
    color: '#f0f7ff'
  },
  {
    tipo: 'Pádel',
    img: 'https://www.superprof.com.ar/blog/wp-content/uploads/2022/08/racket-g742998d30_1920.jpg',
    icon: <FaTableTennis size={32} color="#2196f3" />,
    path: '/courts?type=padel',
    color: '#fffbe3'
  },
];

const pasos = [
  {
    icon: <FaCalendarCheck size={28} color="#2563eb" />,
    title: 'Elegí tu cancha',
    desc: 'Seleccioná el deporte y la cancha que más te guste.'
  },
  {
    icon: <FaUserCheck size={28} color="#2563eb" />,
    title: 'Completá tus datos',
    desc: 'Ingresá tu nombre, teléfono y elegí el horario disponible.'
  },
  {
    icon: <FaArrowRight size={28} color="#2563eb" />,
    title: '¡Listo!',
    desc: 'Recibí la confirmación y preparate para jugar.'
  }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home2-container">
      {/* HERO */}
      <section className="home2-hero">
        <div className="home2-hero-bg" />
        <div className="home2-hero-content">
          <h1>Reservá tu cancha <span className="home2-highlight">online</span> en segundos</h1>
          <p>Fútbol 5, Fútbol 7 y Pádel. Consultá disponibilidad, reservá y jugá sin complicaciones.</p>
          <button className="home2-cta" onClick={() => navigate('/courts')}>
            Ver canchas disponibles <FaArrowRight style={{ marginLeft: 8 }} />
          </button>
        </div>
      </section>

      {/* DEPORTES DESTACADOS */}
      <section className="home2-deportes">
        <h2 className="home2-section-title">Elegí tu deporte</h2>
        <div className="home2-deportes-grid">
          {deportes.map((d, i) => (
            <div
              className="home2-deporte-card"
              key={d.tipo}
              style={{ background: d.color }}
              onClick={() => navigate(d.path)}
            >
              <div className="home2-deporte-img-wrap">
                <img src={d.img} alt={d.tipo} className="home2-deporte-img" />
                <span className="home2-deporte-icon">{d.icon}</span>
              </div>
              <div className="home2-deporte-info">
                <h3>{d.tipo}</h3>
                <button className="home2-deporte-btn">
                  Reservar <FaArrowRight style={{ marginLeft: 6 }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PASOS */}
      <section className="home2-pasos">
        <h2 className="home2-section-title">¿Cómo reservar?</h2>
        <div className="home2-pasos-grid">
          {pasos.map((p, i) => (
            <div className="home2-paso" key={i}>
              <div className="home2-paso-icon">{p.icon}</div>
              <div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}