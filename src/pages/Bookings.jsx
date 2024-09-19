import Row from '../ui/Row';
import Heading from '../ui/Heading'
import BookingTable from '../features/bookings/BookingTable';

import BookingTableOperations from '../features/bookings/BookingTableOperations';
import AddBooking from '../features/bookings/AddBooking';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

function Bookings() {
    return (
        <>
        <Row type="horizontal">
          <Heading as="h1">All bookings</Heading>
          <BookingTableOperations/>
        </Row>
        <Row>
        <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search bookings by Booking name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'var(--color-grey-800)' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'var(--color-grey-100)',
            },
            '& .MuiInputBase-input': {
              color: 'var(--color-grey-800)',
            },
            '& .MuiInputLabel-root': {
              color: 'var(--color-grey-800)',
            },
          }}
        />
      </Box>
         <BookingTable/>
         <AddBooking/>
          
        </Row>
      </>
    )
}

export default Bookings
