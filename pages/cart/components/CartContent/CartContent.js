import React from 'react';
import { Box } from '@mui/material';
import Address from './components/Address/Address';
import CartItem from './components/CartItem/CartItem';
import CheckList from './components/CheckList/CheckList';
import Note from './components/Note/Note';
import Option from './components/Option/Option';

const Content = () => {
  return (
    <Box sx={{display: 'flex', marginTop: 3}}>
      <Box sx={{width: '440px', mr: '24px', border: 1, borderRadius: 2, borderColor: 'border.main'}}>
        {' '}
        <CheckList />{' '}
      </Box>
      <Box sx={{width: '855px', ml: '24px'}}>
        {' '}
        <Option /> 
        <CartItem />
        <Address />
        <Note />
      </Box>
    </Box>
  );
};

export default Content;
