import Row from '../ui/Row';
import Heading from '../ui/Heading'
import AccountTable from '../features/authentication/AccountTable';
import AccountTableOperations from '../features/authentication/AccountTableOperations'
import AddUser from '../features/authentication/AddUser';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

function Accounts() {
    return (
        <>
      <Row type="horizontal">
        <Heading as="h1">All accounts</Heading>
        <AccountTableOperations/>
      </Row>
      <Row>
      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users by email or user name"
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
       <AccountTable/>
        <AddUser/>
      </Row>
    </>
    )
}

export default Accounts