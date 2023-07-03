import React, { useState, useEffect, useMemo } from 'react';
import { Box, Paper } from '@mui/material';

import {
  FeedCardBox,
  ReelCardBox,
  StoryCardBox,
  TiktokCardBox,
  YoutubeCardBox,
} from './GridViewComponents';

const GridView = ({ data, handleOpen, report }) => {
  const components = {
    feed: FeedCardBox,
    reel: ReelCardBox,
    story: StoryCardBox,
    tiktok: TiktokCardBox,
    movie: YoutubeCardBox,
    short: YoutubeCardBox,
  };

  return (
    <Box className={report ? 'report_grid_view' : 'grid_view'}>
      {data?.map((item, key) => {
        const CardBox = components[item.type];
        return (
          <CardBox
            key={key}
            data={item}
            type={item.type}
            handleOpen={handleOpen}
          />
        );
      })}
    </Box>
  );
};

export default GridView;
