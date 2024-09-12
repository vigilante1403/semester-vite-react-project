import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../../../public/logo_light.png';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
} from '@mui/material';
import {
  AccountCircle,
  Menu as MenuIcon,
} from '@mui/icons-material';

import styled from 'styled-components';
import DarkModeToggle from '../DarkModeToggle';
import LoginSignupPage from '../../pages/userpages/LoginSignupPage';

import { useAuthenticate } from '../../features-user/security/useAuthenticate';

const StyledHeader = styled.header`
  background-color: var(--color-grey-100);
`;
export default function Header() {
  const [openLoginSignup, setOpenLoginSignup] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const { user, isAuthenticated, isLoading } = useAuthenticate();
  const navigate = useNavigate();
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  
  const handleLoginSignupOpen = (login) => {
    setIsLogin(login);
    setIsForgotPassword(false);
    setOpenLoginSignup(true);
  };

  const handleLoginSignupClose = () => {
    setOpenLoginSignup(false);

  };

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };const handleSwitchForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setIsLogin(!isLogin);
  };

  return (
    <StyledHeader>
      <AppBar
        position="static"
        sx={{
          background: 'inherit',
          color: 'inherit',
          boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Avatar
            src={logo}
            alt="VINA TRAVEL"
            sx={{ marginRight: '16px', height: '100px', width: '100px' }}
          />
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              flexGrow: 1,
            }}
          >
            <Button color="inherit" sx={{ fontSize: '2rem', marginRight: 2 }}>
              <Link
                to="/home"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Home
              </Link>
            </Button>
            <Button color="inherit" sx={{ fontSize: '2rem', marginRight: 2 }}>
              <Link
                to="/tours"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Tours
              </Link>
            </Button>
            <Button color="inherit" sx={{ fontSize: '2rem', marginRight: 2 }}>
              <Link
                to="/contact"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Contact
              </Link>
            </Button>
            <Button color="inherit" sx={{ fontSize: '2rem', marginRight: 2 }}>
              <Link
                to="/about"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                About
              </Link>
            </Button>
          </Box>
          {!isAuthenticated ? (
            <Box
              sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
            >
              <DarkModeToggle />

              <Button
                onClick={() => handleLoginSignupOpen(true)}
                color="inherit"
                sx={{
                  fontSize: '2rem',
                  marginRight: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AccountCircle sx={{ marginRight: 1 }} />
                Login
              </Button>
              <Button
                onClick={() => handleLoginSignupOpen(false)}
                sx={{ fontSize: '2rem', marginRight: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: '1.2rem' }}
                onClick={() => navigate(`/user/dashboard`)}
              >
                Dash board
              </Button>
            </Box>
          )}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button>
              <ListItemText
                primary={
                  <Link
                    to="/home"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Home
                  </Link>
                }
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                primary={
                  <Link
                    to="/tours"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Tours
                  </Link>
                }
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                primary={
                  <Link
                    to="/contact"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Contact
                  </Link>
                }
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                primary={
                  <Link
                    to="/about"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    About
                  </Link>
                }
              />
            </ListItem>
            <ListItem button onClick={() => handleLoginSignupOpen(true)}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button onClick={() => handleLoginSignupOpen(false)}>
              <ListItemText primary="Sign Up" />
            </ListItem>
            <DarkModeToggle />
          </List>
        </Box>
      </Drawer>

      <LoginSignupPage open={openLoginSignup} onClose={handleLoginSignupClose} isLogin={isLogin} isForgotPass={isForgotPassword} onSwitchForgotPass={handleSwitchForgotPassword} onSwitch={handleSwitch} />
    </StyledHeader>
  );
}
