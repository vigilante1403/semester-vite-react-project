import { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useConfirmForgotPassword } from '../../features-user/security/useForgotPassword';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

export default function ResetPasswordPage({ onReset, onCancel }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validate, setValidate] = useState(false);
  const { confirmForgotPass } = useConfirmForgotPassword();
  const navigate = useNavigate();
  const { email, token } = useParams();

  function handleReset(e) {
    e.preventDefault(); 
    if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
      setValidate(true);
      return;
    }
    const formData = new FormData();
    formData.append('email', email); 
    formData.append('token', token); 
    formData.append('newPasswordReset', newPassword);
   
    console.log('Password reset to:', newPassword);

    confirmForgotPass(formData, {
      onSettled: () => {
        setNewPassword('');
        setConfirmPassword('');

      },
    });


  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        backgroundColor: '#f0f4f8', 
      }}
    >
      <Box
        component="form"
        onSubmit={handleReset}
        sx={{
          maxWidth: '28vw',
          backgroundColor: 'white', 
          padding: '2rem',
          borderRadius: '8px', 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '1.6rem', mb: 2 }}>
          Reset your password
        </Typography>

        <TextField
          margin="normal"
          required
          fullWidth
          id="new-password"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
          error={(newPassword.trim() === '' || newPassword.length < 5 || newPassword !== confirmPassword) && validate}
          helperText={(newPassword.trim() === '' || newPassword.length < 5) && validate ? "Password must be at least 5 characters long" : ""}
          FormHelperTextProps={{   
            style: { fontSize: '1rem' }
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="confirm-password"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
          error={(confirmPassword.trim() === '' || newPassword !== confirmPassword) && validate}
          helperText={newPassword !== confirmPassword && validate ? "Password do not match" : ""}
          FormHelperTextProps={{
            style: { fontSize: '1rem' }
          }}
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
          onClick={() => setValidate((prev) => true)}
        >
          Reset Password
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
          onClick={() => navigate('/')}
       
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}