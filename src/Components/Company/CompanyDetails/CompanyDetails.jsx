import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import JobCard from '../../Job/JobCard/JobCard';
import JoblyApi from '../../../utils/api.cjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navigate } from "react-router-dom";


function CompanyDetails({ user }) {
    const { handle } = useParams();
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        if (user.firstName) {
            const fetchCompanyData = async () => {
                try {
                    const joblyApi = new JoblyApi();
                    const data = await joblyApi.getCompany(handle);
                    setCompanyData(data);
                } catch (error) {
                    console.error('Error fetching company data:', error);
                }
            };
            fetchCompanyData();
        }
    }, [handle, user.firstName]);

    if (!user.firstName) {
        return <Navigate to="/login" replace={true} />;
    }

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
}

CompanyDetails.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
    }).isRequired,
};

export default CompanyDetails;
