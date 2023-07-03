/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Paper } from '@mui/material';

import {
  CardContent,
  CardFooter,
  CardHeader,
  CardVideo,
  TagError,
} from './common';
import { useTheme } from '@mui/styles';

const ReelCardBox = ({
  data,
  date,
  headerData,
  isError,
  isHiddenSelect,
  classes,
}) => {
  const theme = useTheme();

  return (
    <Paper
      className={classes.container}
      sx={{
        bgcolor: isError && '#ffe4e4',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: isHiddenSelect
          ? theme.palette.monitoring.hidden
          : 'transparent',
      }}
    >
      <CardHeader data={data} headerData={headerData} classes={classes} />
      <CardVideo data={data} classes={classes} />
      <CardContent
        data={data}
        date={date}
        classes={classes}
        followers={headerData.followers}
      />
      <CardFooter data={data} classes={classes} />
      {isError && <TagError />}
    </Paper>
  );
};

export default ReelCardBox;
