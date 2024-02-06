import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ApplyButton from '../ApplyButton/ApplyButton';
import addCommas from '../../../utils/addCommas.cjs';
import JoblyApi from '../../../utils/api.cjs';
import PropTypes from 'prop-types';
import { useState } from "react";
import { CardActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    setIsFetching,
    setUserApplications,
} from '../../../redux/userSlice.cjs';


function JobCard({ job, id, user }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [hasApplied, setHasApplied] = useState(false);
    const dispatch = useDispatch();
    const userApplications = useSelector((state) => state.user.user.applications);

    const applied = userApplications.some(application => application === id)

    if (applied && !hasApplied) {
        setHasApplied(true);
    }

    const joblyApi = new JoblyApi(user.token);

    const handleApply = async () => {
        try {
            setErrorMessage('');
            dispatch(setIsFetching(true));
            const res = await joblyApi.apply({
                username: user.username,
                id: id,
            });
            setHasApplied(true);
            dispatch(setUserApplications(res.applied))
            dispatch(setIsFetching(false));

        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <Card variant="outlined" sx={{
            minWidth: "80%",
            mb: 2,
        }}
        >
            <CardContent>
                <Typography variant="h5" component="div">
                    {job.title}
                </Typography>
                <Typography sx={{ fontSize: 14, mt: 0 }} color="text.secondary" gutterBottom>
                    {job.companyName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Salary: ${typeof (job.salary) === 'number' ? addCommas(job.salary) : 'Unavailable'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Equity: {job.equity ? job.equity : 0}%
                </Typography>
            </CardContent>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <CardActions>
                <ApplyButton hasApplied={hasApplied} handleApply={handleApply} />
            </CardActions>
        </Card >
    );
}


JobCard.propTypes = {
    id: PropTypes.number.isRequired,

    user: PropTypes.shape({
        token: PropTypes.string,
        username: PropTypes.string,
    }).isRequired,

    job: PropTypes.shape({
        title: PropTypes.string.isRequired,
        companyName: PropTypes.string.isRequired,
        salary: PropTypes.number,
        equity: PropTypes.string,
    }).isRequired,
};

export default JobCard;
