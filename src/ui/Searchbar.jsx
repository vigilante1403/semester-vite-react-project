import { Box, Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { ClearAll, Delete } from '@mui/icons-material';
import { useState } from 'react';
function Searchbar({placeholder,onChangeText,text}) {
  const [color,setColor]=useState('secondary')
  const [search,setSearch]=useState('')
  const clearSearch = ()=>{
    const Search = document.getElementById('searchBar')
    Search.value=''
  }
  const changeColor=(color)=>{
    setColor('error')
  }
    return (
        <Box sx={{ p: 3,position:'relative' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          defaultValue={text}
          id='searchBar'
          
         onChange={(e)=>setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'var(--color-grey-800)' }} onClick={()=>onChangeText(search)} />
              </InputAdornment>
            ),
            endAdornment:(
              <InputAdornment position='end'>
                <Delete id='trashClearSearch' sx={{ cursor:'pointer' }} color={color} onMouseLeave={()=>setColor('secondary')} onMouseEnter={()=>changeColor('red')}  onClick={()=>{onChangeText('');clearSearch()}}  />
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'var(--color-grey-100)',
            },
            '& .MuiInputBase-input': {
              color: 'var(--color-grey-800)',
              fontSize:12
            },
            '& .MuiInputLabel-root': {
              color: 'var(--color-grey-800)',
            },
          }}
        />
        {/* <Button style={{ position:'absolute',right:'3rem',top:'3.6rem',p:3 }} onClick={()=>onChangeText('')} color='error'>X</Button> */}
      </Box>
    )
}

export default Searchbar
