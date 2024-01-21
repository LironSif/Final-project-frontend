import React from 'react';
import { Box, Typography } from "@mui/material";

const DiamondPart = ({ color, text, position }) => {
  const styles = {
    bgcolor: color,
    color: color === "yellow" ? "black" : color === "white"? "black" :"white",
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

  return (
    <Box sx={styles}>
      <Typography variant="body1" sx={{ transform: "rotate(-45deg)" }}>
        {text}
      </Typography>
    </Box>
  );
};

export default DiamondPart;
