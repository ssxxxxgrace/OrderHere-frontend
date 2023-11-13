import React, {useEffect, useState} from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {Button, Box, Typography, Paper} from '@mui/material';
import styles from './PaymentForm.module.css';
import { useRouter } from 'next/router';

export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter(); // Create a router instance

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        // Extract the client secret from the query parameters
        const query = new URLSearchParams(window.location.search);
        const clientSecret = query.get("payment_intent_client_secret");

        if (!clientSecret) {
            return;
        }

        // Retrieve the payment intent and check its status
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    router.push('/pay/success'); // Redirect to the success page
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                case "requires_confirmation":
                case "requires_action":
                    setMessage("Your payment was not successful, please try again.");
                    router.push('/pay/failure'); // Redirect to the failure page
                    break;
                default:
                    setMessage("Something went wrong.");
                    router.push('/pay/failure'); // Redirect to the failure page
                    break;
            }
        });
    }, [stripe, router]);

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
            router.push('/pay/failure'); // Redirect to the failure page
        } else {
            router.push('/pay/success'); // Redirect to the success page
        }
    };

    const paymentElementOptions = {
        layout: "tabs"
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
            <form className={styles.form} id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <Button
                    disabled={isLoading || !stripe || !elements}
                    className={styles.submitButton}
                    id="submit"
                >
                    {isLoading ? <div className={styles.spinner}></div> : "Pay now"}
                </Button>
                {/* Show any error or success messages */}
                {message && <Typography className={styles.paymentMessage}>{message}</Typography>}
            </form>
        </>
    );
}

