import React, { useState, useEffect } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { getCategoriesByRestaurant } from '../../services/Category';

const buttonGroupStyles = {
  justifyContent: 'center',
  padding: 2,
  backgroundColor: '#fff',
};

const Category = ({categories: initialData}) => {
  // const [categories, setCategories] = useState([]);
  const [categories, setCategories] = useState(initialData);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await getCategoriesByRestaurant();

  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error('Error fetching categories: ', error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  return (
    <Box sx={{ width: '100%', ...buttonGroupStyles }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          '& > *': {
            flex: '1 1 auto',
          },
        }}
      >
        {categories.map((category) => (
          <Button
            key={category.categoryId}
            variant="outlined"
            color="secondary"
            sx={{
              borderRadius: '20px',
              color: 'black',
              borderColor: 'black',
              '&:hover': {
                borderColor: 'black',
                backgroundColor: '',
              },
            }}
          >
            {category.categoryName}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Category;
