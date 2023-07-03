import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

import { CardAccount, CardStory } from './Common';
import { numToTime } from 'libs/commonFunc';

const StoryCardBox = ({ data, handleOpen }) => {
  return (
    <Paper className="card_box_container">
      <CardStory data={data} handleOpen={handleOpen} />
      <CardAccount data={data} />
      <Box className="card_footer">
        <Typography>{data.taken_at}</Typography>
        <Typography>{numToTime(data.taken_at_org)}</Typography>
      </Box>
    </Paper>
  );
};

export default StoryCardBox;
