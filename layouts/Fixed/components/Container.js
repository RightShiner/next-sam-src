import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const Container = ({ children, ...rest }) => (
  <Box
    paddingRight='2.5rem'
    paddingLeft='2.5rem'
    paddingBottom={{ xs: 2, sm: 4, md: 6 }}
    paddingTop={{ xs: 1, sm: 2, md: 4 }}
    {...rest}
  >
    {children}
  </Box>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
