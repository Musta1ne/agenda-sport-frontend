import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import './ScheduleAdmin.css';

const initialForm = { 
  id_cancha: '', 
  hora_inicio: '12:00', 
  hora_fin: '13:00', 
};

const horas = Array.from({length: 24}, (_, i) => {
  const h = i.toString().padStart(2, '0');
  return `${h}:00`;
});

const ScheduleAdmin = () => {
  const { 
    schedules, 
    courts, 
    loading, 
    errors,
    fetchSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule
  } = useAppContext();

  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoadingSubmit(true);
    
    try {
      const dataToSend = {
        ...form,
        id_cancha: parseInt(form.id_cancha, 10),
        dia_semana: 'todos', // Horario para todos los días
        activo: true          // Siempre activo
      };

      if (editing) {
        // Al editar, mantenemos el día y estado original por si acaso
        const originalSchedule = schedules.find(s => s.id === editing);
        await updateSchedule(editing, {
            ...dataToSend,
            dia_semana: originalSchedule.dia_semana,
            activo: originalSchedule.activo
        });
        toast.success('Horario actualizado con éxito');
      } else {
        await createSchedule(dataToSend);
        toast.success('Horario creado con éxito para todos los días');
      }
      setForm(initialForm);
      setEditing(null);
      fetchSchedules(); // Actualiza la lista
    } catch (err) {
      const errorMessage = err.response?.data?.errors?.[0]?.msg || 'Error al guardar el horario';
      toast.error(errorMessage);
      console.error('Error saving schedule:', err);
    }
    setLoadingSubmit(false);
  };

  const handleEdit = (schedule) => {
    setForm({
      id_cancha: schedule.id_cancha || (schedule.Court ? schedule.Court.id : ''),
      hora_inicio: schedule.hora_inicio,
      hora_fin: schedule.hora_fin
    });
    setEditing(schedule.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este horario?')) return;
    setLoadingSubmit(true);
    try {
      await deleteSchedule(id);
      toast.success('Horario eliminado con éxito');
      fetchSchedules(); // Actualiza la lista
    } catch (err) {
      toast.error('Error al eliminar horario');
      console.error('Error deleting schedule:', err);
    }
    setLoadingSubmit(false);
  };

  return (
    <div>
      <h2>Horarios Fijos</h2>
      <p>Los horarios creados aquí se aplicarán a <strong>todos los días</strong> de la semana.</p>
      {errors.schedules && <div className="admin-error">{errors.schedules}</div>}
      
      <form onSubmit={handleSubmit} className="admin-form">
        <select name="id_cancha" value={form.id_cancha} onChange={handleChange} required>
          <option value="">Selecciona cancha</option>
          {courts.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
        
        <select name="hora_inicio" value={form.hora_inicio} onChange={handleChange} required>
          {horas.map(h => <option key={h} value={h}>{h}</option>)}
        </select>
        
        <select name="hora_fin" value={form.hora_fin} onChange={handleChange} required>
          {horas.map(h => <option key={h} value={h}>{h}</option>)}
        </select>
        
        <div className="form-actions">
          <button type="submit" disabled={loadingSubmit}>
            {editing ? 'Actualizar Horario' : 'Agregar Horario'}
          </button>
          {editing && <button type="button" onClick={()=>{setForm(initialForm);setEditing(null);}}>
            Cancelar
          </button>}
        </div>
      </form>
      
      {loading.schedules ? <p>Cargando horarios...</p> : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th><th>Cancha</th><th>Día</th><th>Inicio</th><th>Fin</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map(schedule => (
                <tr key={schedule.id}>
                  <td data-label="ID">{schedule.id}</td>
                  <td data-label="Cancha">{schedule.Court?.nombre || 'N/A'}</td>
                  <td data-label="Día">{schedule.dia_semana === 'todos' ? 'Todos' : schedule.dia_semana}</td>
                  <td data-label="Inicio">{schedule.hora_inicio}</td>
                  <td data-label="Fin">{schedule.hora_fin}</td>
                  <td data-label="Acciones">
                    <button className="admin-btn edit" onClick={()=>handleEdit(schedule)}>Editar</button>
                    <button className="admin-btn delete" onClick={()=>handleDelete(schedule.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ScheduleAdmin; 