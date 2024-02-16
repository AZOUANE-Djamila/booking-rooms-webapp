import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import MainListItems from '../Layouts/listItems';

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000', // Black
    },
    secondary: {
      main: '#fff', // White
    },
  },
});

const RoomTypeDetail = () => {
  const [roomType, setRoomType] = useState(null);
  const [open, setOpen] = useState(true);
  const { roomTypeId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/roomtypes/${roomTypeId}`)
      .then((res) => {
        setRoomType(res.data);
      })
      .catch((err) => console.error(err));
  }, [roomTypeId]);

  if (!roomType) {
    return <div>Loading...</div>;
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
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
              Room Type Details
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{MainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                  }}
                >
                  <Card sx={{ display: 'flex' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 300 }}
                      image={roomType.img_url} // Assuming this is the correct property for image URL
                      alt="Room Type"
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="h5" component="div" gutterBottom>
                        {roomType.name}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Description: {roomType.description}
                      </Typography>
                      {/* Add more details here if needed */}
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default RoomTypeDetail;
