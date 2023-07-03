/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import clsx from 'clsx';
import React, {useState} from 'react';
import {Box, Skeleton} from '@mui/material';

export default function SearchItemLoading() {
  return (
    <Box 
      className={clsx('research-content-item', 'research-content-account-grid', 'box-wrapper-shadow')}
      sx={{padding:'1rem'}}
    >
      <Box className='profile'>
        <Skeleton width={'3.125rem'} height={'3.125rem'} sx={{transform:'unset', borderRadius:'50%'}}/>
        <Box className='instagram' sx={{marginLeft:'1rem'}}>
          <Skeleton width={100} height={20} sx={{transform:'unset', marginBottom:'.5rem'}}/>
          <Skeleton width={80} height={15} sx={{transform:'unset'}}/>
        </Box>
      </Box>
      <Box className='followers'>
        <Box className='first' sx={{marginBottom:'1rem'}}><Skeleton width={150} height={20} sx={{transform:'unset'}}/></Box>
        <Box className='second'><Skeleton width={100} height={15} sx={{transform:'unset'}}/></Box>
      </Box>
      <Box className='followers'>
        <Box className='first' sx={{marginBottom:'1rem'}}>
          <Skeleton width={150} height={20} sx={{transform:'unset'}}/>
        </Box>
        <Box className='second'><Skeleton width={200} height={15} sx={{transform:'unset'}}/></Box>
      </Box>
      <Box>
      </Box>
      <Box className='action'>
        <Box>
          <Box className='relative-action' />
        </Box>
      </Box>
    </Box>
  );
};
