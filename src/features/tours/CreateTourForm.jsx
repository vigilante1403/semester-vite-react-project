/*eslint-disable*/
import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useCreateTour } from './userCreateTour';
import { useTourGuides } from './useTourGuides';
import { useUpdateTour } from './useUpdateTour';
import Spinner from '../../ui/Spinner';
import { useState } from 'react';
import FormRowVertical from '../../ui/FormRowVertical';
import { geocodeAddress } from '../../utils/helpers';

function CreateTourForm({ onClose, editTour }) {
  const { createTour, isCreating } = useCreateTour();
  const { updateTour, isUpdating } = useUpdateTour();
  const { guides, isLoading } = useTourGuides();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
    setValue,
  } = useForm({
    defaultValues: editTour !== undefined ? editTour : {},
  });
  const { errors } = formState;

  const onError = (errors) => {
    // console.log(errors)
    toast.error('Form submit fail');
    console.log(errors);
  };

  const [inputs, setInputs] = useState(['']);
  const [dates, setDates] = useState(['']);
  const [descriptions, setDescriptions] = useState(['']);
  const [coordinates, setCoordinates] = useState([]);
  const handleInputDateChange = (index, event) => {
    const newInputs = dates.slice();
    newInputs[index] = event.target.value;
    setDates(newInputs);
  };
  const handleInputChange = (index, event) => {
    const newInputs = inputs.slice();
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };
  const handleInputDescriptionsChange = (index, event) => {
    const newInputs = descriptions.slice();
    newInputs[index] = event.target.value;
    setDescriptions(newInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, '']);
    setDescriptions([...descriptions, '']);
    setCoordinates([...coordinates, '']);
  };
  const handleAddDates = () => {
    setDates([...dates, '']);
  };

  const onSubmit = (data) => {
    const imagesElement = document.getElementById('images');
    const formData = new FormData();
    if (editTour !== undefined) {
      formData.append('id', editTour.id);
    }
    console.log(data);
    console.log('-------------------');
    console.log(data.images);
    formData.append('name', data.name);
    formData.append('maxGroupSize', data.maxGroupSize);
    if (typeof data.imageCover === String) {
      formData.append('imageCoverCopy', data.imageCover);
    } else {
      if (data.imageCover === undefined) {
        toast.error('Image cover is empty');
        return;
      }
      if (data.images === undefined || data.images.length === 0) {
        toast.error('Images is empty');
        return;
      }
      formData.append('imageCover', data.imageCover[0]);
    }
    if (imagesElement.files.length === 0) {
      toast.error('Images is empty');
      return;
    }
    // Append each image file to the FormData object
    Array.from(imagesElement.files).forEach((file) => {
      formData.append('images', file);
    });
    // append each coor
    if (coordinates && coordinates.length > 0) {
      Array.from(coordinates).forEach((coor) => {
        formData.append('lats', coor.coor[0]);
        formData.append('lngs', coor.coor[1]);
      });
    } else {
      toast.error('Please set valid address to fetch coordinates');
      return;
    }
    // append each descriptions
    if (descriptions && descriptions.length > 0) {
      Array.from(descriptions).forEach((desc) => {
        formData.append('descriptions', desc);
      });
    } else {
      toast.error('Please set descriptions to all locations');
      return;
    }
    // append each address
    if (inputs && inputs.length > 0) {
      Array.from(inputs).forEach((addr, index) => {
        formData.append('addresses', addr);
        formData.append('days', index + 1);
      });
    } else {
      toast.error('Please set valid addresses ');
      return;
    }
    if (dates && dates.length > 0) {
      Array.from(dates).forEach((date) => {
        formData.append('startDates', date.toString());
      });
    } else {
      toast.error('Please add startDate for tour');
      return;
    }
    formData.append('description', data.description);
    formData.append('summary', data.summary);
    formData.append('price', data.price);
    formData.append('priceDiscount', data.priceDiscount);
    data.guide = data.guide !== undefined ? data.guide : guides[0].value;
    formData.append('guides', data.guide);

    if (editTour !== undefined) {
      updateTour(formData, {
        onSettled: () => {
          reset();
          onClose?.();
        },
      });
    } else {
      createTour(formData, {
        onSettled: () => {
          reset();
          onClose?.();
        },
      });
    }
  };
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const handleFetchCoordinates = async (index) => {
    console.log(inputs[index]);
    if (inputs[index].trim() === '') {
      toast.error('Please put valid address');
      return;
    }
    const { place, index1 } = await geocodeAddress(inputs[index], index);
    if (place) {
      const newInputs = coordinates ? [...coordinates] : []; // Use spread operator to clone the array
      const coor = [place.geometry.lat, place.geometry.lng];
      console.log(coor);
      newInputs[index] = { index1, coor };
      setCoordinates(newInputs);
    }
  };

  // if validation fail, handleSubmit will call the second method we pass in not the first one
  if (isLoading || isCreating || isUpdating) return <Spinner />;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={editTour ? 'regular' : 'modal'}
    >
      <FormRow label="Tour name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxGroupSize?.message}>
        <Input
          type="number"
          id="maxGroupSize"
          {...register('maxGroupSize', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          {...register('price', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.priceDiscount?.message}>
        <Input
          type="number"
          id="priceDiscount"
          {...register('priceDiscount', {
            validate: (value) =>
              Math.abs(value) <= getValues().price ||
              'Discount should be less than regular price',
          })}
          defaultValue={0}
        />
      </FormRow>
      <FormRow label="Summary" error={errors?.summary?.message}>
        <Textarea
          type="number"
          id="summary"
          {...register('summary', {
            required: 'This field is required',
          })}
          defaultValue=""
        />
      </FormRow>
      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          {...register('description', {
            required: 'This field is required',
          })}
          defaultValue=""
        />
      </FormRow>
      <FormRow label="Guide" error={errors?.guide?.message}>
        <Select
          options={guides}
          {...register('guide', {
            validate: (value) =>
              String(value).length > 0 || 'This field is required',
          })}
          value={guides[0].value}
          onChange={(e) => setValue('guide', e.target.value)}
        />
      </FormRow>
      <FormRow label="Tour Photo">
        <FileInput
          id="imageCover"
          accept="image/*"
          {...register('imageCover', {
            required: editTour !== undefined ? false : 'This field is required',
          })}
        />
      </FormRow>
      <FormRow label="Tour Images">
        <FileInput
          id="images"
          accept="image/*"
          multiple
          {...register('images', {
            required: editTour !== undefined ? false : 'This field is required',
          })}
        />
      </FormRow>
      {dates.map((input, index) => (
        <FormRow label={`Date ${index + 1}`}>
          <>
            <Input
              type="date"
              min={getTodayDate()}
              onChange={(event) => handleInputDateChange(index, event)}
              placeholder={`Date ${index + 1}`}
            />
          </>
        </FormRow>
      ))}
      <FormRow>
        <Button type="button" onClick={handleAddDates}>
          + Add Dates
        </Button>
      </FormRow>

      {inputs.map((input, index) => (
        <FormRow label={`Location ${index + 1}`} flex="flex-start">
          <>
            <Input
              type="text"
              value={input}
              onChange={(event) => handleInputChange(index, event)}
              placeholder={`Address ${index + 1}`}
            />
            <Input
              type="text"
              value={descriptions[index]}
              onChange={(event) => handleInputDescriptionsChange(index, event)}
              placeholder={`Description ${index + 1}`}
              //     {...register('descriptions', {
              //   required:  'This field is required',
              // })}
            />
            <Button
              type="button"
              variation="secondary"
              onClick={() => handleFetchCoordinates(index)}
            >
              Fetch loc
            </Button>
            {coordinates[index] && (
              <Input
                type="text"
                value={`[${coordinates[index].coor[0]},${coordinates[index].coor[1]}]`}
                disabled
                style={{ marginLeft: '1rem' }}
              />
            )}
          </>
        </FormRow>
      ))}
      <FormRow>
        <Button type="button" onClick={handleAddInput}>
          + Add Input
        </Button>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit">
          {editTour ? 'Update tour' : 'Add new tour'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateTourForm;
