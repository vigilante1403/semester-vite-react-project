import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineChatBubbleLeft,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineIdentification,
  HiOutlinePaperAirplane,
  HiOutlineRocketLaunch,
  HiOutlineUser,
  HiOutlineUsers,
} from "react-icons/hi2";

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

function UserNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/user/dashboard">
            <HiOutlineHome />
            <span>My Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/user/me">
            <HiOutlineRocketLaunch />
            <span>About Me</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/user/bookings">
            <HiOutlineBriefcase />
            <span>My Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/user/reviews">
            <HiOutlineChatBubbleLeft />
            <span>My Reviews</span>
          </StyledNavLink>
        </li>
        {/* <li>
          <StyledNavLink to="/user/statistics">
            <HiOutlineChartBar />
            <span>To</span>
          </StyledNavLink>
        </li> */}
        <li>
          <StyledNavLink to="/user/settings">
            <HiOutlineCog6Tooth />
            <span>My Favorites</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default UserNav;