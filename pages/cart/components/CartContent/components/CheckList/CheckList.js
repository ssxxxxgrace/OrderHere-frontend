import { Box, Typography, Divider, Button } from '@mui/material';
import CheckListItems from './components/CheckListItems/ChecklistItems';

const CheckList = () => {
  return (
    <>
      <Box
        sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography
          sx={{ fontSize: '20px', fontWeight: '600', color: 'text.title' }}
        >
          Checklist
        </Typography>
        <Box
          sx={{
            ':hover': {
              cursor: 'pointer',
            },
          }}
        >
          <img src="icons/cart/trash.png" alt="trash" />
        </Box>
      </Box>
      <Divider sx={{ mx: 2, borderColor: 'border.section' }} />
      <Box sx={{ mx: 2, height: 216, overflowY: 'scroll' }}>
        <CheckListItems />
      </Box>
      <Divider sx={{ mx: 2, borderColor: 'border.section' }} />

      <Divider sx={{ mx: 2, borderColor: 'border.section' }} />
      <Box
        sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography
          sx={{ fontSize: '16px', fontWeight: '400', color: 'text.title' }}
        >
          Total
        </Typography>
        <Typography
          sx={{ fontSize: '16px', fontWeight: '400', color: 'text.title' }}
        >
          $51
        </Typography>
      </Box>

      <Divider sx={{ mx: 2, borderColor: 'border.section' }} />
      <Box
        sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography
          sx={{ fontSize: '14px', fontWeight: '400', color: 'text.title' }}
        >
          Shipping Fee
        </Typography>
        <Typography
          sx={{ fontSize: '14px', fontWeight: '400', color: 'text.title' }}
        >
          $0
        </Typography>
      </Box>
      <Box
        sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography
          sx={{ fontSize: '10px', fontWeight: '300', color: 'text.warning' }}
        >
          The shipping cost will be calculated based on your chosen address,
          time, and method of delivery, and will be added to this amount.
        </Typography>
        <Box sx={{ ml: 2 }}>
          <img src="icons/cart/warning-2.png" alt="question" />
        </Box>
      </Box>

      <Divider sx={{ mx: 2, borderColor: 'border.section' }} />
      <Box
        sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography
          sx={{ fontSize: '18px', fontWeight: '500', color: 'text.title' }}
        >
          Order Total
        </Typography>
        <Typography
          sx={{ fontSize: '18px', fontWeight: '500', color: 'text.dishSize' }}
        >
          $51
        </Typography>
      </Box>
      <Box
        sx={{ padding: 2, display: 'flex', justifyContent: 'center', mb: 4 }}
      >
        <Button
          sx={{ backgroundColor: 'button.main', width: '100%', height: 40 }}
        >
          <Typography sx={{ marginRight: 2, color: 'white' }}>
            Check Out
          </Typography>{' '}
          <img src="/icons/cart/user.png" />
        </Button>
      </Box>
    </>
  );
};

export default CheckList;
