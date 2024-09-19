import { Controller, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useEffect, useState } from "react";
import useCountries from "../tours/useCountries";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";

// Email regex: /\S+@\S+\.\S+/

function EditProfileForm({ user }) {
  const { countries, isLoading } = useCountries()
  const [selectedCountry, setSelectedCountry] = useState(user ? user.nationality : null)
  const { register, formState, handleSubmit, reset,control } = useForm({
    defaultValues: {
      photo: user.photo || "",
      fullName: user.fullName || "",
      nationality: user.nationality || "",
      nationalID: user.nationalID || "",
    },
  });
  const { errors } = formState;
  const [photoPreview, setPhotoPreview] = useState(user.photo || "");


  const handleChangeInfo = (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("fullName", data.fullName);
    formData.append("nationality", data.nationality);
    formData.append("nationalID", data.nationalID);
    if (data.photo[0]) {
      formData.append("photo", data.photo[0]);
    }

    // Gọi API cập nhật thông tin ở đây...
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
  if(isLoading) return <Spinner/>;
  return (
    <Form onSubmit={handleSubmit(handleChangeInfo)}>
      {/* Name */}
      

      {/* Photo */}
      <FormRow label="Profile Photo">
        <Input
          type="file"
          id="photo"
          accept="image/*"
          {...register("photo")}
          onChange={handlePhotoChange}
        />
       
      </FormRow>
      <FormRow>
        {photoPreview!=null && (
          <img
            src={photoPreview}
            alt="empty"
            style={{ width: "100px", height: "100px", marginTop: "10px", borderRadius: "50%" }}
          />
        )}
      </FormRow>

      {/* Full Name */}
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
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
                const country = countries.find(c => c.name.common === selected);
                // setNationalID( `${countries.find(c => c.name.common === selected)?.ccn3}${Math.floor(100000000 + Math.random() * 900000000)}`);
              }}
            />
          )}
        />
      </FormRow>

      {/* National ID */}
      <FormRow label="National ID (Optional)" error={errors?.nationalID?.message}>
        <Input
        disabled={true}
          type="text"
          id="nationalID"
          {...register("nationalID")}
        />
      </FormRow>

      {/* Buttons */}
      <FormRow>
        <Button onClick={reset} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit">Update Profile</Button>
      </FormRow>
    </Form>
  );
}

export default EditProfileForm;