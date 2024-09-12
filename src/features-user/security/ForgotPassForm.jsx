import { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Logo from '../../ui/Logo';
import { useForgotPassword } from './useForgotPassword';
import LoadingButton from '@mui/lab/LoadingButton';

function ForgotPassForm({ onClose, onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [validate, setValidate] = useState(false);
  
  const { forgotPass } = useForgotPassword();

  function onSubmit(e) {
    e.preventDefault(); 

    if (!email) {
      setValidate(true); 
      return;
    }
  
    const formData = new FormData();
    formData.append('email', email);

   
      forgotPass(formData, {
        onSettled: () => {
          setEmail('');
        }
      }); 

   
  }


  return (
    <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: '28vw' }}>
      <Logo />
      <Typography sx={{ fontWeight: 700, fontSize: '1.6rem' }}>
        Forgot your password?
      </Typography>
      <Typography sx={{ mb: 2, fontSize: '1.2rem' }}>
        Enter your email address to receive a password reset link.
      </Typography>
      <TextField
        margin="normal"
        type="email"
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
      <LoadingButton
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
            backgroundColor: '#e0f2fe',
            color: '#1f2937',
          },
        }}
        onClick={() => setValidate(true)} 
        
      >
        Send Reset Link
      </LoadingButton>
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
        onClick={onBackToLogin} 
      >
        Back to Login
      </Button>
    </Box>
  );
}

export default ForgotPassForm;
