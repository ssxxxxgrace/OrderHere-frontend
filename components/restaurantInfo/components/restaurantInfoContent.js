import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const RestaurantInfoContent = ({ data }) => {
  return (
    <Box sx={{ display: 'flex', mt: 4, px: 8 }}>
      <Container maxWidth="md" style={{ padding: 0, margin: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontSize: '50px', color: '#000' }}
            >
              {data.name}
            </Typography>

            <Typography sx={{ fontSize: '24px' }}>
              {data.description}
            </Typography>
          </Box>

          <Box
            component="img"
            sx={{
              height: { xs: 300, md: 400 },
              width: { xs: '100%', md: '60%' },
            }}
            src="/image/restaurant.png"
            alt="Restaurant"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default RestaurantInfoContent;
