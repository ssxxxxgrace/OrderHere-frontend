import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../components/Payment/PaymentForm';
import { createPayment } from '../../services/Payment';
import { useRouter } from 'next/router';

const stripePromise = loadStripe(
  'pk_test_51O79acCO47pkDdZVK9jDfdy0djVL0gYNNwwH9257UA7eYB1yG94hqTpuFzvaFPvnb0FRcGk2uHPxwmyNKiQUYFsf00NLEk17nI',
);

export default function PayPage() {
  const [clientSecret, setClientSecret] = useState('');
  const [paymentId, setPaymentId] = useState(null);
  const router = useRouter();
  let { orderId, totalPrice } = router.query;
  orderId = parseInt(orderId, 10);
  const amount = parseFloat(totalPrice);
  const currency = 'aud';

  useEffect(() => {
    const paymentPostDto = {
      orderId: orderId,
      amount: amount,
      currency: currency,
    };
    console.log(paymentPostDto);

    createPayment(paymentPostDto)
      .then((response) => {
        if (response.status !== 201) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        const data = response.data;
        if (data.clientSecret && data.paymentId) {
          setClientSecret(data.clientSecret);
          setPaymentId(data.paymentId);
        } else {
          console.error(
            'Client secret or payment ID not found in response:',
            data,
          );
        }
      })
      .catch((error) => {
        console.error('Error creating payment intent:', error);
      });
  }, [orderId, amount, currency]);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm paymentId={paymentId} clientSecret={clientSecret} orderId={orderId}/>
        </Elements>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
