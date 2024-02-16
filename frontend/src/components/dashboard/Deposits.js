import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Layouts/Title';

function Deposits() {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchBookingAmounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings');
        const bookings = response.data;
        const total = bookings.reduce((acc, booking) => acc + booking.amount, 0);
        setTotalAmount(total);
      } catch (error) {
        console.error('Error fetching booking amounts:', error);
      }
    };

    fetchBookingAmounts();
  }, []);

  return (
    <React.Fragment>
      <Title color="textPrimary">Gain total</Title>
      <Typography component="p" variant="h4" color="textPrimary">
        {totalAmount.toFixed(2)} DA
      </Typography>
      <Typography color="textSecondary" sx={{ flex: 1 }}>
        {/* Display the date dynamically */}
        {new Date().toLocaleDateString()}
      </Typography>
      <div>
        <Link color="textSecondary" href="#" onClick={(event) => event.preventDefault()}>
          Voir les gains
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Deposits;
