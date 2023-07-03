import React, { useState, useEffect, useMemo } from 'react';
import { Paper } from '@mui/material';
import { CardAccount, CardContent, CardImage, TagError } from './Common';

const FeedCardBox = ({ data, handleOpen }) => {
  return (
    <Paper className="card_box_container">
      {data?.isMissingTags && <TagError />}
      <CardImage data={data} handleOpen={handleOpen} />
      <CardAccount data={data} />
      <CardContent data={data} />
    </Paper>
  );
};

export default FeedCardBox;
