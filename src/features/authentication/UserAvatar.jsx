import styled from "styled-components";
import { useAuthenticate } from "./useAuthenticate";
import { Avatar } from "@mui/material";


const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

// const Avatar = styled.img`
//   display: block;
//   width: 4rem;
//   width: 3.6rem;
//   aspect-ratio: 1;
//   object-fit: cover;
//   object-position: center;
//   border-radius: 50%;
//   outline: 2px solid var(--color-grey-100);
// `;
function UserAvatar() {
  const {user}=useAuthenticate()
  return (
    <StyledUserAvatar>
      <Avatar
              alt={user.fullName}
              src={
                `http://localhost:8080/api/v1/file/image/user/${user.photo}` ||
                'https://via.placeholder.com/150'
              }
              sx={{
                width: '4rem',
                height: '4rem',
                border: '2px solid white',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              }}
            />
      <span>Hi {user.name}</span>
    </StyledUserAvatar>
  )
}

export default UserAvatar

