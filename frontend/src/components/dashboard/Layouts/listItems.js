import React, { useState } from "react";
import { Link } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

const MainListItems = () => {
  const [showRooms, setShowRooms] = useState(false);
  const [showRoomTypes, setShowRoomTypes] = useState(false);

  const handleSallesClick = () => {
    setShowRooms(!showRooms);
    setShowRoomTypes(false); // Hide room types when "Salles" link is clicked
  };

  const handleRoomTypesClick = () => {
    setShowRoomTypes(!showRoomTypes);
    setShowRooms(false); // Hide rooms when "Room Types" link is clicked
  };

  return (
    <React.Fragment>
      {/* Dashboard Link */}
      <ListItemButton component={Link} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      {/* Salles Link */}
      <ListItemButton onClick={handleSallesClick}>
        <ListItemIcon>
          <MeetingRoomIcon />
        </ListItemIcon>
        <ListItemText primary="Salles" />
      </ListItemButton>

      {/* Display list of room types when "Salles" link is clicked */}
      {/*showRoomTypes && (*/
        <ListItemButton component={Link} to="/dashboard/roomtypes">
          <ListItemIcon>
            <MeetingRoomIcon />
          </ListItemIcon>
          <ListItemText primary="Types de Salles" />
        </ListItemButton>
      /*)}

      {/* Users Link */}
      <ListItemButton component={Link} to="/dashboard/customers">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default MainListItems;
