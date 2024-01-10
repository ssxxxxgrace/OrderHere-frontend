import { Container, Grid, useTheme, useMediaQuery, Box } from '@mui/material';
import Footer from './Footer';
import Filter from '../components/Filter';

const ThreeColumnsLayout = ({ children, noFooter = false }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  if (mobileDevice) {
    return (
      <>
        <Grid
          container
          direction="column"
          spacing={3}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item width="100%">
            <Filter />
          </Grid>
          <Grid item>
            <Container>{children}</Container>
          </Grid>
        </Grid>
        {!noFooter && <Footer />}
      </>
    );
  }

  return (
    <Container maxWidth="lg" style={{ padding: 0, margin: 'auto' }}>
      <Grid
        container
        direction="row"
        spacing={4}
        style={{ position: 'relative' }}
      >
        <Grid item xs={3} style={{ position: 'relative' }}>
          <Filter />
        </Grid>
        <Grid item xs={9} style={{ position: 'relative', flex: '1 1 auto' }}>
          {children}
        </Grid>
        {/* {!noFooter && <Footer />} */}
      </Grid>
    </Container>
  );
};

export default ThreeColumnsLayout;
