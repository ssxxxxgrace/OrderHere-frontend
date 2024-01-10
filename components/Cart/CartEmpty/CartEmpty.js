import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

const EmptyCart = () => {
  return (

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        <Box
          sx={{
            width: 501,
            height: 479,
            borderRadius: '50%',
            backgroundColor: '#ffefc3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 2,
          }}
        >
          <img src="/icons/cart/EmptyCartIcon.svg" alt="EmptyCart" />
        </Box>
        <Typography
          fontSize="45px"
          gutterBottom
          fontWeight="500"
          sx={{
            marginTop: 4,
          }}
        >
          Your Cart is Empty
        </Typography>
        <Typography
          fontSize="20px"
          color="#595959"
          sx={{
            marginTop: 2,
          }}
        >
          Looks like you haven’t added anything to your cart yet
        </Typography>
        <Link href="/" passHref>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: 8,
              marginBottom: 10,
              backgroundColor: 'button.main',
              '&:hover': {
                backgroundColor: 'button.main',
                opacity: 0.7,
                transition: '0.3s',
              },
              borderRadius: '8px',
              padding: '8px, 16px, 8px, 16px',
              width: '300px',
              height: '64px',
              fontSize: '1.25rem',
            }}
          >
            BACK TO MENU
          </Button>
        </Link>
      </Box>

  );
};

export default EmptyCart;
