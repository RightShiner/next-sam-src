import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Checkbox,
  TableRow,
  TableCell,
  Typography,
  Stack,
  Avatar,
} from '@mui/material';

import {
  CardImage,
  CardVideo,
  CardStory,
  CardMedia,
} from '../GridViewComponents/Common';
import { numToTime } from 'libs/commonFunc';
import { evaluateValue } from 'constants/constants';

const PostTableRow = ({ row, handleOpen }) => {
  const components = {
    feed: CardImage,
    reel: CardVideo,
    story: CardStory,
    tiktok: CardMedia,
    movie: CardMedia,
    short: CardMedia,
  };

  const CardBox = components[row.type];

  const handlePrevent = () => (e) => e.preventDefault();

  return (
    <TableRow hover key={row.pk} onClick={() => handleOpen(row.pk)}>
      <TableCell align="left">
        <Box
          sx={{
            width:
              row.type === 'short' || row.type === 'movie' ? '270px' : '150px',
          }}
        >
          <CardBox data={row} handleOpen={handlePrevent} />
        </Box>
      </TableCell>
      <TableCell className="posted_text">
        <Typography>{row?.caption?.text ?? '---'}</Typography>
      </TableCell>
      <TableCell className="account">
        <Stack spacing="20px" direction="row" alignItems="center">
          <Avatar
            alt="account"
            src={row?.inf_profile?.profile?.picture ?? ''}
            aria-label="recipe"
            sx={{ width: '52px', height: '52px' }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: '15px',
                color: '#303030',
              }}
            >
              {row?.inf_profile?.profile?.fullname ?? ''}
            </Typography>
            <Typography
              sx={{
                fontSize: '12px',
                color: '#rgba(48, 48, 48, 0.5)',
              }}
            >
              {'@' + row?.inf_profile?.profile?.username ?? ''}
            </Typography>
          </Box>
        </Stack>
      </TableCell>
      <TableCell align="left">{row?.engagement.toFixed(2)}</TableCell>
      <TableCell align="left">
        {row?.like_count < 0 ? '---' : evaluateValue(row?.like_count ?? 0)}
      </TableCell>
      <TableCell align="left">
        {row?.comment_count < 0
          ? '---'
          : evaluateValue(row?.comment_count ?? 0)}
      </TableCell>
      <TableCell align="left" className="post_date">
        <Typography>{row?.taken_at}</Typography>
        <Typography>{numToTime(row?.taken_at_org)}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default PostTableRow;
