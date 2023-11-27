import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button, Box, Typography } from '@mui/material';
import styles from './PaymentForm.module.css';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import * as Action from '../../store/actionTypes';
import { sendPayResult } from '../../services/Payment';

export default function PaymentForm({ paymentId }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    setIsLoading(false);

    if (error) {
      setMessage(error.message);
      const paymentResultDto = {
        paymentId: paymentId,
        result: 'failure',
      };
      sendPayResult(paymentResultDto);
      router.push('/pay/failure');
    } else {
      dispatch({ type: Action.CLEAR_CART });
      const paymentResultDto = {
        paymentId: paymentId,
        result: 'success',
      };
      sendPayResult(paymentResultDto);
      router.push('/pay/success');
    }
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          height: 'auto',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{
            color: '#474747',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '60px',
            fontStyle: 'normal',
            fontWeight: 500,
            textAlign: 'center',
            width: '100%',
            mt: 4,
          }}
        >
          Please select your payment options
        </Typography>
      </Box>
      <form className={styles.form} id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <Button
          type={'submit'}
          disabled={isLoading || !stripe || !elements}
          className={styles.submitButton}
          id="submit"
        >
          {isLoading ? <div className={styles.spinner}></div> : 'Pay now'}
        </Button>
        {message && (
          <Typography className={styles.paymentMessage}>{message}</Typography>
        )}
      </form>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
