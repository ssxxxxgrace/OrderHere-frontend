import React from 'react';
import { Box, Typography } from '@mui/material';

const RestaurantInfoContent = () => {
    return (
        <Box sx={{ display: 'flex', mt: 4, px: 8 }}>
            <Box sx={{ flex: '1 1 auto' }}>
                <Typography variant="h3" component="h2" sx={{ fontSize: '60px' }}>
                    Restaurant Name
                </Typography>
                <Typography sx={{ fontSize: '30px' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
            </Box>
            <Box
                component="img"
                sx={{
                    height: { xs: 300, md: 400 },
                    width: { xs: '100%', md: '50%' }
                }}
                src="/image/restaurant.png"
                alt="Restaurant"
            />
        </Box>
    );
};

export default RestaurantInfoContent;
