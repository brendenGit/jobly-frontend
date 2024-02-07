import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import JoblyApi from '../../utils/api.cjs';
import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import {
  setIsFetching,
  setUserDataOnLogin,
} from '../../redux/userSlice.cjs';
import { useDispatch } from 'react-redux';


export default function SignUpForm({ user }) {
  // component prep
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const joblyApi = new JoblyApi();

  // if logged in redirect to home page - do not allow SignUpForm to be viewed 
  if (user.firstName) {
    return <Navigate to="/" replace={true} />;
  }

  // handle submit - registration attempt - redirect and sign in if successful
  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {

      setErrorMessage('');
      dispatch(setIsFetching(true));
      const { token, user } = await joblyApi.register({
        username: data.get('username'),
        password: data.get('password'),
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
      });
      dispatch(setUserDataOnLogin({
        token,
        user,
      }))
      dispatch(setIsFetching(false));
      navigate("/");

    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{
      borderRadius: 1,
      padding: 2,
      paddingTop: 0,
      marginTop: 4,
      backgroundColor: "rgba(255, 255, 255, 0.7)"
    }}>
      < CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create an account!
        </Typography>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            autoComplete="current-email"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create your account
          </Button>
          <Link to="/login" variant="body2">
            {"Already have an account? Login"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

SignUpForm.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};