import { Outlet, Link } from 'react-router-dom';
import React, { useState } from 'react';

import styled from 'styled-components';
import Header from './header';
import Footer from './footer';
//  const lightTheme = createTheme({
//     palette: {
//       mode: 'light',
//     },
//   });
//  const darkTheme = createTheme({
//     palette: {
//       mode: 'dark',
//     },
//   });
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#00CC33',
//     },
//   },
// });
const StyledAppLayout=styled.div`
background-color: var(--color-grey-100);


`
function AppLayout() {
    // const [darkMode, setDarkMode] = useState(false);

    // const toggleDarkMode = () => {
    //   setDarkMode((prevMode) => !prevMode);
    // };
    // const theme = darkMode ? darkTheme : lightTheme;
  return (

    <StyledAppLayout>
      <Header />
      <Outlet />
      <Footer />
    </StyledAppLayout>
  );
}



export default AppLayout;
