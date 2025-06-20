import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courts from './pages/Courts';
import Bookings from './pages/Bookings';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import { Toaster } from 'react-hot-toast';

function App() {
  // Estado para el tema
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Cambia el tema y lo guarda en localStorage
  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  // Aplica el tema al body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courts" element={<Courts />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
