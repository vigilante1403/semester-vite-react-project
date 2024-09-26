import styled from "styled-components";
import Logo from "../Logo";
import UserNav from "./UserNav";
import { useNavigate } from "react-router-dom";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
const LogoWrapper = styled.div`
  cursor: pointer; 
`;

function UserSidebar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <StyledSidebar>
       
      <UserNav />
    </StyledSidebar>
  );
}

export default UserSidebar;