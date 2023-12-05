import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '@mui/material/Slider';
import { Typography, Box } from '@mui/material';
import * as Action from '../../store/actionTypes';
import { getDishes } from '../../services/Dish';

const pricingFilterStyle = {
  background: '#FEF6E9',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
};

const pricingTagStyle = {
  ...pricingFilterStyle,
};

const tagStyle = {
  padding: '5px 10px',
  borderRadius: '10px',
  display: 'inline-block',
  margin: '5px',
  background: '#fff',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  color: '#000',
  fontSize: '12px',
  fontFamily: 'DM Sans',
  cursor: 'pointer',
};

const newTagStyle = {
  ...tagStyle,
  background: '#AD343E',
  color: '#fff',
};

const PricingFilter = () => {
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [values, setValues] = useState([0, 100]);

  useEffect(() => {
    getDishes().then((data) => {
      if (data && data.data) {
        const prices = data.data.data.map((dish) => dish.price);
        const minPrice = Math.floor(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices));
        setPriceRange({ min: minPrice, max: maxPrice });
        setValues([minPrice, maxPrice]);
      }
    });
  }, []);

  const handleChange = (event, newValues) => {
    setValues(newValues);
    dispatch({
      type: Action.SET_PRICE_RANGE,
      payload: { min: newValues[0], max: newValues[1] },
    });
  };

  const marks = [
    {
      value: values[0],
      label: `$${values[0]}`,
      position: 'bottom',
    },
    {
      value: values[1],
      label: `$${values[1]}`,
      position: 'bottom',
    },
  ];

  return (
    <Box sx={{ ...pricingFilterStyle, width: '100%' }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        PRICING FILTER
      </Typography>
      <Box sx={{ borderBottom: '1px dashed grey', width: '100%', my: 2 }} />
      <Slider
        value={values}
        onChange={handleChange}
        valueLabelDisplay="off"
        marks={marks}
        sx={{
          color: '#AD343E',
          '& .MuiSlider-thumb': {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
              boxShadow: `0px 0px 0px 8px rgb(255 0 0 / 16%)`,
            },
          },
          '& .MuiSlider-track': {
            height: 8,
          },
          '& .MuiSlider-rail': {
            color: '#d8d8d8',
            opacity: 1,
            height: 8,
          },
          '& .MuiSlider-markLabel': {
            fontSize: '1.0rem',
          },
        }}
        min={priceRange.min}
        max={priceRange.max}
      />
    </Box>
  );
};

const PricingTags = () => {
  const [selectedTags, setSelectedTags] = useState({ New: true });

  const handleTagClick = (code) => {
    setSelectedTags((prevSelectedTags) => ({
      ...prevSelectedTags,
      [code]: !prevSelectedTags[code],
    }));
  };

  const tags = [
    { label: 'New', code: 'New' },
    { label: 'Gluten Free', code: 'GF' },
    { label: 'Nut Free', code: 'NF' },
    { label: 'Low Carb', code: 'LC' },
    { label: 'Vegetarian', code: 'V' },
    { label: 'Dairy Free', code: 'DF' },
    { label: 'Vegan', code: 'VE' },
  ];

  return (
    <div style={pricingTagStyle}>
      <h2>PRICING TAGS:</h2>
      <Box sx={{ borderBottom: '1px dashed grey', width: '100%', my: 2 }} />
      {tags.map((tag, index) => (
        <div
          key={index}
          style={selectedTags[tag.code] ? newTagStyle : tagStyle}
          onClick={() => handleTagClick(tag.code)}
        >
          {tag.code} - {tag.label}
        </div>
      ))}
    </div>
  );
};

const Filter = () => {
  return (
    <div className="combine">
      <PricingFilter />
      <PricingTags />
    </div>
  );
};

export default Filter;
