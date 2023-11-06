import React from 'react';
import { Box, Typography } from '@mui/material';

const Contact = () => {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h3" sx={{ fontSize: '36px', textDecoration: 'underline' }}>
                Contact
            </Typography>
            <Typography sx={{ fontSize: '28px' }}>02 9876 5432</Typography>
            <Typography sx={{ fontSize: '28px' }}>email@email.com</Typography>
            <Typography sx={{ fontSize: '28px' }}>123 abc Street, NSW, 2666</Typography>
        </Box>
    );
};

export default Contact;
