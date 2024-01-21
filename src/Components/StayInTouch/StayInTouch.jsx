import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StayInTouch = () => {
  const navigate = useNavigate();

  const navigateToContactUs = () => {
    navigate('/Contact');
  };

  return (
    <Box
      sx={{
    
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'primary.main', 
        color: 'white',
        padding: '20px',
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
        Stay in Touch
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        We'd love to hear from you. Reach out to us anytime!
      </Typography>
      <Button 
        onClick={navigateToContactUs} 
        variant="contained" 
        size="large" 
        color="secondary"
      >
        Contact Us
      </Button>
    </Box>
  );
};

export default StayInTouch;
