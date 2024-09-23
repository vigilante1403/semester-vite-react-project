import styled from "styled-components"
import Input from "../../ui/Input"
import { Typography } from "@mui/material"
import { NavLink, useSearchParams } from "react-router-dom"
import { HiMiniClock, HiOutlineClock } from "react-icons/hi2"
import { useState } from "react"
import { GeoapifyGeocoderAutocomplete } from "@geoapify/react-geocoder-autocomplete"
const StyledBarMap = styled.div`
display: flex;
flex-direction: column;
row-gap: 2.6rem;
padding:2rem;

  height: 100%;
  width: 100%;
`
const StyledInput=styled(Input)`
`
const HorizontalLine=styled.hr`

`
const StyledHistoryBox=styled.div`
display: flex;
flex-direction: column;

`
const HistorySearch=styled.div`
`
const StyledSearchHistory = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;
const Display = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
  display: inline;
  /* display: -moz-box;  */

  /* number-of lines */

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  /* -moz-line-clamp: 1;
  -moz-box-orient: vertical; */
  /* width: 200px;
  height: 100px; */
  /* flex-wrap: wrap; */
  /* -moz-text-overflow: ellipsis; */

  /* overflow-x: hidden; */
`;

function SearchBarMap({onSetCenter,onSetCenterDisplay}) {
    const [searchPlace,setSearchPlace]=useState('')
   
    const [listSearch,setListSearch]=useState([])
    const handleSearch = (e)=>{
      onSetCenter(prev=>null)
      console.log(e)
      onSetCenterDisplay(e.properties.formatted)
          onSetCenter(prev=>[e.properties.lat,e.properties.lon])
          setListSearch(prev=>[...prev,searchPlace])
        
    }
    
    return (
        <StyledBarMap>
            <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
        // type={"street"}
        lang={"vi"}
        
        limit={15}
        // value={displayValue}
        placeSelect={(e)=>handleSearch(e)}
        // suggestionsChange={(e)=>console.log("suggestionsChange: ",e)}
        onUserInput={setSearchPlace}
        />
            
              <HorizontalLine/>
                <StyledHistoryBox>
                   <Typography fontSize={20} color>Search Recently</Typography>
                   {listSearch&& listSearch.length>0&&listSearch.reverse().map(search=>(
                    <StyledSearchHistory key={search}>
                        <HiOutlineClock />
                        <Display>{search}</Display>
                    </StyledSearchHistory>
                   ))}
                    
                </StyledHistoryBox>
        </StyledBarMap>
    )
}

export default SearchBarMap
