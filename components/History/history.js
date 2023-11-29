import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserOrder } from '../../services/orderService';
import { getRestaurantInfo } from '../../services/Restaurant';
import { Grid, Box } from '@mui/material';

const History = () => {
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState({});
  const active = useSelector((state) => state.history.active);
  useEffect(() => {
    const userId = '1';
    const restaurantInfo = {};

    getUserOrder(userId)
      .then((response) => {
        setOrders(response.data);
        response.data.forEach((order) => {
          getRestaurantInfo(order.restaurantId)
            .then((restaurantResponse) => {
              restaurantInfo[order.restaurantId] = restaurantResponse.data.name;
              setRestaurants((prevRestaurants) => ({
                ...prevRestaurants,
                [order.restaurantId]: restaurantResponse.data.name,
              }));
            })
            .catch((error) =>
              console.error('Fetching restaurant info failed', error),
            );
        });
      })
      .catch((error) => console.error('Fetching orders failed', error));
  }, []);

  // console.log('orders by id:', orders)
  // console.log('restaurant name:', restaurants)
  const filteredOrders = orders.filter((order) => {
    if (active === 'all') {
      return true;
    }
    let formattedActive = active;
    if (active === 'dinein') {
      formattedActive = 'dine_in';
    }
    return order.orderType === formattedActive;
  });
  console.log('orders with different type:', filteredOrders);

  const getStatusColor = (status) => {
    if (!status) return '#D1D5DB';
    switch (status.toLowerCase()) {
      case 'pending':
        return '#FFF2E9';
      case 'preparing':
        return '#EEFBF6';
      case 'finished':
        return '#F1F9FD';
      case 'cancelled':
        return '#FFD8DC';
      default:
        return '#D1D5DB';
    }
  };

  return (
    <>
      {/* title */}
      <Grid
        container
        sx={{
          alignItems: 'center',
          padding: '0 5em',
          textAlign: 'center',
          fontSize: '1.5em',
          color: '#999',
          fontWeight: 700,
        }}
      >
        <Grid item xs={2.4}>
          Restaurant Name
        </Grid>
        <Grid item xs={2.4}>
          Order ID
        </Grid>
        <Grid item xs={2.4}>
          Date
        </Grid>
        <Grid item xs={2.4}>
          Cost
        </Grid>
        <Grid item xs={2.4}>
          Status
        </Grid>
      </Grid>

      {/* history data */}
      <Grid
        container
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: '1em',
          color: '#000',
          padding: '0 7.3em',
          fontWeight: 700,
        }}
      >
        {filteredOrders.map((order, index) => (
          <React.Fragment key={index}>
            <Grid item xs={2.4} sx={{ marginTop: '2em' }}>
              {restaurants[order.restaurantId]}
            </Grid>
            <Grid item xs={2.4} sx={{ marginTop: '2em' }}>
              {order.orderId}
            </Grid>
            <Grid item xs={2.4} sx={{ marginTop: '2em' }}>
              {new Date(order.updatedTime).toISOString().split('T')[0]}
            </Grid>
            <Grid item xs={2.4} sx={{ marginTop: '2em' }}>
              ${order.totalPrice}
            </Grid>
            <Grid item xs={2.4} sx={{ marginTop: '2em' }}>
              <Box
                sx={{
                  borderRadius: '50px',
                  border: '2px solid #DBDFD0',
                  backgroundColor: getStatusColor(order.orderStatus),
                  color: '#2C2F24',
                  display: 'inline-block',
                  textAlign: 'center',
                  width: '60%',
                  lineHeight: '2em',
                  textTransform: 'capitalize',
                }}
              >
                {order.orderStatus}
              </Box>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </>
  );
};

export default History;
