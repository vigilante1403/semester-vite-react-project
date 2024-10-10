// src/components/CheckoutButton.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Button from '../../ui/Button';
import { useAuthenticate } from '../security/useAuthenticate';
import Spinner from '../../ui/Spinner';
import { format } from 'date-fns';
import { useCreateBooking } from '../../features/bookings/useCreateBooking';
import Menus from '../../ui/Menus';
import { HiArrowDownOnSquare } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { useChangeBookingSessionId } from './useBookTour';

// Replace with your Stripe publishable key
const stripePromise = loadStripe(
  'pk_test_51PoLUhJTj4obgyzzmX3gZQzIeD4CxRuGPoRYRrtGmlBZ5Svj62DpbjITJeTneTJBBuEqJOKHz7NCvhUJDFq0bN2B005BINmu7i'
);

const CheckoutButton = ({ tour, payAfter = null,bill=null,bookingId=null }) => {
  const { user, isAuthenticated, isLoading } = useAuthenticate();
  const { createBooking, isCreating } = useCreateBooking();
  const {changeSession,isEditting}=useChangeBookingSessionId()
   const stripeRedirect = async (sessionId, stripe) => {
    const { error } = await stripe.redirectToCheckout({// con meo
      sessionId: sessionId,
    });
  
    if (error) {
      console.error('Error redirecting to checkout:', error);
    }
    // sau khi TT tren web stripe thanh cong, no se gui api (hook) method POST toi link api minh da dk
  };
  const handleClick = async () => {
    const stripe = await stripePromise;
      console.log(tour)

    try {
      // Make a request to your backend to create a checkout session
      const { data } = await axios.post('/checkouts/checkout-session', {
        tour,
        user,
        bill
      });
      // tao booking with paid =false
      var sessionId = data.sessionId;
      var creationTime = data.creationTime;
      if (payAfter==null) {//tt lan dau
        const formData = new FormData();
        formData.append('tour', tour.id);
        formData.append('user', user.id);
        formData.append('date', format(new Date(), 'yyyy-MM-dd'));
        formData.append('paid', false);
        formData.append('priceOrigin', tour.price);
        formData.append('priceDiscount', tour.priceDiscount);
        formData.append('numJoin', 1);
        formData.append('sessionId', sessionId);
        formData.append('creationTime', Number(creationTime));
        console.log(formData);
        createBooking(formData, {
          onSuccess: () => stripeRedirect(sessionId, stripe),
        });
      }else{
        changeSession({bookingId:bookingId,sessionId:sessionId},{
          onSuccess:()=>stripeRedirect(sessionId,stripe)
        })
      }

      // Redirect to Stripe Checkout
    } catch (error) {
      console.log(error)
      toast.error('Session expired');
    }
  };
  if(payAfter) return <Menus><Menus.Button icon={<HiArrowDownOnSquare />} onClick={()=>handleClick()}>Paid bill</Menus.Button></Menus>
  if (isLoading) return <Spinner />;
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ marginTop: '1rem', fontSize: '1.2rem' }}
      onClick={isAuthenticated ? () => handleClick() : () => null}
    >
      {isAuthenticated ? 'Buy now' : 'Login to book'}
    </Button>
  );
};

export default CheckoutButton;
