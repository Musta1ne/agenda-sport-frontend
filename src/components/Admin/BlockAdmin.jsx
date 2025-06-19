import React, { useEffect, useState } from 'react';
import { getBlocks, createBlock, updateBlock, deleteBlock, getCourts } from '../../services/api';

const initialForm = { id_cancha: '', fecha: '', hora_inicio: '', hora_fin: '', motivo: '' };

const BlockAdmin = () => {
  const [blocks, setBlocks] = useState([]);
  const [courts, setCourts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBlocks = async () => {
    setLoading(true);
    try {
      const res = await getBlocks();
      setBlocks(res.data);
    } catch (err) {
      setError('Error al cargar bloqueos');
    }
    setLoading(false);
  };

  const fetchCourts = async () => {
    try {
      const res = await getCourts();
      setCourts(res.data);
    } catch {}
  };

  useEffect(() => { fetchBlocks(); fetchCourts(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await updateBlock(editing, form);
      } else {
        await createBlock(form);
      }
      setForm(initialForm);
      setEditing(null);
      fetchBlocks();
    } catch (err) {
      setError('Error al guardar bloqueo');
    }
    setLoading(false);
  };

  const handleEdit = (block) => {
    setForm(block);
    setEditing(block.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este bloqueo/horario?')) return;
    setLoading(true);
    try {
      await deleteBlock(id);
      fetchBlocks();
    } catch (err) {
      setError('Error al eliminar bloqueo');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Horarios / Bloqueos</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      <form onSubmit={handleSubmit} style={{marginBottom:20}}>
        <select name="id_cancha" value={form.id_cancha} onChange={handleChange} required>
          <option value="">Selecciona cancha</option>
          {courts.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
        <input name="fecha" placeholder="Fecha (YYYY-MM-DD)" value={form.fecha} onChange={handleChange} required />
        <input name="hora_inicio" placeholder="Hora inicio (HH:MM)" value={form.hora_inicio} onChange={handleChange} required />
        <input name="hora_fin" placeholder="Hora fin (HH:MM)" value={form.hora_fin} onChange={handleChange} required />
        <input name="motivo" placeholder="Motivo" value={form.motivo} onChange={handleChange} />
        <button type="submit" disabled={loading}>{editing ? 'Actualizar' : 'Agregar'}</button>
        {editing && <button type="button" onClick={()=>{setForm(initialForm);setEditing(null);}}>Cancelar</button>}
      </form>
      {loading ? <p>Cargando...</p> : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th><th>Cancha</th><th>Fecha</th><th>Inicio</th><th>Fin</th><th>Motivo</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map(block => (
              <tr key={block.id}>
                <td>{block.id}</td>
                <td>{courts.find(c=>c.id===block.id_cancha)?.nombre || block.id_cancha}</td>
                <td>{block.fecha}</td>
                <td>{block.hora_inicio}</td>
                <td>{block.hora_fin}</td>
                <td>{block.motivo}</td>
                <td>
                  <button onClick={()=>handleEdit(block)}>Editar</button>
                  <button onClick={()=>handleDelete(block.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BlockAdmin; 