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
import Empty from '../../ui/Empty';
function BillModal({selectedPayment,onClose}) {
    if(!selectedPayment) return <Empty resourceName={'bill'} />
    return (
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
                onClick={()=>onClose()}
              >
                Close
              </Button>
            </>
    )
}

export default BillModal
