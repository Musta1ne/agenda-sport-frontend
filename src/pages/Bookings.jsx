import React from 'react';
import BookingForm from '../components/BookingForm/BookingForm';
import BookingList from '../components/BookingList/BookingList';

export default function Bookings() {
  return (
    <section>
      <h2>Reservas</h2>
      <BookingForm />
      <BookingList />
    </section>
  );
} 