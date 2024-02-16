// RoomsList.jsx
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { styled, createTheme, ThemeProvider, CssBaseline, AppBar as MuiAppBar, Drawer as MuiDrawer, Box, Toolbar, List, Typography, Divider, IconButton, Badge, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddRoomModal from "./AddRoomModal";
import RoomDetail from "./DashboardRoomDetail";
import MainListItems from "../Layouts/listItems";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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

const customTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000", // Black
    },
    secondary: {
      main: "#fff", // White
    },
  },
});

const toSlug = (str) => {
  return str
    .toLowerCase()
    .replace(/[é]/g, 'e') // Replace 'é' with 'e'
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const RoomsList = () => {
  const [open, setOpen] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [isAddRoomModalOpen, setAddRoomModalOpen] = useState(false);
  const [selectedRoomData, setSelectedRoomData] = useState(null);
  const [isRoomDetailOpen, setRoomDetailOpen] = useState(false);
  const [selectedRoomDetailId, setSelectedRoomDetailId] = useState(null);

  const instance = axios.create({
    baseURL: 'http://localhost:5000/api'
  });

  const history = useHistory();

  const handleCloseAddRoomModal = () => {
    setAddRoomModalOpen(false);
  };

  const handleViewClick = (_id, name) => {
    const slug = toSlug(name);
    history.push(`/dashboard/rooms/${slug}`);
  };

  const handleEditClick = async (roomId) => {
    try {
      const response = await instance.get('/rooms/${roomId}');
      setSelectedRoomData(response.data);
      setRoomDetailOpen(true);
      setSelectedRoomDetailId(roomId);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const handleDelete = async (roomId) => {
    try {
      await instance.delete('/rooms/${roomId}');
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId));
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await instance.get('/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
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
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={() => setOpen(!open)}>
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => setAddRoomModalOpen(true)}
              sx={{ mb: 2, float: "right"}}
            >
              Add Room
            </Button>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650 }} aria-label="rooms table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Capacity</TableCell>
                    <TableCell>Availability</TableCell>
                    <TableCell>Floor</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rooms.map((room) => (
                    <TableRow
                      key={room._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {room.name}
                      </TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>{room.capacity}</TableCell>
                      <TableCell>{room.availability}</TableCell>
                      <TableCell>{room.floor}</TableCell>
                      <TableCell>{room.location}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEditClick(room._id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(room._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="view"
                          key={room._id}
                          component={Link}
                          onClick={() => handleViewClick(room._id, room.name)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <AddRoomModal
              open={isAddRoomModalOpen}
              onClose={handleCloseAddRoomModal}
            />
          </Container>
        </Box>
        {isRoomDetailOpen && <RoomDetail />}
      </Box>
    </ThemeProvider>
  );
};

export default RoomsList;
