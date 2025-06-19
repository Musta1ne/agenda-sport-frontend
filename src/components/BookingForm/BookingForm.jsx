import React, { useEffect, useState } from 'react';
import { getCourts, createBooking, getCourtAvailability } from '../../services/api';
import { toast } from 'react-toastify';
import { MdSportsSoccer, MdAttachMoney, MdDateRange, MdAccessTime, MdComment, MdPayment } from 'react-icons/md';
import styles from './BookingForm.module.css';

export default function BookingForm() {
  const [courts, setCourts] = useState([]);
  const [form, setForm] = useState({
    id_cancha: '',
    fecha: '',
    hora_inicio: '',
    nombre_usuario: '',
    telefono: '',
    comentario: '',
    metodo_pago: 'efectivo',
  });
  const [loading, setLoading] = useState(false);
  const [courtsLoading, setCourtsLoading] = useState(true);
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [precio, setPrecio] = useState('');
  const [nombreCancha, setNombreCancha] = useState('');
  const [tipoCancha, setTipoCancha] = useState('');

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        setCourtsLoading(true);
        const res = await getCourts();
        setCourts(res.data || []);
      } catch (error) {
        console.error('Error fetching courts:', error);
        toast.error('Error al cargar las canchas');
        setCourts([]);
      } finally {
        setCourtsLoading(false);
      }
    };

    fetchCourts();
  }, []);

  useEffect(() => {
    if (form.id_cancha) {
      const cancha = courts.find(c => c.id === parseInt(form.id_cancha));
      setPrecio(cancha ? cancha.precio : '');
      setNombreCancha(cancha ? cancha.nombre : '');
      setTipoCancha(cancha ? cancha.tipo : '');
    } else {
      setPrecio('');
      setNombreCancha('');
      setTipoCancha('');
    }
  }, [form.id_cancha, courts]);

  useEffect(() => {
    if (form.id_cancha && form.fecha) {
      const fetchAvailability = async () => {
        try {
          const res = await getCourtAvailability(form.id_cancha);
          const reservas = res.data.reservas?.filter(r => r.fecha === form.fecha) || [];
          const bloqueos = res.data.bloqueos?.filter(b => b.fecha === form.fecha) || [];
          const horarios = res.data.horarios || [];

          // Marcar cada horario como disponible, reservado o bloqueado
          const horariosMarcados = horarios.map(horario => {
            const reservado = reservas.some(r => r.hora_inicio === horario.hora_inicio);
            const bloqueado = bloqueos.some(b => b.hora_inicio === horario.hora_inicio);
            return {
              ...horario,
              estado: reservado ? 'reservado' : bloqueado ? 'bloqueado' : 'disponible'
            };
          });
          setHorasDisponibles(horariosMarcados);
        } catch (error) {
          console.error('Error fetching availability:', error);
          setHorasDisponibles([]);
        }
      };
      fetchAvailability();
    } else {
      setHorasDisponibles([]);
    }
    setForm(f => ({ ...f, hora_inicio: '' }));
  }, [form.id_cancha, form.fecha]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calcularHoraFin = (horaInicio) => {
    if (!horaInicio) return '';
    // Buscar el horario seleccionado
    const horario = horasDisponibles.find(h => h.hora_inicio === horaInicio);
    return horario ? horario.hora_fin : '';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!form.nombre_usuario.trim()) {
      toast.error('El nombre es requerido');
      return;
    }

    if (!form.telefono.trim()) {
      toast.error('El teléfono es requerido');
      return;
    }

    setLoading(true);
    try {
      const hora_fin = calcularHoraFin(form.hora_inicio);
      
      await createBooking({ 
        ...form, 
        hora_fin, 
        id_cancha: parseInt(form.id_cancha)
      });
      
      toast.success('Reserva creada con éxito');
      setForm({ 
        id_cancha: '', 
        fecha: '', 
        hora_inicio: '', 
        nombre_usuario: '', 
        telefono: '', 
        comentario: '', 
        metodo_pago: 'efectivo' 
      });
      setPrecio('');
      setNombreCancha('');
      setTipoCancha('');
    } catch (err) {
      console.error('Error creating booking:', err);
      const errorMessage = err.response?.data?.error || 'Error al crear la reserva';
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  if (courtsLoading) {
    return (
      <div className={styles.formCard}>
        <div className={styles.loadingMessage}>Cargando canchas...</div>
      </div>
    );
  }

  return (
    <div className={styles.formCard} style={{ minHeight: 'unset' }}>
      <form className={styles.formWrap} onSubmit={handleSubmit}>
        <h1 className={styles.formTitle}>
          <MdSportsSoccer style={{ color: 'var(--accent2)', marginRight: 10, verticalAlign: 'middle' }} />
          Reservá tu cancha
        </h1>
        {precio && nombreCancha && (
          <div className={styles.price}>
            {nombreCancha} - Precio: <b>${precio?.toLocaleString()}</b>
          </div>
        )}
        <label className={styles.label}>
          <span>Nombre completo</span>
          <input 
            className={styles.input} 
            name="nombre_usuario" 
            value={form.nombre_usuario} 
            onChange={handleChange} 
            required 
            placeholder="Tu nombre completo" 
          />
        </label>
        <label className={styles.label}>
          <span>Teléfono</span>
          <input 
            className={styles.input} 
            name="telefono" 
            value={form.telefono} 
            onChange={handleChange} 
            required 
            placeholder="Tu teléfono" 
          />
        </label>
        <label className={styles.label}>
          <span><MdSportsSoccer style={{ color: 'var(--accent2)', marginRight: 6, verticalAlign: 'middle' }} /> Cancha</span>
          <select className={styles.select} name="id_cancha" value={form.id_cancha} onChange={handleChange} required>
            <option value="">Seleccionar cancha</option>
            {courts.map(c => (
              <option key={c.id} value={c.id}>{c.nombre} - ${c.precio?.toLocaleString()}</option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          <span><MdDateRange style={{ color: 'var(--accent2)', marginRight: 6, verticalAlign: 'middle' }} /> Fecha</span>
          <input 
            className={styles.input} 
            type="date" 
            name="fecha" 
            value={form.fecha} 
            onChange={handleChange} 
            required 
            min={new Date().toISOString().split('T')[0]}
          />
        </label>
        <label className={styles.label}>
          <span><MdAccessTime style={{ color: 'var(--accent2)', marginRight: 6, verticalAlign: 'middle' }} /> Horario</span>
          <select className={styles.select} name="hora_inicio" value={form.hora_inicio} onChange={handleChange} required disabled={!horasDisponibles.length}>
            <option value="">{horasDisponibles.length ? 'Seleccionar horario' : 'Selecciona fecha y cancha primero'}</option>
            {horasDisponibles.map(h => (
              <option key={h.hora_inicio} value={h.hora_inicio} disabled={h.estado !== 'disponible'}>
                {h.hora_inicio} - {h.hora_fin} {h.estado === 'reservado' ? '(Reservado)' : h.estado === 'bloqueado' ? '(Bloqueado)' : ''}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          <span><MdComment style={{ color: 'var(--accent2)', marginRight: 6, verticalAlign: 'middle' }} /> Comentario (opcional)</span>
          <input 
            className={styles.input} 
            type="text" 
            name="comentario" 
            value={form.comentario} 
            onChange={handleChange} 
            placeholder="Comentarios adicionales"
          />
        </label>
        <label className={styles.label}>
          <span><MdAttachMoney style={{ color: 'var(--accent2)', marginRight: 6, verticalAlign: 'middle' }} /> Precio</span>
          <input 
            className={styles.input} 
            type="text" 
            value={precio ? `$${precio.toLocaleString()}` : 'Selecciona una cancha'} 
            readOnly 
          />
        </label>
        <label className={styles.label}>
          <span><MdPayment style={{ color: 'var(--accent2)', marginRight: 6, verticalAlign: 'middle' }} /> Método de pago</span>
          <select className={styles.select} name="metodo_pago" value={form.metodo_pago} onChange={handleChange} required>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
          </select>
        </label>
        {form.metodo_pago === 'transferencia' && (
          <div className={styles.transferInfo}>
            <b>Transferir a:</b><br />
            <b>Alias:</b> Agustin-Patat<br />
            <b>CVU:</b> 0000003100046034196304<br />
            <b>Banco:</b> Mercado Pago
          </div>
        )}
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Reservar ahora'}
        </button>
      </form>
    </div>
  );
} 