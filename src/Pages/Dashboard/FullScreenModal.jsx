import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const FullScreenModal = ({ isOpen, onClose, isUserLoggedIn }) => {
  if (isUserLoggedIn) {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0, 0, 0, 0.7)",
          color: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Typography id="login-modal-title" variant="h4" sx={{ mb: 2, color:"white"}}>
          Please Log In
        </Typography>
        <Typography id="login-modal-description" sx={{ mb: 4 , color:"white"}}>
          You need to be logged in to access this feature.
        </Typography>
        <Button variant="contained" component={Link} to="/login">
          Log In
        </Button>
      </Box>
    </Modal>
  );
};

export default FullScreenModal;
