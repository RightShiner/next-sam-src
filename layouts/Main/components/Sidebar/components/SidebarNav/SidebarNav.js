import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import NavItem from './components/NavItem';

const SidebarNav = ({ pages, onClose }) => {
  const { features: features } = pages;

  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'flex-end'}
        onClick={() => onClose()}
      >
        <IconButton>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box paddingX={2} paddingBottom={2}>
        <Box>
          <Button variant="outlined" fullWidth component="a" href="/">
            Blog
          </Button>
        </Box>
        <Divider sx={{ marginBottom: 2 }} />
        <Box>
          <NavItem title={'Features'} items={features} />
        </Box>
        <Divider sx={{ marginBottom: 2 }} />
        <Box>
          <Button variant="outlined" fullWidth component="a" href="/">
            Pricing
          </Button>
        </Box>
        <Divider sx={{ marginBottom: 2 }} />
        <Box marginTop={1}>
          <Button
            variant="outlined"
            fullWidth
            component="a"
            href={'/signin-cover'}
          >
            LOG IN
          </Button>
        </Box>
        <Box marginTop={1}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component="a"
            target="blank"
            href="/"
          >
            TRY FOR FREE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default SidebarNav;
