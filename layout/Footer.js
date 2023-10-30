import React from 'react';
import { Box, Container, Divider } from '@mui/material';
import NextClientOnly from '../components/NextClientOnly';

const Footer = () => {
  return (
    <NextClientOnly>
      <Container maxWidth="lg">
        <Box sx={{ mt: 8 }}>
          <Divider />
          Footer
        </Box>
      </Container>
    </NextClientOnly>
  );
};

export default Footer;
