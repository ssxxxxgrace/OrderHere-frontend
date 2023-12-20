import React from 'react';
import OrderInfo from './components/OrderInfo';
import OrderDetail from './components/OrderDetail';
import Background from '../History/background';
import { Grid, } from '@mui/material';

const OrderManagement = () => {
  return (
    <div className="combine">
      <Background />
      <Grid container justifyContent="space-between" sx={{ mt: 5, mx: 'auto', width: 'auto', maxWidth: 'lg' }}>
        <Grid item xs={4}>
          <OrderInfo />
        </Grid>
        <Grid item xs={8}>
          <OrderDetail />
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderManagement;
