import {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Container, FormControl,
    FormControlLabel,
    Grid,
    Paper, Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {updateUserProfile, updateUserProfileTest} from "../../services/Profile";
import {getUserProfileTest} from "../../services/Profile";

export default function ProfileForm() {
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, serError] = useState(null);
    const [originalProfile, setOriginalProfile] = useState({
        userName: 'user1',
        firstName: '',
        lastName: '',
        email: '',
        password: '111222333',
        points: '',
        language: 'English',
        privacy: 'Public',
        avatarUrl: '/user.png',
    });
    const [profile, setProfile] = useState(originalProfile);

    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const response = await getUserProfileTest();
            // Assuming the response structure matches your state structure
            setProfile(response.data);
            setOriginalProfile(response.data);
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
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = () => {
        if (editMode) {
            setProfile(originalProfile);
        } else {
            setOriginalProfile(profile);
        }
        setEditMode(!editMode);
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userProfileUpdateDTO = {
                username: profile.userName,
                firstname: profile.firstName,
                lastname: profile.lastName,
                avatarUrl: profile.avatarUrl,
            }
            await updateUserProfileTest(1, userProfileUpdateDTO);
            setOriginalProfile(profile);
        } catch (error) {
            console.error('Error updating user profile:', error);
            serError(error);
        } finally {
            setLoading(false);
        }
        setEditMode(false);
    };

    return (
        <Container maxWidth="md" >
            <Box sx={{ position: 'relative', textAlign: 'center', pb: 4 , mt: 0}}>
                <Box
                    sx={{
                        height: 150,
                        filter: 'blur(7px)',
                        backgroundImage: 'url(/image/cart-bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderTopLeftRadius: 'borderRadius',
                        borderTopRightRadius: 'borderRadius',
                    }}
                />
                <Avatar
                    src={profile.avatarUrl}
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
            </Box>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} md={6}>
                            <Paper variant={"outlined"} sx={{ padding: 2 }}>
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
                                    onChange={handleChange}
                                    margin="normal"
                                    disabled={!editMode}
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type={editMode ? 'text' : 'password'}
                                    value={profile.password}
                                    onChange={handleChange}
                                    margin="normal"
                                    disabled={!editMode}
                                />
                                <TextField
                                    fullWidth
                                    label="Points"
                                    name="points"
                                    value={profile.points}
                                    // onChange={handleChange}
                                    margin="normal"
                                    disabled={true}
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper variant={"outlined"} sx={{ padding: 2 }}>
                                <Typography variant="h6">System Settings</Typography>
                                <Box>
                                    <FormControl component="fieldset" margin="normal" disabled={!editMode}>
                                        <Typography>Language</Typography>
                                        <RadioGroup
                                            name="language"
                                            value={profile.language}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="English" control={<Radio />} label="English" />
                                            <FormControlLabel value="Chinese" control={<Radio />} label="Chinese" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>

                                <Box>
                                    <FormControl component="fieldset" margin="normal" disabled={!editMode}>
                                        <Typography>Privacy Settings</Typography>
                                        <RadioGroup
                                            name="privacy"
                                            value={profile.privacy}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="Public" control={<Radio />} label="Public" />
                                            <FormControlLabel value="Private" control={<Radio />} label="Private" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Paper>


                        </Grid>
                    </Grid>
                    <Box textAlign="center" sx={{mt: 3}}>
                        <Button variant="contained" color="primary" onClick={handleEdit}
                                sx={{
                                    marginRight: 1,
                                    width: '120px',
                                    height: '40px',
                                    borderRadius: '40px',
                                    backgroundColor: '#AD343E'
                        }} >
                            {editMode ? 'Cancel' : 'Edit'}
                        </Button>
                        <Button type="submit" variant="contained" color="secondary" onClick={handleSubmit} disabled={!editMode}
                        sx ={{
                            width: '120px',
                            height: '40px',
                            borderRadius: '40px',
                            backgroundColor: '#AD343E'
                        }}>
                            Save
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}