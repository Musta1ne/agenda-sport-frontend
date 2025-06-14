#Footbal Booking
---------------

Este proyecto es una aplicación desarrollada en React y TypeScript que permite a los usuarios reservar canchas de fútbol y ver la disponibilidad de horarios. La aplicación está diseñada para ser intuitiva y responsiva, utilizando una API propia en el backend.

## Objetivo

El objetivo de esta aplicación es simplificar la gestión de reservas de canchas, ofreciendo una interfaz fácil de usar para los usuarios y un flujo de reservas eficiente.

## Requisitos Técnicos Generales

### Componentes

- La aplicación está dividida en varios componentes reutilizables, como `FieldList` y `ReservationForm`, que facilitan la gestión de reservas y la visualización de canchas.

### Estado Global

- Se utiliza `zustand` para manejar el estado global, optimizando el flujo de reservas y la disponibilidad en tiempo real.

### Navegación

- Implementa React Router para la navegación entre las vistas principales: lista de canchas, reservas, y perfil de usuario.

## Requisitos Técnicos Específicos

### Reservas de Canchas

- Los usuarios pueden realizar reservas para horarios específicos de 4 pm a 11 pm, con disponibilidad actualizada en tiempo real.

### Gestión de Usuarios

- Permite el registro e inicio de sesión mediante formularios personalizados, con un sistema de autenticación basado en tokens.

### Estilos

- La aplicación utiliza Tailwind CSS para un diseño responsivo y limpio.

## Funcionalidades Implementadas

### Reservas Dinámicas

- Las reservas se actualizan automáticamente según la disponibilidad de cada cancha y horario.

### Autenticación

- Los usuarios pueden registrarse, iniciar sesión.

### Navegación por Rutas

- React Router permite una navegación fluida entre las diferentes secciones de la aplicación.

## Librerías Utilizadas

- **React**: Framework para la interfaz de usuario.
- **TypeScript**: Para una escritura de código más robusta.
- **ShadCN**: Librería de componentes para una interfaz consistente y fácil de usar.
- **Tailwind CSS**: Para los estilos.
- **zustand**: Para el manejo del estado global.
- **React Router**: Para la navegación entre páginas.
