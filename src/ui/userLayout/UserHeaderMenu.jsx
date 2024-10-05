import styled from "styled-components"
import ButtonIcon from "../ButtonIcon"
import { HiOutlineUser } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import DarkModeToggle from "../DarkModeToggle"
import Logout from "../../features/authentication/Logout"

const StyledHeaderMenu = styled.ul`
display: flex;
gap:0.4rem;
`
function UserHeaderMenu() {
    const navigate=useNavigate()
    return (
        <StyledHeaderMenu>
        <li>
            <ButtonIcon onClick={()=>navigate('/user/me')}><HiOutlineUser/></ButtonIcon>
        </li>
        <li><DarkModeToggle/></li>
        <Logout />
        
            
        </StyledHeaderMenu>
    )
}

export default UserHeaderMenu