import React, { useState } from "react";
import Button from '@mui/material/Button';

function ApplyButton({ hasApplied, handleApply }) {
    const handleClick = () => {
        handleApply();
    }

    const button = hasApplied ?
        <Button variant="contained" disabled>Applied</Button>
        :
        <Button variant="outlined" onClick={handleClick}>Apply</Button>

    return button;
}

export default ApplyButton;