import styled from '@emotion/styled';
import Image from 'next/legacy/image';
import NextLink from 'next/link';
import { useSelector } from 'react-redux';
import { AppBar, Box, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import AccountButton from './AccountButton';
import Sign from '../Sign';

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'light'
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        boxShadow: 'none',
      }),
}));

const Navbar = () => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  const { isLogin } = useSelector((state) => state.sign);
  return (
    <NavbarRoot>
      <Toolbar
        disableGutters
        sx={{
          height: 60,
          left: 0,
          pl: 3,
          pr: mobileDevice ? 3 : 5,
        }}
      >
        <>
          <NextLink href="/" passHref>
            <Box sx={{ cursor: 'pointer' }}>
              <Image
                src="/logo.svg"
                height="35"
                width="35"
                alt="logo"
                className="shadow"
              />
            </Box>
          </NextLink>

          <Box sx={{ flexGrow: 1 }} />
          <>
            {isLogin || <Sign />}
            <AccountButton isLogin={isLogin} />
          </>
        </>
      </Toolbar>
    </NavbarRoot>
  );
};

export default Navbar;
