import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';

// Estado inicial
const initialState = {
  // Datos
  courts: [],
  bookings: [],
  sports: [],
  schedules: [],
  
  // Estados de carga
  loading: {
    courts: false,
    bookings: false,
    sports: false,
    schedules: false,
  },
  
  // Estados de error
  errors: {
    courts: null,
    bookings: null,
    sports: null,
    schedules: null,
  },
  
  // Estados de UI
  ui: {
    selectedCourt: null,
    selectedDate: new Date().toISOString().slice(0, 10),
    showAvailabilityModal: false,
  }
};

// Tipos de acciones
const ACTIONS = {
  // Canchas
  SET_COURTS: 'SET_COURTS',
  SET_COURTS_LOADING: 'SET_COURTS_LOADING',
  SET_COURTS_ERROR: 'SET_COURTS_ERROR',
  ADD_COURT: 'ADD_COURT',
  UPDATE_COURT: 'UPDATE_COURT',
  DELETE_COURT: 'DELETE_COURT',
  
  // Reservas
  SET_BOOKINGS: 'SET_BOOKINGS',
  SET_BOOKINGS_LOADING: 'SET_BOOKINGS_LOADING',
  SET_BOOKINGS_ERROR: 'SET_BOOKINGS_ERROR',
  ADD_BOOKING: 'ADD_BOOKING',
  UPDATE_BOOKING: 'UPDATE_BOOKING',
  DELETE_BOOKING: 'DELETE_BOOKING',
  
  // Deportes
  SET_SPORTS: 'SET_SPORTS',
  SET_SPORTS_LOADING: 'SET_SPORTS_LOADING',
  SET_SPORTS_ERROR: 'SET_SPORTS_ERROR',
  ADD_SPORT: 'ADD_SPORT',
  UPDATE_SPORT: 'UPDATE_SPORT',
  DELETE_SPORT: 'DELETE_SPORT',
  
  // Horarios
  SET_SCHEDULES: 'SET_SCHEDULES',
  SET_SCHEDULES_LOADING: 'SET_SCHEDULES_LOADING',
  SET_SCHEDULES_ERROR: 'SET_SCHEDULES_ERROR',
  ADD_SCHEDULE: 'ADD_SCHEDULE',
  UPDATE_SCHEDULE: 'UPDATE_SCHEDULE',
  DELETE_SCHEDULE: 'DELETE_SCHEDULE',
  
  // UI
  SET_SELECTED_COURT: 'SET_SELECTED_COURT',
  SET_SELECTED_DATE: 'SET_SELECTED_DATE',
  SET_SHOW_AVAILABILITY_MODAL: 'SET_SHOW_AVAILABILITY_MODAL',
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    // Canchas
    case ACTIONS.SET_COURTS:
      return { ...state, courts: action.payload };
    case ACTIONS.SET_COURTS_LOADING:
      return { 
        ...state, 
        loading: { ...state.loading, courts: action.payload } 
      };
    case ACTIONS.SET_COURTS_ERROR:
      return { 
        ...state, 
        errors: { ...state.errors, courts: action.payload } 
      };
    case ACTIONS.ADD_COURT:
      return { ...state, courts: [...state.courts, action.payload] };
    case ACTIONS.UPDATE_COURT:
      return {
        ...state,
        courts: state.courts.map(court => 
          court.id === action.payload.id ? action.payload : court
        )
      };
    case ACTIONS.DELETE_COURT:
      return {
        ...state,
        courts: state.courts.filter(court => court.id !== action.payload)
      };
    
    // Reservas
    case ACTIONS.SET_BOOKINGS:
      return { ...state, bookings: action.payload };
    case ACTIONS.SET_BOOKINGS_LOADING:
      return { 
        ...state, 
        loading: { ...state.loading, bookings: action.payload } 
      };
    case ACTIONS.SET_BOOKINGS_ERROR:
      return { 
        ...state, 
        errors: { ...state.errors, bookings: action.payload } 
      };
    case ACTIONS.ADD_BOOKING:
      return { ...state, bookings: [action.payload, ...state.bookings] };
    case ACTIONS.UPDATE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.map(booking => 
          booking.id === action.payload.id ? action.payload : booking
        )
      };
    case ACTIONS.DELETE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking.id !== action.payload)
      };
    
    // Deportes
    case ACTIONS.SET_SPORTS:
      return { ...state, sports: action.payload };
    case ACTIONS.SET_SPORTS_LOADING:
      return { 
        ...state, 
        loading: { ...state.loading, sports: action.payload } 
      };
    case ACTIONS.SET_SPORTS_ERROR:
      return { 
        ...state, 
        errors: { ...state.errors, sports: action.payload } 
      };
    case ACTIONS.ADD_SPORT:
      return { ...state, sports: [...state.sports, action.payload] };
    case ACTIONS.UPDATE_SPORT:
      return {
        ...state,
        sports: state.sports.map(sport => 
          sport.id === action.payload.id ? action.payload : sport
        )
      };
    case ACTIONS.DELETE_SPORT:
      return {
        ...state,
        sports: state.sports.filter(sport => sport.id !== action.payload)
      };
    
    // Horarios
    case ACTIONS.SET_SCHEDULES:
      return { ...state, schedules: action.payload };
    case ACTIONS.SET_SCHEDULES_LOADING:
      return { 
        ...state, 
        loading: { ...state.loading, schedules: action.payload } 
      };
    case ACTIONS.SET_SCHEDULES_ERROR:
      return { 
        ...state, 
        errors: { ...state.errors, schedules: action.payload } 
      };
    case ACTIONS.ADD_SCHEDULE:
      return { ...state, schedules: [...state.schedules, action.payload] };
    case ACTIONS.UPDATE_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.map(schedule => 
          schedule.id === action.payload.id ? action.payload : schedule
        )
      };
    case ACTIONS.DELETE_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.filter(schedule => schedule.id !== action.payload)
      };
    
    // UI
    case ACTIONS.SET_SELECTED_COURT:
      return { 
        ...state, 
        ui: { ...state.ui, selectedCourt: action.payload } 
      };
    case ACTIONS.SET_SELECTED_DATE:
      return { 
        ...state, 
        ui: { ...state.ui, selectedDate: action.payload } 
      };
    case ACTIONS.SET_SHOW_AVAILABILITY_MODAL:
      return { 
        ...state, 
        ui: { ...state.ui, showAvailabilityModal: action.payload } 
      };
    
    default:
      return state;
  }
};

// Crear Context
const AppContext = createContext();

// Provider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Acciones para canchas
  const fetchCourts = async () => {
    dispatch({ type: ACTIONS.SET_COURTS_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_COURTS_ERROR, payload: null });
    try {
      const response = await api.getCourts();
      dispatch({ type: ACTIONS.SET_COURTS, payload: response.data });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_COURTS_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.SET_COURTS_LOADING, payload: false });
    }
  };

  const createCourt = async (courtData) => {
    try {
      const response = await api.createCourt(courtData);
      dispatch({ type: ACTIONS.ADD_COURT, payload: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateCourt = async (id, courtData) => {
    try {
      const response = await api.updateCourt(id, courtData);
      dispatch({ type: ACTIONS.UPDATE_COURT, payload: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteCourt = async (id) => {
    try {
      await api.deleteCourt(id);
      dispatch({ type: ACTIONS.DELETE_COURT, payload: id });
    } catch (error) {
      throw error;
    }
  };

  // Acciones para reservas
  const fetchBookings = async () => {
    dispatch({ type: ACTIONS.SET_BOOKINGS_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_BOOKINGS_ERROR, payload: null });
    try {
      const response = await api.getAllBookings();
      dispatch({ type: ACTIONS.SET_BOOKINGS, payload: response.data });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_BOOKINGS_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.SET_BOOKINGS_LOADING, payload: false });
    }
  };

  const createBooking = async (bookingData) => {
    try {
      const response = await api.createBooking(bookingData);
      dispatch({ type: ACTIONS.ADD_BOOKING, payload: response.data });
      fetchBookings();
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateBooking = async (id, bookingData) => {
    try {
      const response = await api.updateBooking(id, bookingData);
      dispatch({ type: ACTIONS.UPDATE_BOOKING, payload: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteBooking = async (id) => {
    try {
      await api.deleteBooking(id);
      dispatch({ type: ACTIONS.DELETE_BOOKING, payload: id });
    } catch (error) {
      throw error;
    }
  };

  // Acciones para deportes
  const fetchSports = async () => {
    dispatch({ type: ACTIONS.SET_SPORTS_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_SPORTS_ERROR, payload: null });
    try {
      const response = await api.getSports();
      dispatch({ type: ACTIONS.SET_SPORTS, payload: response.data });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_SPORTS_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.SET_SPORTS_LOADING, payload: false });
    }
  };

  const createSport = async (sportData) => {
    try {
      const response = await api.createSport(sportData);
      dispatch({ type: ACTIONS.ADD_SPORT, payload: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateSport = async (id, sportData) => {
    try {
      const response = await api.updateSport(id, sportData);
      dispatch({ type: ACTIONS.UPDATE_SPORT, payload: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteSport = async (id) => {
    try {
      await api.deleteSport(id);
      dispatch({ type: ACTIONS.DELETE_SPORT, payload: id });
    } catch (error) {
      throw error;
    }
  };

  // Acciones para horarios
  const fetchSchedules = async () => {
    dispatch({ type: ACTIONS.SET_SCHEDULES_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_SCHEDULES_ERROR, payload: null });
    try {
      const response = await api.getSchedules();
      dispatch({ type: ACTIONS.SET_SCHEDULES, payload: response.data });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_SCHEDULES_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.SET_SCHEDULES_LOADING, payload: false });
    }
  };

  const createSchedule = async (scheduleData) => {
    try {
      const response = await api.createSchedule(scheduleData);
      dispatch({ type: ACTIONS.ADD_SCHEDULE, payload: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateSchedule = async (id, scheduleData) => {
    try {
      const response = await api.updateSchedule(id, scheduleData);
      dispatch({ type: ACTIONS.UPDATE_SCHEDULE, payload: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteSchedule = async (id) => {
    try {
      await api.deleteSchedule(id);
      dispatch({ type: ACTIONS.DELETE_SCHEDULE, payload: id });
    } catch (error) {
      throw error;
    }
  };

  // Acciones de UI
  const setSelectedCourt = (court) => {
    dispatch({ type: ACTIONS.SET_SELECTED_COURT, payload: court });
  };

  const setSelectedDate = (date) => {
    dispatch({ type: ACTIONS.SET_SELECTED_DATE, payload: date });
  };

  const setShowAvailabilityModal = (show) => {
    dispatch({ type: ACTIONS.SET_SHOW_AVAILABILITY_MODAL, payload: show });
  };

  // Cargar datos iniciales
  useEffect(() => {
    fetchCourts();
    fetchSports();
    fetchSchedules();
  }, []);

  const value = {
    // Estado
    ...state,
    
    // Acciones de canchas
    fetchCourts,
    createCourt,
    updateCourt,
    deleteCourt,
    
    // Acciones de reservas
    fetchBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    
    // Acciones de deportes
    fetchSports,
    createSport,
    updateSport,
    deleteSport,
    
    // Acciones de horarios
    fetchSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    
    // Acciones de UI
    setSelectedCourt,
    setSelectedDate,
    setShowAvailabilityModal,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
}; 