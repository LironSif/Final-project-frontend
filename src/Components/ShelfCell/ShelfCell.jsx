import React from "react";
import { useDrop } from "react-dnd";
import { Paper, Typography, Box } from "@mui/material";
import GasIcon from "@mui/icons-material/Cloud";
import LiquidIcon from "@mui/icons-material/Opacity";
import SolidIcon from "@mui/icons-material/Drafts";
import "./ShelfCell.css";
import boxImage from "../../assets/img/box2.png";

const ShelfCell = ({ cellId, content, onDropItem }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "MATERIAL_ITEM",
    drop: (item) => onDropItem(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const getItemIcon = (state) => {
    switch (state) {
      case "Gas":
        return <GasIcon style={{ color: "green", fontSize: "1.5rem" }} />;
      case "Liquid":
        return <LiquidIcon style={{ color: "blue", fontSize: "1.5rem" }} />;
      case "Solid":
        return <SolidIcon style={{ color: "black", fontSize: "1.5rem" }} />;
      default:
        return null;
    }
  };

  const backgroundImageStyle = content
    ? {
        backgroundImage: `url(${boxImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "transparent",
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',

      }
    : { backgroundColor: isOver ? "#f5f5f5" : "transparent" };

  return (
    <Paper
    onClick={()=> console.log("cellId,",cellId)}
      ref={dropRef}
      style={backgroundImageStyle}
      className={`shelfCellStyle ${!content ? "empty" : ""}`}
    >
      {content && (
        <Box  sx={{ textAlign: "center" }}>
          {getItemIcon(content.state)}
          <Typography
            variant="subtitle1"
            sx={{ color: "black", fontWeight: "bold", fontSize:"0.75em"}}
          >
            {content.type}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ShelfCell;
