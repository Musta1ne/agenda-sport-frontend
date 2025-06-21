import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const initialForm = { 
  nombre: '', 
  tipo: '', 
  tipo_superficie: '', 
  estado: 'disponible', 
  precio: '', 
  imagen: ''
};

const CourtAdmin = () => {
  const { 
    courts, 
    sports,
    loading, 
    errors, 
    createCourt, 
    updateCourt, 
    deleteCourt 
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

    const normalizeText = (text) => 
      text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const futbolSport = sports.find(s => normalizeText(s.nombre).includes('futbol'));
    const padelSport = sports.find(s => normalizeText(s.nombre).includes('padel'));

    let sportId;
    if (normalizeText(form.tipo).includes('futbol')) {
      sportId = futbolSport ? futbolSport.id : null;
    } else if (normalizeText(form.tipo).includes('padel')) {
      sportId = padelSport ? padelSport.id : null;
    }

    if (!sportId) {
      toast.error('No se pudo encontrar el deporte correspondiente. Asegúrate de que los deportes "Fútbol" y "Pádel" existan.');
      setLoadingSubmit(false);
      return;
    }
    
    const dataToSend = {
      ...form,
      precio: parseFloat(form.precio) || 0,
      id_deporte: sportId,
    };
    
    try {
      if (editing) {
        await updateCourt(editing, dataToSend);
        toast.success('Cancha actualizada con éxito');
      } else {
        await createCourt(dataToSend);
        toast.success('Cancha creada con éxito');
      }
      setForm(initialForm);
      setEditing(null);
    } catch (err) {
      const errorMessage = err.response?.data?.errors?.[0]?.msg || 'Error al guardar la cancha';
      toast.error(errorMessage);
      console.error('Error saving court:', err);
    }
    setLoadingSubmit(false);
  };

  const handleEdit = (court) => {
    setForm(court);
    setEditing(court.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta cancha?')) return;
    setLoadingSubmit(true);
    try {
      await deleteCourt(id);
      toast.success('Cancha eliminada con éxito');
    } catch (err) {
      toast.error('Error al eliminar la cancha');
      console.error('Error deleting court:', err);
    }
    setLoadingSubmit(false);
  };

  return (
    <div>
      <h2>Canchas</h2>
      {errors.courts && <div className="admin-error">{errors.courts}</div>}
      <form onSubmit={handleSubmit} className="admin-form">
        <input name="nombre" placeholder="Nombre de la cancha" value={form.nombre} onChange={handleChange} required />
        
        <select name="tipo" value={form.tipo} onChange={handleChange} required>
          <option value="">Seleccionar Tipo de Cancha</option>
          <option value="Futbol 5">Futbol 5</option>
          <option value="Futbol 7">Futbol 7</option>
          <option value="Pádel">Pádel</option>
        </select>

        <input name="tipo_superficie" placeholder="Superficie (ej. Césped Sintético)" value={form.tipo_superficie} onChange={handleChange} required />
        
        <select name="estado" value={form.estado} onChange={handleChange} required>
            <option value="disponible">Disponible</option>
            <option value="mantenimiento">Mantenimiento</option>
        </select>
        
        <input name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} type="number" required />
        
        <input name="imagen" placeholder="URL de la Imagen" value={form.imagen} onChange={handleChange} />
        
        <div className="form-actions">
          <button type="submit" disabled={loadingSubmit}>{editing ? 'Actualizar Cancha' : 'Agregar Cancha'}</button>
          {editing && <button type="button" onClick={()=>{setForm(initialForm);setEditing(null);}}>Cancelar</button>}
        </div>
      </form>
      
      {loading.courts ? <p>Cargando canchas...</p> : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th><th>Nombre</th><th>Tipo</th><th>Superficie</th><th>Estado</th><th>Precio</th><th>Deporte</th><th>Imagen</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {courts.map(court => (
                <tr key={court.id}>
                  <td data-label="ID">{court.id}</td>
                  <td data-label="Nombre">{court.nombre}</td>
                  <td data-label="Tipo">{court.tipo}</td>
                  <td data-label="Superficie">{court.tipo_superficie}</td>
                  <td data-label="Estado">{court.estado}</td>
                  <td data-label="Precio">${court.precio?.toLocaleString() || 0}</td>
                  <td data-label="Deporte">{court.Sport?.nombre || 'N/A'}</td>
                  <td data-label="Imagen">
                    {court.imagen ? (
                      <a
                        href={court.imagen}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-btn view"
                      >
                        Ver
                      </a>
                    ) : '—'}
                  </td>
                  <td data-label="Acciones">
                    <button className="admin-btn edit" onClick={()=>handleEdit(court)}>Editar</button>
                    <button className="admin-btn delete" onClick={()=>handleDelete(court.id)}>Eliminar</button>
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

export default CourtAdmin; 