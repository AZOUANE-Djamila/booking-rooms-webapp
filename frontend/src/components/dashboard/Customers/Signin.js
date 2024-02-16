    import React, { useState } from 'react';
    import { Redirect } from 'react-router-dom'; // Import Redirect
    import Button from '@mui/material/Button';
    import TextField from '@mui/material/TextField';
    import Typography from '@mui/material/Typography';
    import Container from '@mui/material/Container';
    
    import axios from 'axios';

    const Signin = () => {
      const [formData, setFormData] = useState({ email: '', password: '' });
      const [error, setError] = useState('');
      const [isLoggedIn, setIsLoggedIn] = useState(false); // Track authentication status

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();

        try {
          const response = await axios.post('http://localhost:5000/api/accounts/signin', formData);

          if (response.status === 200) {
            setIsLoggedIn(true); 
          } else {
            setError('An error occurred while signing in. Please try again later.');
          }
        } catch (error) {
          console.error('Error signing in:', error);
          setError('An error occurred while signing in. Please try again later.');
        }
      };

      // Redirect if logged in
      if (isLoggedIn) {
        return <Redirect to="/dashboard" />;
      }

      return (
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email or Username"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </form>
        </Container>
      );
    };

    export default Signin;
