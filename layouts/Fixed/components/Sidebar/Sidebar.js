import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import {SidebarNav} from './components';

const Sidebar = ({ userInfo, collapsed, pages, open, variant, setCollapse, onClose }) => {
  return (
    <Drawer
      anchor="left"
      onClose={() => onClose()}
      open={open}
      variant={variant}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: variant === 'permanent' && collapsed ? 50 : 240,
          top: { xs: 0, md: 0 },
          height: { xs: '100%', md: 'calc(100%)' },
          transition: 'all .2s ease-out',
          overflowX: 'hidden'
        },
      }}
    >
      <Box
        className='sidebar'
        sx={{
          paddingTop: { xs: 2, sm: 3 },
        }}
      >
        <SidebarNav userInfo={userInfo} pages={pages} variant={variant} collapsed={collapsed} onClose={onClose} setCollapse={setCollapse} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
