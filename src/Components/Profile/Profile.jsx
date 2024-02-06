import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import JoblyApi from "../../utils/api.cjs";
import { useState } from "react";
import {
    setIsFetching,
    setUserDataOnUpdate,
} from '../../redux/userSlice.cjs';
import { useDispatch } from 'react-redux';


export default function Profile({ user }) {

    // component prep
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const dispatch = useDispatch();
    const joblyApi = new JoblyApi(user.token);

    // handle submit - update profile request
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            setErrorMessage('');
            setSuccessMessage('');
            dispatch(setIsFetching(true));
            const user = await joblyApi.update({
                username: data.get('username'),
                firstName: data.get('firstName'),
                lastName: data.get('lastName'),
                email: data.get('email'),
            });
            dispatch(setUserDataOnUpdate({
                user
            }))
            dispatch(setIsFetching(false));
            setSuccessMessage('Updated successfully');

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
                    <ManageAccountsIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit Profile
                </Typography>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        defaultValue={user.username}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        inputProps={
                            { readOnly: true, }
                        }
                    />
                    <TextField
                        defaultValue={user.firstName}
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="firstName"
                    />
                    <TextField
                        defaultValue={user.lastName}
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lastName"
                    />
                    <TextField
                        defaultValue={user.email}
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
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

Profile.propTypes = {
    user: PropTypes.shape({
        token: PropTypes.string,
        username: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
    }).isRequired,
};