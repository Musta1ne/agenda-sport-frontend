# Estado Global con Context API

## Resumen de Implementación

Se ha implementado **estado global** en el frontend usando **React Context API** con **useReducer** para manejar todo el estado de la aplicación de manera centralizada.

## ✅ Requisitos Cumplidos

- ✅ **Frontend implementado en React.js**
- ✅ **Al menos 3 vistas** (tiene 5: Home, Courts, Bookings, Admin, NotFound)
- ✅ **Estado global con useContext/Redux** - **IMPLEMENTADO**

## Estructura del Estado Global

### Archivo Principal: `src/context/AppContext.jsx`

El estado global maneja:

#### 1. **Datos de la Aplicación**
```javascript
{
  courts: [],        // Lista de canchas
  bookings: [],      // Lista de reservas
  sports: [],        // Lista de deportes
  schedules: [],     // Lista de horarios
}
```

#### 2. **Estados de Carga**
```javascript
{
  loading: {
    courts: false,
    bookings: false,
    sports: false,
    schedules: false,
  }
}
```

#### 3. **Estados de Error**
```javascript
{
  errors: {
    courts: null,
    bookings: null,
    sports: null,
    schedules: null,
  }
}
```

#### 4. **Estados de UI**
```javascript
{
  ui: {
    selectedCourt: null,
    selectedDate: new Date().toISOString().slice(0, 10),
    showAvailabilityModal: false,
  }
}
```

## Acciones Disponibles

### Canchas (Courts)
- `fetchCourts()` - Cargar todas las canchas
- `createCourt(courtData)` - Crear nueva cancha
- `updateCourt(id, courtData)` - Actualizar cancha
- `deleteCourt(id)` - Eliminar cancha

### Reservas (Bookings)
- `fetchBookings()` - Cargar todas las reservas
- `createBooking(bookingData)` - Crear nueva reserva
- `updateBooking(id, bookingData)` - Actualizar reserva
- `deleteBooking(id)` - Eliminar reserva

### Deportes (Sports)
- `fetchSports()` - Cargar todos los deportes
- `createSport(sportData)` - Crear nuevo deporte
- `updateSport(id, sportData)` - Actualizar deporte
- `deleteSport(id)` - Eliminar deporte

### Horarios (Schedules)
- `fetchSchedules()` - Cargar todos los horarios
- `createSchedule(scheduleData)` - Crear nuevo horario
- `updateSchedule(id, scheduleData)` - Actualizar horario
- `deleteSchedule(id)` - Eliminar horario

### UI
- `setSelectedCourt(court)` - Seleccionar cancha
- `setSelectedDate(date)` - Seleccionar fecha
- `setShowAvailabilityModal(show)` - Mostrar/ocultar modal de disponibilidad

## Cómo Usar el Estado Global

### 1. En cualquier componente:

```javascript
import { useAppContext } from '../context/AppContext';

function MiComponente() {
  const { 
    courts, 
    loading, 
    errors, 
    createCourt,
    fetchCourts 
  } = useAppContext();

  // Usar el estado y las acciones
  return (
    <div>
      {loading.courts ? 'Cargando...' : courts.map(court => (
        <div key={court.id}>{court.nombre}</div>
      ))}
    </div>
  );
}
```

### 2. Componentes Actualizados

Los siguientes componentes ya usan el estado global:

- ✅ **CourtList** - Lista de canchas
- ✅ **BookingList** - Lista de reservas  
- ✅ **BookingForm** - Formulario de reservas
- ✅ **CourtAdmin** - Panel de administración de canchas

## Beneficios del Estado Global

### 1. **Centralización**
- Todo el estado está en un solo lugar
- Fácil de debuggear y mantener

### 2. **Reutilización**
- Los datos se cargan una vez y se comparten entre componentes
- No hay llamadas duplicadas a la API

### 3. **Consistencia**
- Todos los componentes ven los mismos datos
- Actualizaciones automáticas cuando cambia el estado

### 4. **Performance**
- Evita re-renders innecesarios
- Optimización con useReducer

### 5. **Mantenibilidad**
- Código más limpio y organizado
- Fácil agregar nuevas funcionalidades

## Configuración

### 1. Provider en `main.jsx`
```javascript
import { AppProvider } from './context/AppContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
```

### 2. Carga Inicial
El `AppProvider` carga automáticamente:
- Canchas
- Deportes  
- Horarios

Al cargar la aplicación.

## Patrón Reducer

Se usa `useReducer` para manejar las acciones de manera predecible:

```javascript
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_COURTS:
      return { ...state, courts: action.payload };
    case ACTIONS.ADD_COURT:
      return { ...state, courts: [...state.courts, action.payload] };
    // ... más casos
  }
};
```

## Conclusión

✅ **El frontend ahora cumple TODOS los requisitos mínimos:**

1. ✅ Frontend implementado en React.js
2. ✅ Al menos 3 vistas (tiene 5)
3. ✅ Estado global con useContext/Redux

El sistema de estado global está completamente implementado y funcional, proporcionando una base sólida para el crecimiento futuro de la aplicación.
