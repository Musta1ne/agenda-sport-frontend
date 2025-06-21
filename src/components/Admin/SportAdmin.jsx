import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const initialForm = { nombre: '' };

const SportAdmin = () => {
  const { 
    sports, 
    loading, 
    errors, 
    createSport, 
    updateSport, 
    deleteSport 
  } = useAppContext();

  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoadingSubmit(true);
    
    try {
      if (editing) {
        await updateSport(editing, form);
        toast.success('Deporte actualizado con éxito');
      } else {
        await createSport(form);
        toast.success('Deporte creado con éxito');
      }
      setForm(initialForm);
      setEditing(null);
    } catch (err) {
      const errorMessage = err.response?.data?.errors?.[0]?.msg || 'Error al guardar el deporte';
      toast.error(errorMessage);
      console.error('Error saving sport:', err);
    }
    setLoadingSubmit(false);
  };

  const handleEdit = (sport) => {
    setForm(sport);
    setEditing(sport.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este deporte? Esto podría afectar a las canchas asociadas.')) return;
    setLoadingSubmit(true);
    try {
      await deleteSport(id);
      toast.success('Deporte eliminado con éxito');
    } catch (err) {
      toast.error('Error al eliminar el deporte');
      console.error('Error deleting sport:', err);
    }
    setLoadingSubmit(false);
  };

  return (
    <div>
      <h2>Deportes</h2>
      <p>Asegúrate de que existan los deportes "Fútbol" y "Pádel" para que la asignación de canchas funcione correctamente.</p>
      
      {errors.sports && <div className="admin-error">{errors.sports}</div>}
      
      <form onSubmit={handleSubmit} className="admin-form">
        <input 
          name="nombre" 
          placeholder="Nombre del deporte" 
          value={form.nombre} 
          onChange={handleChange} 
          required 
        />
        <div className="form-actions">
          <button type="submit" disabled={loadingSubmit}>
            {editing ? 'Actualizar Deporte' : 'Agregar Deporte'}
          </button>
          {editing && <button type="button" onClick={() => { setForm(initialForm); setEditing(null); }}>
            Cancelar
          </button>}
        </div>
      </form>
      
      {loading.sports ? <p>Cargando deportes...</p> : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sports.map(sport => (
                <tr key={sport.id}>
                  <td data-label="ID">{sport.id}</td>
                  <td data-label="Nombre">{sport.nombre}</td>
                  <td data-label="Acciones">
                    <button className="admin-btn edit" onClick={() => handleEdit(sport)}>Editar</button>
                    <button className="admin-btn delete" onClick={() => handleDelete(sport.id)}>Eliminar</button>
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

export default SportAdmin; 