import React from 'react';
import { Box, Typography } from '@mui/material';

const RestaurantInfoContent = ({ data }) => {
  return (
    <Box sx={{ display: 'flex', mt: 4, px: 8 }}>
      <Box sx={{ flex: '1 1 auto' }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontSize: '50px', color: '#000' }}
        >
          {data.name}
        </Typography>
        <Typography sx={{ fontSize: '24px' }}>{data.description}</Typography>
      </Box>
      <Box
        component="img"
        sx={{
          height: { xs: 300, md: 400 },
          width: { xs: '100%', md: '50%' },
          marginLeft: { sm: 2, md: 4 },
        }}
        src="/image/restaurant.png"
        alt="Restaurant"
      />
    </Box>
  );
};

export default RestaurantInfoContent;
