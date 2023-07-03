import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Slide from '@mui/material/Slide';

import Container from 'components/Container';
import { Topbar, Footer } from './components';

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
};

const Empty = ({ children }) => {
  return (
    <Box>
      <AppBar
        position={'fixed'}
        sx={{
          backgroundColor: 'white', //theme.palette.mode === 'light' ? '#d6daff' : '#3b4972',
          boxShadow: 'none !important',
        }}
        elevation={1}
      >
        <Box paddingY={{ xs: 1, sm: 1.5 }}>
          <Topbar />
        </Box>
      </AppBar>
      <main style={{ minHeight: 'calc(100vh - 285px + 64px)' }}>
        <Box height={{ xs: 24, sm: 16 }} />
        {children}
        <Divider />
      </main>
      {process.env.NEXT_PUBLIC_REGION != 'SG' && (
        <Box backgroundColor={'#F7F8FA'}>
          <Container paddingY={8}>
            <Footer />
          </Container>
        </Box>
      )}
    </Box>
  );
};

Empty.propTypes = {
  children: PropTypes.node,
};

export default Empty;
