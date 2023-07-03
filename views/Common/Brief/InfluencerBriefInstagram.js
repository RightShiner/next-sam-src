import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AudienceDetails from './AudienceDetails';
import LastUpdates from './LastUpdates';
import MostPosts from './MostPosts';

const InfluencerBriefInstagram = ({ data }) => {
  return (
    <Box>
      <LastUpdates data={data} />

      <AudienceDetails
        data={data.audience}
        lookalikes={data.audience?.audienceLookalikes}
        hashtags={data.hashtags}
        mentions={data.mentions}
        hashtagengage={data.hashtagengage}
      />

      <MostPosts data={data.popularPosts} />
    </Box>
  );
};

export default InfluencerBriefInstagram;
