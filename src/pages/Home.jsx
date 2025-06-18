import React from 'react';
import { FaFutbol, FaTableTennis } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const heroBg = 'https://services.meteored.com/img/article/por-que-se-tiene-que-retirar-el-caucho-de-los-campos-de-futbol-cual-es-el-problema-medioambiental-1697556169464_512.jpg';
const canchaImgs = [
  {
    tipo: 'Fútbol 5',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTWyHaf8n4fbpp9KJJRxriCbnVNH436V_soQ&s',
    icon: <FaFutbol size={38} color="#00e676" />,
    path: '/courts?type=futbol5',
  },
  {
    tipo: 'Fútbol 7',
    img: 'https://www.record.com.mx/sites/default/files/articulos/2023/10/15/pexels-pixabay-274506_1-20.jpg',
    icon: <FaFutbol size={38} color="#2196f3" />,
    path: '/courts?type=futbol7',
  },
  {
    tipo: 'Pádel',
    img: 'https://www.superprof.com.ar/blog/wp-content/uploads/2022/08/racket-g742998d30_1920.jpg',
    icon: <FaTableTennis size={38} color="#00e676" />,
    path: '/courts?type=padel',
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <section className="home-hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="home-overlay"></div>
        <div className="home-hero-content">
          <h1 className="home-hero-title">¡Reservá tu cancha como un profesional!</h1>
          <p className="home-hero-desc">
            Elige entre fútbol 5, fútbol 7 o pádel. Consulta disponibilidad, reserva y disfruta de la mejor experiencia visual y deportiva.
          </p>
        </div>
      </section>
      <div className="home-cards">
        {canchaImgs.map((c) => (
          <div className="home-card" key={c.tipo} onClick={() => navigate(c.path)}>
            <img className="home-card-img" src={c.img} alt={c.tipo} />
            <div className="home-card-info">
              {c.icon}
              <h2 className="home-card-title">{c.tipo}</h2>
              <button className="home-card-btn">Consultar disponibilidad</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 