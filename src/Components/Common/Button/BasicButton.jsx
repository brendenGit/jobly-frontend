import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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