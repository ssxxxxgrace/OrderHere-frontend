import { Box } from '@mui/material';
import ProfileForm from '../components/Profile/ProfileForm';
import LoginFirst from '../components/Profile/LoginFirst';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const isLogin = useSelector((state) => state.sign.isLogin);
  const [shouldRenderProfile, setShouldRenderProfile] = useState(false);

  useEffect(() => {
    setShouldRenderProfile(isLogin);
  }, [isLogin]);

  return <div>{setShouldRenderProfile ? <ProfileForm /> : <LoginFirst />}</div>;
}
