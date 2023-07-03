import React from 'react';
import { Box, Skeleton } from '@mui/material';
import toast from 'react-hot-toast';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  showFront: {
    zIndex: 2,
  },
  profileBackground: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    zIndex: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  gridwrapper: {
    gridTemplateColumns: '1fr 1fr 1fr',
    marginTop: '1rem',
  },
});

const InfluencerDetailLoading = ({}) => {
  const classes = useStyles();
  return (
    <Box sx={{ marginTop: '3rem', width: { xs: '90%', md: '680px' } }}>
      <Box className={classes.header}>
        <Skeleton
          width={'175px'}
          height={'175px'}
          sx={{ transform: 'unset', borderRadius: '50%' }}
        />
        <Box className="mgt10">
          <Skeleton width={200} height={30} sx={{ transform: 'unset' }} />
        </Box>
        <Box className="mgt10">
          <Skeleton width={150} height={20} sx={{ transform: 'unset' }} />
        </Box>
      </Box>
      <Box
        sx={{
          margin: '.5rem',
          display: 'grid',
          gridColumnGap: '.5rem',
          gridTemplateColumns: '1fr 1fr 1fr',
          justifyItems: 'center',
        }}
      >
        <Skeleton width={'100%'} height={115} sx={{ transform: 'unset' }} />
        <Skeleton width={'100%'} height={115} sx={{ transform: 'unset' }} />
        <Skeleton width={'100%'} height={115} sx={{ transform: 'unset' }} />
      </Box>
      <Box sx={{ margin: '.5rem' }}>
        <Skeleton
          className="mgt20"
          width={200}
          height={30}
          sx={{ transform: 'unset' }}
        />
      </Box>
      <Box
        sx={{
          margin: '.5rem',
          display: 'grid',
          gridColumnGap: '.5rem',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
        <Skeleton width={'100%'} height={200} sx={{ transform: 'unset' }} />
        <Skeleton width={'100%'} height={200} sx={{ transform: 'unset' }} />
        <Skeleton width={'100%'} height={200} sx={{ transform: 'unset' }} />
      </Box>
    </Box>
  );
};

export default InfluencerDetailLoading;
