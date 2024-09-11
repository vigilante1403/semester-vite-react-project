/* eslint-disable react/prop-types */
import styled from 'styled-components'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Select from '../../ui/Select'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useCreateUser } from './useCreateUser'
import { useUpdate } from './useUpdateUser'
import Spinner from '../../ui/Spinner'
import { useEffect, useState } from 'react'
import useCountries from '../tours/useCountries'
import { Typography } from '@mui/material'
import fetchFileFromUrl from '../../services/useFetchFileFromUrl'
import { roles } from '../../utils/constants'



function CreateUserForm({ onClose, editUser }) {
  const { createUser, isCreating } = useCreateUser()
  const { updateUser, isUpdating } = useUpdate()
  const { countries, isLoading } = useCountries()
  const [selectedCountry, setSelectedCountry] = useState(editUser ? editUser.nationality : null)
  const [currentPhoto, setCurrentPhoto] = useState(null);
 console.log(editUser.photo)
  useEffect(() => {
    if (editUser && editUser.photo) {
      fetchFileFromUrl("user",editUser.photo).then(file => setCurrentPhoto(file));
    }
  }, [editUser]);
  const { register, handleSubmit, reset, setValue, formState, control } = useForm({
    defaultValues: {
      name: editUser?.name || '',
      fullName: editUser?.fullName || '',
      email: editUser?.email || '',
      password: editUser?.password || '',
      role: editUser?.role || 'USER', 
      enable: editUser?.enable || false,
      photo: null,
      nationalId: editUser?.nationalId || '',
      nationality: editUser?.nationality || '',
      countryFlag: editUser?.countryFlag || ''
    }
  })
  console.log(currentPhoto)

  const { errors } = formState

  const onError = (errors) => {
    toast.error('Form submit failed')
    console.log(errors)
  }

  const onSubmit = (data) => {
    const formData = new FormData()
    if (editUser !== undefined) {
      formData.append("id", editUser.id)
    }
    formData.append("name", data.name)
    formData.append("fullName", data.fullName)
    formData.append("role", data.role)
    formData.append("enable", data.enable)
    formData.append("email", data.email || "")
    formData.append("password", data.password || "")

    const photoFile = data.photo?.[0] || currentPhoto;
    console.log(photoFile);
    if (!photoFile) {
      toast.error('Photo is empty');
      return;
    }
    formData.append("photo", photoFile);
    
    if (!selectedCountry || selectedCountry === '' || selectedCountry == null || selectedCountry === undefined) {
      toast.error('Country is empty')
      return
    }
    const country = countries.find(c => c.name.common === selectedCountry)
    if (country) {
      const nationalId = `${country.ccn3}${Math.floor(100000000 + Math.random() * 900000000)}`
      formData.append("nationalID", nationalId)
      formData.append("nationality", country.name.common)
      formData.append("countryFlag", country.flags.svg)
    }
    console.log('name:', formData.get('name'));
    console.log('fullName:', formData.get('fullName'));
    console.log('role:', formData.get('role'));
    console.log('enable:', formData.get('enable'));
    console.log('email:', formData.get('email'));
    console.log('password:', formData.get('password'));
    console.log('photo:', formData.get('photo')); // This will log the File object
    console.log('nationalID:', formData.get('nationalID'));
    console.log('nationality:', formData.get('nationality'));
    console.log('countryFlag:', formData.get('countryFlag'));
  
    if (editUser !== undefined) {
      updateUser(formData, {
        onSettled: () => {
          reset()
          onClose?.()
        }
      })
    } else {
      createUser(formData, {
        onSettled: () => {
          reset()
          onClose?.()
        }
      })
    }
  }

  if (isCreating || isUpdating || isLoading) return <Spinner />

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={editUser ? 'regular' : 'modal'}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register('fullName', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      {!editUser && (
        <>
          <FormRow label="Email" error={errors?.email?.message}>
            <Input
              type="email"
              id="email"
              {...register('email', {
                required: 'This field is required',
              })}
            />
          </FormRow>

          <FormRow label="Password" error={errors?.password?.message}>
            <Input
              type="password"
              id="password"
              {...register('password', {
                required: 'This field is required',
              })}
            />
          </FormRow>
        </>
      )}

      <FormRow label="Role" error={errors?.role?.message}>
        {editUser && editUser.role === 'USER' ? (
          <Input
            type="text"
            id="role"
            value="USER"
            readOnly
            disabled
          />
        ) : (
          <Select
            options={editUser ? roles.filter(role => role.value !== 'USER') : roles}
            {...register('role', {
              required: 'This field is required',
            })}
            onChange={(e) => setValue('role', e.target.value)}
            defaultValue={editUser?.role || 'USER'} // Ensure default value is set
          />
        )}
      </FormRow>

      {editUser && (
        <FormRow label="Enable" error={errors?.enable?.message}>
          <Input
            type="checkbox"
            id="enable"
            {...register('enable')}
          />
        </FormRow>
      )}

      <FormRow label="Photo">
        <FileInput
          id="photo"
          accept="image/*"
          {...register('photo')}
          onChange={(e) => setCurrentPhoto(e.target.files[0])}
        />
         
      </FormRow>
      {editUser && currentPhoto && (
          <img src={URL.createObjectURL(currentPhoto)} alt="current user image" width={100} />
        )}
      <FormRow label="Country">
        <Controller
          name="nationality"
          control={control}
          rules={{
            validate: (value) =>
              String(value).length > 0 || 'This field is required',
          }}
          render={({ field }) => (
            <Select
              {...field}
              value={selectedCountry}
              options={Array.from(countries).map((c) => ({
                label: c.name.common,
                value: c.name.common,
              }))}
              text="Choose country"
              onChange={(e) => {
                const selected = e.target.value;
                field.onChange(selected);
                setSelectedCountry(selected);
              }}
            />
          )}
        />
      </FormRow>

      {selectedCountry && countries && (
        <FormRow>
          <img
            src={countries.find(c => c.name.common === selectedCountry)?.flags.svg}
            alt="Country flag"
            width={50}
          />
          <Typography variant="body1">
            {countries.find(c => c.name.common === selectedCountry)?.region}
          </Typography>
        </FormRow>
      )}

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit">
          {editUser ? 'Update User' : 'Add new user'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateUserForm