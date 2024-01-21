import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import BackgroundImage from '../../assets/img/saf5.jpg';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const navigateToIdentifier = () => {
    navigate('/Identifier');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden', 
        backgroundImage: `url(${BackgroundImage})`,
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
        '&:after': { 
          content: '""',
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          clipPath: 'polygon(100% 100, 100% 100%, 100% 100%, 100% 100%)' 
        }
      }}
    >
      <Typography variant="h2" component="h1" sx={{ zIndex: 1, color:"#FFF", fontWeight: 'bold', mb: 2 }}>
        Safeguarding Your Environment with Advanced Chemical Identification
      </Typography>
      <Typography variant="h5" sx={{ zIndex: 1, mb: 3 }}>
        Empower your chemical handling with real-time identification, safety measures, and expert support.
      </Typography>
      <Button onClick={navigateToIdentifier} variant="contained" size="large" color="primary" sx={{ zIndex: 1 }}>
        Explore Our Identifier
      </Button>
    </Box>
  );
};

export default Hero;
