import React, { useState } from 'react';
import {
  TextField,
  Box,
  Typography,
  DatePicker,
  TimePicker,
  Select,
  MenuItem,
} from '@mui/material';

const DineIn = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [personCount, setPersonCount] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handlePersonCountChange = (event) => {
    setPersonCount(event.target.value);
  };

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
        Dine In:
      </Typography>

      {/* Bug and styles should be fixed on Date Picker and Time picker */}

      {/* <DatePicker
        label="Pick a Date"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(props) => (
          <TextField {...props} fullWidth margin="normal" />
        )}
      />

      <TimePicker
        label="Pick a Time"
        value={selectedTime}
        onChange={handleTimeChange}
        fullWidth
        margin="normal"
      /> */}

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

      {/* Reactify the styles for people selector */}

      <Select
        value={personCount}
        onChange={handlePersonCountChange}
        fullWidth
        margin="normal"
        label="Number of People"
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>
    </Box>
  );
};

export default DineIn;
