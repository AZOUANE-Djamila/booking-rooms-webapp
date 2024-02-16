import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from "@mui/material";
import AddRoomModal from "./AddRoomModal";

export default function RoomsListCopy() {
  const [isAddRoomModalOpen, setAddRoomModalOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const history = useHistory();

  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  


  const handleViewReservationsClick = (roomId) => {
    console.log(`Voir les réservations clicked for room ${roomId}`);

    // Redirect to BookingList component
    history.push('/booking-list');
  };
  const handleReserveClick = (roomId) => {
    console.log(`Réserver clicked for room ${roomId}`);
    setSelectedRoomId(roomId);
    setAddRoomModalOpen(true);
  };
  const handleCloseAddRoomModal = () => {
    setAddRoomModalOpen(false);
  };

  return (
    <Box>
      <Typography variant="h5">Room List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room Name</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room._id}>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleReserveClick(room._id)}
                  >
                    Réserver
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleViewReservationsClick(room._id)}
                    sx={{ marginLeft: 2 }}
                  >
                    Voir les réservations
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddRoomModal
        open={isAddRoomModalOpen}
        onClose={handleCloseAddRoomModal}
        roomId={selectedRoomId}
      />
    </Box>
  );
}
