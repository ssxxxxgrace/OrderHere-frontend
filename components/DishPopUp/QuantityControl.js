import React from 'react';
import { IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const QuantityControl = ({ quantity, setQuantity }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
        <IconButton onClick={() => setQuantity(q => Math.max(1, q - 1))}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="h6" style={{ margin: '0 16px' }}>{quantity}</Typography>
        <IconButton onClick={() => setQuantity(q => q + 1)}>
          <AddIcon />
        </IconButton>
      </div>
    );
  };

export default QuantityControl;
