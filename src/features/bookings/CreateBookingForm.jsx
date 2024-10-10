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
import { useGetAllStartDates } from '../../features-user/tours/useBookTour';
import { convertToReadableDateTimeFromISOTimestamp } from '../../utils/helpers';

function CreateBookingForm({ onClose, editBooking,fixed=false,fixedStart=null }) {
  const { createBooking, isCreating } = useCreateBooking();
  const { tours, isLoading } = useTours();
  const { users, isLoading: isLoading2 } = useUsers();
  const { updateBooking, isUpdating } = useUpdateBooking();
  const { startDates, isLoading: isLoading3 } = useGetAllStartDates();

  const formatDate = (dateInput) => {
    const cleanedDateString = dateInput.replace(/ ICT/, '');
    const parsedDate = parse(
      cleanedDateString,
      'EEE MMM dd HH:mm:ss yyyy',
      new Date()
    );
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
  const [dateChose, setDateChose] = useState(
    editBooking ? formatDate(editBooking.startDate) : ''
  );

  const [tourChose, setTourChose] = useState(
    editBooking ? editBooking.tour.id : ''
  );
  const [userChose, setUserChose] = useState(
    editBooking ? editBooking.user.id : ''
  );
  const [keyChose, setKeyChose] = useState(
    editBooking && editBooking.startDateId != null
      ? editBooking.startDateId
      : ''
  );
  const [change, setChange] = useState(false);
  const [price, setPrice] = useState(editBooking ? editBooking.priceOrigin : 0);
  const [priceDiscount, setPriceDiscount] = useState(
    editBooking ? editBooking.priceDiscount : 0
  );
  const [isPaid, setIsPaid] = useState(editBooking ? editBooking.paid : true); // Added state for "paid"
  const [datesSelected, setDatesSelected] = useState([]);
  const [keys, setKeys] = useState([]);
  const [numJoin, setNumJoin] = useState(editBooking ? editBooking.numJoin : 1);
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
    if (!fixed&&(dateChose === '' || dateChose === '#')) {
      toast.error('Please choose date');
      return;
    }
    if (editBooking !== undefined) {
      formData.append('id', editBooking.id);
    }
    // handle key
    if (keyChose === '') {
      toast.error('Please choose valid date of tour');
      return;
    } else {
      formData.append('startDateId',keyChose)
    }

    console.log(keys);
    formData.append('tour', tourChose);
    formData.append('user', userChose);
    formData.append('date',!fixed? dateChose:formatDate(fixedStart).toString());
    formData.append('paid', isPaid);
    formData.append('priceOrigin', price);
    formData.append('priceDiscount', priceDiscount);
    formData.append('numJoin', numJoin);
    // console.log(formData.get('paid'));
    // console.log(formData.get('user'));
    // console.log(formData.get('tour'));
    // console.log(formData.get('priceOrigin'));
    // console.log(formData.get('priceDiscount'));
    // console.log(formData.get('date'));

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
  const handleChangeNumJoin = (e) => {
    var p;
    if (e.target.value > 0) {
      p = e.target.value;
      setNumJoin(e.target.value);
    } else {
      p = 1;
      setNumJoin(1);
    }
    if (tourChose !== '') {
      const tour = tours.filter((el) => el.id === tourChose)[0] || null;
      if (tour != null) {
        setPrice(tour.price);
        setPriceDiscount(tour.priceDiscount);
      }
    }
    setPrice((price) => price * p);
    setPriceDiscount((discount) => discount * p);
  };
  if (isCreating || isUpdating || isLoading || isLoading2 || isLoading3)
    return <Spinner />;
  let optionsStartDates = startDates;
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
              options={tours.map((tour) => ({
                label: tour.name,
                value: tour.id,
              }))}
              text="Choose tour"
              onChange={(e) => {
                const selectedTour = e.target.value;
                field.onChange(selectedTour);
                const filteredDates = [...startDates]
                  .filter((startDate) => startDate.tourId === e.target.value)
                  .map((date) => ({ label: date.startDate, value: date.id }));
                //  tours
                //   .filter((tour) => tour.id === selectedTour)[0]
                //   .startDates.map((date) => ({ label: date, value: date }));
                setKeys((prev) => filteredDates);
                setKeyChose(filteredDates[0].value);
                setDatesSelected((prev) =>
                  [...startDates]
                    .filter((startDate) => startDate.tourId === e.target.value)
                    .map((date) => ({ label: date.startDate, value: date.id }))
                );
                setTourChose(selectedTour);
                const tour =
                  tours.filter((el) => el.id === selectedTour)[0] || null;
                if (tour != null) {
                  setPrice(tour.price * numJoin);
                  setPriceDiscount(tour.priceDiscount * numJoin);
                }
                setDateChose(filteredDates[0].label);
                setValue('date', filteredDates[0].label);
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
        ) : (
          <Controller
            name="user"
            control={control}
            rules={{
              validate: (value) =>
                String(value).length > 0 || 'This field is required',
            }}
            render={({ field }) => (
              <Select
                {...field}
                text="Choose user"
                value={userChose}
                options={users
                  .filter((u) => u.role === 'USER')
                  .map((user) => ({ label: user.email, value: user.id }))}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setUserChose((prev) => e.target.value);
                }}
              />
            )}
          />
        )}
      </FormRow>
      <FormRow label="Total people joining">
        <Input
          type="number"
          value={numJoin}
          onChange={handleChangeNumJoin}
          defaultValue={1}
          min={1}
        />
      </FormRow>
      {fixed&&<FormRow label="Start date">
        <p>{formatDate(fixedStart)}</p>
      </FormRow>}
      
      {!fixed&&<FormRow label="Start date">
      
        <Controller
          name="date"
          control={control}
          rules={{
            validate: (value) =>
              String(value).length > 0 || 'This field is required',
          }}
          render={({ field }) => (
            <Select
              text="Choose date"
              {...field}
              options={
                editBooking && !change
                  ? [...startDates]
                      .filter((start) => start.tourId === editBooking.tour.id)
                      .map((date) => ({
                        label: date.startDate,
                        value: date.id,
                      }))
                  : // tours
                    //     .filter((tour) => tour.id === tourChose)[0]
                    //     .startDates.map((date) => ({ label: date, value: date }))
                    datesSelected
              }
              value={dateChose !== '' ? dateChose : datesSelected[0]?.value}
              onChange={(e) => {
                const selectedDate = e.target.value;
                field.onChange(selectedDate);
                const selected = keys.filter(
                  (key) => key.value === e.target.value
                )[0];
                setDateChose(selected.label);
                setKeyChose(selected.value);
              }}
            />
          )}
        />
      </FormRow>}

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
            if (editBooking && editBooking.paid) return; // Prevent change if booking is already paid
            setIsPaid(e.target.checked);
            // toast.error(isPaid ? 'paid' : 'unpaid');
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
