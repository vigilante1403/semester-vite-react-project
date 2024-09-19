import { Controller, useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useEffect, useState } from 'react';
import useCountries from '../tours/useCountries';
import Select from '../../ui/Select';
import Spinner from '../../ui/Spinner';
import { Box, Typography } from '@mui/material';
import fetchFileFromUrl from '../../services/useFetchFileFromUrl';
import toast from 'react-hot-toast';
import { useUpdateUser } from './useUpdateUser';

// Email regex: /\S+@\S+\.\S+/

function EditProfileForm({ user }) {
  const { updateUser, isUpdating } = useUpdateUser();
  const { countries, isLoading } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState(
    user ? user.nationality : null
  );
  const [nationalId, setNationalID] = useState(user ? user.nationalID : null);
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      photo: user.photo || '',
      fullName: user.fullName || '',
      nationality: user.nationality || '',
      nationalID: user.nationalID || '',
    },
  });
  const { errors } = formState;
  const [photoPreview, setPhotoPreview] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  useEffect(() => {
    if (user && user.photo) {
      console.log('fetch');
      fetchFileFromUrl('user', user.photo).then((file) =>
        setCurrentPhoto(file)
      );
    }
  }, [user]);

  const handleChangeInfo = (data) => {
    console.log(data);
    const country = countries.find((c) => c.name.common === selectedCountry);
    const formData = new FormData();
    formData.append('id', user.id);
    formData.append('name', data.name);
    formData.append('fullName', data.fullName);
    formData.append('nationality', data.nationality);
    formData.append('nationalID', data.nationalID);

    formData.append('role', user.role);
    formData.append('enable', user.enable);
    if (country) {
      // const nationalId = `${country.ccn3}${Math.floor(100000000 + Math.random() * 900000000)}`

      // formData.append("nationality", country.name.common)
      formData.append('countryFlag', country.flags.svg);
    }
    const photoFile = data.photo?.[0] || currentPhoto;

    if (!photoFile) {
      toast.error('Photo is empty');
      return;
    } else {
      if (photoFile === 'u') {
        toast.error("Can't load your photo");
        return;
      }
      formData.append('photo', photoFile);
      if (user !== undefined) {
        updateUser(formData, {
          onSettled: () => {
            reset();
          },
        });
      }
    }

    // Gọi API cập nhật thông tin ở đây...
  };
  const handleReset = () => {
    setPhotoPreview(null);
    setCurrentPhoto(null);
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(handleChangeInfo)}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
        {photoPreview ? (
          <img
            src={photoPreview}
            alt="Profile Preview"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
          />
        ) : (
          user &&
          currentPhoto && (
            <img
              src={URL.createObjectURL(currentPhoto)}
              alt="current user"
              width={100}
            />
          )
        )}
      </Box>
      <FormRow label="Profile Photo">
        <Input
          type="file"
          id="photo"
          accept="image/*"
          {...register('photo')}
          onChange={handlePhotoChange}
        />
      </FormRow>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      {/* Full Name */}
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register('fullName', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      {/* Nationality */}
      <FormRow label="Nationality">
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
                setNationalID(
                  `${
                    countries.find((c) => c.name.common === selected)?.ccn3
                  }${Math.floor(100000000 + Math.random() * 900000000)}`
                );
              }}
            />
          )}
        />
      </FormRow>

      {/* National ID */}
      <FormRow
        label="National ID (Optional)"
        error={errors?.nationalID?.message}
      >
        <Input
          disabled={true}
          type="text"
          id="nationalID"
          {...register('nationalID')}
          value={nationalId}
        />
      </FormRow>
      {selectedCountry && countries && (
        <FormRow>
          <img
            src={countries.find(c => c.name.common === selectedCountry)?.flags.svg}
            alt="Country flag"
            width={50}
          />
          <Typography variant="h5">
            {countries.find(c => c.name.common === selectedCountry)?.region}
          </Typography>
        </FormRow>
      )}

      {/* Buttons */}
      <FormRow>
      <Button onClick={() => {reset(); handleReset()}} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit">Update Profile</Button>
      </FormRow>
    </Form>
  );
}

export default EditProfileForm;
