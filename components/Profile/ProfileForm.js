import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import {
  updateUserProfile,
  getUserProfile,
  updateUserAvatar,
} from '../../services/Profile';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

export default function ProfileForm() {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, serError] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const defaultProfile = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    points: 0,
    avatarUrl: '',
    language: 'English',
    privacy: 'Public',
    address: '',
  };

  const [originalProfile, setOriginalProfile] = useState(defaultProfile);
  const [profile, setProfile] = useState(defaultProfile);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await getUserProfile();
      setProfile({
        userName: response.data.username,
        firstName: response.data.firstname,
        lastName: response.data.lastname,
        email: response.data.email,
        points: response.data.point,
        avatarUrl: response.data.avatarUrl,
        language: 'English',
        privacy: 'Public',
        address: response.data.address,
      });
      setOriginalProfile({
        userName: response.data.username,
        firstName: response.data.firstname,
        lastName: response.data.lastname,
        email: response.data.email,
        points: response.data.point,
        avatarUrl: response.data.avatarUrl,
        language: 'English',
        privacy: 'Public',
        address: response.data.address,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      serError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    if (e && e.target) {
      setProfile({
        ...profile,
        [e.target.name]: e.target.value,
      });
    } else {
      setProfile({
        ...profile,
        address: e,
      });
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('imageFile', file);

      try {
        setLoading(true);
        const response = await updateUserAvatar(formData);
        if (response.status === 200) {
          console.log(response.data);
          setProfile({
            ...profile,
            avatarUrl: response.data,
          });
          setOriginalProfile({
            ...originalProfile,
            avatarUrl: response.data,
          });
          setSnackbarMessage('Avatar change successful!');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage('Failed to update avatar.');
          setSnackbarSeverity('error');
        }
      } catch (error) {
        console.error('Error updating avatar:', error);
        setSnackbarMessage('Failed to update avatar.');
        setSnackbarSeverity('error');
      } finally {
        setSnackbarOpen(true);
        setLoading(false);
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleEdit = () => {
    if (editMode) {
      setProfile(originalProfile);
    } else {
      setOriginalProfile(profile);
    }
    setEditMode(!editMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userProfileUpdateDTO = {
        username: profile.userName,
        firstname: profile.firstName,
        lastname: profile.lastName,
        address: profile.address,
      };
      await updateUserProfile(userProfileUpdateDTO);
      setOriginalProfile(profile);
      setSnackbarMessage('User information change successful!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error updating user profile:', error);
      serError(error);
      setSnackbarMessage('Failed to update user information.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setLoading(false);
    }
    setEditMode(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ position: 'relative', textAlign: 'center', pb: 4, mt: 0 }}>
        <Box
          sx={{
            height: 150,
            filter: 'blur(5px)',
            backgroundImage: 'url(/image/ProfileHeader.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderTopLeftRadius: 'borderRadius',
            borderTopRightRadius: 'borderRadius',
          }}
        />
        <Avatar
          src={profile?.avatarUrl}
          alt={`${profile.userName}`}
          sx={{
            width: 100,
            height: 100,
            border: '3px solid white',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%) translateY(20%)',
            bottom: 0,
            backgroundColor: 'background.paper',
          }}
        />

        <Button
          component="label"
          sx={{
            position: 'absolute',
            left: '54%',
            bottom: '-10%',
            transform: 'translateX(-50%)',
          }}
        >
          <BorderColorSharpIcon />
          <input type="file" hidden onChange={handleAvatarChange} />
        </Button>
      </Box>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} md={6}>
              <Paper variant={'outlined'} sx={{ padding: 2 }}>
                <Typography variant="h6">Basic Information</Typography>
                <TextField
                  fullWidth
                  label="User Name"
                  name="userName"
                  value={profile.userName}
                  onChange={handleChange}
                  margin="normal"
                  disabled={!editMode}
                />
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  margin="normal"
                  disabled={!editMode}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  margin="normal"
                  disabled={!editMode}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={profile.email}
                  margin="normal"
                  disabled={true}
                />
                <TextField
                  fullWidth
                  label="Points"
                  name="points"
                  value={profile.points}
                  margin="normal"
                  disabled={true}
                />
                <PlacesAutocomplete
                  value={profile.address}
                  onChange={handleChange}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                    <div>
                      <TextField
                        {...getInputProps({
                          label: "Address",
                          fullWidth: true,
                          margin: "normal",
                          disabled: !editMode,
                        })}
                      />
                      <div>
                        {suggestions.map(suggestion => (
                          <div
                            {...getSuggestionItemProps(suggestion)}
                            key={suggestion.placeId}
                          >
                            {suggestion.description}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper variant={'outlined'} sx={{ padding: 2 }}>
                <Typography variant="h6">System Settings</Typography>
                <Box>
                  <FormControl
                    component="fieldset"
                    margin="normal"
                    disabled={!editMode}
                  >
                    <Typography>Language</Typography>
                    <RadioGroup
                      name="language"
                      value={profile.language}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="English"
                        control={<Radio />}
                        label="English"
                      />
                      <FormControlLabel
                        value="Chinese"
                        control={<Radio />}
                        label="Chinese"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl
                    component="fieldset"
                    margin="normal"
                    disabled={!editMode}
                  >
                    <Typography>Privacy Settings</Typography>
                    <RadioGroup
                      name="privacy"
                      value={profile.privacy}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Public"
                        control={<Radio />}
                        label="Public"
                      />
                      <FormControlLabel
                        value="Private"
                        control={<Radio />}
                        label="Private"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Box textAlign="center" sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEdit}
              sx={{
                marginRight: 1,
                width: '120px',
                height: '40px',
                borderRadius: '40px',
                backgroundColor: '#AD343E',
              }}
            >
              {editMode ? 'Cancel' : 'Edit'}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              disabled={!editMode}
              sx={{
                width: '120px',
                height: '40px',
                borderRadius: '40px',
                backgroundColor: '#AD343E',
              }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
