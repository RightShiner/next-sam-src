import React, { useState, useEffect, useMemo } from 'react';
import { Paper } from '@mui/material';
import { CardAccount, CardContent, CardVideo } from './Common';

const ReelCardBox = ({ data, handleOpen }) => {
  return (
    <Paper className="card_box_container">
      <CardVideo data={data} handleOpen={handleOpen} />
      <CardAccount data={data} />
      <CardContent data={data} />
    </Paper>
  );
};

export default ReelCardBox;
