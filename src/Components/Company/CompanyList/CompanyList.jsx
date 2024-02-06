import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CompanyCard from "../CompanyCard/CompanyCard";
import JoblyApi from "../../../utils/api.cjs";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";


function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [buttonText, setButtonText] = useState("Search");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchCompanies(searchQuery) {
            try {
                const joblyApi = new JoblyApi();
                setIsLoading(true)
                const data = await joblyApi.getAllCompanies(searchQuery);
                setIsLoading(false)
                setCompanies(data)
            } catch (error) {
                setIsLoading(false)
                console.error("Error fetching companies:", error);
            }
        }
        fetchCompanies(searchQuery);
    }, [searchQuery]);


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
            {isLoading ?
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
                :
                (companies.length === 0 ?
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
                )
            }
        </Box>
    );
}

export default CompanyList;
