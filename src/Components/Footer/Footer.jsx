import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: 'secondary.light',
        display: 'flex', 
        justifyContent: 'center', // Center the content
      }}
    >
      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" color="white">
          Safe T APP
        </Typography>
        <div>
          <Typography variant="body2" color="white">
            © {new Date().getFullYear()} SIFADOTEC LTD
          </Typography>
      
        </div>
      </Container>
    </Box>
  );
};

export default Footer;
