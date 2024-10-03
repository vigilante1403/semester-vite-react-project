import { useEffect, useState } from "react"
import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import axios from 'axios';
import { Controller, useForm } from "react-hook-form"
import Select from "../../ui/Select"
import { format } from 'date-fns';
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import { Typography } from "@mui/material"
import { useGetAllStartDatesOfTour } from "./useBookTour"
import { loadStripe } from '@stripe/stripe-js';
import Spinner from "../../ui/Spinner"
import { useCreateBooking } from "../../features/bookings/useCreateBooking";
import toast from "react-hot-toast";
const stripePromise = loadStripe(
  'pk_test_51PoLUhJTj4obgyzzmX3gZQzIeD4CxRuGPoRYRrtGmlBZ5Svj62DpbjITJeTneTJBBuEqJOKHz7NCvhUJDFq0bN2B005BINmu7i'
);
function StepConfirmBookingTour({tour,user,onClose}) {
    const {startDates,isLoading}=useGetAllStartDatesOfTour({tourId:tour.id})
    const { createBooking, isCreating } = useCreateBooking()
    const [dateChosen,setDateChosen]=useState('')
    const [keyChosen,setKeyChosen]=useState('')
    const [joining,setJoining]=useState(1)
    const [total,setTotal]=useState(tour.price-tour.priceDiscount)
    const {handleSubmit,control,reset,setValue,register}=useForm()
    
    // console.log(tour.keyOfDatesRelation.filter(key=>Object.values(key)[0]==='2024-10-26'))
    const handleTotal = (e)=>{
        var joining = Number(e.target.value);
        setJoining(prev=>joining)
        var subBasicPrice = tour.price-tour.priceDiscount
        var totalPrice = subBasicPrice*joining;
        setTotal(prev=>totalPrice)

    }
    const stripeRedirect = async (sessionId, stripe) => {
      const { error } = await stripe.redirectToCheckout({// con meo
        sessionId: sessionId,
      });
    
      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
      // sau khi TT tren web stripe thanh cong, no se gui api (hook) method POST toi link api minh da dk
    };
    const handleSubmitTour = async ()=>{
      const bill = {total:total}
      const stripe = await stripePromise;
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
  
          const formData = new FormData();
          formData.append('tour', tour.id);
          formData.append('user', user.id);
          formData.append('date', format(new Date(), 'yyyy-MM-dd'));
          formData.append('paid', false);
          formData.append('priceOrigin', tour.price*joining);
          formData.append('priceDiscount', tour.priceDiscount*joining);
          formData.append('numJoin', joining);
          formData.append('sessionId', sessionId);
          formData.append('creationTime', Number(creationTime));
          console.log(formData);
          createBooking(formData, {
            onSuccess: () => stripeRedirect(sessionId, stripe),
          });
       
  
        // Redirect to Stripe Checkout
      } catch (error) {
        console.log(error)
        toast.error('Session expired');
      }
    }
    if(isLoading) return <Spinner/>
    const options = startDates.map((date)=>({label:date.startDate,value:date.id}))
    return (
        <Form type='modal' onSubmit={handleSubmit(handleSubmitTour)}>
        <Typography fontSize={24} color={"ActiveCaption"}>Please complete this form in order to book tour</Typography>
        <FormRow label='Tour Name'>
            <span>{tour.name}</span>
        </FormRow>
        <FormRow label='Select date'>
        <Controller
            name="date"
            control={control}
            rules={{
              validate: (value) =>
                String(value).length > 0 || 'This field is required',
            }}
            render={({ field }) => (
              <Select
                {...field}
                text="Choose date"
                value={keyChosen}
                options={options}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  const date = options.filter(op=>op.value===e.target.value)[0]
                  setDateChosen(prev=>date)
                  setKeyChosen(e.target.value);
                }}
              />
            )}
          />
        </FormRow>
        <FormRow label='Booked by'>
            <span>{user.fullName}</span>
        </FormRow>
        <FormRow label='Joining person count'>
        <Input type='number' id='joining' defaultValue={1} min={1} onChange={(e)=>handleTotal(e)} />
        </FormRow>
        <FormRow label='Basic price'>
            <p>{tour.price}${' '}x{' '}{joining}</p>
        </FormRow>
        <FormRow label='Current discount price'>
            <p>{tour.priceDiscount}${' '}x{' '}{joining}</p>
        </FormRow>
        <FormRow label='Total estimated'>
           <span>{total}$</span>
        </FormRow>
            <FormRow>
                <Button variation='secondary' type='reset'>Cancel</Button>
                <Button variation='primary' type='submit'>Confirm</Button>
            </FormRow>
        </Form>
    )
}

export default StepConfirmBookingTour
