import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import JobCard from "../JobCard/JobCard";
import JoblyApi from "../../../utils/api.cjs";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function JobList({ user }) {
    const [jobs, setJobs] = useState([]);
    const [buttonText, setButtonText] = useState("Search");

    const joblyApi = new JoblyApi(user.token);

    async function fetchJobs(search) {
        try {
            const data = await joblyApi.getAllJobs(search);
            setJobs(data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);


    async function handleSubmit(event) {
        event.preventDefault();
        setButtonText("loading...");

        const data = new FormData(event.currentTarget);

        try {
            await fetchJobs(data.get('search'));
            setButtonText("Search");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Box component="form" onSubmit={handleSubmit}
                sx={{
                    width: '100%',
                    m: 4
                }}
            >
                <TextField
                    fullWidth
                    label="Search jobs by name"
                    id="search"
                    name="search"
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "5px"
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1 }}
                >
                    {buttonText}
                </Button>
            </Box>
            {jobs.length === 0 ?
                <Card variant="outlined" sx={{
                    width: "65%",
                    mb: 2,
                }}
                >
                    <CardContent>
                        <Typography variant="h6" component="div">
                            Sorry, no jobs found!
                        </Typography>
                    </CardContent>
                </Card>
                :
                jobs.map(job => (
                    <JobCard job={job} key={job.id} id={job.id} user={user} />
                ))
            };
        </Box>
    );
}

export default JobList;
