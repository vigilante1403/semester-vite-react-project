import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useLogin } from './useLogin';
import styled from 'styled-components';
import Logo from '../../ui/Logo';


function LoginForm({ onClose }) {
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
        onClose(); // Close the modal after successful login
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
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ style: { fontSize: '1.5rem' } }}
        InputProps={{ style: { fontSize: '1.5rem' } }}
        error={email.trim() === '' && validate}
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
        onClick={() => setValidate((prev) => true)}
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
    </Box>
  );
}

export default LoginForm;