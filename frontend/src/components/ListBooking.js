import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to get route params

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const { roomId } = useParams(); // Get room ID from route params

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rooms/${roomId}/booking`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [roomId]); 
  return (
    <div>
      <h2>Booking List</h2>
      <ul>
        {console.log("Bookinglist ",bookings)}
        {
          bookings.map((booking) => (
            <li key={booking._id}>
              {/* Display booking information */}
              User: {booking.user}, Booking Start: {booking.bookingStart}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BookingList;
