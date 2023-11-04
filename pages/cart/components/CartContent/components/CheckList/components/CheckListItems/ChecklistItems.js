import React from 'react';
import { makeStyles } from '@mui/styles';
import { List, ListItem, ListItemText, Box, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  evenRow: {
    backgroundColor: '#F9F9F9',
  },
  oddRow: {
    backgroundColor: '#EDEDED',
  },
}));

const CheckListItems = () => {
  const classes = useStyles();
  const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']; // Replace this with your data
  const data2 = [
    { title: 'Scotch Fillet 250g', price: '27.00', quantity: '1' },
    { title: 'Scotch Fillet 250g', price: '27.00', quantity: '1' },
    { title: 'Scotch Fillet 250g', price: '27.00', quantity: '1' },
    { title: 'Scotch Fillet 250g', price: '27.00', quantity: '1' },
    { title: 'Scotch Fillet 250g', price: '27.00', quantity: '1' },
    { title: 'Scotch Fillet 250g', price: '27.00', quantity: '1' },
  ];

  return (
    <List>
      {data2.map((item, index) => (
        <ListItem
          key={index}
          className={index % 2 === 0 ? classes.evenRow : classes.oddRow}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    color: '#353535',
                    fontWeight: '450',
                  },
                }}
              />
              <ListItemText
                primary={`$${item.price}`}
                primaryTypographyProps={{
                  sx: {
                    fontSize: '12px',
                    color: '#717171',
                    fontWeight: '450',
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                ml: 18,
                border: 1.3,
                borderColor: 'button.main',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {' '}
              <Typography
                sx={{
                  color: 'text.dishSize',
                  fontSize: '20px',
                  mx: 1,
                  ':hover': {
                    cursor: 'pointer',
                    opacity: 0.5,
                  },
                }}
              >
                +
              </Typography>
              <ListItemText primary={item.quantity} />
              <Typography
                sx={{
                  color: 'text.dishSize',
                  fontSize: '24px',
                  mx: 1,
                  ':hover': {
                    cursor: 'pointer',
                    opacity: 0.5,
                  },
                }}
              >
                -
              </Typography>
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default CheckListItems;
