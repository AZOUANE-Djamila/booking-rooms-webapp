import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "react-datepicker/dist/react-datepicker.css";

function RoomDetail() {
  const [room, setRoom] = React.useState(null);
  const [open, setOpen] = React.useState(true);
  const [isLoading, setLoading] = useState(true); // State variable to track loading state
  const [openModal, setOpenModal] = React.useState(false);
  const { _id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/rooms/${_id}`)
      .then(res => {
        setRoom(res.data);
      })
      .catch(err => console.error(err));
  }, [_id]);

  if (!room) {
    return <div>Loading...</div>;
  }

  // Function to check if a date is available
  const isDateAvailable = (date) => {
    if (!room.availability) {
      // If availability is false, disable all dates
      return false;
    }

    // Check if the date is available based on the room's availability data
    return room.availability.every((availability) => {
      const availabilityDate = new Date(availability.date);
      return (
        availabilityDate.getTime() !== date.getTime() ||
        !availability.isAvailable
      );
    });
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box mt={5} mb={10}>
          <Typography
            variant="h6"
            sx={{
              fontSize: 11,
              color: "#eee",
              bgcolor: "#222",
              width: "fit-content",
              padding: "5px 10px",
              borderRadius: "7%",
            }}
          >
            {room.type}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {room.name} - {room.location}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardMedia
                  component="img"
                  height="400"
                  image={`${room.imageUrl}`}
                  alt={room.name}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Réserver la {room.type}
                </Typography>
                <Typography variant="p" gutterBottom>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum."
                </Typography>
                </Box>
                <Box mt={2}>
                <Button
                  variant="contained"
                  sx={{ color: "#eee", bgcolor: "#222" }}
                >
                  Réservez Maintenant
                </Button>
              </Box>
              {/*<Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Disponibilités
                </Typography>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  filterDate={isDateAvailable}
                />
              </Box>*/}
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default RoomDetail;
