import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import  UserContext  from '../../Context/UserContext.jsx';

const Nav = () => {
  const { logoutUser} = useContext(UserContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const buttonStyle = {
    color: "inherit",
    mr: 3,
    component: NavLink,
    sx: {
      mr: 2,
      ":hover": {
        borderColor: "white",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "1px",
      },
      "&.active": {
        backgroundColor: "white",
        color: theme.palette.primary.main,
        borderRadius: "5px",
      },
    },
  };

  const logoutButtonStyle = {
    sx: {
      backgroundColor: theme.palette.secondary.dark,
      borderRadius: "10px",
      color: "white",
      ":hover": {
        backgroundColor: theme.palette.primary.dark,
        borderColor: "white",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "10px",
      },
    },
  };

  const renderMenuLinks = () => (
    <>
      <Button {...buttonStyle} to="/Dashboard">
        Dashboard
      </Button>
      <Button {...buttonStyle} to="/Identifier">
        Identifier
      </Button>
      <Button {...buttonStyle} to="/Contact">
        Contact Us
      </Button>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Mobile Menu Icon */}
        {isSmallScreen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Left-aligned Links */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <img
            src={logo}
            alt="Safe T Logo"
            style={{
              mr: "10px",
              height: "40px", 
              width: "auto", 
            }}
          />
          <Button {...buttonStyle} to="/Home">
            Home
          </Button>
          {!isSmallScreen && renderMenuLinks()}
        </Box>

        {/* Mobile Drawer for Links */}
        {isSmallScreen && (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {renderMenuLinks()}
          </Drawer>
        )}

        {/* Auth Buttons */}
        {localStorage.getItem('isLoggedIn') ? (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography variant="h6" sx={{ mr: 2 }}>
              {`Hi, ${
                localStorage.getItem('loggedInUserName')
              }`}
            </Typography>
            <Button {...logoutButtonStyle} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button {...buttonStyle} to="/Login">
              Login
            </Button>
            <Button {...buttonStyle} to="/SignUp">
              Signup
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
