import React, { useState } from 'react';
import Image from 'next/legacy/image';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Yup from '../../utils/yupValidation';
import hotToast from '../../utils/hotToast';
import { signup, uniqueUsername, uniqueEmail } from '../../services/Public';
import loginAction from '../../store/actions/httpAction';
import GoogleSignInBtn from './UI/GoogleSignInBtn';
import FacebookSignInBtn from './UI/FacebookSignInBtn';

const Signup = ({ login }) => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().sequence([
        () =>
          Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
        () => Yup.string().unique('Email is already in use', uniqueEmail),
      ]),
      username: Yup.string().sequence([
        () => Yup.string().max(20).required('Username is required'),
        () => Yup.string().unique('Username is already taken', uniqueUsername),
      ]),
      password: Yup.string()
        .min(6, 'must be at least 6 characters long')
        .max(16)
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      // preview mode
      const { email, username, password } = values;
      setLoading(true);
      signup({ email, username, password })
        .then(() => {
          hotToast('success', 'Signup Success');
          dispatch(
            loginAction(
              email,
              password,
              () => {},
              (fail) => {
                setLoading(false);
                if (fail && fail.response && fail.response.status === 403) {
                  hotToast('error', 'Invalid Email or Password');
                }
                hotToast('error', `something wrong${fail}`);
              },
            ),
          );
        })
        .catch((error) => {
          setLoading(false);
          hotToast('error', `Something wrong: ${error}`);
        });
    },
  });

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md">
        <form onSubmit={formik.handleSubmit}>
          <Typography align="center">
            <Image src="/logo.png" height="55" width="55" alt="logo" />
          </Typography>
          <Typography color="textPrimary" variant="h4" align="center">
            CREATE ACCOUNT
          </Typography>
          <Typography
            color="textSecondary"
            sx={{ mt: 2 }}
            variant="body2"
            align="center"
          >
            Please Enter your Email Address to Start your Online Application
          </Typography>
          <Box sx={{ my: 3 }}>
            <Grid container spacing={3}>
              <Grid item>
                <TextField
                  error={Boolean(
                    formik.touched.firstname && formik.errors.firstname,
                  )}
                  fullWidth
                  helperText={formik.touched.username && formik.errors.username}
                  label="firstname"
                  margin="normal"
                  name="firstname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="firstname"
                  value={formik.values.lastname}
                  variant="outlined"
                />
              </Grid>

              <Grid item>
                <TextField
                  error={Boolean(
                    formik.touched.lastname && formik.errors.lastname,
                  )}
                  fullWidth
                  helperText={formik.touched.username && formik.errors.username}
                  label="lastname"
                  margin="normal"
                  name="lastname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="firstname"
                  value={formik.values.lastname}
                  variant="outlined"
                />
              </Grid>
            </Grid>

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

            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Enter your password..."
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Grid sx={{ pt: 3 }}>
              <LoadingButton
                loading={isLoading}
                disabled={formik.isSubmitting}
                color="primary"
                fullWidth
                size="large"
                variant="contained"
                onClick={() => {
                  if (process.env.NEXT_PUBLIC_PREVIEW_ENABLED) {
                    dispatch(
                      loginAction(
                        'asd@asd.com',
                        '123456',
                        () => {
                          // preview mode
                          if (process.env.NEXT_PUBLIC_PREVIEW_ENABLED) {
                            hotToast(
                              'success',
                              `Preview Simulate Login Success`,
                            );
                            return;
                          }
                          hotToast('success', 'Login Success');
                        },
                        (fail) => {
                          setLoading(false);
                          if (
                            fail &&
                            fail.response &&
                            fail.response.status === 403
                          ) {
                            hotToast('error', 'Invalid Email or Password');
                          } else {
                            hotToast('error', `Something wrong ${fail}`);
                          }
                        },
                      ),
                    );
                  } else {
                    formik.handleSubmit();
                  }
                }}
              >
                SIGN UP
              </LoadingButton>
            </Grid>
            <Box sx={{ mt: 2, mb: 1 }}>
              <Divider> OR </Divider>
            </Box>

            <Grid container>
              <Grid item xs={6}>
                <GoogleSignInBtn>Sign in With Google</GoogleSignInBtn>
              </Grid>
              <Grid item xs={6}>
                <FacebookSignInBtn></FacebookSignInBtn>
              </Grid>
            </Grid>

            <Box>
              <Grid
                container
                spacing={0}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Typography>Already have an account?</Typography>
                </Grid>
                <Grid item>
                  <Typography color="textSecondary" variant="body2">
                    <Button onClick={() => login()}>Log in</Button>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default Signup;
