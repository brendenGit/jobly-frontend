import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import JoblyApi from "../../utils/api.cjs";
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useState } from "react";
import {
  setIsFetching,
  setUserDataOnLogin,
} from '../../redux/userSlice.cjs';
import { useDispatch } from 'react-redux';


export default function LoginForm({ user }) {
  // component prep
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const joblyApi = new JoblyApi();

  // if logged in redirect to home page - do not allow LoginForm to be viewed 
  if (user.firstName) {
    return <Navigate to="/" replace={true} />;
  }

  // handle submit - login request
  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      setErrorMessage('');
      dispatch(setIsFetching(true));
      const { token, user } = await joblyApi.login({
        username: data.get('username'),
        password: data.get('password'),
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Link to="/signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

LoginForm.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};