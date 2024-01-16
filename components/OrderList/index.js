import React from 'react';
import ListInfo from './components/ListInfo';
import ListDetail from './components/ListDetail';
import Background from './components/BgImage';
import { Grid } from '@mui/material';

const OrderList = () => {
  return (
    <div className="combine">
      <Background />
      <Grid
        container
        justifyContent="space-between"
        sx={{ mt: 5, mx: 'auto', width: 'auto', maxWidth: 'lg' }}
      >
        <Grid item xs={4}>
          <ListInfo />
        </Grid>
        <Grid item xs={8}>
          <ListDetail />
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderList;
