import { Typography } from "@mui/material"
import styled from "styled-components"
import Button from "./Button"
import { useNavigate } from "react-router-dom"
const StyledTokenExpiredModal = styled.div`
min-width: 30vw;
display: flex;
flex-direction: column;
align-items: center;
`
function TokenExpired({admin=null}) {
    const navigate=useNavigate()
    return (
        <StyledTokenExpiredModal>
            <Typography fontSize={24} color={'red'}>Token expired! Please login again</Typography>
            <Button variant="primary" onClick={()=>admin?navigate('/admin/login'):navigate('/')}>OK</Button>
        </StyledTokenExpiredModal>
    )
}

export default TokenExpired
