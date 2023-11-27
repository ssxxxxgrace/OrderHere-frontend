import {useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Container, Divider, FormControl,
    FormControlLabel,
    Grid,
    Paper, Radio,
    RadioGroup, Switch,
    TextField,
    Typography
} from "@mui/material";

export default function ProfileForm() {
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        points: '',
        language: 'English',
        privacy: 'Only administrators and other instructors can view my profile information',
        avatarUrl: '/user.png',

        // add other fields as necessary
    });

    // Handle input change
    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // You might want to handle the update logic here
        setEditMode(false); // Turn off edit mode on form submit
    };

    return (
        <Container maxWidth="md" >
            <Box sx={{ position: 'relative', textAlign: 'center', pb: 4 , mt: 0}}>
                <Box
                    sx={{
                        height: 150,
                        filter: 'blur(8px)',
                        backgroundImage: 'url(/image/cart-bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderTopLeftRadius: 'borderRadius',
                        borderTopRightRadius: 'borderRadius',
                    }}
                />
                <Avatar
                    src={profile.avatarUrl}
                    alt={`${profile.firstName} ${profile.lastName}`}
                    sx={{
                        width: 100, // Adjust based on your design
                        height: 100, // Adjust based on your design
                        border: '3px solid white',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%) translateY(20%)', // Center the avatar and pull it down 50% of its height
                        bottom: 0,
                        backgroundColor: 'background.paper',
                    }}
                />
            </Box>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Basic Information</Typography>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={profile.firstName}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={profile.lastName}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={profile.email}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                value={profile.password}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Points"
                                name="points"
                                value={profile.points}
                                // onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>

                        <Grid item md={6} sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'divider' }}/>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">System Settings</Typography>
                            <FormControl component="fieldset" margin="normal">
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

                            <FormControl component="fieldset" margin="normal">
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
                        </Grid>
                    </Grid>
                    <Box textAlign="center" sx={{mt: 1}}>
                        <Button variant="contained" color="primary" sx={{ marginRight: 1 }} onClick={handleEdit}>
                            {editMode ? 'Cancel' : 'Edit'}
                        </Button>
                        <Button type="submit" variant="contained" color="secondary">
                            Save
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}