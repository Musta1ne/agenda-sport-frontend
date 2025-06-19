import React, { useEffect, useState } from 'react';
import { getCourts, createCourt, updateCourt, deleteCourt } from '../../services/api';

const initialForm = { nombre: '', tipo: '', tipo_superficie: '', estado: 'disponible', precio: '', imagen: '' };

const CourtAdmin = () => {
  const [courts, setCourts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCourts = async () => {
    setLoading(true);
    try {
      const res = await getCourts();
      setCourts(res.data);
    } catch (err) {
      setError('Error al cargar canchas');
    }
    setLoading(false);
  };

  useEffect(() => { fetchCourts(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await updateCourt(editing, form);
      } else {
        await createCourt(form);
      }
      setForm(initialForm);
      setEditing(null);
      fetchCourts();
    } catch (err) {
      setError('Error al guardar cancha');
    }
    setLoading(false);
  };

  const handleEdit = (court) => {
    setForm(court);
    setEditing(court.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta cancha?')) return;
    setLoading(true);
    try {
      await deleteCourt(id);
      fetchCourts();
    } catch (err) {
      setError('Error al eliminar cancha');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Canchas</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      <form onSubmit={handleSubmit} style={{marginBottom:20}}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="tipo" placeholder="Tipo" value={form.tipo} onChange={handleChange} required />
        <input name="tipo_superficie" placeholder="Superficie" value={form.tipo_superficie} onChange={handleChange} />
        <input name="estado" placeholder="Estado" value={form.estado} onChange={handleChange} />
        <input name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} type="number" />
        <input name="imagen" placeholder="URL Imagen" value={form.imagen} onChange={handleChange} />
        <button type="submit" disabled={loading}>{editing ? 'Actualizar' : 'Agregar'}</button>
        {editing && <button type="button" onClick={()=>{setForm(initialForm);setEditing(null);}}>Cancelar</button>}
      </form>
      {loading ? <p>Cargando...</p> : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th><th>Nombre</th><th>Tipo</th><th>Superficie</th><th>Estado</th><th>Precio</th><th>Imagen</th><th>Acciones</th>
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
                  <td data-label="Precio">{court.precio}</td>
                  <td data-label="Imagen">
                    {court.imagen ? (
                      <a
                        href={court.imagen}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-btn view"
                        style={{ minWidth: 0, padding: '6px 14px', display: 'inline-block', textAlign: 'center' }}
                      >
                        Ver imagen
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
