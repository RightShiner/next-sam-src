import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Box, Stack, Typography } from '@mui/material';

import { evaluateValue } from 'constants/constants';
import { numToTime } from 'libs/commonFunc';

const CardContent = ({ data }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Stack spacing="12px" className="card_content">
      <Typography className={!showMore && 'show_less'}>
        {data?.caption?.text}
        <br />
        <span style={{ color: '#814BC7' }}>
          {data?.tags?.map((item) => {
            return '#' + item + ' ';
          })}
        </span>
      </Typography>
      <Typography
        className="show_more_button"
        onClick={() => setShowMore((prev) => !prev)}
      >
        {showMore ? '短く表示' : 'さらに表示'}
      </Typography>
      {data.type === 'tiktok' && (
        <Box display="flex" gap={1}>
          <img src="/images/song_symbol.png" height="16px" alt="song" />
          <Typography fontWeight='bold'>{data.song_used}</Typography>
        </Box>
      )}
      <Stack spacing={2} direction="row">
        <Stack spacing="4px" direction="row" alignItems="center">
          <img src="/images/small_engage.png" alt="engagement" />
          <span style={{ fontSize: '13px', color: '#303030' }}>
            {' '}
            {data?.engagement.toFixed(2) + '%'}
          </span>
        </Stack>
        <Stack spacing="4px" direction="row" alignItems="center">
          <img src="/images/small_heart.png" alt="heart" />
          <span style={{ fontSize: '13px', color: '#303030' }}>
            {data?.like_count < 0 ? '-' : evaluateValue(data?.like_count ?? 0)}
          </span>
        </Stack>
        <Stack spacing="4px" direction="row" alignItems="center">
          <img src="/images/small_post.png" alt="small_post" />
          <span style={{ fontSize: '13px', color: '#303030' }}>
            {data?.comment_count < 0
              ? '-'
              : evaluateValue(data?.comment_count ?? 0)}
          </span>
        </Stack>
      </Stack>
      <Box className="card_footer">
        <Typography>{data.taken_at}</Typography>
        <Typography>{numToTime(data.taken_at_org)}</Typography>
      </Box>
    </Stack>
  );
};

export default CardContent;
