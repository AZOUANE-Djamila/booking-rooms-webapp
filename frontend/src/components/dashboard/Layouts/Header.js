import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Icon for user account
import { Link } from "react-router-dom"; // If you want to redirect to a signout page

const Header = ({ open, toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Function to handle opening the dropdown menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing the dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to handle signing out
  const handleSignOut = () => {
    // Implement signout logic here, e.g., clear local storage, redirect user to signin page, etc.
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="absolute" open={open} style={{ background: "#222", color: "#eee" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer}>
            <MenuIcon style={{ color: "#000" }} />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: "#000" }}>
            Booking List
          </Typography>
          {/* User account dropdown */}
          <div>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <AccountCircleIcon style={{ color: "#000" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              style={{ color: "#000" }}
            >
              <MenuItem onClick={handleSignOut} style={{ color: "#000" }}>Sign out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
