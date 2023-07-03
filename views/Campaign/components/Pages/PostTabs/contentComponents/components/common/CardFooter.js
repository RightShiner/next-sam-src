import React from 'react';
import { Box, Typography } from '@mui/material';
import Tooltip from './Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { evaluateValue } from 'constants/constants';

const CardFooter = ({ data, classes }) => {
  return (
    <Box>
      <Box className={classes.footer}>
        <Box className={classes.item}>
          <Box className="heart" />
          <Tooltip title="いいね数" placement="top">
            <Typography variant="body2" color="text.secondary">
              {data?.like_count < 0
                ? '-'
                : evaluateValue(data?.like_count ?? 0)}
            </Typography>
          </Tooltip>
        </Box>
        <Box className={classes.item}>
          <Box id="comment"></Box>
          <Tooltip title="コメント数" placement="top">
            <Typography variant="body2" color="text.secondary">
              {data?.comment_count < 0
                ? '-'
                : evaluateValue(data?.comment_count ?? 0)}
            </Typography>
          </Tooltip>
        </Box>
        {data?.play_count && (
          <Box className={classes.item}>
            <>
              <Box id="play"></Box>
              <Tooltip title="再生数" placement="top">
                <Typography variant="body2" color="text.secondary">
                  {data?.play_count < 0
                    ? '-'
                    : evaluateValue(data?.play_count ?? 0)}
                </Typography>
              </Tooltip>
            </>
          </Box>
        )}
        <Box
          className={classes.item}
          sx={{ alignItems: 'flex-start!important' }}
        >
          <VisibilityIcon
            sx={{ color: 'gray', fontSize: '13px', mr: '.2em' }}
          />
          <Tooltip title="閲覧数" placement="top">
            <Typography variant="body2" color="text.secondary">
              {data?.view_count < 0
                ? '-'
                : evaluateValue(data?.view_count ?? 0)}
            </Typography>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default CardFooter;
