import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Courts from './pages/Courts';
import Bookings from './pages/Bookings';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import AdminPanel from './pages/AdminPanel';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Poppins', Arial, sans-serif;
    margin: 0;
    padding: 0;
    transition: background 0.4s, color 0.4s;
  }
`;

export default function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Router>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main style={{ background: theme === 'light' ? lightTheme.mainBg : darkTheme.mainBg, boxShadow: theme === 'light' ? lightTheme.shadow : darkTheme.shadow, maxWidth: 1200, margin: '2.5rem auto', borderRadius: 18, minHeight: '70vh', padding: 0 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courts" element={<Courts />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme}
        />
      </Router>
    </ThemeProvider>
  );
}
