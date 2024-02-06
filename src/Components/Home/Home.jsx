import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BasicButton from "../Common/Button/BasicButton";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'


function Home() {
    const user = useSelector((state) => state.user.user);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="90vh"  // Use minHeight instead of height
        >
            <Typography variant="h1">
                Jobly
            </Typography>
            {user.firstName ? (
                <Typography variant="body1" paragraph>
                    {`Welcome back ${user.firstName}`}
                </Typography>
            ) : (
                <Typography variant="body1" paragraph>
                    All the jobs in one, convenient place.
                </Typography>
            )}

            {user.firstName ? (
                <Box>
                    <Link to="/jobs"><BasicButton text={'Jobs'} /></Link>
                    <Link to="/companies"><BasicButton text={'Companies'} /></Link>
                </Box>
            ) : (
                <Box>
                    <Link to="/signup"><BasicButton text={'Sign Up'} /></Link>
                    <Link to="/login"><BasicButton text={'Log In'} /></Link>
                </Box >
            )}
        </Box >
    );
}

export default Home;
