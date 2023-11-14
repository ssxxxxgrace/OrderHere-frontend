import React, { ReactNode } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = ({ onClose }) => {
  return (
    <DialogTitle sx={{ m: 0, p: 2 }}>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            '&:hover':{
              backgroundColor: '#d32f2f',
              color: (theme) => 'rgba(255,255,255,1)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const SignDialog = ({ children, isOpen, onClose }) => {
  return (
    <BootstrapDialog
      open={isOpen}
      sx={{
        '.MuiDialog-paper': {
          backgroundColor: '#FEF6E9',
        },
      }}
    >
      <BootstrapDialogTitle onClose={onClose} />
      <DialogContent>{children}</DialogContent>
    </BootstrapDialog>
  );
};

export default SignDialog;
