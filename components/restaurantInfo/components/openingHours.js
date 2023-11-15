import React from 'react';
import { Box, Typography } from '@mui/material';

const OpeningHours = ({ data }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        component="h3"
        sx={{ fontSize: '36px', textDecoration: 'underline' }}
      >
        Opening Hours
      </Typography>
      {data.map((entry) => (
        <Typography key={entry.dayOfWeek} sx={{ fontSize: '28px' }}>
          {capitalizeFirstLetter(entry.dayOfWeek)}:{' '}
          {entry.openingTime === 'Closed'
            ? 'Closed'
            : `${entry.openingTime} - ${entry.closingTime}`}
        </Typography>
      ))}
    </Box>
  );
};

export default OpeningHours;
