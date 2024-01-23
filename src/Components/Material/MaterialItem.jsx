import React from 'react';
import { useDrag } from 'react-dnd';
import { Paper, Typography, Box } from '@mui/material';
import GasIcon from '@mui/icons-material/Cloud'; 
import LiquidIcon from '@mui/icons-material/Opacity';
import SolidIcon from "@mui/icons-material/Drafts";
// import "./MaterialItem.css";

const MaterialItem = ({ type, label, state, quantity }) => {
  // console.log("dragging")
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'MATERIAL_ITEM',
    item: { type, label, state, quantity },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const stateIcons = {
    Gas: <GasIcon style={{ color: "green" }}/>,
    Liquid: <LiquidIcon style={{ color: "blue" }}/>,
    Solid: <SolidIcon style={{ color: "black" }}/>,
  };

  const backgroundColors = {
    // Gas: 'lightgreen',
    // Liquid: 'lightblue',
    // Solid: 'red',
  };

  return (
    <Paper
      ref={dragRef}
      elevation={3}
      style={{
        padding: 10,
        margin: 5,
        display: 'flex',
        alignItems: 'center',
        gap: '1vw',
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: backgroundColors[state] || 'white',
      }}
    >
      {stateIcons[state]}
      <Box>
        <Typography variant="subtitle1">{label} </Typography>
        <Typography variant="caption">Quantity: {quantity}</Typography>
      </Box>
    </Paper>
  );
};

export default MaterialItem;
