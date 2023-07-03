import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import { useMainContext } from 'context/MainContext';

const RightSidebar = ({children}) => {

  const { isInfluCollapse, setInfluencerCollapsable } = useMainContext();

  return (
    <Drawer
      className='rightside-wrapper'
      anchor="right"
      // onClose={e=>{if (autoClose) setInfluencerCollapsable(true);}}
      onClose={e=>setInfluencerCollapsable(true)}
      // open={!isInfluCollapse}
      variant="permanent"
      sx={{
        '& .MuiPaper-root': {
          width: isInfluCollapse === false ? '400px' : '0px',
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
  children: PropTypes.node,
};

export default RightSidebar;
