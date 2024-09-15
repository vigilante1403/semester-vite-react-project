// src/components/CheckoutButton.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Button from '../../ui/Button';

// Replace with your Stripe publishable key
const stripePromise = loadStripe(
  'pk_test_51PoLUhJTj4obgyzzmX3gZQzIeD4CxRuGPoRYRrtGmlBZ5Svj62DpbjITJeTneTJBBuEqJOKHz7NCvhUJDFq0bN2B005BINmu7i'
);

const CheckoutButton = ({ tour }) => {
  const handleClick = async () => {
    const stripe = await stripePromise;

    try {
      // Make a request to your backend to create a checkout session
      const { data } = await axios.post('/checkouts/checkout-session', {
        tour,
      });

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
      

      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ marginTop: '1rem', fontSize: '1.2rem' }}
      onClick={handleClick}
    >
      Buy now
    </Button>
  );
};

export default CheckoutButton;
