import React, { useState } from 'react';
import { TextField, Box, Typography, Select, MenuItem } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

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

      <DatePicker
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
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3, marginTop: '20px', }}>
        <TextField
          margin="normal"
          name="name"
          label="Name"
          rows={1}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '40px',
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
          margin="normal"
          name="person"
          label="Phone number"
          rows={1}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '40px',
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

      <Select
        value={personCount}
        onChange={handlePersonCountChange}
        displayEmpty
        fullWidth
        margin="normal"
        sx={{
          marginTop: '20px',
          borderRadius: '40px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'border.main',
          },
        }}
        renderValue={selected => {
          // Check if the value is the placeholder
          if (selected === "") {
            return (
              <Typography sx={{ color: 'gray' }}>Please select Number of People</Typography> // Replace 'gray' with your desired color
            );
          }
          // For other valid selections, return the selection as is
          return `${selected} Person`;
        }}
      >
  <MenuItem 
    value="" 
    disabled
  >
    Please select Number of People
  </MenuItem>
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
