import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useLogin } from './useLogin';
import styled from 'styled-components';
import Logo from '../../ui/Logo';


function LoginForm({ onClose , onSwitch, onSwitchForgotPass}) {
  // Receive onClose as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useLogin();
  const [validate, setValidate] = useState(false);

  function onSubmit(e) {
    e.preventDefault(); // Prevent the default form submission
    if (!email || !password) return;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('type', 'USER');

    login(formData, {
      onSettled: () => {
        setEmail('');
        setPassword('');
         // Close the modal after successful login
      },
    });
  }

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: '28vw' }}>
      <Logo />
      <Typography sx={{ fontWeight: 700, fontSize: '1.6rem' }}>
        Log into your account
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        type="email"
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ style: { fontSize: '1.5rem' } }}
        InputProps={{ style: { fontSize: '1.5rem' } }}
        error={email.trim() === '' && validate}
        helperText={(email.trim() === '') && validate ? "Email is required" : ""}
        FormHelperTextProps={{   
          style: { fontSize: '1rem',color: 'red' }
        }}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{ style: { fontSize: '1.5rem' } }}
        InputProps={{ style: { fontSize: '1.5rem' } }}
        error={password.trim() === '' && validate}
        helperText={(password.trim() === '' || password.length < 5) && validate ? "Password must be at least 5 characters long" : ""}
        FormHelperTextProps={{   
          style: { fontSize: '1rem',color: 'red' }
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: '#dcfce7',
          color: '#1f2937',
          fontSize: '1.5rem',
          ':hover':{
            'backgroundColor':'#e0f2fe',
            'color':'#1f2937'
          }
        }}
        
        disabled={isLoading}
        onClick={() => setValidate(true)}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
      <Button
        fullWidth
        variant="outlined"
        sx={{
          mt: 1,
          borderColor: '#00CC33',
          color: '#00CC33',
          fontSize: '1.5rem',
        }}
        onClick={onClose} // Allow manual closing of the modal
      >
        Cancel
      </Button>
      {/* Nút chuyển đổi sang Sign Up */}
      <Button
        fullWidth
        variant="text"
        sx={{ mt: 2, fontSize: '1.2rem' }}
        onClick={onSwitch} // Chuyển đổi sang form đăng ký
      >
        Don't have an account? Sign Up
      </Button>
      <Button
      fullWidth
          variant="text"
          sx={{ fontSize: '1.2rem' }}
          onClick={onSwitchForgotPass} // Gọi hàm xử lý khi nhấn "Quên mật khẩu"
        >
          Forgot Password?
        </Button>
    </Box>
  );
}

export default LoginForm;