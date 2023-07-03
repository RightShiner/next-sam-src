import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LogoImage from 'components/LogoImage';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { Form } from './components';

const SigninCover = () => {
  const theme = useTheme();
  return (
    <Main>
      <Box
        sx={{
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >
        <Container paddingX={0} paddingY={6} maxWidth={{md: 1024 }}>
          <Form />
        </Container>
      </Box>
    </Main>
  );
};

export default SigninCover;
