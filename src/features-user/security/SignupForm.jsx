import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Logo from '../../ui/Logo';
import { useSignup } from './useSignup';


function SignupForm({ onSwitch, onClose }) {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp, isLoading } = useSignup()
  const [validate, setValidate] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    if (!email || !password || !name || !confirmPassword) return;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);


    signUp(formData, {
      onSettled: () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('')
        setName('');
        onClose();
      },
    });
  }

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: '28vw' }}>
      <Logo />
      <Typography sx={{ fontWeight: 700, fontSize: '1.6rem' }}>
        Signup new account
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Display Name"
        name="name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputLabelProps={{ style: { fontSize: '1.5rem' } }}
        InputProps={{ style: { fontSize: '1.5rem' } }}
        error={name.trim() === '' && validate}
        helperText={(name.trim() === '') && validate ? "Display name is required" : ""}
        FormHelperTextProps={{
          style: { fontSize: '1rem', color: 'red' }
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        typr="email"
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
          style: { fontSize: '1rem', color: 'red' }
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
          style: { fontSize: '1rem', color: 'red' }
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputLabelProps={{ style: { fontSize: '1.5rem' } }}
        InputProps={{ style: { fontSize: '1.5rem' } }}
        error={(confirmPassword.trim() === '' && validate) || (confirmPassword !== password && validate)}
        helperText={password !== confirmPassword && validate ? "Password do not match" : ""}
        FormHelperTextProps={{
          style: { fontSize: '1rem' }
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
          ':hover': {
            'backgroundColor': '#e0f2fe',
            'color': '#1f2937'
          }
        }}

        disabled={isLoading}
        onClick={() => setValidate((prev) => true)}
      >
        {isLoading ? 'Signing up...' : 'Signup'}
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
        onClick={onClose}
      >
        Cancel
      </Button>

      <Button
        fullWidth
        variant="text"
        sx={{ mt: 2, fontSize: '1.2rem' }}
        onClick={onSwitch}
      >
        Already have an account? Log in
      </Button>
    </Box>
  );
}

export default SignupForm;