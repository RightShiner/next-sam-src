/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { ListPage, PostPage, ReportPage, StatusPage } from './Pages';

const Tabs = ({ userInfo, curType, campaignId, campaignSNS }) => {
  return (
    <Box id="content-above-wrapper">
      {curType === 'list' && (
        <ListPage selCampId={campaignId} catType={campaignSNS} />
      )}
      {curType === 'status' && (
        <StatusPage selCampId={campaignId} catType={campaignSNS} />
      )}
      {curType === 'post' && (
        <PostPage
          userInfo={userInfo}
          selCampId={campaignId}
          catType={campaignSNS}
        />
      )}
      {curType === 'report' && (
        <ReportPage selCampId={campaignId} catType={campaignSNS} />
      )}
    </Box>
  );
};

export default Tabs;

Tabs.propTypes = {
  curType: PropTypes.string.isRequired,
  campaignId: PropTypes.string.isRequired,
  campaignSNS: PropTypes.string.isRequired,
};
