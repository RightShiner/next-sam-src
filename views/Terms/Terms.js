import React from 'react';
import Box from '@mui/material/Box';
import Empty from 'layouts/Empty';
import Container from 'components/Container';
import { TermContent } from './components';

const Terms = () => {
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
          <TermContent />
        </Container>
      </Box>
    </Empty>
  );
};

export default Terms;
