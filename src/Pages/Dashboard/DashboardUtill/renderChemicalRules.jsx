import React from 'react'
import FlameIcon from "@mui/icons-material/Whatshot";
import CorrosiveIcon from "@mui/icons-material/Warning";
import OxidizerIcon from "@mui/icons-material/AcUnit";
import GasIcon from "@mui/icons-material/Cloud";
import LiquidIcon from "@mui/icons-material/Opacity";
import SolidIcon from "@mui/icons-material/Drafts";

const renderChemicalRules = (chemical) => {
    let rules = [];

    if (chemical.FLAMMABLE) {
      rules.push({
        text: "Flammable material in the Warehouse",
        icon: <FlameIcon style={{ color: "#FF0000" }} />,
      });
    }
    if (chemical.CORROSIVE) {
      rules.push({
        text: "Corrosive material",
        icon: <CorrosiveIcon style={{ color: "orange" }} />,
      });
    }
    if (chemical.OXIDIZER) {
      rules.push({
        text: "Oxidizer material",
        icon: <OxidizerIcon style={{ color: "blue" }} />,
      });
    }

    switch (chemical.STATE) {
      case "Gas":
        rules.push({
          text: "Material is in gaseous state",
          icon: <GasIcon style={{ color: "green" }} />,
        });
        break;
      case "Liquid":
        rules.push({
          text: "Material is in Liquid state",
          icon: <LiquidIcon style={{ color: "blue" }} />,
        });
        break;
      case "Solid":
        rules.push({
          text: "Material is in Solid state",
          icon: <SolidIcon style={{ color: "black" }} />,
        });
        break;
      default:
        break;
    }

    return rules;
  };
export default renderChemicalRules