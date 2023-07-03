import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AudienceDetailsTiktok from './AudienceDetailsTiktok';
import LastUpdatesTiktok from './LastUpdatesTiktok';
import MostPostsTiktok from './MostPostsTiktok';

const InfluencerBriefTiktok = ({ data }) => {
  return (
    <Box>
      <LastUpdatesTiktok data={data} />

      <AudienceDetailsTiktok
        data={data.audience}
        lookalikes={data.audience?.audienceLookalikes ?? []}
        hashtags={data.hashtags}
      />

      <MostPostsTiktok data={data.popularPosts} />
    </Box>
  );
};

export default InfluencerBriefTiktok;
