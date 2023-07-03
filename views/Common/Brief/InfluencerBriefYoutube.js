import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AudienceDetailsYoutube from './AudienceDetailsYoutube';
import LastUpdatesYoutube from './LastUpdatesYoutube';
import MostPostsYoutube from './MostPostsYoutube';
import RecentPostsYoutube from './RecentPostsYoutube';

const InfluencerBriefYoutube = ({ data }) => {
  return (
    <Box>
      <LastUpdatesYoutube data={data} />

      <RecentPostsYoutube data={data.recentPosts} />

      <AudienceDetailsYoutube
        data={data.audience}
        lookalikes={data.audience?.audienceLookalikes}
        hashtags={data.hashtags}
      />

      <MostPostsYoutube data={data.popularPosts} />
    </Box>
  );
};

export default InfluencerBriefYoutube;
