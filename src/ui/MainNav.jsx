import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineDocumentCheck,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlinePaperAirplane,
  HiOutlineUser,
  HiOutlineUsers,
} from "react-icons/hi2";
import { useAuthenticate } from "../features/authentication/useAuthenticate";
import { useContext } from "react";
import { AdminContext } from "./ProtectedRouteAdmin";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
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

function MainNav() {
  const {user}=useContext(AdminContext)
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/admin/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/admin/bookings">
            <HiOutlineBriefcase />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/admin/tours">
            <HiOutlinePaperAirplane />
            <span>Tours</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/admin/bills">
            <HiOutlineDocumentText />
            <span>Bills</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/admin/schedules">
            <HiOutlineCalendarDays />
            <span>Schedules</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/admin/accounts">
            <HiOutlineUsers />
            <span>Accounts</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/admin/user">
            <HiOutlineUser />
            <span>Profile</span>
          </StyledNavLink>
        </li>
        {/* <li>
          <StyledNavLink to="/admin/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li> */}
      </NavList>
    </nav>
  );
}

export default MainNav;