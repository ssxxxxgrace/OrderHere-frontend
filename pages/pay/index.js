import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./components/PaymentForm";

const stripePromise = loadStripe("pk_test_51O79acCO47pkDdZVK9jDfdy0djVL0gYNNwwH9257UA7eYB1yG94hqTpuFzvaFPvnb0FRcGk2uHPxwmyNKiQUYFsf00NLEk17nI");

export default function PayPage() {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Need to adjust for the real backend
        fetch("http://localhost:4242/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Server responded with status ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else {
                    console.error('Client secret not found in response:', data);
                }
            })
            .catch((error) => {
                console.error("Error fetching client secret:", error);
            });
    }, []);

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
                    <PaymentForm />
                </Elements>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

