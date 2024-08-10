/*eslint-disable*/
import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Select from '../../ui/Select';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useCreateBooking } from './useCreateBooking';
import { useTours } from '../tours/useTours';
import { useUsers } from '../authentication/useUsers';
import { useUpdateBooking } from './useUpdateBooking';
import Spinner from '../../ui/Spinner';
import { useState } from 'react';

function CreateBookingForm({ onClose, editBooking }) {
  const { createBooking, isCreating } = useCreateBooking();
  const{tours,isLoading}=useTours();
  const {users,isLoading:isLoading2}=useUsers();
  const { updateBooking, isUpdating } = useUpdateBooking();

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setValue,
  } = useForm({
    defaultValues: editBooking !== undefined ? editBooking : {},
  });
  const { errors } = formState;

  const onError = (errors) => {
    toast.error('Form submit fail');
    console.log(errors);
  };

  const [datesSelected,setDatesSelected]=useState([])

 const onSubmit = (data) => {
    const formData = new FormData()
    if (editBooking !== undefined) {
      formData.append("id", editBooking.id)
    }
    formData.append('tour',data.tour)
    formData.append('user',data.user)
    formData.append('date',data.date.toString())
    if (editBooking !== undefined) {
      updateBooking(formData, {
        onSettled: () => {
          reset();
          onClose?.();
        },
      });
    } else {
      createBooking(formData, {
        onSettled: () => {
          reset();
          onClose?.();
        },
      });
    }
  };

  // if validation fail, handleSubmit will call the second method we pass in not the first one
  if ( isCreating || isUpdating||isLoading||isLoading2) return <Spinner />;
  let toursSelected=[];
   Array.from(tours).forEach(tour=>{
    toursSelected.push({label:tour.name,value:tour.id})
  })
  let usersSelected=[];
  Array.from([...users].filter(u=>u.role==='USER')).forEach(user=>{
    usersSelected.push({label:user.email,value:user.id})
  })
 
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={editBooking ? 'regular' : 'modal'}
    >
      <FormRow label="Booking name" error={errors?.tour?.message}>
        <Select options={toursSelected} {...register('tour', {
            validate: (value) =>
              String(value).length > 0 || 'This field is required',
          })}
          value={toursSelected[0].value}
          onChange={(e) => {setValue('tour', e.target.value); setDatesSelected(prev=>
          [...tours].filter(tour=>tour.id===e.target.value).map(tour=>tour.startDates)
          )}} />
      </FormRow>

      <FormRow label="User info" error={errors?.user?.message}>
      <Select options={usersSelected} {...register('user', {
            validate: (value) =>
              String(value).length > 0 || 'This field is required',
          })}
          value={usersSelected[0].value}
          onChange={(e) => setValue('user', e.target.value)} />
      </FormRow>

      <FormRow label="Start date" error={errors?.date?.message}>
      <Select options={datesSelected} {...register('date', {
            required:'This field is required',
          })}
          value={datesSelected.length!=0?datesSelected[0].value:''}
          onChange={(e) => setValue('date', e.target.value)} />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit">
          {editBooking ? 'Update Booking' : 'Add new Booking'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
