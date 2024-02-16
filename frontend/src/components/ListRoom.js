import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useHistory, Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchIcon from "@mui/icons-material/Search";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import GroupIcon from "@mui/icons-material/Group";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    type: "conference",
    imageUrl: null,
    location: "",
    floor: "",
    availability: ["Available", "Not Available"],
    features: [],
  });
  const history = useHistory();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rooms");
        setRooms(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleViewAllRooms = () => {
    history.push("/rooms");
  };
  const handleReservationClick = (room) => {
    setSelectedRoom(room);
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  // Event Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleBooking = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rooms",
        formData
      );
      console.log("Room added successfully:", response.data);
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };
  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ mt: 5, mb: 10 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0,
              marginBottom: 2,
              borderRadius: "25px 0 0 25px",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Location"
              InputProps={{
                sx: { borderRadius: "25px 0 0 25px", borderColor: "#ffe" },
              }}
            />
            <TextField
              variant="outlined"
              type="date"
              InputProps={{
                sx: { borderRadius: "0", width: "240px", borderColor: "#ffe" },
              }}
            />
            <TextField
              variant="outlined"
              type="date"
              InputProps={{
                sx: {
                  borderRadius: "0 0px 0px 0",
                  width: "240px",
                  borderColor: "#fff",
                },
              }}
            />
            <IconButton
              sx={{
                borderRadius: "0 25px 25px 0",
                bgcolor: "#f2f2f2",
                borderColor: "#ffe",
                padding: "15px",
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <Button
              color="inherit"
              variant="text"
              sx={{ mr: 1, display: "block" }}
              onClick={() => {
                /* Add onClick handler */
              }}
            >
              <MeetingRoomIcon sx={{ fontSize: 30 }} />
              <Typography variant="body2">Salles de conférence</Typography>
            </Button>
            <Button
              color="inherit"
              variant="text"
              sx={{ mr: 1, display: "block" }}
              onClick={() => {
                /* Add onClick handler */
              }}
            >
              <GroupIcon sx={{ fontSize: 30 }} />
              <Typography variant="body2">Salles de réunion</Typography>
            </Button>
            <Button
              color="inherit"
              variant="text"
              onClick={() => {
                /* Add onClick handler */
              }}
              sx={{ mr: 1, display: "block" }}
            >
              <EventNoteIcon sx={{ fontSize: 30 }} />
              <Typography variant="body2">Classe</Typography>
            </Button>
            {/* Add more buttons/icons as needed */}
          </Box>
        </Box>
        <Container>
          <Grid container spacing={2}>
            {rooms.map((room) => (
              <Grid item xs={12} sm={6} md={3} key={room._id}>
                <Link
                  to={`/rooms/${room._id}`}
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  {/* Add Link component */}
                  <Card sx={{ boxShadow: "none", borderRadius: "5%" }}>
                    <CardMedia
                      component="img"
                      height="200"
                      wdth="350"
                      image={`http://localhost:5000/uploads/${room.imageUrl}`}
                      alt={room.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{room.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {room.capacity} personnes
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          mt: 1,
                          fontSize: 12,
                          color: room.availability ? "green" : "red",
                          borderRadius: "5px",
                        }}
                      >
                        {room.availability ? "Available" : "Not available"}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {room.price} DA
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{ mt: 1, color:"eee", bgcolor: "#222" }}
                        onClick={() => handleReservationClick(room)}
                      >
                        Réserver
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="inherit"
              onClick={handleViewAllRooms}
            >
              View All Rooms
            </Button>
          </Box>
        </Container>
        <Dialog open={openModal} onClose={handleModalClose}>
          <DialogTitle>Book Room</DialogTitle>
          <DialogContent>
            {/* Add modal content, such as form for booking */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleBooking} color="primary">
              Book
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </>
  );
};

export default RoomList;
