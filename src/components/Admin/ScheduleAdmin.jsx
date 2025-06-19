import React, { useEffect, useState } from 'react';
import { getSchedules, createSchedule, updateSchedule, deleteSchedule, getCourts } from '../../services/api';
import './ScheduleAdmin.css';

const initialForm = { id_cancha: '', dia_semana: 'Lunes', hora_inicio: '12:00', hora_fin: '13:00', activo: 1 };

const horas = Array.from({length: 11}, (_, i) => {
  const h = 12 + i;
  return h.toString().padStart(2, '0') + ':00';
});

const ScheduleAdmin = () => {
  const [schedules, setSchedules] = useState([]);
  const [courts, setCourts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const res = await getSchedules();
      setSchedules(res.data);
    } catch (err) {
      setError('Error al cargar horarios');
    }
    setLoading(false);
  };

  const fetchCourts = async () => {
    try {
      const res = await getCourts();
      setCourts(res.data);
    } catch {}
  };

  useEffect(() => { fetchSchedules(); fetchCourts(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await updateSchedule(editing, form);
      } else {
        await createSchedule(form);
      }
      setForm(initialForm);
      setEditing(null);
      fetchSchedules();
    } catch (err) {
      setError('Error al guardar horario');
    }
    setLoading(false);
  };

  const handleEdit = (schedule) => {
    setForm(schedule);
    setEditing(schedule.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este horario?')) return;
    setLoading(true);
    try {
      await deleteSchedule(id);
      fetchSchedules();
    } catch (err) {
      setError('Error al eliminar horario');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Horarios Fijos</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      <form onSubmit={handleSubmit} style={{marginBottom:20}}>
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
        <button type="submit" disabled={loading}>{editing ? 'Actualizar' : 'Agregar'}</button>
        {editing && <button type="button" onClick={()=>{setForm(initialForm);setEditing(null);}}>Cancelar</button>}
      </form>
      {loading ? <p>Cargando...</p> : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th><th>Cancha</th><th>Inicio</th><th>Fin</th><th>Activo</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{courts.find(c=>c.id===s.id_cancha)?.nombre || s.id_cancha}</td>
                <td>{s.hora_inicio}</td>
                <td>{s.hora_fin}</td>
                <td>{s.activo ? 'Sí' : 'No'}</td>
                <td>
                  <button onClick={()=>handleEdit(s)}>Editar</button>
                  <button onClick={()=>handleDelete(s.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScheduleAdmin; 