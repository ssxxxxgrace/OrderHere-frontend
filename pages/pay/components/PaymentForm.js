import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {Button, Box, Typography, Paper} from '@mui/material';
import { useRouter } from 'next/router';

const PaymentForm = async () => {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        // Handle the payment submission
    };

    const result = await stripe.confirmCardPayment("");

    if (result.error) {
        console.error(result.error.message);
        await router.push('/pay/failure');
    } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        await router.push('/pay/success');
    }

    return (
        <>
            <box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, height: 'auto'}}>
                <Typography variant="h4" gutterBottom component="div"
                            sx={{
                                color: '#474747',
                                fontFamily: 'DM Sans, sans-serif',
                                fontSize: '60px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                textAlign: 'center',
                                width: '100%',
                                mt: 4,
                            }}>
                    Please select your payment options
                </Typography>
            </box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                minHeight: '100vh',
                width: '400px',
                mt: 4
            }}>
                <Paper elevation={3} sx={{
                    padding: 4,
                    width: '100%',
                    maxWidth: 400,
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <form onSubmit={handleSubmit} style={{width: '100%'}}>
                        <Box sx={{mb: 2, width: '100%'}}>
                            <CardElement options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}/>
                        </Box>
                        <Button type="submit" variant="contained" color="primary" disabled={!stripe} fullWidth>
                            Pay
                        </Button>
                    </form>
                </Paper>
            </Box>
        </>
    );
};


export default PaymentForm;

