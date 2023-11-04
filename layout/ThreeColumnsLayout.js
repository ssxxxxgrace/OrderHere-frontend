import { Container, Grid, useTheme, useMediaQuery } from '@mui/material';
import Footer from './Footer';

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
          <Grid item width="95vw">
            Left
          </Grid>
          <Grid item>
            <Container maxWidth={false}>{children}</Container>
          </Grid>
          <Grid item width="95vw">
            Right
          </Grid>
        </Grid>
        {!noFooter && <Footer />}
      </>
    );
  }
  return (
    <Grid
      container
      direction="row"
      spacing={4}
      style={{ position: 'relative', justifyContent: 'center' }}
    >
      <Grid
        item
        xs={2.75}
        style={{ position: 'fixed', left: '-30px', top: '64px', width: '23%' }}
      >
        Left
      </Grid>
      <Grid item xs={6.5} style={{ position: 'relative' }}>
        {children}
      </Grid>
      <Grid
        item
        xs={2.75}
        style={{ position: 'fixed', right: '5px', top: '64px', width: '23%' }}
      >
        Right
      </Grid>
      {!noFooter && <Footer />}
    </Grid>
  );
};

export default ThreeColumnsLayout;
