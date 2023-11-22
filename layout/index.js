import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const LayoutRoot = styled('div')(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // justifyContent: 'center',
  justifyContent: 'flex-start',
  width: '100vw',
  paddingTop: 64,
  paddingBottom:0,
  minHeight: '100%'
}));
const Layout = ({ children }) => {
  return (
    <LayoutRoot>
      {children[0]}
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          minHeight: '100%',
          // minHeight: '100%',
          flexGrow: 1,
          py: 4,
        }}
      >
        {children[1]}
      </Box>
    </LayoutRoot>
  );
};

export default Layout;
