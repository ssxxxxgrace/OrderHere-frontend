import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import * as Actions from '../../store/actionTypes';

const buttonGroupStyles = {
  justifyContent: 'center',
  padding: 2,
  backgroundColor: '#fff',
};

const Category = ({ categories: initialData }) => {
  const [categories, setCategories] = useState(initialData);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const dispatch = useDispatch();

  const handleCategoryClick = (categoryId) => {
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
      dispatch({ type: Actions.SET_CATEGORY, payload: null });
    } else {
      setSelectedCategoryId(categoryId);
      dispatch({ type: Actions.SET_CATEGORY, payload: categoryId });
    }
  };

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
            onClick={() => handleCategoryClick(category.categoryId)}
            sx={{
              backgroundColor:
                selectedCategoryId === category.categoryId
                  ? 'button.main'
                  : 'white',
              fontSize: '13px',
              width: '120px',
              color:
                selectedCategoryId === category.categoryId ? 'white' : 'black',
              '&:hover': {
                backgroundColor: 'button.main',
                color: 'white',
                transition: 'all 0.5s ease',
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
