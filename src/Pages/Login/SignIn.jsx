import React, { useContext, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import  UserContext  from '../../Context/UserContext.jsx';


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { registerUser, loginTheUser} = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true); 

    const success = await loginTheUser(email, password);
    if (success) {
        navigate("/Home");
    } else {
        // setError(error.response.data);
        setError("No user found or incorrect password.");
    }
    setLoading(false);
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
            marginTop: "20px",
            marginBottom: "30px",
            color: "#1976d2", // Example color
            fontWeight: "bold",
            fontSize: "24px", // Example font size
          }}
        >
          Sign In
        </Typography>
        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            disabled={loading}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            disabled={loading}
            name="password"
            label="Password"
            type="password"
            id="password"
            error={!!error} // Add this to indicate an error visually
            helperText={error} // This displays the error message
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>

          <Link
            href="/signup"
            variant="body2"
            display="block"
            textAlign="center"
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </form>
      </Container>
    </Box>
  );
};

export default SignIn;
