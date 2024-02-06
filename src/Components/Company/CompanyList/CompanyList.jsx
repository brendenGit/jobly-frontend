import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import CompanyCard from "../CompanyCard/CompanyCard";
import { TextField } from "@mui/material";
import JoblyApi from "../../../utils/api.cjs";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [buttonText, setButtonText] = useState("Search");

    const joblyApi = new JoblyApi();

    async function fetchCompanies(search) {
        try {
            const data = await joblyApi.getAllCompanies(search);
            setCompanies(data);
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setButtonText("loading...");

        const data = new FormData(event.currentTarget);

        try {
            await fetchCompanies(data.get('search'));
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
                    width: '65%',
                    m: 4
                }}
            >
                <TextField
                    fullWidth
                    label="Search companies by name"
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
            {companies.length === 0 ?
                <Card variant="outlined" sx={{
                    width: "65%",
                    mb: 2,
                }}
                >
                    <CardContent>
                        <Typography variant="h6" component="div">
                            Sorry, no companies found!
                        </Typography>
                    </CardContent>
                </Card>
                :
                companies.map(company => (
                    <CompanyCard company={company} key={company.handle} />
                ))
            }
        </Box>
    );
}

export default CompanyList;
