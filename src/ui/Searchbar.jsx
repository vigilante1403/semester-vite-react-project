import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
function Searchbar({placeholder}) {
    return (
        <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholder}
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
    )
}

export default Searchbar
