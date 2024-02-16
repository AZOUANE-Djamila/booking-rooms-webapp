import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import conferenceImage from "./RoomImages/conference.jpg";
import officeImage from "./RoomImages/office.jpg";
import meetingImage from "./RoomImages/meeting.jpg";
import classImage from "./RoomImages/class.jpg";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddRoomModal = ({ open, onClose, roomData }) => {
  // State
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    type: "conference",
    imageUrl: null,
    location: "",
    floor: "",
    availability: ["Available", "Not Available"],
    features: [],
    // Add all other room attributes here
  });

  // Event Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (e, index, field) => {
    // Implement availability change logic here
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageUrl: e.target.files[0] });
  };

  const handleAddRoom = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rooms",
        formData
      );
      console.log("Room added successfully:", response.data);
    } catch (error) {
      console.error("Error adding room:", error);
    }
    onClose();
  };
  // Determine default image based on room type
  const getDefaultImage = (type) => {
    switch (type) {
      case "conference":
        return conferenceImage;
      case "office":
        return officeImage;
      case "meeting":
        return meetingImage;
      case "class":
        return classImage;
      default:
        return null;
    }
  };
  // Effects
  useEffect(() => {
    if (roomData) {
      setFormData(roomData);
    }
  }, [roomData]);

  // JSX
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 600,
          padding: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          borderRadius: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Room
        </Typography>
        <Grid container spacing={2}>
          {/* Room Details Fields */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Room Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              fullWidth
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              defaultValue="conference"
            >
              <MenuItem value="conference">Conference</MenuItem>
              <MenuItem value="office">Office</MenuItem>
              <MenuItem value="meeting">Meeting</MenuItem>
              <MenuItem value="class">Class</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Floor"
              name="floor"
              value={formData.floor}
              onChange={handleInputChange}
            />
          </Grid>
          
          {/* Image Upload Field */}
          <Grid item xs={12}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              accept="image/*"
              onChange={handleFileChange}
            >
              Upload image
              <VisuallyHiddenInput type="file" />
            </Button>
          </Grid>
          {/* Default Image Preview */}
          {formData.type && (
            <Grid item xs={12}>
              <Typography variant="body2">
                Default Image:
                <img
                  src={getDefaultImage(formData.type)}
                  alt="Default"
                  style={{ width: 50, height: 50, marginLeft: 10 }}
                />
              </Typography>
            </Grid>
          )}
        </Grid>
        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRoom}
          disabled={!formData.name || !formData.capacity}
          sx={{ marginTop: 2 }}
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default AddRoomModal;
