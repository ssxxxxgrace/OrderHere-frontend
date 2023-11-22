import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import RestaurantInfoHeader from '../../components/restaurantInfo/components/restaurantInfoHeader';
import RestaurantInfoContent from '../../components/restaurantInfo/components/restaurantInfoContent';
import Contact from '../../components/restaurantInfo/components/contact';
import OpeningHours from '../../components/restaurantInfo/components/openingHours';
import { useEffect, useState } from 'react';
import getRestaurantById from '../api/restaurantService';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurant } from '../../store/actions/httpAction';

const RestaurantInfoPage = () => {
  const router = useRouter();
  const { restaurantId } = router.query;
  const dispatch = useDispatch();
  const restaurantData = useSelector((state) => state.restaurant.data);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurant(restaurantId));
    }
  }, [dispatch, restaurantId]);

  if (!restaurantData || !restaurantData.openingHours) {
    return <div>Restaurant not found</div>;
  }

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <RestaurantInfoHeader />
      <RestaurantInfoContent data={restaurantData} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          mt: 4,
          pt: 8,
          pb: 8,
          backgroundColor: '#E9E9E9',
        }}
      >
        <Contact data={restaurantData} />
        <OpeningHours data={restaurantData.openingHours} />
      </Box>
    </Box>
  );
};

export default RestaurantInfoPage;
