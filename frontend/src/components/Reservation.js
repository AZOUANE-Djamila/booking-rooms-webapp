// Reservation.js
import React, { useState } from 'react';

function Reservation() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roomNo, setRoomNo] = useState('');

  const bookRoom = async () => {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        roomNo: roomNo,
      }),
    });

    if (response.ok) {
      alert('Room booked successfully!');
    } else {
      alert('Error booking room. Please try again.');
    }
  };

  return (
    <div>
      <h2>Make a Reservation</h2>
      <form>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Room Number:</label>
        <input type="text" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} required />

        <button type="button" onClick={bookRoom}>
          Book Room
        </button>
      </form>
    </div>
  );
}

export default Reservation;
