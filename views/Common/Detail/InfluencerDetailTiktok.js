import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Dialog, DialogContent } from '@mui/material';
import HeaderTiktok from './HeaderTiktok';
import PopularPostsTiktok from './PopularPostsTiktok';
import AudienceDataTiktok from './AudienceDataTiktok';
import NotableTiktok from './NotableTiktok';

export default function InfluencerDetailTiktok({
  data,
  setDownloadEnabled,
  open,
}) {
  return (
    <Box>
      <HeaderTiktok
        data={data.profile}
        views={data.avgViews}
        comments={data.avgComments}
        engagements={data.avgEngagements}
        likes={data.avgLikes}
        recents={data.recentPosts ?? []}
      />
      <PopularPostsTiktok
        data={data.popularPosts ?? []}
        statHistory={data.statHistory ?? []}
        recentPosts={data.recentPosts ?? []}
        open={open}
      />
      <AudienceDataTiktok data={data.audience} open={open} />
      <NotableTiktok
        setDownloadEnabled={setDownloadEnabled}
        followers={data.audience?.notableUsers ?? []}
        open={open}
      />
    </Box>
  );
}
