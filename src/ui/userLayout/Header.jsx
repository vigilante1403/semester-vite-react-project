
import { Link } from 'react-router-dom';
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
import { AccountCircle, Menu as MenuIcon,DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';

import styled from 'styled-components';
import DarkModeToggle from '../DarkModeToggle';
import LoginSignupPage from '../../pages/userpages/LoginSignupPage';
import Modal from '../Modal';
import LoginForm from '../../features-user/security/LoginForm';
import SignupForm from '../../features-user/security/SignupForm';



const StyledHeader=styled.header`
background-color: var(--color-grey-100);


`
export default function Header() {
    const [openLoginSignup, setOpenLoginSignup] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
  
    const toggleDrawer = (open) => () => {
      setDrawerOpen(open);
    };
  
    const handleLoginSignupOpen = (login) => {
      setIsLogin(login);
      setOpenLoginSignup(true);
    };
  
    const handleLoginSignupClose = () => {
      setOpenLoginSignup(false);
    };
  
    const handleSwitch = () => {
      setIsLogin(!isLogin);
    };
  
    return (
      <StyledHeader>
        <AppBar
          position="static"
          sx={{
            background:'inherit',
            color:'inherit',
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
                <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Home
                </Link>
              </Button>
              <Button color="inherit" sx={{ fontSize: '2rem', marginRight: 2 }}>
                <Link to="/tours" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Tours
                </Link>
              </Button>
              <Button color="inherit" sx={{ fontSize: '2rem', marginRight: 2 }}>
                <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Contact
                </Link>
              </Button>
              <Button color="inherit" sx={{ fontSize: '2rem', marginRight: 2 }}>
                <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                  About
                </Link>
              </Button>
              
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Modal>
              <DarkModeToggle/>
              <Modal.Open opens="login">
              <Button color="inherit" sx={{ fontSize: '2rem', marginRight: 2, display: 'flex', alignItems: 'center' }}>
                <AccountCircle sx={{ marginRight: 1 }} />
                Login
              </Button>
              </Modal.Open>
              <Modal.Window name="login">
                <LoginForm />
              </Modal.Window>
              <Modal.Open opens="signup">
              <Button onClick={() => handleLoginSignupOpen(false)}  sx={{ fontSize: '2rem', marginRight: 2 }}>
                Sign Up
              </Button>
              </Modal.Open>
              <Modal.Window name="signup">
                <SignupForm/>
              </Modal.Window>
              </Modal>
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
              <ListItem button>
                <ListItemText primary={<Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>} />
              </ListItem>
              <ListItem button>
                <ListItemText primary={<Link to="/tours" style={{ textDecoration: 'none', color: 'inherit' }}>Tours</Link>} />
              </ListItem>
              <ListItem button>
                <ListItemText primary={<Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link>} />
              </ListItem>
              <ListItem button>
                <ListItemText primary={<Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About</Link>} />
              </ListItem>
              <ListItem button onClick={() => handleLoginSignupOpen(true)}>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button onClick={() => handleLoginSignupOpen(false)}>
                <ListItemText primary="Sign Up" />
              </ListItem>
             <DarkModeToggle/>
            </List>
          </Box>
        </Drawer>
        
        {/* <LoginSignupPage open={openLoginSignup} onClose={handleLoginSignupClose} isLogin={isLogin} onSwitch={handleSwitch} /> */}
      </StyledHeader>
    );
  }