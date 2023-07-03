import React from 'react';
import { Box, Skeleton } from '@mui/material';

const InfluencerBriefLoading = ({}) => {
  return (
    <Box className="influencer-brief">
      <Box className="influencer-toolbar">
        <Skeleton
          width={'2rem'}
          height={'2rem'}
          sx={{ transform: 'unset', borderRadius: '50%' }}
        />
        <Skeleton width={80} height={30} sx={{ transform: 'unset' }} />
      </Box>
      <Box className="header">
        <Skeleton
          width={'150px'}
          height={'150px'}
          sx={{ transform: 'unset', borderRadius: '50%' }}
        />
        <Box className="mgt10">
          <Skeleton width={200} height={30} sx={{ transform: 'unset' }} />
        </Box>
        <Box className="mgt10" sx={{ display: 'flex', alignItems: 'center' }}>
          <Skeleton width={250} height={10} sx={{ transform: 'unset' }} />
        </Box>
        <Box className="mgt10">
          <Skeleton width={150} height={10} sx={{ transform: 'unset' }} />
        </Box>
        <Box className="mgt10">
          <Skeleton width={100} height={10} sx={{ transform: 'unset' }} />
        </Box>
        <Skeleton
          className="mgt20"
          width={150}
          height={30}
          sx={{ transform: 'unset' }}
        />
      </Box>
      <Box
        className="wrapper-grid"
        sx={{
          margin: '.5rem',
          gridTemplateColumns: '1fr 1fr 1fr',
          justifyItems: 'center',
        }}
      >
        <Skeleton width={115} height={115} sx={{ transform: 'unset' }} />
        <Skeleton width={115} height={115} sx={{ transform: 'unset' }} />
        <Skeleton width={115} height={115} sx={{ transform: 'unset' }} />
      </Box>
      <Box sx={{ margin: '1rem' }}>
        <Skeleton
          className="mgt20"
          width={200}
          height={30}
          sx={{ transform: 'unset' }}
        />
      </Box>
      <Box
        sx={{
          margin: '1rem',
          display: 'grid',
          gridGap: '.5rem',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        <Box>
          <Skeleton
            width={'100%'}
            height={140}
            sx={{ transform: 'unset', marginBottom: '20px' }}
          />
          <Skeleton width={'100%'} height={140} sx={{ transform: 'unset' }} />
        </Box>
        <Skeleton width={'100%'} height={300} sx={{ transform: 'unset' }} />
      </Box>
    </Box>
  );
};

export default InfluencerBriefLoading;
