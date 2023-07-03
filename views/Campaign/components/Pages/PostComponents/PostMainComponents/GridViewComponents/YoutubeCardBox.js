import React from 'react';
import { Paper } from '@mui/material';
import { CardAccount, CardContent, CardMedia } from './Common';

const YoutubeCardBox = ({ data, type, handleOpen }) => {
  return (
    <Paper className="card_box_container">
      <CardMedia data={data} type={type} handleOpen={handleOpen} />
      <CardAccount data={data} />
      <CardContent data={data} />
    </Paper>
  );
};

export default YoutubeCardBox;
