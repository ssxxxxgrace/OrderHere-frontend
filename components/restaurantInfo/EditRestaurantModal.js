import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useState } from 'react';
import { updateRestaurant } from '../../services/Restaurant';

export const EditRestaurantModal = ({
  restaurantId,
  initialData,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({ ...initialData });
  const [selectedDay, setSelectedDay] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleTimeChange = (name, value) => {
    setFormData({
      ...formData,
      openingHours: formData.openingHours.map((hour) =>
        hour.dayOfWeek === selectedDay ? { ...hour, [name]: value } : hour,
      ),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      console.log(formData);
      await updateRestaurant(restaurantId, formData);
      if (onUpdate) {
        onUpdate();
      }
      onClose();
    } catch (error) {
      console.error('Error updating restaurant:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const renderTimeFields = () => {
    const selectedDayData = formData.openingHours.find(
      (hour) => hour.dayOfWeek === selectedDay,
    );
    if (!selectedDayData) return null;

    return (
      <>
        <TextField
          label="Opening Time"
          value={selectedDayData.openingTime}
          onChange={(e) => handleTimeChange('openingTime', e.target.value)}
          margin="normal"
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Closing Time"
          value={selectedDayData.closingTime}
          onChange={(e) => handleTimeChange('closingTime', e.target.value)}
          margin="normal"
        />
      </>
    );
  };

  return (
    <Modal
      open
      onClose={onClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          maxHeight: '80vh',
          overflowY: 'auto',
          width: '60vw',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Edit Restaurant Info
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="ContactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Abn"
            name="abn"
            value={formData.abn}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="OwnerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="OwnerMobile"
            name="ownerMobile"
            value={formData.ownerMobile}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="OwnerAddress"
            name="ownerAddress"
            value={formData.ownerAddress}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="OwnerEmail"
            name="ownerEmail"
            value={formData.ownerEmail}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="OwnerEmail"
            name="ownerEmail"
            value={formData.ownerEmail}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel>Day of Week</InputLabel>
              <Select
                value={selectedDay}
                label="Day of Week"
                onChange={handleDayChange}
              >
                {formData.openingHours.map((hour, index) => (
                  <MenuItem key={index} value={hour.dayOfWeek}>
                    {hour.dayOfWeek.charAt(0).toUpperCase() +
                      hour.dayOfWeek.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedDay && renderTimeFields()}
          </Box>
          <Box sx={{ display: 'flex', mt: 2, justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginRight: 3 }}
            >
              Update
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
