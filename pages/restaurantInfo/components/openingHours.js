import React from 'react';
import { Box, Typography } from '@mui/material';

const OpeningHours = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h3" sx={{ fontSize: '36px', textDecoration: 'underline' }}>
                Opening Hours
            </Typography>
            {days.map((day) => (
                <Typography key={day} sx={{ fontSize: '28px' }}>
                    {day} 9am-9pm
                </Typography>
            ))}
        </Box>
    );
};

export default OpeningHours;
