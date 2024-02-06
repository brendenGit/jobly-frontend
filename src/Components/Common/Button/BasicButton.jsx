import Button from '@mui/material/Button';
import PropTypes from 'prop-types';


export default function BasicButton({ text }) {
    return (
        <Button
            variant="contained"
            style={{ margin: '5px' }}
        >
            {text}
        </Button>
    );
}

BasicButton.propTypes = {
    text: PropTypes.string.isRequired
};