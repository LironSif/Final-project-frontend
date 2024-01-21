import React, { useContext, useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserContext  from '../../Context/UserContext.jsx';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { registerUser} = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userSignInData = {
        "name": firstName,
        "email": email,
        "password": password,
        "chemicals": {},
        "shelfConfig": ["a","b","c","d"].reduce((acc,el)=>{
          acc[el] = {l:null,r:null}
          return acc
          
        },{}),
      };

      const isRegistered = await registerUser(userSignInData);
      if (isRegistered) {
        navigate('/Home');
      } else {
        setError("Registration failed.");
      }
    } catch (error) {
      setError(error.message);
    }
};

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
        <Container component="main" maxWidth="xs">
        <Typography
          component="h1"
          variant="h5"
          textAlign="center"
          sx={{
            marginTop: '20px',
            marginBottom: '30px',
            color: '#1976d2', // Example color
            fontWeight: 'bold',
            fontSize: '24px' // Example font size
          }}
        >
          Sign Up
        </Typography>
        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" textAlign="center">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default SignUp;
