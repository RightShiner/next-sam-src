/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Paper } from '@mui/material';
import DetailDialog from './DetailDialog';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardMedia,
  TagError,
} from './common';
import { useTheme } from '@mui/styles';

const FeedCardBox = ({
  data,
  date,
  headerData,
  isError,
  isHiddenSelect,
  missingTags,
  classes,
}) => {
  const theme = useTheme();

  const [modal, setModal] = useState({
    open: false,
  });

  const handleOpen = () => {
    setModal({
      open: true,
    });
  };

  const handleClose = () => {
    setModal({ open: false, pk: 0 });
  };

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
      <CardMedia data={data} classes={classes} handleOpen={handleOpen} />
      <CardContent
        data={data}
        date={date}
        classes={classes}
        followers={headerData.followers}
      />
      <CardFooter data={data} classes={classes} />
      <DetailDialog
        open={modal.open}
        data={data}
        date={date}
        header={headerData}
        onClose={handleClose}
        isError={isError}
        missingTags={missingTags}
        classes={classes}
      />
      {isError && <TagError />}
    </Paper>
  );
};

export default FeedCardBox;
