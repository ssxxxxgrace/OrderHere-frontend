import React, { useState } from 'react';
import { TextField, Box, Typography, Select, MenuItem } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import {useDispatch} from "react-redux";
import {updateDineInData} from "../../../../../store/actions/dineInAction";

const DineIn = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const [personCount, setPersonCount] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(dayjs(date));
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    dispatch(updateDineInData({ selectedDate: formattedDate }));
  };

  const handleTimeChange = (time) => {
    setSelectedTime(dayjs(time));

    const formattedTime = dayjs(time).format('HH:mm');
    dispatch(updateDineInData({ selectedTime: formattedTime }));

  };

  const handlePersonCountChange = (event) => {
    setPersonCount(event.target.value);

    dispatch(updateDineInData({ personCount: event.target.value }));
  };

  const handleNameChange = (event) => {
      setName(event.target.value);
      dispatch(updateDineInData({ name: event.target.value }));
  };

  const handlePhoneNumberChange = (event) => {
      setPhoneNumber(event.target.value);
      dispatch(updateDineInData({ phoneNumber: event.target.value }));

  };

  const disablePastDates = (date) => {
    return dayjs(date).isBefore(dayjs(), 'day');
  };

  const disablePastTimes = (timeValue, timeType) => {
    if (selectedDate.isSame(dayjs(), 'day')) {
      if (timeType === 'hours') {
        return timeValue < dayjs().hour();
      } else if (timeType === 'minutes') {
        return timeValue < dayjs().minute();
      }
    }
    return false;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        <Typography
          sx={{ paddingBottom: 2, fontSize: '32px', fontWeight: 600 }}
        >
          Dine In:
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 3,
            marginTop: '20px',
          }}
        >
          <DatePicker
            label="Pick a Date"
            value={selectedDate}
            onChange={handleDateChange}
            shouldDisableDate={disablePastDates}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'border.main',
                borderRadius: '40px',
              },
            }}
            renderInput={(props) => (
              <TextField {...props} fullWidth margin="normal" />
            )}
          />

          <TimePicker
            label="Pick a Time"
            value={selectedTime}
            onChange={handleTimeChange}
            shouldDisableTime={disablePastTimes}
            ampm={false}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'border.main',
                borderRadius: '40px',
              },
            }}
            renderInput={(props) => (
              <TextField {...props} fullWidth margin="normal" />
            )}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 3,
            marginTop: '20px',
          }}
        >
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

            onChange={handleNameChange}

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

            onChange={handlePhoneNumberChange}

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
          renderValue={(selected) => {
            if (selected === '') {
              return (
                <Typography sx={{ color: 'gray' }}>
                  Please select Number of People
                </Typography>
              );
            }
            return `${selected} Person`;
          }}
        >
          <MenuItem value="" disabled>
            Please select Number of People
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </Box>
    </LocalizationProvider>
  );
};

export default DineIn;
