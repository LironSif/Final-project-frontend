import React, { useState } from "react";
import { Box, Button, Modal, Paper, TextField, Typography, useTheme, useMediaQuery, Select, MenuItem, FormControl, InputLabel,Autocomplete } from "@mui/material";
import { chemicals, hazardInformation } from "./ChemicalData.js";

import DiamondPart from "../DiamondParts/DiamondPart .jsx"
import { NavLink, useNavigate } from "react-router-dom";

const ChemicalHazardSystem = ({ addCard, isLogin }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [chemicalData, setChemicalData] = useState({});
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedUN, setSelectedUN] = useState('');

  const navigate = useNavigate()

  const handleSelectChange = (event) => {
    const unNumber = event.target.value;
    setSelectedUN(unNumber);
    const data = chemicals[unNumber];
    setChemicalData(data || {});
  };
 
  const handleAdd = () => {
    if (quantity > 0 && chemicalData.Name) {
      const newCardData = {
        ...chemicalData,
        quantity: quantity,
        id: chemicalData.Name,
      };
     
      addCard(newCardData);
      setOpen(false);
    } else if (!chemicalData.Name) {
      alert("Please select a chemical before adding.");
    } else {
      alert("Quantity must be greater than 0");
    }
  };
  
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      m: 2,
      marginBottom: 4,
      gap: isMobile ? "10px" : "20px"
    }}>
      <Typography variant="h4" sx={{
        mt: 2,
        mb: 2,
        fontWeight: "bold",
        color: theme.palette.secondary.dark,
        fontSize: isMobile ? '1.5rem' : '2rem'
        
      }}>
        Chemical Hazard Identification System
      </Typography>

      <FormControl fullWidth sx={{ mb: 1, width: isMobile ? "60%" : "30%" }}>
        <InputLabel id="un-number-select-label">Select UN Number</InputLabel>
        <Select
          labelId="un-number-select-label"
          id="un-number-select"
          value={selectedUN}
          label="Select UN Number"
          onChange={handleSelectChange}
        >
          {Object.keys(chemicals).map((unNumber) => (
            <MenuItem key={unNumber} value={unNumber}>
              {unNumber} - {chemicals[unNumber].Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6" sx={{
        mt: 2,
        mb: 2,
        color: "#333",
        fontWeight: "bold",
        fontSize: isMobile ? '1rem' : '1.25rem'
      }}>
        {chemicalData.Name || "No name available."}
      </Typography>

      <Paper sx={{
        position: "relative",
        width: isMobile ? 250 : 250,
        height: isMobile ? 250 : 250,
        mt: 2,
        mb: isMobile ? 4 : 2
      }} elevation={0}>
        <DiamondPart color="red" text={hazardInformation.FIRE_HAZARD[chemicalData.FIRE_HAZARD]} position={{ top: 0, left: "50%", transform: "translateX(-50%) rotate(45deg)" }} />
        <DiamondPart color="blue" text={hazardInformation.HEALTH_HAZARD[chemicalData.HEALTH_HAZARD]} position={{ left: 0, top: "50%", transform: "translateY(-50%) rotate(45deg)" }} />
        <DiamondPart color="yellow" text={hazardInformation.INSTABILITY[chemicalData.INSTABILITY]} position={{ right: 0, top: "50%", transform: "translateY(-50%) rotate(45deg)" }} />
        <DiamondPart color="white" text={chemicalData.SPECIFIC_HAZARD || 'N/A'} position={{ bottom: 0, left: "50%", transform: "translateX(-50%) rotate(45deg)" }} />
      </Paper>

      {isLogin || localStorage.getItem('isLoggedIn') ? (
  <Button
    style={{ backgroundColor: "#607ff0", color: "#FFF", marginTop: isMobile ? 4 : 2, marginBottom: isMobile ? 4 : 4 }}
    variant="contained"
    onClick={() => setOpen(true)}
  >
    Add to Warehouse
  </Button>
) : (
  <Button
    style={{ backgroundColor: "#607ff0", color: "#FFF", marginTop: isMobile ? 4 : 2, marginBottom: isMobile ? 4 : 4 }}
    variant="contained"
    onClick={() => navigate('/login')} // Adjusted for proper navigation
  >
    Please Log in to access full features
  </Button>
)}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">Enter Quantity</Typography>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            fullWidth
            margin="normal"
            inputProps={{ min: 0, step: 1 }}
          />
          <Button onClick={handleAdd} variant="contained" sx={{ mt: 2 }}>Add to Warehouse</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ChemicalHazardSystem;
