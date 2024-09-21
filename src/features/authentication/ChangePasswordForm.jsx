import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useChangePassword } from "./useChangePassword";

function ChangePasswordForm({onClose, email}) {
const {changePass,isChanging} = useChangePassword();
  const { register, formState, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const { errors } = formState;

  const handleChangePassword = (data) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("newPassword", data.newPassword);
    formData.append("confirmNewPassword", data.confirmNewPassword);
    formData.append("currentPassword", data.currentPassword);
    
    console.log(data);
    changePass(formData, {
        onSettled: () => {
          reset();
          onClose?.();
        }
      })
   
  };

  return (
    <Form onSubmit={handleSubmit(handleChangePassword)}>
      {/* Current Password */}
      <FormRow label="Current Password" error={errors?.currentPassword?.message}>
        <Input
          type="password"
          id="currentPassword"
          {...register("currentPassword", {
            required: "This field is required",
            minLength: {
              value: 5,
              message: "Password needs a minimum of 5 characters length",
            },
          })}
        />
      </FormRow>

      {/* New Password */}
      <FormRow label="New Password" error={errors?.newPassword?.message}>
        <Input
          type="password"
          id="newPassword"
          {...register("newPassword", {
            required: "This field is required",
            minLength: {
              value: 5,
              message: "Password needs a minimum of 5 characters length",
            },
            validate: {
              notSameAsOld: (value) =>
                value !== getValues("currentPassword") ||
                "New password cannot be the same as the current password",
            },
          })}
        />
      </FormRow>

      {/* Confirm New Password */}
      <FormRow label="Confirm New Password" error={errors?.confirmNewPassword?.message}>
        <Input
          type="password"
          id="confirmNewPassword"
          {...register("confirmNewPassword", {
            required: "This field is required",
            validate: (value) =>
              value === getValues("newPassword") || "Passwords need to match",
          })}
        />
      </FormRow>

      {/* Buttons */}
      <FormRow>
        <Button onClick={reset} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit">Change Password</Button>
      </FormRow>
    </Form>
  );
}

export default ChangePasswordForm;