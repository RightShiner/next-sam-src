import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';

import Keyword from 'constants/lang';

const Academy = ({user}) => {
  return (
    <Fixed userInfo={user} paidOnly={true}>
      <Container className='research content-wrapper'>
        <Box marginTop={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            {Keyword.nav.academy}
          </Typography>
          <Typography
            gutterBottom
          >
            現在準備中です
          </Typography>
        </Box>
      </Container>
    </Fixed>
  );
};

export default Academy;
