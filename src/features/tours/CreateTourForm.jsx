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

function CreateTourForm({ onClose, editTour }) {
  const { createTour, isCreating } = useCreateTour();
  const { updateTour, isUpdating } = useUpdateTour();
  const { guides, isLoading } = useTourGuides();
  

 

  const { register, handleSubmit, reset, getValues, formState,setValue } = useForm({
    defaultValues: editTour !== undefined ? editTour : {},
  });
  const { errors } = formState;
  

  const onError = (errors) => {
    // console.log(errors)
    toast.error('Form submit fail');
    console.log(errors);
  };
  const onSubmit = (data) => {
    const imagesElement = document.getElementById('images');
    const formData = new FormData();
    if (editTour !== undefined) {
      formData.append('id', editTour.id);
    }
    console.log(data)
    console.log("-------------------")
    console.log(data.images)
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
  Array.from(imagesElement.files).forEach(file => {
      formData.append('images', file);
  });
    formData.append('description', data.description);
    formData.append('summary', data.summary);
    formData.append('price', data.price);
    formData.append('priceDiscount', data.priceDiscount);
    data.guide=data.guide!==undefined?data.guide:guides[0].value
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
  }; // if validation fail, handleSubmit will call the second method we pass in not the first one
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
          onChange={(e)=>setValue('guide',e.target.value)}
        />
      </FormRow>
      <FormRow label="Tour Photo">
        <FileInput
          id="imageCover"
          accept="image/*"
          {...register('imageCover', {
            required: editTour !== undefined?false: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow label="Tour Images">
        <FileInput
          id="images"
          accept="image/*"
          multiple
          {...register('images', {
            required: editTour !== undefined?false: 'This field is required',
          })}
        />
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
