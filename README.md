# Agenda Sport

Sistema de reservas de canchas desarrollado como proyecto real de software por Agustín Patat, Agustín Macello y Francisco Monzoni.

## Descripción
Agenda Sport es una aplicación web moderna para la gestión y reserva de canchas deportivas (Fútbol 5, Fútbol 7 y Pádel). Permite a los usuarios consultar disponibilidad, reservar turnos y a los administradores gestionar canchas, deportes, horarios y reservas de manera eficiente y visual.

## Funcionalidades principales
- **Reserva online de canchas**: los usuarios pueden consultar disponibilidad y reservar turnos de manera sencilla.
- **Gestión de canchas**: alta, edición y baja de canchas, con información de tipo, superficie, precio e imagen.
- **Gestión de deportes**: administración de los deportes disponibles para asociar a las canchas.
- **Gestión de reservas**: visualización, creación y eliminación de reservas tanto para usuarios como para administradores.
- **Gestión de horarios fijos**: configuración de horarios recurrentes para las canchas.
- **Panel de administración**: acceso exclusivo para la gestión integral del sistema.
- **Notificaciones y feedback visual**: uso de Toasts para informar acciones exitosas o errores.
- **Interfaz moderna y responsive**: diseño atractivo y adaptable a dispositivos móviles y escritorio.

## Estructura de carpetas
- `src/components/` - Componentes reutilizables (Navbar, BookingForm, CourtList, etc.)
- `src/pages/` - Vistas principales (Home, Courts, Bookings, AdminPanel, etc.)
- `src/context/` - Contexto global de la aplicación (manejo de estado y acciones)
- `src/services/` - Servicios de conexión con la API
- `src/assets/` - Imágenes y recursos estáticos

## Tecnologías utilizadas
- **React** 19
- **Vite**
- **React Router DOM**
- **React Icons**
- **React Toastify**
- **Styled Components**
- **Framer Motion**
- **Axios**
- **ESLint**

## Instalación y ejecución
1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

## Autores
- Agustín Patat
- Agustín Macello
- Francisco Monzoni

---
Este proyecto fue realizado como parte de una experiencia real de desarrollo de software, aplicando buenas prácticas de diseño, arquitectura y trabajo en equipo.

## Deploy
https://reservas-frontend-tawny.vercel.app
