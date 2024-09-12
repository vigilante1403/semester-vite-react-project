import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordSuccess() {
  const navigate = useNavigate();

  function handleGoHome() {
    navigate('/'); 
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f4f8', 
        padding: '2rem',
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: '2rem', mb: 2 }}>
        Password Reset Successful!
      </Typography>
      <Typography sx={{ fontSize: '1.2rem', mb: 4 }}>
        Your password has been reset. You can now log in with your new password.
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#dcfce7',
          color: '#1f2937',
          fontSize: '1.5rem',
          ':hover': {
            backgroundColor: '#e0f2fe',
            color: '#1f2937',
          },
        }}
        onClick={handleGoHome}
      >
        Go to Homepage
      </Button>
    </Box>
  );
}
