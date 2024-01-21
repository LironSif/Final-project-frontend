import React, { useContext, useEffect, useState } from "react";
import { Grid, Box, Paper, Typography, IconButton } from "@mui/material";
import ChemicalHazardSystem from "../../Components/NFPG/ChemicalHazardSystem";
import CloseIcon from "@mui/icons-material/Close";
import FlameIcon from "@mui/icons-material/Whatshot";
import CorrosiveIcon from "@mui/icons-material/Warning";
import OxidizerIcon from "@mui/icons-material/AcUnit";
import GasIcon from "@mui/icons-material/Cloud";
import LiquidIcon from "@mui/icons-material/Opacity";
import SolidIcon from "@mui/icons-material/Drafts";
import UserContext from "../../Context/UserContext.jsx";


const ChemicalCard = ({ card, onRemove }) => {

  const cardStyle = {
    width: "95%",
    height: "4vh",
    backgroundColor: "#607ff0",
    color: "#FFF",
    borderRadius: "5px",
    padding: "1rem",
    margin: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={cardStyle}>
      <Typography variant="body1">{card.Name}</Typography>
      <Typography variant="body2">{card.quantity ?` quantity ${card.quantity}` : 0}</Typography>
      <IconButton size="small" onClick={() => onRemove(card.id)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

const Identifier = () => {
  const [cards, setCards] = useState({});
  const [isLogin, setIsLogin] = useState();
  const { userData, setUserData, updateUserData, getUserData} = useContext(UserContext);

  useEffect(() => {
    if (!userData) {
      getUserData()

      if(!getUserData){
        setIsLogin(false)
      }else{
        setIsLogin(true)
      }
      return
    };
    setCards(userData.chemicals);
  }, [userData]);

  const addCard = (newCardData) => {
    const temp = { ...cards };
    if (temp[newCardData.id]) {
      temp[newCardData.id].quantity += parseInt(newCardData.quantity, 10);
    } else {
      temp[newCardData.id] = newCardData;
    }
  
    const newUserChemData = { ...userData, chemicals: temp, userId: localStorage.getItem("loggedInUserId")};
  
    updateUserData(newUserChemData)
      .then(() => {
        if (userData) {
          setUserData({ ...userData, chemicals: temp });
        }
        setCards(temp);
      })
      .catch(error => {
        console.error("Error updating chemicals:", error);
      
      });
  };
  
  const removeCard = (cardId) => {
    const updatedCards = { ...cards };
    delete updatedCards[cardId];
    setCards(updatedCards);
    updateUserData({ ...userData, chemicals: updatedCards, userId: localStorage.getItem("loggedInUserId") });
  };

  function renderIconWithLabel(condition, icon, label) {
    const flammableStyle = label === "Flammable"
      ? { backgroundColor: "red", color: "white", padding: "3px", marginLeft: "5px", display: "flex", justifyContent: "center", alignItems: "center" }
      : null;
  
    return condition && (
      <span style={{ display: "inline-flex", alignItems: "center", ...flammableStyle }}>
        {icon} <span style={{ marginLeft: "5px" }}>{label}</span>
      </span>
    );
  }

  function chemicalDataMassagingFunc(cards) {
    return Object.values(cards)
      .map((chemical) => {
        const { Name, CORROSIVE, OXIDIZER, FLAMMABLE, STATE } = chemical;
        if (CORROSIVE || OXIDIZER || FLAMMABLE || STATE) {
          return {
            name: Name,
            oxidizer: OXIDIZER,
            corrosive: CORROSIVE,
            flammable: FLAMMABLE,
            state: STATE,
          };
        }
        return null;
      })
      .filter((item) => item !== null);
  }

  const hazardousChemicalsData = chemicalDataMassagingFunc(cards);

  return (
    <Box sx={{ flexGrow: 1, mt: 4, mx: 4 }}>
   
      <Grid container spacing={4}>
        {/* Section 1: ChemicalHazardSystem */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: "83vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ChemicalHazardSystem addCard={addCard} isLogin={isLogin}/>
          </Paper>
        </Grid>
  
        <Grid item xs={12} md={6}>
          {/* Section 2: Additional Info */}
          <Paper sx={{ height: "40vh", p: 2,  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: "2rem" }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>Additional Info</Typography>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, width: '70%' ,overflowY: 'auto'}}>
              {hazardousChemicalsData.map((chemical, index) => (
                <li key={index} style={{ display: "flex", justifyContent: 'flex-start', alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ display: "flex", alignItems: "center", color: "black", fontWeight: "bold" }}>
                    {chemical.name} -
                    {renderIconWithLabel(chemical.flammable, <FlameIcon sx={{ color: "white", ml: "5px" }}/>, "Flammable")}
                    {renderIconWithLabel(chemical.corrosive, <CorrosiveIcon sx={{ color: "orange", ml: "5px" }}/>, "Corrosive")}
                    {renderIconWithLabel(chemical.oxidizer, <OxidizerIcon sx={{ color: "purple", ml: "5px" }}/>, "Oxidizer")}
                    {renderIconWithLabel(chemical.state === "Gas", <GasIcon sx={{color: "#bac45a", ml: "5px" }}/>, "Gas")}
                    {renderIconWithLabel(chemical.state === "Liquid", <LiquidIcon sx={{color: "blue", ml: "5px" }}/>, "Liquid")}
                    {renderIconWithLabel(chemical.state === "Solid", <SolidIcon sx={{ color: "green", ml: "5px" }}/>, "Solid")}
                  </span>
                </li>
              ))}
            </ul>
          </Paper>
  
          {/* Section 3: Warehouse Inventory */}
      
        <Paper sx={{ height: "40vh", display: "flex", flexDirection: "column", alignItems: "center", p: 2, marginTop: "2rem" }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>Warehouse inventory</Typography>
          <div style={{ overflowY: "auto", width: "70%", height: "calc(40vh - 48px)" }}>
            {Object.values(cards).map((card, index) => {
              return <ChemicalCard key={index} card={card} onRemove={removeCard} />;
            })}
          </div>
        </Paper>
 
        </Grid>
      </Grid>
    </Box>
  );
  
};

export default Identifier;
