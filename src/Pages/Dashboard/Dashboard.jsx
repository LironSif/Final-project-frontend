import React, { useContext, useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box, Paper, Typography, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, CircularProgress, useTheme, useMediaQuery } from "@mui/material";
import MaterialItem from "../../Components/Material/MaterialItem.jsx";
import Shelf from "../../Components/Shelf/Shelf.jsx";
import CircularGauge from "../../Components/Gauge/CircularGauge.jsx";
import FullScreenModal from "./FullScreenModal";
import UserContext from "../../Context/UserContext.jsx";
import renderChemicalRules from "./DashboardUtill/renderChemicalRules.jsx";
import renderStorageRecommendations from "./DashboardUtill/renderStorageRecommendations.jsx";
import ScreenshotButton from "../../Components/ScreenShot/ScreenShot.jsx";
import ClearButton from "../../Components/ClearButten/ClearButton.jsx";
import AiAssistantButton from '../../Components/AiAssistantButton/AiAssistantButton.jsx'; // Adjust the path as necessary

const Dashboard = () => {
  const shelfRef = useRef(null);
  const { userData, getUserData, sendPromptToOpenAi } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true), [cards, setCards] = useState({}), [shouldRefetchUserData, setShouldRefetchUserData] = useState(false);
  const [localShelf, setLocalShelf] = useState(), [availableChemicals, setAvailableChemicals] = useState({}), [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme(), isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const chemicalsArray = userData ? Object.values(userData.chemicals) : [];
  const totalChemicals = chemicalsArray.length, flammableCount = chemicalsArray.filter((c) => c.FLAMMABLE).length, corrosiveCount = chemicalsArray.filter((c) => c.CORROSIVE).length, oxidizerCount = chemicalsArray.filter((c) => c.OXIDIZER).length, maxChemicals = 12;

  useEffect(() => {
    const isInitiallyLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isInitiallyLoggedIn) getUserData().then((success) => setIsLoading(!success));
    else { setIsLoading(false); setIsModalOpen(true); }
  }, []);

  useEffect(() => {
    if (userData && !isLoading) { setLocalShelf(userData.shelfConfig); setAvailableChemicals(userData.chemicals || {}); setCards(userData.chemicals); }
  }, [userData, isLoading]);

  useEffect(() => {
    if (shouldRefetchUserData) getUserData().then((success) => { setIsLoading(!success); setShouldRefetchUserData(false); });
  }, [shouldRefetchUserData]);

  if (isLoading) return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}><CircularProgress /></Box>;
  if (!localShelf) return <div>Loading Shelf Configuration...</div>;


  const handleClear = (newShelfConfig) => {
    setLocalShelf(newShelfConfig); 
  };
  
  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ flexGrow: 1, mt: 8, mx: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Typography color="primary.dark" variant="h1">Dashboard Overview</Typography>
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
            {chemicalsArray.map((chemical, i) => <Card key={`card-${i}`} sx={{ width: "auto%", height: "auto", mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{chemical.Name}</Typography>
                <List>
                  {renderChemicalRules(chemical).map((rule, index) => <ListItem key={index}><ListItemIcon>{rule.icon}</ListItemIcon><ListItemText primary={rule.text} /></ListItem>)}
                  <ListItem><ListItemText primary={renderStorageRecommendations(chemical)} /></ListItem>
                </List>
              </CardContent>
            </Card>)}
          </Box>
        </Box>


        <Typography variant="h2" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 4 }}>Material Organizer</Typography>

<Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", justifyContent: "space-around", gap: 4, width: isSmallScreen ? '90%' : 'auto', margin: isSmallScreen ? '0 auto' : 'initial' }}>

  <div className="material-list">{Object.values(availableChemicals).map((el, i) => (
    <div key={i}>
      <MaterialItem type={el.Name} label={el.Name} state={el.STATE} quantity={el.quantity} />
    </div>
  ))}</div>

  <Paper>
    <Shelf shelfConfig={localShelf} shelfSetter={setLocalShelf} ref={shelfRef} />
  </Paper>
  <Box sx={{ display: "flex", flexDirection: "row", width: isSmallScreen ? '90%' : '30%', alignItems: "start", gap: 1, top: "100" }}>
    <AiAssistantButton chemicals={localShelf} />
  </Box>
</Box>

<FullScreenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isUserLoggedIn={!isModalOpen} />

<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 2, mt: 4 }}>
  <ScreenshotButton shelfRef={shelfRef} />
  <ClearButton onClear={handleClear} />
</Box>
</Box>
</DndProvider>
  );
};

export default Dashboard;
