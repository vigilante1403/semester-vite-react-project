import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from '../../ui/SpinnerMini'
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login,isLoading}=useLogin()
  function handleSubmit(e) {
    console.log(email, password)
    e.preventDefault();
    if(!email||!password) return;
    const formData = new FormData()
    formData.append("email",email)
    formData.append("password",password)
    login(formData,{
      onSettled:()=>{
        setEmail('');
        setPassword('')
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" type='submit' disabled={isLoading}>{!isLoading?'Log in':<SpinnerMini />}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;