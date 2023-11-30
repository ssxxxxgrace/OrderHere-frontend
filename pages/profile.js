import { Box } from '@mui/material';
import ProfileForm from '../components/Profile/ProfileForm'
import LoginFirst from "../components/Profile/LoginFirst";
import { useSelector } from 'react-redux';

export default function ProfilePage() {
const isLogin = useSelector((state) => state.sign.isLogin);
const token = useSelector((state) => state.sign.token);

    return (
        <>
            <Box sx={{ width: '100%', overflow: 'hidden'}}>
                <img src="/image/ProfileHeader.svg" alt="Profile Header" alt="Profile Header" width="100%" />
            </Box>
            {isLogin ? <ProfileForm /> : <LoginFirst />}
        </>
    );
}
