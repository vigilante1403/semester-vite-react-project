import Row from '../ui/Row';
import Heading from '../ui/Heading'
import TourTable from '../features/tours/TourTable';
import AddTour from '../features/tours/AddTour';
import TourTableOperations from '../features/tours/TourTableOperations';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
function Tours() {
    return (
        <>
      <Row type="horizontal">
        <Heading as="h1">All tours</Heading>
        <TourTableOperations/>
      </Row>
      <Row>
      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search tours by Tour name"
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
       <TourTable/>
       <AddTour/>
        
      </Row>
    </>
    )
}

export default Tours
