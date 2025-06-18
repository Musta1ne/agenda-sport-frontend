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
    nombre: '',
    apellido: '',
    comentario: '',
    metodo_pago: 'efectivo',
  });
  const [loading, setLoading] = useState(false);
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [precio, setPrecio] = useState('');
  const [nombreCancha, setNombreCancha] = useState('');

  useEffect(() => {
    getCourts().then(res => setCourts(res.data));
  }, []);

  useEffect(() => {
    if (form.id_cancha) {
      const cancha = courts.find(c => c.id_cancha === parseInt(form.id_cancha));
      setPrecio(cancha ? cancha.precio : '');
      setNombreCancha(cancha ? cancha.nombre : '');
    } else {
      setPrecio('');
      setNombreCancha('');
    }
  }, [form.id_cancha, courts]);

  useEffect(() => {
    if (form.id_cancha && form.fecha) {
      getCourtAvailability(form.id_cancha).then(res => {
        const reservas = res.data.reservas.filter(r => r.fecha === form.fecha);
        const bloqueos = res.data.bloqueos.filter(b => b.fecha === form.fecha);
        const horarios = res.data.horarios;
        let opciones = [];
        horarios.forEach(horario => {
          const start = parseInt(horario.hora_inicio.split(':')[0]);
          const end = parseInt(horario.hora_fin.split(':')[0]);
          for (let h = start; h < end; h++) {
            const turno = h.toString().padStart(2, '0') + ':00';
            const ocupado = reservas.some(r => r.hora_inicio === turno) || bloqueos.some(b => b.hora_inicio === turno);
            if (!ocupado) opciones.push(turno);
          }
        });
        setHorasDisponibles(opciones);
      });
    } else {
      setHorasDisponibles([]);
    }
    setForm(f => ({ ...f, hora_inicio: '' }));
  }, [form.id_cancha, form.fecha]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const hora_fin = form.hora_inicio ? (parseInt(form.hora_inicio.split(':')[0]) + 1).toString().padStart(2, '0') + ':00' : '';
      await createBooking({ ...form, hora_fin, monto: precio });
      toast.success('Reserva creada con éxito');
      setForm({ id_cancha: '', fecha: '', hora_inicio: '', nombre: '', apellido: '', comentario: '', metodo_pago: 'efectivo' });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error al crear la reserva');
    }
    setLoading(false);
  };

  return (
    <div className={styles.formCard} style={{ minHeight: 'unset' }}>
      <form className={styles.formWrap} onSubmit={handleSubmit}>
        <h1 className={styles.formTitle}>
          <MdSportsSoccer style={{ color: 'var(--accent2)', marginRight: 10, verticalAlign: 'middle' }} />
          Reservá tu cancha
        </h1>
        {precio && nombreCancha && (
          <div className={styles.price}>
            {nombreCancha} - Precio: <b>${precio}</b>
          </div>
        )}
        <label className={styles.label}>
          <span>Nombre</span>
          <input className={styles.input} name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Nombre" />
        </label>
        <label className={styles.label}>
          <span>Apellido</span>
          <input className={styles.input} name="apellido" value={form.apellido} onChange={handleChange} required placeholder="Apellido" />
        </label>
        <label className={styles.label}>
          <span><MdSportsSoccer style={{ color: 'var(--accent2)', marginRight: 6, verticalAlign: 'middle' }} /> Cancha</span>
          <select className={styles.select} name="id_cancha" value={form.id_cancha} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            {courts.map(c => (
              <option key={c._id} value={c._id}>{c.nombre}</option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          <span><MdDateRange style={{ color: 'var(--accent2)', marginRight: 6, verticalAlign: 'middle' }} /> Fecha</span>
          <input className={styles.input} type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
        </label>
        <label className={styles.label}>
          <span><MdAccessTime style={{ color: 'var(--accent2)', marginRight: 6, verticalAlign: 'middle' }} /> Turno</span>
          <select className={styles.select} name="hora_inicio" value={form.hora_inicio} onChange={handleChange} required disabled={!horasDisponibles.length}>
            <option value="">Seleccionar</option>
            {horasDisponibles.map(h => (
              <option key={h} value={h}>{h} - {parseInt(h.split(':')[0]) + 1}:00</option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          <span><MdComment style={{ color: 'var(--accent2)', marginRight: 6, verticalAlign: 'middle' }} /> Comentario</span>
          <input className={styles.input} type="text" name="comentario" value={form.comentario} onChange={handleChange} />
        </label>
        <label className={styles.label}>
          <span><MdAttachMoney style={{ color: 'var(--accent2)', marginRight: 6, verticalAlign: 'middle' }} /> Monto</span>
          <input className={styles.input} type="number" name="monto" value={precio} readOnly />
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
        <button className={styles.button} type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Reservar ahora'}</button>
      </form>
    </div>
  );
} 