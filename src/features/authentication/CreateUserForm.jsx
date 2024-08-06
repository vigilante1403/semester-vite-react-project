/* eslint-disable react/prop-types */
import styled from 'styled-components'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Select from '../../ui/Select'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useCreateUser } from './useCreateUser'
import { useUpdate } from './useUpdateUser'
import Spinner from '../../ui/Spinner'
import { useState } from 'react'

const roles = [
  { label: 'GUIDE', value: 'GUIDE' },
  { label: 'LEADGUIDE', value: 'LEADGUIDE' },
  { label: 'USER', value: 'USER' },
]

function CreateUserForm({ onClose, editUser }) {
  const { createUser, isCreating } = useCreateUser()
  const { updateUser, isUpdating } = useUpdate()

  const { register, handleSubmit, reset, setValue, formState } = useForm({
    defaultValues: {
      name: editUser?.name || '',
      email: editUser?.email || '',
      password: editUser?.password || '',
      role: editUser?.role || 'USER', // Default to 'USER'
      enable: editUser?.enable || false,
      photo: editUser?.photo || null,
    }
  })

  const { errors } = formState

  const onError = (errors) => {
    console.log(errors)
  }

  const onSubmit = (data) => {
    const formData = new FormData()
    if (editUser !== undefined) {
      formData.append("id", editUser.id)
    }
    formData.append("name", data.name)
    formData.append("role", data.role)
    formData.append("enable", data.enable)
    formData.append("email", data.email || "")
    formData.append("password", data.password || "")

    if (!data.photo?.[0]) {
      toast.error('Photo is empty')
      return
    }
    formData.append("photo", data.photo[0])

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

  if (isCreating || isUpdating) return <Spinner />

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
        />
      </FormRow>

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
