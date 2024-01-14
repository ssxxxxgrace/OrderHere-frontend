import React from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import OrderDetail from '../../components/Payment/OrderDetail';

const SuccessPage = () => {
  const router = useRouter();
  let { orderId } = router.query;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#FEF6E9',
        padding: '20px',
        margin: 0,
      }}
    >
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '500px',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            mb: 2,
            width: '160px',
            height: '160px',
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            },
          }}
        >
          <img src="/icons/payment/successImg.svg" alt="Success" />
        </Box>
        <Typography
          gutterBottom
          sx={{
            color: '#474747',
            fontFamily: 'DM Sans',
            fontSize: '36px',
            fontWeight: 700,
            lineHeight: '48px',
            textShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
          }}
        >
          Thank You
        </Typography>
        <OrderDetail orderId={orderId} />
        <Link href="/" passHref>
          <Button
            variant="contained"
            sx={{
              mt: 4,
              backgroundColor: 'button.main',
              '&:hover': {
                opacity: 0.6,
                backgroundColor: 'button.main',
                transition: '0.3s',
              },
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            BACK TO HOME
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default SuccessPage;
