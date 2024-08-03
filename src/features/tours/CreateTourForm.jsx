/*eslint-disable*/
import styled from 'styled-components'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'


function CreateTourForm() {



  const { register, handleSubmit, reset, getValues, formState } = useForm({
   })
  const { errors } = formState

  // const queryClient = useQueryClient()
  // const { mutate, isLoading } = useMutation({
  //   mutationFn:({newCabin,id})=> createEditCabin({newCabin,id}),
  //   onError: (err) => toast.error(err.message),
  //   onSuccess: () => {
  //     if(isEditSession){
  //       toast.success('Cabin updated')
  //     }else{
  //       toast.success('New cabin created')
  //     }

  //     queryClient.invalidateQueries({
  //       queryKey: ['cabin'],
  //     })
  //     reset()
  //     if(isEditSession)setShowForm(false)
  //   },
  // })
  const onError = (errors) => {
    // console.log(errors)
  }
  const onSubmit = (data) => {
   
    reset()
  } // if validation fail, handleSubmit will call the second method we pass in not the first one
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type='modal'>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
          
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
         
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
       
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          {...register('discount', {
            validate: (value) =>
              Math.abs(value) <= getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
       
          defaultValue={0}
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

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required:  'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" >
          Cancel
        </Button>
        <Button type="submit" >
         Add new tour
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateTourForm
