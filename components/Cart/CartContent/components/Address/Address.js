import { TextField, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Action from '../../../../../store/actionTypes';

const Address = () => {
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    address: '',
  });

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    let newErrors = { ...errors };
    switch (name) {
      case 'phone':
        newErrors.phone = /^\d{10}$/.test(value) ? '' : 'Invalid phone number';
        break;
      case 'name':
        newErrors.name =
          value.length <= 20 ? '' : 'Name should not exceed 20 characters';
        break;
      case 'address':
        newErrors[name] =
          value.length <= 200 ? '' : 'Should not exceed 200 characters';
        break;
      default:
        break;
    }
    setErrors(newErrors);
    dispatch({ type: Action.SET_ADDRESS_DATA, payload: newFormData });
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
        Your Address:
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        name="phone"
        label="Phone number"
        error={!!errors.phone}
        helperText={errors.phone}
        onChange={handleInputChange}
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
        error={!!errors.name}
        helperText={errors.name}
        onChange={handleInputChange}
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
        error={!!errors.address}
        helperText={errors.address}
        onChange={handleInputChange}
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
