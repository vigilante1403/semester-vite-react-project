import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import BookingDetailUser from './BookingDetailUser';

const BookingDetailModal = ({ open, handleClose, booking }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ 
        width: 700, 
        backgroundColor: 'white', 
        padding: '1rem', 
        borderRadius: '10px', 
        boxShadow: 24,
        margin: 'auto',
        marginTop: '1%',
        height: '95vh',
        overflowY: 'auto',
        display: 'flex',              
        flexDirection: 'column',     
        justifyContent: 'space-between',
      }}>
        <BookingDetailUser bookingFromComponent={booking} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleClose} 
            sx={{ backgroundColor: '#1976d2' }}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BookingDetailModal;