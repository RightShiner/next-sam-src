/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Paper } from '@mui/material';
import { CardStory, CardHeader } from './common';
import { useTheme } from '@mui/styles';

const StoryCardBox = ({ data, classes, isHiddenSelect }) => {
  const theme = useTheme();

  return (
    <Paper
      className={classes.container}
      sx={{
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: isHiddenSelect
          ? theme.palette.monitoring.hidden
          : 'transparent',
      }}
    >
      <CardHeader
        data={data}
        headerData={data.inf_profile.profile}
        classes={classes}
      />
      <CardStory data={data} classes={classes} />
    </Paper>
  );
};

export default StoryCardBox;
