import React, { useContext, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Box, Paper, Typography, Card, CardContent, List,
  ListItem, ListItemIcon, ListItemText
} from "@mui/material";
import MaterialItem from "../../Components/Material/MaterialItem.jsx";
import Shelf from "../../Components/Shelf/Shelf.jsx";
import CircularGauge from "../../Components/Gauge/CircularGauge.jsx";
import { useTheme, useMediaQuery } from "@mui/material";
import FullScreenModal from "./FullScreenModal";
import UserContext from "../../Context/UserContext.jsx";
import renderChemicalRules from "./DashboardUtill/renderChemicalRules.jsx";
import renderStorageRecommendations from "./DashboardUtill/renderStorageRecommendations.jsx";

const Dashboard = () => {
  const { userData, getUserData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState({});
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const chemicalsArray = userData ? Object.values(userData.chemicals) : [];
  const totalChemicals = chemicalsArray.length;
  const flammableCount = chemicalsArray.filter((c) => c.FLAMMABLE).length;
  const corrosiveCount = chemicalsArray.filter((c) => c.CORROSIVE).length;
  const oxidizerCount = chemicalsArray.filter((c) => c.OXIDIZER).length;
  const maxChemicals = 12;

  const defaultShelfConfig = {
    a: { l: null, r: null },
    b: { l: null, r: null },
    c: { l: null, r: null },
    d: { l: null, r: null }
  };

  const [localShelf, setLocalShelf] = useState(defaultShelfConfig);
  const [availableChemicals, setAvailableChemicals] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const isInitiallyLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isInitiallyLoggedIn) {
      getUserData().then((success) => {
        setIsLoading(!success);
      });
    } else {
      setIsLoading(false);
      setIsModalOpen(true); // Open the modal if no user is logged in
    }
  }, []);
  

  useEffect(() => {
    if (userData) {
      setLocalShelf(userData.shelfConfig || defaultShelfConfig);
      setAvailableChemicals(userData.chemicals || {});
      setCards(userData.chemicals);
    }
  }, [userData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
console.log(isModalOpen)
// console.log(first)
// console.log(first)
  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ flexGrow: 1, mt: 8, mx: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Typography color="primary.dark" variant="h1">
            Dashboard Overview
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", mb: 4, mt: 12 }}>
          <CircularGauge label="Total Chemicals" value={totalChemicals} max={maxChemicals} />
          <CircularGauge label="Flammable" value={flammableCount} max={maxChemicals} />
          <CircularGauge label="Corrosive" value={corrosiveCount} max={maxChemicals} />
          <CircularGauge label="Oxidizers" value={oxidizerCount} max={maxChemicals} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", gap: 10, justifyContent: "center", alignItems: "center", mb: 12, mt: 20 }}>
          <Typography variant="h3">Hazardous Material Storage Recommendations</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2, justifyContent: "center", alignItems: "flex-start", mb: 5 }}>
            {chemicalsArray.map((chemical, i) => (
              <Card key={`card-${i}`} sx={{ width: "auto%", height: "auto", mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{chemical.Name}</Typography>
                  <List>
                    {renderChemicalRules(chemical).map((rule, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>{rule.icon}</ListItemIcon>
                        <ListItemText primary={rule.text} />
                      </ListItem>
                    ))}
                    <ListItem>
                      <ListItemText primary={renderStorageRecommendations(chemical)} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, mb: 4 }}>
          <Typography onClick={() => console.log(localShelf)} variant="h2" sx={{ mb: 2 }}>Material organizer</Typography>
          <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", justifyContent: "space-between", gap: 4 }}>
            <div className="material-list">
              {Object.values(availableChemicals).map((el, i) => (
                <div key={i}>
                  <MaterialItem type={el.Name} label={el.Name} state={el.STATE} quantity={el.quantity} />
                </div>
              ))}
            </div>
            <Paper sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 2 }}>
              <Shelf shelfConfig={localShelf} shelfSetter={setLocalShelf} />
            </Paper>
          </Box>
        </Box>

        <FullScreenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isUserLoggedIn={!isModalOpen} />
      </Box>
    </DndProvider>
  );
};

export default Dashboard;
