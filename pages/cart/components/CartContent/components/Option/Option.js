import { Box, Typography, Divider, Button } from '@mui/material';

const Option = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        sx={{
          backgroundColor: 'button.main',
          width: '120px',
          height: '48px',
          borderRadius: '50px',
          mb: 4,
        }}
      >
        <Typography
          sx={{ color: 'white', fontSize: '16px', fontWeight: '600' }}
        >
          Delivery
        </Typography>
      </Button>
      <Button
        sx={{
          backgroundColor: 'button.main',
          width: '120px',
          height: '48px',
          borderRadius: '50px',
        }}
      >
        <Typography
          sx={{ color: 'white', fontSize: '16px', fontWeight: '600' }}
        >
          Pickup
        </Typography>
      </Button>
      <Button
        sx={{
          backgroundColor: 'button.main',
          width: '120px',
          height: '48px',
          borderRadius: '50px',
        }}
      >
        <Typography
          sx={{ color: 'white', fontSize: '16px', fontWeight: '600' }}
        >
          Dine in
        </Typography>
      </Button>
    </Box>
  );
};

export default Option;
