import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';

const defaultRole = 'user'; // Default role value

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    username: '',
    password: '',
    user: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleInputChange = ({ target: { name, value } }) => {
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserInputChange = ({ target: { name, value } }) => {
    setSignUpData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [name]: value,
      },
    }));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/accounts/signup', signUpData);

      if (response.status === 201) {
        history.push('/signin');
      } else {
        console.error('Sign-up failed');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form onSubmit={handleSignUp}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoFocus
          value={signUpData.user.firstName}
          onChange={handleUserInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          value={signUpData.user.lastName}
          onChange={handleUserInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={signUpData.user.email}
          onChange={handleUserInputChange}
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
          autoComplete="new-password"
          value={signUpData.password}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="username"
          label="Username"
          id="username"
          value={signUpData.username}
          onChange={handleInputChange}
        />
        {/* No role field in the form */}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Sign Up
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Container>
  );
};

export default SignUp;
