import styled from 'styled-components';
import { formatDistance, parse, parseISO, format } from 'date-fns';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Select from '../../ui/Select';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';

import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useCreateBooking } from './useCreateBooking';
import { useTours } from '../tours/useTours';
import { useUsers } from '../authentication/useUsers';
import { useUpdateBooking } from './useUpdateBooking';
import Spinner from '../../ui/Spinner';
import { useState } from 'react';

function CreateBookingForm({ onClose, editBooking }) {
  const { createBooking, isCreating } = useCreateBooking();
  const { tours, isLoading } = useTours();
  const { users, isLoading: isLoading2 } = useUsers();
  const { updateBooking, isUpdating } = useUpdateBooking();

  const formatDate = (dateInput) => {
    const cleanedDateString = dateInput.replace(/ ICT/, '');
    const parsedDate = parse(cleanedDateString, 'EEE MMM dd HH:mm:ss yyyy', new Date());
    const formattedDate = format(parsedDate, 'yyyy-MM-dd');
    return formattedDate;
  };
  const validatePrice = (data) => {
    if(priceDiscount==='') {setPriceDiscount(0)}
    if(price==='') {setPrice(0)}

    if (parseFloat(price) <= 0 || price =='') {
      toast.error('Price must be greater than 0');
      return false;
    }
    if (parseFloat(price) > 10000) {
      toast.error('Price must not be greater than 10000');
      return false;
    }
    if (parseFloat(priceDiscount) > parseFloat(price)) {
      toast.error('Discount price cannot be greater than the original price');
      return false;
    }
    return true;
  };

  const {
    handleSubmit,
    reset,
    control,
    setValue,
  } = useForm({
    defaultValues: editBooking !== undefined ? editBooking : {},
  });

  const [dateChose, setDateChose] = useState(editBooking !== undefined ? formatDate(editBooking.startDate).toString() : '');
  const [tourChose, setTourChose] = useState(editBooking !== undefined ? editBooking.tour.id : '');
  const [userChose, setUserChose] = useState(editBooking !== undefined ? editBooking.user.userId : '');
  const [change, setChange] = useState(false);
  const [datesSelected, setDatesSelected] = useState([]);
  const [price, setPrice] = useState(editBooking ? editBooking.priceOrigin : 0);
  const [priceDiscount, setPriceDiscount] = useState(editBooking ? editBooking.priceDiscount : 0);

  const onError = (errors) => {
    toast.error('Form submit fail');
  };
  const onSubmit = (data) => {
    if (!validatePrice()) return;

    const formData = new FormData();
    if (tourChose === '' || tourChose === '#') { toast.error('Please choose tour'); return; }
    if (userChose === '' || userChose === '#') { toast.error('Please choose user'); return; }
    if (dateChose === '' || dateChose === '#') { toast.error('Please choose date'); return; }
    if (editBooking !== undefined) {
      formData.append("id", editBooking.id);
    }
    formData.append('tour', tourChose);
    formData.append('user', userChose);
    formData.append('date', dateChose);
    formData.append('paid', true);
    formData.append('priceOrigin', price);
    formData.append('priceDiscount', priceDiscount);
   
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

  const handleReset = () => {
   
    setPrice(0);
    setPriceDiscount(0);
  };

  if (isCreating || isUpdating || isLoading || isLoading2) return <Spinner />;

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
            validate: (value) => String(value).length > 0 || 'This field is required',
          }}
          render={({ field }) => (
            <Select
              {...field}
              value={tourChose}
              options={Array.from(tours).map(tour => ({ label: tour.name, value: tour.id }))}
              text="Choose tour"
              onChange={(e) => {
                const selectedTour = e.target.value;
                field.onChange(selectedTour);
                const selectedTourDetails = tours.find(tour => tour.id === selectedTour);
                const filteredDates = selectedTourDetails.startDates.map(date => ({ label: date, value: date }));
                
                setDatesSelected(filteredDates);
                setTourChose(selectedTour);
                setDateChose(filteredDates[0].value);
                setPrice(selectedTourDetails.price);
                setPriceDiscount(selectedTourDetails.priceDiscount);
                setValue('date', filteredDates[0].value);
                setChange(true);
              }}
            />
          )}
        />
      </FormRow>

      <FormRow label="User info">
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
              options={Array.from(users.filter(u => u.role === 'USER')).map(user => ({ label: user.email, value: user.id }))}
              onChange={(e) => {
                field.onChange(e.target.value);
                setUserChose(e.target.value);
              }}
            />
          )}
        />
      </FormRow>

      <FormRow label="Start date">
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
              options={editBooking !== undefined && !change ? tours.find(tour => tour.id === tourChose)?.startDates.map(date => ({ label: date, value: date })) : datesSelected}
              value={dateChose}
              onChange={(e) => {
                const selectedDate = e.target.value;
                field.onChange(selectedDate);
                setDateChose(selectedDate);
              }}
            />
          )}
        />
      </FormRow>

      <FormRow label="Price">
        <Input
          type="number"
          value={price}
          step="0.01"
          readOnly={editBooking === undefined}
          onChange={(e) => setPrice(e.target.value)}
        />
      </FormRow>

      <FormRow label="Discount Price">
        <Input
          type="number"
          value={priceDiscount}
          step="0.01"
          readOnly={editBooking === undefined}
          onChange={(e) => setPriceDiscount(e.target.value)}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={handleReset}>
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
