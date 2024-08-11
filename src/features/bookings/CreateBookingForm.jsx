/*eslint-disable*/
import styled from 'styled-components';
import { formatDistance, parse, parseISO,format } from 'date-fns';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Select from '../../ui/Select';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';

import { useForm,Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useCreateBooking } from './useCreateBooking';
import { useTours } from '../tours/useTours';
import { useUsers } from '../authentication/useUsers';
import { useUpdateBooking } from './useUpdateBooking';
import Spinner from '../../ui/Spinner';
import { useState } from 'react';

function CreateBookingForm({ onClose, editBooking }) {
  if(editBooking) console.log(editBooking)
  const { createBooking, isCreating } = useCreateBooking();
  const{tours,isLoading}=useTours();
  const {users,isLoading:isLoading2}=useUsers();
  const { updateBooking, isUpdating } = useUpdateBooking();
  const formatDate = (dateInput)=>{
    const cleanedDateString = dateInput.replace(/ ICT/, '');
    const parsedDate = parse(cleanedDateString, 'EEE MMM dd HH:mm:ss yyyy', new Date());
    const formattedDate = format(parsedDate, 'yyyy-MM-dd');
    return formattedDate;
  }
  const {
    handleSubmit,
    reset,
    // formState,
    control,
    setValue,
  } = useForm({
    defaultValues: editBooking !== undefined ? editBooking : {},
  });
  if(editBooking!==undefined)console.log(formatDate(editBooking.startDate))
  const [dateChose,setDateChose]=useState(editBooking!==undefined?formatDate(editBooking.startDate).toString():'');
  const [tourChose,setTourChose]=useState(editBooking!==undefined?editBooking.tour.id:'');
  const [userChose,setUserChose]=useState(editBooking!==undefined?editBooking.user.userId:'');
  const [change,setChange]=useState(false);
  

  const onError = (errors) => {
    toast.error('Form submit fail');
    // console.log(errors);
  };

  
  
 const onSubmit = (data) => {
    const formData = new FormData()
    if(tourChose===''||tourChose==='#'){toast.error('Please choose tour');return}
    if(userChose===''||userChose==='#'){toast.error('Please choose user');return}
    if(dateChose===''||dateChose==='#'){toast.error('Please choose date');return}
    if (editBooking !== undefined) {
      formData.append("id", editBooking.id)
    }
    formData.append('tour',tourChose)
    formData.append('user',userChose)
    formData.append('date',dateChose)
    formData.append('paid',true);
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
  const [datesSelected,setDatesSelected]=useState([])
  // if validation fail, handleSubmit will call the second method we pass in not the first one
  if ( isCreating || isUpdating||isLoading||isLoading2) return <Spinner />; 
 
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={editBooking ? 'regular' : 'modal'}
    >
      <FormRow label="Booking name">
      <Controller
          name="tour"
          control={control}
          rules={{
            validate: (value) =>
              String(value).length > 0 || 'This field is required',
          }}
          render={({ field }) => (
            <Select
              {...field}
              value={tourChose}
              options={Array.from(tours).map(tour=>({label:tour.name,value:tour.id}))}
              text="Choose tour"
              onChange={(e) => {
                const selectedTour = e.target.value;
                field.onChange(selectedTour);
                const filteredDates = [...tours]
                  .filter(tour => tour.id === selectedTour)[0]
                  .startDates.map(date => ({ label: date, value: date }));
                
                setDatesSelected(filteredDates);
                setTourChose(prev=>e.target.value)
                setDateChose(filteredDates[0].value);
                setValue('date', filteredDates[0].value);
                setChange(prev=>true);
              }}
            />
          )}
        />
      </FormRow>

      <FormRow label="User info" >
      <Controller
    name="user"
    control={control}
    rules={{
      validate: (value) => String(value).length > 0 || 'This field is required',
    }}
    render={({ field }) => (
      <Select
        {...field}
        text="Choose user"
        value={userChose}
        options={Array.from([...users].filter(u=>u.role==='USER')).map(user=>({label:user.email,value:user.id}))}
        onChange={(e) => {field.onChange(e.target.value);setUserChose(prev=>e.target.value)}}
      />
    )}
  />
      
      </FormRow>

      <FormRow label="Start date" >
      <Controller
          name="date"
          
          control={control}
          rules={{
            validate: (value) => String(value).length > 0 || 'This field is required',
          }}
          render={({ field }) => (
            <Select
            text="Choose date"
              {...field}
              options={editBooking!==undefined&&!change?[...tours].filter(tour=>tour.id===tourChose)[0].startDates.map(date=>({label:date,value:date})):datesSelected}
              value={(dateChose!==''?dateChose:datesSelected[0])}
              onChange={(e) => {
                const selectedDate = e.target.value;
                field.onChange(selectedDate);
                setDateChose(selectedDate);
              }}
            />
          )}
        />
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