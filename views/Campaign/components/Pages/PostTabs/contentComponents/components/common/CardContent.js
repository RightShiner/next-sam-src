import React from 'react';
import { Box, Typography } from '@mui/material';
import Tooltip from './Tooltip';

const CardContent = ({ data, date, classes, followers = 0 }) => {
  let likes = data?.like_count ?? 0;
  let comments = data?.comment_count ?? 0;

  let engagementRate =
    followers > 0 ? ((likes + comments) / followers) * 100 : 0;
  return (
    <Box pb={1}>
      <Box className={classes.detail}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          <Box id="engagement"></Box>
          <Tooltip title="エンゲージメント率" placement="top">
            <Typography variant="body2" color="text.secondary">
              {engagementRate.toFixed(2) + '%'}
            </Typography>
          </Tooltip>
        </Box>
      </Box>
      <Box className={classes.content}>
        <Typography id="detail" variant="body2" color="text.secondary">
          {data?.caption?.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardContent;
