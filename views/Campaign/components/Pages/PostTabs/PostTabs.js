/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import ListPage from './ListPage';
import ContentPage from './ContentPage';

const Tabs = ({ curType, selCampId, catType, setDisabled }) => {
  return (
    <Box>
      {curType === 'list' && (
        <ListPage
          selCampId={selCampId}
          catType={catType}
          setDisabled={setDisabled}
        />
      )}
      {curType === 'post' && (
        <ContentPage selCampId={selCampId} catType={catType} />
      )}
    </Box>
  );
};

export default Tabs;

Tabs.propTypes = {
  curType: PropTypes.string.isRequired,
  selCampId: PropTypes.string.isRequired,
  catType: PropTypes.string.isRequired,
};