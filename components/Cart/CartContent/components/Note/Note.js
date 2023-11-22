import { TextField, Box } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Action from '../../../../../store/actionTypes';

const Note = () => {
  const [formData, setFormData] = useState({
    note: ''
  });

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    let newErrors = { ...errors };
    switch (name) {
      case 'note':
        newErrors[name] = value.length <= 200 ? '' : 'Should not exceed 200 characters';
        break;
      default:
        break;
    }
    setErrors(newErrors);

    dispatch({ type: Action.SET_NOTE_DATA, payload: newFormData });
  };

  return (
    <Box sx={{ maxWidth: '100%', margin: 'auto', mt: 4 }}>
      <TextField
        fullWidth
        multiline
        margin="normal"
        name="note"
        label="Note"
        value={formData.note}
        error={!!errors.note}
        helperText={errors.note}
        onChange={handleInputChange}
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
