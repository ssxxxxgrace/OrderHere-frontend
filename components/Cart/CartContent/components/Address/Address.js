import { TextField, Box, Typography } from '@mui/material';

const Address = () => {
  return (
    <Box
      sx={{
        maxWidth: '100%',
        margin: 'auto',
        padding: 3,
        border: 1,
        borderRadius: 2,
        borderColor: 'border.main',
        mt: 4,
      }}
    >
      <Typography sx={{ paddingBottom: 2, fontSize: '32px', fontWeight: 600 }}>
        Your Address:
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        name="phone"
        label="Phone number"
        rows={1}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '& fieldset': {
              borderColor: 'border.main',
            },
          },
          '& .MuiInputBase-input': {
            height: 'auto',
          },
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        name="name"
        label="Name"
        rows={1}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '& fieldset': {
              borderColor: 'border.main',
            },
          },
          '& .MuiInputBase-input': {
            height: 'auto',
          },
        }}
      />

      <TextField
        fullWidth
        multiline
        margin="normal"
        name="address"
        label="Address"
        rows={2}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '& fieldset': {
              borderColor: 'border.main',
            },
          },
          '& .MuiInputBase-input': {
            height: 'auto',
          },
        }}
      />
    </Box>
  );
};

export default Address;
