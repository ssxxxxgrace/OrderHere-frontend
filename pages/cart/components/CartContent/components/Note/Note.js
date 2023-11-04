import React from 'react';
import { TextField, Box } from '@mui/material';

const Note = () => {
  return (
    <Box sx={{ maxWidth: '100%', margin: 'auto', mt: 4 }}>
      <TextField
        fullWidth
        multiline
        margin="normal"
        name="note"
        label="Note"
        rows={4}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '30px',
            '& fieldset': {
              borderColor: 'border.main',
            },
          },
          '& .MuiInputBase-input': {
            height: 'auto',
            padding: '10px',
          },
        }}
      />
    </Box>
  );
};

export default Note;
