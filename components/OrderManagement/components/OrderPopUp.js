import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Divider,
  Grid,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import { updateOrderStatus, deleteOrder, submitRatings } from '../../../services/orderService';
import { getRestaurantInfo } from '../../../services/Restaurant';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import * as Action from '../../../store/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { jwtInfo } from '../../../utils/jwtInfo';
import dynamic from 'next/dynamic';

const ContactMap = dynamic(() => import('../../restaurantInfo/components/ContactMap'), { ssr: false });

const OrderPopUp = ({ open, onClose, order, time, onOrderStatusUpdate }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.sign);
  const { userRole } = jwtInfo(token);

  const [address, setAddress] = useState('');
  // const [originalStatus, setOriginalStatus] = useState(order.orderStatus);
  const [originalStatus, setOriginalStatus] = useState('');
  const [isEditMode, setEditMode] = useState(false);
  // const [statusValue, setStatusValue] = useState(order.orderStatus);
  const [statusValue, setStatusValue] = useState('');

  const [ratings, setRatings] = useState({});
  const [showRatingButton, setShowRatingButton] = useState(false);

  useEffect(() => {
    const fetchRestaurantAddress = async () => {
      const response = await getRestaurantInfo(1);
      setAddress(response.data.address);

      if (order) {
        setShowRatingButton(order.orderStatus === 'finished');
      }
    };

    fetchRestaurantAddress();
  }, [order]);

  const handleClose = () => {
    if (isEditMode) {
      setStatusValue(originalStatus);
    }
    onClose();
  };

  const handleRatingChange = (dishName, newRating) => {
    setRatings(prevRatings => ({ ...prevRatings, [dishName]: newRating }));
  };
  

  

  const handleSubmitRating = async () => {
    const ratingData = order.dishes.map(dish => ({
      userId: 1, 
      dishId: dish.dishId,
      ratingValue: ratings[dish.dishId],
      comments: 'good', 
    }));
  
    try {
      
      const response = await submitRatings(ratingData);
      console.log('Rating submitted successfully', response.data);
      
      setShowRatingButton(false); 
    } catch (error) {
      console.error('Error submitting ratings:', error.response || error);
     
    }
  };

  const toggleEditMode = () => {
    if (!isEditMode) {
      setOriginalStatus(order.orderStatus);
      setStatusValue(order.orderStatus);
    }
    setEditMode(!isEditMode);
  };

  const handleStatusChange = (event) => {
    console.log('status:', event.target.value);
    setStatusValue(event.target.value);
  };

  const handleEditStatusSubmit = async () => {
    try {
      console.log('status value:', statusValue);
      const statusInfo = {
        orderId: parseInt(order.orderId),
        orderStatus: statusValue,
      };
      const response = await updateOrderStatus(statusInfo);
      if (response) {
        dispatch({
          type: Action.UPDATE_ORDER_STATUS,
          payload: { orderId: order.orderId, newStatus: statusValue },
        });
        setOriginalStatus(statusValue);
        setEditMode(false);
        onClose();
        props.onOrderStatusUpdate(order.orderId, statusValue);
      }
    } catch (error) {
      console.error('Error updating status:', error.response);
    }
  };

  const handleRejectedOrder = async () => {
    const orderId = parseInt(order.orderId);
    try {
      const orderData = {
        orderId: orderId,
      };
      await deleteOrder(orderData);
      dispatch({ type: Action.DELETE_ORDER, payload: orderId });
      onClose();
      console.log('Success delete order #', order.orderId);
    } catch (error) {
      console.error('Error updating status:', error.response);
    }
  };

  const convertToMelbourneTime = (utcTimestamp) => {
    if (!utcTimestamp) {
      return 'Null';
    }
    const trimmedTimestamp = /(\.\d{3})\d*Z$/.test(utcTimestamp)
      ? utcTimestamp.replace(/(\.\d{3})\d*Z$/, '$1Z')
      : utcTimestamp;

    const date = new Date(trimmedTimestamp);
    if (isNaN(date)) {
      return 'Null';
    }

    const dateOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: 'Australia/Melbourne',
    };
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Australia/Melbourne',
    };

    const formattedDate = new Intl.DateTimeFormat('en-AU', dateOptions).format(
      date,
    );
    const formattedTime = new Intl.DateTimeFormat('en-AU', timeOptions).format(
      date,
    );
    return `${formattedDate}\n${formattedTime}`;
  };

  const renderOrderTypeInfo = () => {
    switch (order.orderType) {
      case 'delivery':
        return (
          <>
            <Grid item xs={6}>
              <Typography sx={{ color: 'text.secondary' }}>
                Estimation Time
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>10 Min</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: 'text.secondary' }}>Distance</Typography>
              <Typography sx={{ fontWeight: 'bold' }}>2.5km</Typography>
            </Grid>
          </>
        );
      case 'pickup':
        return (
          <>
            <Grid item xs={6}>
              <Typography sx={{ color: 'text.secondary' }}>
                PickUp Time
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>
                {convertToMelbourneTime(order.pickupTime)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: 'text.secondary' }}>Phone</Typography>
              <Typography sx={{ fontWeight: 'bold' }}>
                {order.phone ? order.phone : 'Null'}
              </Typography>
            </Grid>
          </>
        );
      case 'dine_in':
        return (
          <>
            <Grid item xs={6}>
              <Typography sx={{ color: 'text.secondary' }}>
                Number of People
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>
                {order.numberOfPeople ? order.numberOfPeople : 'Null'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: 'text.secondary' }}>
                PickUp Time
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>
                {order.pickUpTime ? order.pickUpTime : 'Null'}
              </Typography>
            </Grid>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        {order ? (
          <Box
            sx={{
              borderRadius: '5px',
              border: '1px solid #D9D9D9',
              paddingBlock: 2,
              paddingInline: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="h6">Order #{order.orderId}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{time}</Typography>
              </Box>
              <Typography variant="h6">{order.username}</Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
                width: '100%',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  sx={{ color: 'text.secondary', textTransform: 'capitalize' }}
                >
                  {order.orderType == 'dine_in' ? 'Dine in' : order.orderType}{' '}
                  Address
                </Typography>
                <Box display="flex" alignItems="center">
                  <LocationOnIcon />
                  <Typography>
                    {order.orderType === 'delivery' ? order.address : address}
                  </Typography>
                </Box>
                <ContactMap
                  address={order.orderType === 'delivery' ? order.address : address}
                />
                <Typography sx={{ color: 'text.secondary' }}>
                  Note:{' '}
                  {order.note === undefined || order.note === ''
                    ? 'No special instructions'
                    : order.note}
                </Typography>
              </Box>
              <Grid container spacing={2} sx={{ maxWidth: '50%' }}>
                {renderOrderTypeInfo()}
                <Grid item xs={6}>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Payment
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Credit Card
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Status
                  </Typography>
                  <Box sx={{ cursor: 'pointer' }}>
                    {isEditMode ? (
                      <Select
                        labelId="status-choose-label"
                        id="status-select"
                        value={statusValue}
                        onChange={handleStatusChange}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="preparing">Preparing</MenuItem>
                        <MenuItem value="finished">Finished</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                        <MenuItem value="in_transit">In transit</MenuItem>
                        <MenuItem value="delivered">Delivered</MenuItem>
                        <MenuItem value="delayed">Delayed</MenuItem>
                      </Select>
                    ) : (
                      <Typography
                        sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                      >
                        {order.orderStatus == 'in_transit'
                          ? 'In transit'
                          : order.orderStatus}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            {order.dishes.map((dish) => (
              <Box
                key={dish.dishName}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  mt: 2,
                }}
              >
                <Typography variant="h6">
                  {dish.dishName} x {dish.dishQuantity}
                </Typography>
                <Typography variant="h6">
                  {dish.dishQuantity * dish.dishPrice}
                </Typography>
              </Box>
            ))}
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${order.totalPrice}</Typography>
            </Box>
          </Box>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={6}>
            {showRatingButton && order.dishes.map((dish) => (
              <Box key={dish.dishId} sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                <Typography component="legend">{dish.dishName}</Typography>
                <Box sx={{ display: 'flex' }}>
                  {[1, 2, 3, 4, 5].map((number) => (
                    <Button
                      key={number}
                      onClick={() => handleRatingChange(dish.dishId, number)}
                      variant={ratings[dish.dishId] === number ? "contained" : "outlined"}
                      size="small"
                      sx={{ 
                        color: ratings[dish.dishId] === number ? 'white' : 'black', 
                        borderColor: 'black',
                        fontWeight: 'bold',
                        backgroundColor: ratings[dish.dishId] === number ? 'blue' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'black',
                          color: 'white',
                        },
                        minWidth: '36px',
                        margin: '2px',
                      }}
                    >
                      {number}
                    </Button>
                  ))}
                </Box>
              </Box>
            ))}
            <Button onClick={handleSubmitRating} variant="contained" color="primary" sx={{ marginY: '8px' }}>
              Submit
            </Button>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Button onClick={handleClose} color="primary">Close</Button>
            {userRole === 'ROLE_sys_admin' && !isEditMode && (
              <>
                <Button onClick={handleRejectedOrder}>Reject Order</Button>
                <Button onClick={toggleEditMode}>Modify Order</Button>
              </>
            )}
            {isEditMode && (
              <>
                <Button onClick={toggleEditMode}>Exit</Button>
                <Button onClick={handleEditStatusSubmit} color="primary">Save</Button>
              </>
            )}
          </Grid>
        </Grid>
      </DialogActions>


    </Dialog>
  );
};

export default OrderPopUp;
