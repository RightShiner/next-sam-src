/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import InfluencerTab from './Tabs/InfluencerTab';
import TargetTab from './Tabs/TargetTab';

const Tabs = ({ curType, userInfo }) => {
  return (
    <Box>
      {curType === 'influencer' && <InfluencerTab userInfo={userInfo} />}
      {curType === 'target' && <TargetTab userInfo={userInfo} />}
    </Box>
  );
};

export default Tabs;

Tabs.propTypes = {
  curType: PropTypes.string.isRequired,
};
