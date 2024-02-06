import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import JobCard from '../../Job/JobCard/JobCard';
import JoblyApi from '../../../utils/api.cjs';
import { useSelector } from 'react-redux';


function CompanyDetails() {
    const { handle } = useParams();
    const [companyData, setCompanyData] = useState(null);
    const user = useSelector((state) => state.user.user);
    const joblyApi = new JoblyApi();

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const data = await joblyApi.getCompany(handle);
                setCompanyData(data);
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };
        fetchCompanyData();
    }, [handle]);

    if (!companyData) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <Box
                display="flex"
                flexDirection="column"
                margin="auto"
                width={'60%'}
                sx={{
                    justifyContent: 'flex-start',
                    marginTop: '50px',
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    padding: 2,
                    borderRadius: 1,
                    color: 'black'
                }}
            >
                <Typography variant='h5' sx={{
                    fontWeight: 'bold',
                    fontSize: 30,
                    letterSpacing: '1.5px'
                }}>
                    {companyData.name}
                </Typography>
                <Typography>
                    {companyData.description}
                </Typography>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                margin="auto"
                marginBottom="40px"
                width={'60%'}
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '25px',
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    padding: 2,
                    borderRadius: 1,
                }}
            >
                {companyData.jobs.map(job => (
                    <JobCard job={job} key={job.id} id={job.id} user={user} />
                ))}
            </Box>
        </div>
    );
};

export default CompanyDetails;
