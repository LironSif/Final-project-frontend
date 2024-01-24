import React from 'react';
import { Box, Typography } from "@mui/material";

const DiamondPart = ({ color, text, position }) => {
  const styles = {
    bgcolor: color,
    color: color === "yellow" || color === "white" ? "black" : "white",
    position: "absolute",
    width: 100,
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid black",
    transform: "rotate(45deg)",
    ...position,
  };

  const textStyle = {
    transform: "rotate(-45deg)",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Ensure text occupies the full width of the rotated box
    height: '100%', // Ensure text occupies the full height of the rotated box
    textAlign: 'center',
  };

  return (
    <Box sx={styles}>
      <Typography variant="body1" sx={textStyle}>
        {text}
      </Typography>
    </Box>
  );
};

export default DiamondPart;
