import React, { useState } from "react";
import axios from "axios";
import { Modal, Box, Typography, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddBookingModal = ({ open, onClose, roomId }) => {
  const [reservationData, setReservationData] = useState({
    user: "",
    bookingStart: null,
    bookingEnd: null,
    roomId: roomId,
  });
  const [reservationSuccess, setReservationSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBooking = async () => {
    try {
      if (!reservationData.user || !reservationData.bookingStart || !reservationData.bookingEnd) {
        console.error("Please fill in all required fields");
        return;
      }

      // Send a request to create a new booking
      await axios.post(`http://localhost:5000/api/rooms/${roomId}/bookings`, reservationData);

      setReservationSuccess(true);
      setReservationData({
        user: "",
        bookingStart: null,
        bookingEnd: null,
        roomId: roomId,
      });
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };

  const handleClose = () => {
    onClose();
    if (reservationSuccess) {
      setTimeout(() => {
        setReservationSuccess(false);
      }, 2000);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 400,
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 1,
            right: 1,
            mr: 0.2,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontSize: 16 }} gutterBottom>
          Effectuer une réservation pour la salle {roomId}
        </Typography>
        <TextField
          label="User Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="user"
          value={reservationData.user}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Booking Start"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            name="bookingStart"
            id="bookingStart"
            value={reservationData.bookingStart}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            format="dd-mm-yyyy"

          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Booking End"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            name="bookingEnd"
            id="bookingEnd"
            value={reservationData.bookingEnd}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            format="dd-mm-yyyy"
          />
        </Box>
        {reservationSuccess ? (
          <Typography variant="body1" color="success">
            Reservation successfully added!
          </Typography>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddBooking}
            fullWidth
            sx={{ mt: 2 }}
          >
            Réserver
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default AddBookingModal;