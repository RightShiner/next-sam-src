import React, { useState, useEffect } from 'react';
import {Box, Button, Skeleton} from '@mui/material';
import toast from 'react-hot-toast';

const UpdateLoading = ({}) => {
  return (
    <Skeleton width={'100%'} height={140} sx={{transform:'unset', marginBottom: '20px'}} />
  );
};

export default InfluencerBriefLoading;
