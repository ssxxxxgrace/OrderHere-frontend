
import { Box, Button } from '@mui/material';

import { useRouter } from 'next/router';
import RestaurantInfoHeader from '../../components/restaurantInfo/components/restaurantInfoHeader';
import RestaurantInfoContent from '../../components/restaurantInfo/components/restaurantInfoContent';
import Contact from '../../components/restaurantInfo/components/contact';
import OpeningHours from '../../components/restaurantInfo/components/openingHours';

import { EditRestaurantModal } from '../../components/restaurantInfo/EditRestaurantModal';
import { useEffect, useState } from 'react';
import { getRestaurantInfo } from '../../services/Restuarant';


const RestaurantInfoPage = () => {
  const router = useRouter();
  const { restaurantId } = router.query;

  const [loading, setLoading] = useState(false);
  const [restaurantData, setRestaurantData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (restaurantId) {
      setLoading(true);
      getRestaurantInfo(restaurantId)
        .then((response) => {
          console.log('Fetched data:', response.data);
          setRestaurantData(response.data);
        })
        .catch((err) => {
          console.error('Error fetching data:', err);
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [restaurantId]);

  if (!restaurantId || loading) {
    return <div>Loading...</div>;
  }

  if (!restaurantData) {
    return <div>Restaurant not found</div>;
  }

  const handleEditButtonClick = () => {
    setIsEditModalOpen(true);
  };

  const refreshRestaurantData = async () => {
    setLoading(true);
    try {
      const response = await getRestaurantInfo(restaurantId);
      setRestaurantData(response.data);
    } catch (err) {
      console.error('Error fetching updated data:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <RestaurantInfoHeader />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Button
          variant="contained"
          onClick={handleEditButtonClick}
          sx={{
            marginY: 4,
            backgroundColor: 'button.main',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'button.main',
              opacity: 0.6,
              transition: '0.3s',
            },
          }}
        >
          EDIT RESTAURANT INFO
        </Button>
        {isEditModalOpen && (
          <EditRestaurantModal
            restaurantId={restaurantId}
            initialData={restaurantData}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={refreshRestaurantData}
          />
        )}
      </Box>

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
