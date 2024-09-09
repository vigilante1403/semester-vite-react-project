import styled from 'styled-components';
import { format, parse } from 'date-fns';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Select from '../../ui/Select';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import Switch from '../../ui/Switch'; // Giả sử bạn có một component Switch

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

  const validatePrice = () => {
    if (priceDiscount === '') setPriceDiscount(0);
    if (price === '') setPrice(0);

    if (parseFloat(price) <= 0 || price === '') {
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

  const { handleSubmit, reset, control, setValue } = useForm({
    defaultValues: editBooking !== undefined ? editBooking : {},
  });
console.log(editBooking);
  const [dateChose, setDateChose] = useState(editBooking ? formatDate(editBooking.startDate) : '');
  const [tourChose, setTourChose] = useState(editBooking ? editBooking.tour.id : '');
  const [userChose, setUserChose] = useState(editBooking ? editBooking.user.id : '');
  const [change, setChange] = useState(false);
  const [price, setPrice] = useState(editBooking ? editBooking.priceOrigin : 0);
  const [priceDiscount, setPriceDiscount] = useState(editBooking ? editBooking.priceDiscount : 0);
  const [isPaid, setIsPaid] = useState( editBooking ? editBooking.paid : true); // Added state for "paid"
  const [datesSelected, setDatesSelected] = useState([]);

  const onError = (errors) => {
    toast.error('Form submit fail');
  };

  const onSubmit = (data) => {
    if (!validatePrice()) return;
    const formData = new FormData();
    if (tourChose === '' || tourChose === '#') {
      toast.error('Please choose tour');
      return;
    }
    if (userChose === '' || userChose === '#') {
      toast.error('Please choose user');
      return;
    }
    if (dateChose === '' || dateChose === '#') {
      toast.error('Please choose date');
      return;
    }
    if (editBooking !== undefined) {
      formData.append('id', editBooking.id);
    }
    formData.append('tour', tourChose);
    formData.append('user', userChose);
    formData.append('date', dateChose);
    formData.append('paid', isPaid);
    formData.append('priceOrigin', price);
    formData.append('priceDiscount', priceDiscount);
    console.log(formData.get('paid'));
    console.log(formData.get('user'));
    console.log(formData.get('tour'));
    console.log(formData.get('priceOrigin'));
    console.log(formData.get('priceDiscount'));
    console.log(formData.get('date'));
   
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
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={editBooking ? 'regular' : 'modal'}>
      <FormRow label="Booking name">
        <Controller
          name="tour"
          control={control}
          rules={{ validate: (value) => String(value).length > 0 || 'This field is required' }}
          render={({ field }) => (
            <Select
              {...field}
              value={tourChose}
              options={tours.map((tour) => ({ label: tour.name, value: tour.id }))}
              text="Choose tour"
              onChange={(e) => {
                const selectedTour = e.target.value;
                field.onChange(selectedTour);
                const filteredDates = tours
                  .filter((tour) => tour.id === selectedTour)[0]
                  .startDates.map((date) => ({ label: date, value: date }));

                setDatesSelected(filteredDates);
                setTourChose(selectedTour);
                setDateChose(filteredDates[0].value);
                setValue('date', filteredDates[0].value);
                setChange(true);
              }}
            />
          )}
        />
      </FormRow>

      <FormRow label="User info">
        {editBooking ? (
          <Input
            value={users.find((user) => user.id === userChose)?.email || 'N/A'}
            readOnly
          />
        ) : (<Controller
          name="user"
          control={control}
          rules={{ validate: (value) => String(value).length > 0 || 'This field is required' }}
          render={({ field }) => (
            <Select
              {...field}
              text="Choose user"
              value={userChose}
              options={users.filter((u) => u.role === 'USER').map((user) => ({ label: user.email, value: user.id }))}
              onChange={(e) => {
                field.onChange(e.target.value);
                setUserChose(prev => e.target.value);
              }}
            />
          )}
        />)}
      </FormRow>

      <FormRow label="Start date">
        <Controller
          name="date"
          control={control}
          rules={{ validate: (value) => String(value).length > 0 || 'This field is required' }}
          render={({ field }) => (
            <Select
              text="Choose date"
              {...field}
              options={editBooking && !change
                ? tours.filter((tour) => tour.id === tourChose)[0].startDates.map((date) => ({ label: date, value: date }))
                : datesSelected}
              value={dateChose !== '' ? dateChose : datesSelected[0]?.value}
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

      <FormRow label="Paid">
        <Switch
          checked={isPaid}
          onChange={(e) => {
            // toast.error(isPaid);
           
            if (editBooking && editBooking.paid) return; // Prevent change if booking is already paid
            setIsPaid(e.target.checked);
            toast.error(isPaid ? 'paid': 'unpaid');
            console.log(isPaid);
          }}
          label={isPaid ? 'paid' : 'unPaid'}
          disabled={editBooking && editBooking.paid} // Disable switch if booking is already paid
        />
      </FormRow>


{/* <FormRow label="Paid">
  <Switch
    checked={isPaid}
    onChange={(e) => {
      // Chỉ cập nhật trạng thái nếu không bị vô hiệu hóa
    
        setIsPaid(e.target.checked);
      
      toast.error( isPaid ? 'paid': 'unpaid');
      console.log(isPaid);
    }}
    label={isPaid ? 'Paid' : 'Unpaid'}
    disabled={false} // Disable switch if booking is already paid
  />
</FormRow> */}

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