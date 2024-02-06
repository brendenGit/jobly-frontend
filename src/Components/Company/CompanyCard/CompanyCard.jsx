import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function CompanyCard({ company }) {
    return (
        <Card variant="outlined" sx={{
            width: "65%",
            mb: 2,
            '&:hover': {
                color: 'blue'
            }
        }}
        >
            <CardActionArea component={RouterLink} to={`/companies/${company.handle}`}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {company.name}
                    </Typography>
                    <Typography sx={{fontSize: 14, mt: 0}}color="text.secondary" gutterBottom>
                        Employees: {company.numEmployees}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
                        {company.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card >
    );
}

export default CompanyCard;