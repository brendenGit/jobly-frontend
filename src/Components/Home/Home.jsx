import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BasicButton from "../Common/Button/BasicButton";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SignUpForm from '../SignUp/SignUpForm';
import StoreIcon from '@mui/icons-material/Store';
import WorkIcon from '@mui/icons-material/Work';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'


function Home() {
    const user = useSelector((state) => state.user.user);
    console.log(user);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: 'transparent',
        ...theme.typography.body2,
        padding: theme.spacing(4),
        display: 'flex',
        color: theme.palette.text.secondary,
        minHeight: 300,
    }));

    const homeRender = user.firstName ?
        (
            <>
                <Typography
                    variant="h4"
                    sx={{
                        textShadow: '4px 2px 4px rgba(0,0,0,0.2)',
                    }}
                >
                    {`Welcome back ${user.firstName}`}
                </Typography>
                <Typography variant="body1" >
                    {`Start searching for jobs and exploring companies!`}
                </Typography>
                <Box sx={{ flexDirection: 'row' }}>
                    <Link to="/jobs"><BasicButton text={'Jobs'} /></Link>
                    <Link to="/companies"><BasicButton text={'Companies'} /></Link>
                </Box>
            </>
        ) : (
            <SignUpForm user={user} />
        )

    console.log(homeRender);

    return (
        <Box sx={{ flexGrow: 0, width: '90%', margin: 'auto' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Item
                        sx={{
                            boxShadow: 'none',
                            justifyContent: { md: 'right', xs: 'center' }
                        }}
                    >
                        <Card sx={{ maxWidth: '80%', backgroundColor: 'transparent', boxShadow: 'none', textAlign: 'left' }}>
                            <CardContent>
                                <Typography variant="h2"
                                    component="div"
                                    fontWeight={'bold'}
                                    sx={{
                                        textShadow: '4px 2px 4px rgba(0,0,0,0.4)',
                                    }}
                                >
                                    Welcome to Jobly
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="text.primary"
                                    marginBottom={2}
                                    sx={{
                                        textShadow: '4px 2px 4px rgba(0,0,0,0.4)',
                                    }}
                                >
                                    Your one-stop destination for job seekers.
                                </Typography>
                                <Typography variant="body2" color="text.primary" marginBottom={2}>
                                    Create an account, explore companies, and browse job listings tailored to your preferences.
                                    Apply with ease to your dream jobs, all in one place.
                                </Typography>
                                <Typography variant="body1" color="text.primary" marginBottom={2}>
                                    Find your perfect career match effortlessly with Jobly. Join today and start your journey towards success.
                                </Typography>
                            </CardContent>
                            <Box
                                sx={{
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    boxShadow: 10, // Adjust shadow values as needed
                                }}
                            >
                                <CardMedia
                                    style={{ height: 400 }}
                                    image="/src/assets/landing.jpg"
                                    title="person job searching"
                                />
                            </Box>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Item sx={{ alignItems: 'center', justifyContent: 'center', boxShadow: 'none', height: '100%', flexDirection: 'column' }}>
                        {homeRender}
                    </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Item
                        sx={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <StoreIcon sx={{ fontSize: '6rem', color: '#1876d2' }} />
                        <Typography variant="body1" color="text.primary" marginBottom={2}>
                            Browse through a vast database of companies to discover the perfect fit for your
                            next career move. From innovative startups to established corporations, Jobly offers
                            insights into company profiles, cultures, and values, helping you make informed
                            decisions about your future workplace.
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Item
                        sx={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <WorkIcon sx={{ fontSize: '6rem', color: '#1876d2' }} />
                        <Typography variant="body1" color="text.primary" marginBottom={2}>
                            View job listings curated specifically for you based on your preferences and interests.
                            With Jobly's intuitive interface, finding the right job has never been easier.
                            Filter by industry, location, or job type to narrow down your search and focus on
                            opportunities that match your criteria.
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Item
                        sx={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            marginBottom: '250px'
                        }}
                    >
                        <FindInPageIcon sx={{ fontSize: '6rem', color: '#1876d2' }} />
                        <Typography variant="body1" color="text.primary" marginBottom={2}>
                            Interested in a particular company? Dive deeper into their offerings with Jobly's
                            comprehensive company profiles. Learn about their mission, values, and available
                            positions, all in one convenient location.
                        </Typography>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;
