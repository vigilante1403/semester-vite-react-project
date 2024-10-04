import React, { useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from '@mui/material';
import { AttachMoney, CalendarToday, CreditCard, ConfirmationNumber } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import TourIcon from '@mui/icons-material/Tour';

export default function PaymentHistory({ paymentList }) {
  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; 

  const handleOpen = (payment) => {
    setSelectedPayment(payment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPayment(null);
  };

  const totalPages = Math.ceil(paymentList.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const displayedPayments = paymentList.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <Box sx={{ background: 'rgba(73, 183, 96, 0.9)', borderRadius: '8px', p: 2 }}>
      <Typography variant="h3" sx={{ mb: 2, color: 'var(--color-grey-100)' }}>
        <strong>Payment History</strong>
      </Typography>
      <hr />
      {displayedPayments.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }}>
            <TableHead sx={{ background: 'pink' }}>
              <TableRow>
                <TableCell sx={{ fontSize: '1.4rem' }}><strong>Payment ID</strong></TableCell>
                <TableCell sx={{ fontSize: '1.4rem' }}><strong>Payment Date</strong></TableCell>
                <TableCell sx={{ fontSize: '1.4rem' }}><strong>Payment Method</strong></TableCell>
                <TableCell sx={{ fontSize: '1.4rem' }}><strong>Amount</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedPayments.map((payment) => (
                <TableRow
                  key={payment.id}
                  onClick={() => handleOpen(payment)}
                  sx={{
                    backgroundColor: '#DAB853',
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#EA9040' },
                  }}
                >
                  <TableCell sx={{ fontSize: '1.2rem' }}>{payment.id}</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem' }}>{new Date(payment.paidAt).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem' }}>Card</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem' }}>${payment.booking.priceFinal.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h5">No payment history available.</Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </Button>
        <Button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
          Next
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            padding: '24px',
            background: 'linear-gradient(135deg, #f6f7f9, #e3edf7)',
            borderRadius: '12px',
            margin: '100px auto',
            boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
            animation: 'fadeIn 0.5s ease-in-out',
          }}
        >
          {selectedPayment ? (
            <>
              <Typography variant="h3" sx={{ mb: 3, fontWeight: 'bold', color: '#2B4C7E', textAlign: 'center' }}>Payment Details</Typography>

              
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CreditCard sx={{ mr: 1 }} /> <strong>Payment ID:</strong> {selectedPayment.id}
                </Typography>
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                  <CreditCard sx={{ mr: 1 }} /> <strong>Payment Method:</strong> Card
                </Typography>
              </Box>

             
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PersonIcon sx={{ mr: 1 }} /> <strong>User Email:</strong> {selectedPayment.userEmail}
                </Typography>
              </Box>

              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TourIcon sx={{ mr: 1 }} /> <strong>Tour:</strong> {selectedPayment.booking.tour.name}
                </Typography>
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AttachMoney sx={{ mr: 1 }} /> <strong>Price Origin:</strong> ${selectedPayment.booking.priceOrigin.toFixed(2)}
                </Typography>
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AttachMoney sx={{ mr: 1 }} /> <strong>Price Discount:</strong> ${selectedPayment.booking.priceDiscount.toFixed(2)}
                </Typography>
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', color: '#DAA520', fontWeight: 'bold', fontSize: '1.4rem', mb: 1 }}>
                  <AttachMoney sx={{ mr: 1 }} /> <strong>Price Final:</strong> ${selectedPayment.booking.priceFinal.toFixed(2)}
                </Typography>
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ConfirmationNumber sx={{ mr: 1 }} /> <strong>Ticket:</strong> {selectedPayment.booking.numPeopleJoined || 1}
                </Typography>
              </Box>

              
              <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarToday sx={{ mr: 1 }} /> <strong>Paid At:</strong> {new Date(selectedPayment.paidAt).toLocaleDateString()}
              </Typography>

             
              <Button
                variant="outlined"
                color="error"
                sx={{ mt: 3, ':hover': { backgroundColor: '#ff1744', color: '#fff' } }}
                onClick={handleClose}
              >
                Close
              </Button>
            </>
          ) : (
            <Typography variant="h5">Loading...</Typography>
          )}
        </Box>
      </Modal>

    </Box>
  );
}
