import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from "./components/PaymentForm";


const stripePromise = loadStripe('pk_test_51O79acCO47pkDdZVK9jDfdy0djVL0gYNNwwH9257UA7eYB1yG94hqTpuFzvaFPvnb0FRcGk2uHPxwmyNKiQUYFsf00NLEk17nI');

export default function Index() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
}
