import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import SignupForm from '../../features-user/security/SignupForm';
import LoginForm from '../../features-user/security/LoginForm';
import ForgotPassForm from '../../features-user/security/ForgotPassForm';


const LoginSignupPage = ({ open, onClose, isLogin, isForgotPass, onSwitchForgotPass, onSwitch }) => {
 

  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogContent sx={{padding: '32px'}}>
        {isLogin ? <LoginForm onClose={onClose} onSwitch={onSwitch} onSwitchForgotPass={onSwitchForgotPass}/> : ( !isForgotPass ? <SignupForm onClose={onClose} onSwitch={onSwitch} /> : <ForgotPassForm onClose={onClose} onBackToLogin={onSwitchForgotPass}/>)}

    </DialogContent>
  
    </Dialog>
  );
}

export default LoginSignupPage;