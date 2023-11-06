import React from 'react';
import RestaurantInfoHeader from '../pages/restaurantInfo/components/restaurantInfoHeader';
import RestaurantInfoContent from '../pages/restaurantInfo/components/RestaurantInfoContent';
import Contact from '../pages/restaurantInfo/components/Contact';
import OpeningHours from '../pages/restaurantInfo/components/OpeningHours';
import { Box } from '@mui/material';

const RestaurantInfoPage = () => {
    return (
        <Box>
            <RestaurantInfoHeader />
            <RestaurantInfoContent />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Contact />
                <OpeningHours />
            </Box>
        </Box>
    );
};

export default RestaurantInfoPage;