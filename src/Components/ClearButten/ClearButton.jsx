import React, { useContext } from "react";
import { Box, IconButton, Typography, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the trash icon
import UserContext from "../../Context/UserContext.jsx";

const ClearButton = ({onClear}) => {
  const { updateUserData } = useContext(UserContext);

  const handleClear = () => {
    // Create a new shelfConfig based on the provided array
    const newShelfConfig = ["a", "b", "c", "d"].reduce((acc, el) => {
      acc[el] = { l: null, r: null };
      return acc;
    }, {});

    // Get userId from localStorage
    const userId = localStorage.getItem("loggedInUserId");

    // Prepare the data for updating user data
    const newUserChemData = { shelfConfig: newShelfConfig, userId };

    // Update the shelf configuration for the user
    const updated = updateUserData(newUserChemData);
    onClear(newShelfConfig)
    if (!updated) {
      console.error("Failed to clear shelf configuration");
      // Handle failure (e.g., show an error message)
    }
  };

  return (
    <Box display="flex" justifyContent="center" >
    <Box bgcolor="#607ff0" display="flex" justifyContent="center" alignItems="center"  borderRadius="50%"
         padding={1} style={{ cursor: 'pointer', width: 'fit-content' }} 
         onClick={handleClear}>
      <IconButton color="primary" aria-label="clear shelf" style={{ backgroundColor: '#607ff0', color: 'white' }}>
        <DeleteIcon />
      </IconButton>
      <Typography variant="body1" style={{ color: 'white' }}>
   
      </Typography>
    </Box>
  </Box>
  
  );
};

export default ClearButton;