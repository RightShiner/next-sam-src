import React from 'react';
import NextLink from 'next/link';
import Box from '@mui/material/Box';

const Topbar = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <a
        style={{ marginLeft: '2rem' }}
        href={
          process.env.NEXT_PUBLIC_REGION == 'SG'
            ? 'https://astream.sg'
            : 'https://acetokyo.com/astream/b/'
        }
      >
        <Box
          display={'flex'}
          component={'img'}
          src={'/images/logo/logo.png'}
          width={{ xs: 180, md: 220 }}
          height={1}
        />
      </a>
    </Box>
  );
};

export default Topbar;
