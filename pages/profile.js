import { Box } from '@mui/material';
import ProfileForm from '../components/Profile/ProfileForm'

export default function ProfilePage() {

    return (
        <>
            <Box sx={{ width: '100%', overflow: 'hidden'}}>
                <img src="/image/ProfileHeader.svg" alt="Profile Header" alt="Profile Header" width="100%" />
            </Box>
            <ProfileForm />
        </>
    );
}
