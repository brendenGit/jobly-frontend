import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import CompanyCard from "../CompanyCard/CompanyCard";
import JoblyApi from "../../../utils/api.cjs";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { Navigate } from "react-router-dom";


function CompanyList({ user }) {
    const [companies, setCompanies] = useState([]);
    const [buttonText, setButtonText] = useState("Search");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (user.firstName) {
            const fetchCompanies = async (searchQuery) => {
                try {
                    const joblyApi = new JoblyApi(user.token);
                    setIsLoading(true)
                    const data = await joblyApi.getAllCompanies(searchQuery);
                    setIsLoading(false)
                    setCompanies(data)
                } catch (error) {
                    setIsLoading(false)
                    console.error("Error fetching companies:", error);
                }
            };
            fetchCompanies(searchQuery);
        }
    }, [searchQuery, user.firstName, user.token]);

    if (!user.firstName) {
        return <Navigate to="/login" replace={true} />;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setButtonText("loading...");

        const data = new FormData(event.currentTarget);

        try {
            setSearchQuery(data.get('search'));
            setButtonText("Search");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            margin="auto"
            marginTop="25px"
            minWidth="60%"
        >
            <Box component="form" onSubmit={handleSubmit}
                sx={{
                    minWidth: '80%',
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
            {isLoading ?
                <Box sx={{ minWidth: '80%' }}>
                    <LinearProgress />
                </Box>
                :
                (companies.length === 0 ?
                    <Card variant="outlined" sx={{
                        minWidth: "80%",
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
                )
            }
        </Box>
    );
}

CompanyList.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        token: PropTypes.string,
    }).isRequired,
};

export default CompanyList;
