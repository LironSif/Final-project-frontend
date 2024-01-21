import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import backgroundImage from '../../assets/img/saf1.jpg';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {

    console.log({ name, email, message });
    alert("form sent ")
    navigate('/Home');
    
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        p: 4,
        color: '#fff',
      }}
    >
      <Container
        maxWidth="md"
        component={Paper}
        sx={{
          p: 4,
          mt: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: 'text.primary' ,}}>
          Contact Us
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Message"
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, width: '100%' }}
          >
            Send Message
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default ContactUs;
