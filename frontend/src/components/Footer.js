import React from "react";
import {Typography, Container } from "@mui/material";

const Navbar = () => {
  return (
    <footer
      style={{ backgroundColor: "#f7f7f7", padding: "20px", marginTop: "50px" }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" align="center" color="textSecondary">
          © {new Date().getFullYear()} Booking, Inc. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};
export default Navbar;
