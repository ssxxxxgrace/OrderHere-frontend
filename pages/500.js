import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ServerError = () => {
  return (
    <>
      <Head>
        <title>500 | OrderHere</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography align="center" color="textPrimary" variant="h1">
              500: ServerError
            </Typography>
            <NextLink href="/" passHref>
              <Button
                component="a"
                startIcon={<ArrowBackIcon fontSize="small" />}
                sx={{ mt: 3 }}
                variant="contained"
              >
                Go back to home
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ServerError;
