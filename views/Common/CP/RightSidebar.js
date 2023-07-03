import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';

const RightSidebar = ({extraClass, autoClose, isCollapse, setCollapse, children}) => {
  return (
    <Drawer
      className={extraClass + ' rightside-wrapper'}
      anchor="right"
      onClose={e=>{if (autoClose) setCollapse();}}
      open={!isCollapse}
      variant="temporary"
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: 500,
          top: 0,
          height: '100%',
          transition: 'all .2s ease-out',
          overflowX: 'hidden'
        },
      }}
    >
      {children}
    </Drawer>
  );
};

RightSidebar.propTypes = {
  autoClose: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default RightSidebar;
