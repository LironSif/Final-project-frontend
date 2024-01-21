import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import IntroBackgroundImage from '../../assets/img/saf3.jpg'
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const navigate = useNavigate();

  
  const navigateToSomePage = () => {
    navigate('/Dashboard');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${IntroBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '93vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
    
      }}
    >
      <Typography variant="h2" sx={{ zIndex: 1, color:"#FFF", fontWeight: 'bold', mb: 2 }}>
        Introducing Our New Features
      </Typography>
      {/* <Typography variant="h3" sx={{ zIndex: 1, color:"RGB(77, 116, 254)", fontWeight: 'bold', mb: 2 }}>
        Dashboard 
      </Typography> */}
      <Typography variant="h5" sx={{ zIndex: 1, mb: 3 }}>
        Discover how we are enhancing your experience.
      </Typography>
      <Button onClick={navigateToSomePage} variant="contained" size="large" color="primary" sx={{ zIndex: 1 }}>
        Learn More  
      </Button>
    </Box>
  );
};

export default Intro;
