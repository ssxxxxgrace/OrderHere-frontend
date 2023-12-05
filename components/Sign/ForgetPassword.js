import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch } from 'react-redux';
import { forgetPasswordAction } from '../../store/actions/httpAction'; 
import { forgetpassword } from '../../services/Public';
import hotToast from '../../utils/hotToast';

const ForgetPassword = ({ open, onClose }) => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .required('Email is required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true); 
      forgetpassword(values.email)
        .then(() => {
          setSubmitting(false); 
          hotToast('success', 'Reset link sent to your email.');
          onClose(); 
        })
        .catch((error) => {
          setSubmitting(false); 
          if (error && error.response && error.response.status === 403) {
            hotToast('error', 'Permission denied or invalid request.');
          } else {
            hotToast('error', `Something went wrong: ${error}`);
          }
        });
    },
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Container maxWidth="sm" sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}>
          <Typography id="transition-modal-title" variant="h6" component="h2" align="center">
            FORGET PASSWORD
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              loading={isLoading}
              sx={{
                mt: 3, 
                mb: 2, 
                backgroundColor: '#AD343E', // Set the background color
                '&:hover': {
                  backgroundColor: '#931F1D' // Darken the color slightly on hover
                }
              }}
            >
              Send Reset Link
            </LoadingButton>
          </Box>
        </Container>
      </Fade>
    </Modal>
  );
};

export default ForgetPassword;
