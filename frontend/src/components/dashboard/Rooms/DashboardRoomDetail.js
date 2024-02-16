// DashboardRoomDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  styled,
  createTheme,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Drawer as MuiDrawer,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
  Container,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Modal,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MainListItems  from "../Layouts/listItems";
import AddBookingModal from "../Booking/AddBookingModal";

const ButtonContainer = styled("div")({
  marginTop: "16px",
  display: "flex",
  justifyContent: "space-between",
});

const defaultTheme = createTheme();
const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const toSlug = (str) => {
  return str
    .toLowerCase()
    .replace(/[é]/g, "e") // Replace 'é' with 'e'
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
function DashboardRoomDetail() {
  const [room, setRoom] = useState(null);
  const [open, setOpen] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openBookingModal, setOpenBookingModal] = useState(false);

  const { roomId } = useParams();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/rooms/${roomId}`
        );
        setRoom(response.data);
        console.log(room);
        // Process room data as needed
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, [roomId]);

  if (!room) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    // Implement edit functionality here
  };

  const handleBookRoomClick = () => {
    setOpenBookingModal(true);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpenReservationsList = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ bgColor: "#222" }}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Room Details
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} sx={{ bgColor: "#222" }}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{MainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                  }}
                >
                  <ButtonContainer sx={{ mt: 2, mb: 2 }}>
                    <Button
                      variant="contained"
                      sx={{ bgColor: "#222", color: "#eee" }}
                      onClick={handleBookRoomClick}
                    >
                      Réserver
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgColor: "#222", color: "#eee" }}
                      onClick={handleOpenReservationsList}
                    >
                      Réservations
                    </Button>
                  </ButtonContainer>
                  {room && (
                    <Card sx={{ display: "flex" }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 300 }}
                        image={`${room.imageUrl}`}
                        alt="Room"
                      />
                      <CardContent sx={{ flex: 1 }}>
                        <Typography variant="h5" component="div" gutterBottom>
                          {room.name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Type: {room.type}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Capacity: {room.capacity}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Availability: {room.availability}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Floor: {room.floor}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Location: {room.location}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="reservations-modal"
          aria-describedby="reservations-list"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="reservations-modal" variant="h6" component="h2">
              Reservations List
            </Typography>
            {/* Render reservations list here */}
          </Box>
        </Modal>
        {/*<AddBookingModal
          open={openBookingModal}
          onClose={() => setOpenBookingModal(false)}
          roomId ={room && roomId}
        />*/}
      </Box>
    </ThemeProvider>
  );
}
export default DashboardRoomDetail;
