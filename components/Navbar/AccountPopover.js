import NextLink from 'next/link';
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import { logoutAction } from '../../store/actions/signAction';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const [username, setUsername] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('headImgUrl');

  const handleLogout = async () => {
    await signOut({ redirect: false });
    dispatch(logoutAction());
    onClose();
    router.push('/');
  };

  useEffect(() => {
    setUsername(session.user.name);
    setAvatarUrl(session.user.image);
  }, [session]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <NextLink
        href={{
          pathname: `/profile`,
        }}
        passHref
      >
        <Box
          sx={{
            alignItems: 'center',
            p: 2,
            display: 'flex',
            cursor: 'pointer',
          }}
        >
          <Avatar
            src={avatarUrl}
            sx={{
              height: 40,
              width: 40,
            }}
          />

          <Box
            sx={{
              ml: 1,
            }}
          >
            <Typography variant="body1">{username}</Typography>
            <Typography color="textSecondary" variant="body2">
              roleName
            </Typography>
          </Box>
        </Box>
      </NextLink>
      <Divider />
      <Box sx={{ my: 1 }}>
        {/* {myDetail.role.roleName === 'admin' && (
          <NextLink href="/admin/users" passHref>
            <MenuItem component="a">
              <ListItemIcon>
                <ManageAccountsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body1">Admin</Typography>}
              />
            </MenuItem>
          </NextLink>
        )} */}
        <NextLink href="/history" passHref>
          <MenuItem>
            <ListItemIcon>
              <HistoryIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Order History</Typography>}
            />
          </MenuItem>
        </NextLink>
        <Divider />
        <NextLink href="/profile" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Settings</Typography>}
            />
          </MenuItem>
        </NextLink>
        <Divider />
        <NextLink href="/" passHref>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Logout</Typography>}
            />
          </MenuItem>
        </NextLink>
      </Box>
    </Popover>
  );
};

export default AccountPopover;
