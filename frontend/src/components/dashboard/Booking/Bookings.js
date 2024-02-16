import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Title from "../Layouts/Title";

// Function to format the date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
};

export default function Bookings({ roomId }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/rooms/${roomId}/bookings`
        );
        console.log("Bookings response", response.data);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [roomId]);

  return (
    <React.Fragment>
      <Title>
        Réservation de la salle {bookings.length > 0 && bookings[0].roomId.name}
      </Title>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Nom & Prénom</TableCell>
            <TableCell>Salle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log("Booking List ", bookings)}
          {bookings.map((row) => (
            <TableRow key={row.roomId}>
              <TableCell>{formatDate(row.bookingStart)}</TableCell>
              <TableCell>{row.user}</TableCell>
              <TableCell>
                {row.roomId.name}, Capacité : {row.roomId.capacity} personnes
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
