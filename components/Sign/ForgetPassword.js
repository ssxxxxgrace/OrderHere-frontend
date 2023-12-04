
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import hotToast from '../../utils/hotToast';

const ForgetPassword = ({ open, onClose }) => {
  const [isLoading, setLoading] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setLoading(true);
      
      setTimeout(() => {
        hotToast('success', 'Password reset link sent to your email');
        setLoading(false);
        setSubmitting(false);
        onClose(); 
      }, 2000);
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>FORGET THE PASSWORD</DialogTitle>
      <DialogContent>
        <Container maxWidth="md">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Enter your email..."
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
              />
              <Box sx={{ py: 2 }}>
                <LoadingButton
                  loading={isLoading}
                  disabled={formik.isSubmitting}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  SEND
                </LoadingButton>
              </Box>
            </Box>
          </form>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgetPassword;
