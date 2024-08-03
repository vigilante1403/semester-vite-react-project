import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";


// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const{register,formState,getValues,handleSubmit,reset}=useForm()
  const {errors}=formState;

  function handleAddUser({fullName,email,password}){
   
  }
  return (
    <Form onSubmit={handleSubmit(handleAddUser)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input  type="text" id="fullName" {...register('fullName',{
          required:'This field is required'
        })} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input  type="email" id="email"  
          {...register('email',{
          required:'This field is required',pattern:{
            value:/\S+@\S+\.\S+/,
            message:'Please provide a valid email address'
          }
        })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" 

{...register('password',{
          required:'This field is required',minLength:{
            value:8,
            message:"Password needs a minimum of 8 characters length"
          }
        })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm"
         {...register('passwordConfirm',{
          required:'This field is required',
          validate:(value)=>value===getValues().password || 'Passwords need to match confirm password'
        })}
        
         />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={reset}  variation="secondary" type="reset">
          Cancel
        </Button>
        <Button  type="submit">Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
