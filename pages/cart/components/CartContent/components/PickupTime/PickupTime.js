import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
} from '@mui/material';
import { styled } from '@mui/system';

const CustomColorRadio = styled(Radio)({
  '&.Mui-checked': {
    color: '#AD343E',
  },
});

const PickupTime = () => {
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(now);
  const [timeFrame, setTimeFrame] = useState(
    `${now.getHours()}:00 - ${now.getHours() + 1}:00`,
  );

  const router = useRouter();

  const incrementDate = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const decrementDate = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/'); // navigate to payment page in the future
  };

  const isToday = useMemo(() => {
    const today = new Date();
    return selectedDate.toDateString() === today.toDateString();
  }, [selectedDate]);

  const timeFrames = useMemo(() => {
    const timeFrames = [];
    const startHour = isToday ? now.getHours() : 0;

    for (let i = startHour; i < 23; i++) {
      timeFrames.push(`${i}:00 - ${i + 1}:00`);
    }

    return timeFrames;
  }, [now, selectedDate]);

  const getDayLabel = (selectedDate) => {
    const today = new Date();
    if (selectedDate.toDateString() === today.toDateString()) return 'Today';
    else return selectedDate.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 6,
        border: 1,
        padding: 3,
        borderRadius: 2,
        borderColor: 'border.main',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          sx={{
            color: 'button.main',
            '&.MuiButton-outlined': {
              borderColor: 'button.main',
            },
          }}
          onClick={decrementDate}
          disabled={isToday}
        >
          Previous Day
        </Button>
        <Box
          component="span"
          sx={{ mx: 2, fontSize: 22, fontWeight: 500, marginX: 5 }}
        >
          {getDayLabel(selectedDate)}{' '}
          {selectedDate.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
          })}
        </Box>
        <Button
          variant="outlined"
          sx={{
            color: 'button.main',
            '&.MuiButton-outlined': {
              borderColor: 'button.main',
            },
          }}
          onClick={incrementDate}
        >
          Next Day
        </Button>
      </Box>

      <Box sx={{ mb: 4, height: '300px', overflowY: 'scroll' }}>
        <RadioGroup
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
        >
          {timeFrames.map((timeFrame) => (
            <FormControlLabel
              key={timeFrame}
              value={timeFrame}
              control={<CustomColorRadio />}
              label={timeFrame}
              sx={{ '&.Mui-checked': { color: 'red' } }}
            />
          ))}
        </RadioGroup>
      </Box>

      <Button
        type="submit"
        sx={{
          backgroundColor: 'button.main',
          width: '400px',
          height: '50px',
          borderRadius: '10px',
          color: 'white',
          fontSize: '20px',
          fontWeight: 600,
        }}
      >
        Confirm
      </Button>
    </Box>
  );
};

export default PickupTime;
