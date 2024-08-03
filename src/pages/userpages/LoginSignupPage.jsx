import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

const SwitchButton = styled(Button)({
  textTransform: 'none',
  color: '#00CC33',
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

const variants = {
  hidden: { rotateY: -180, opacity: 0 },
  visible: { rotateY: 0, opacity: 1 },
  exit: { rotateY: 180, opacity: 0 },
};

const LoginSignupPage = ({ open, onClose, isLogin, onSwitch }) => {
  const [key, setKey] = useState(0);

  const handleSwitch = () => {
    setKey(prevKey => prevKey + 1);
    setTimeout(onSwitch, 300); // Trigger switch halfway through the animation
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', backgroundColor: '#00CC33', color: '#ffffff', fontSize: '2rem' }}>
        {isLogin ? 'Login' : 'Sign Up'}
      </DialogTitle>
      <DialogContent sx={{ padding: '32px', backgroundColor: '#f5f5f5' }}>
        <motion.div
          key={key}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 1.0 }}
        >
          <Box component="form" sx={{ mt: 2 }}>
            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                InputLabelProps={{ style: { fontSize: '1.5rem' } }}
                InputProps={{ style: { fontSize: '1.5rem' } }}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus={isLogin}
              InputLabelProps={{ style: { fontSize: '1.5rem' } }}
              InputProps={{ style: { fontSize: '1.5rem' } }}
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
              InputLabelProps={{ style: { fontSize: '1.5rem' } }}
              InputProps={{ style: { fontSize: '1.5rem' } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#00CC33', color: '#ffffff', fontSize: '1.5rem' }}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={onClose}
              sx={{ mt: 1, borderColor: '#00CC33', color: '#00CC33', fontSize: '1.5rem' }}
            >
              Cancel
            </Button>
          </Box>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ fontSize: '1.2rem' }}>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <SwitchButton onClick={handleSwitch} sx={{ fontSize: '1.2rem' }}>
                {isLogin ? 'Sign Up' : 'Login'}
              </SwitchButton>
            </Typography>
          </Box>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default LoginSignupPage;
