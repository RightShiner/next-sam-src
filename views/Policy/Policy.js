import React from 'react';
import Box from '@mui/material/Box';
import Empty from 'layouts/Empty';
import Container from 'components/Container';
import { PolicyContent } from './components';

const Policy = () => {
  return (
    <Empty>
      <Box
        sx={{
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >
        <Container paddingX={0} paddingY={6} maxWidth={{md: 1024 }}>
          <PolicyContent />
        </Container>
      </Box>
    </Empty>
  );
};

export default Policy;
