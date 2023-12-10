import React, { useState, useEffect } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { getCategoriesByRestaurant } from '../../services/Category';

const buttonGroupStyles = {
  justifyContent: 'center',
  padding: 2,
  backgroundColor: '#fff',
};

const Category = ({ categories: initialData }) => {
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
    <Box sx={{ width: '100%', overflowX: 'auto', ...buttonGroupStyles }}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{
          '& > *': {
            flex: '0 0 auto',
            minWidth: 'fit-content',
          },
          flexWrap: 'nowrap',
        }}
      >
        {categories.map((category) => (
          <Button
            key={category.categoryId}
            variant="outlined"
            color="secondary"
            sx={{
              // marginLeft: 3,
              backgroundColor: 'white',
              fontSize: '13px',
              width: '120px',
              color: 'black',
              '&:hover': {
                backgroundColor: 'button.main',
                color: 'white',
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
