import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import LogoImage from 'components/LogoImage';
import Main from 'layouts/Main';
import Container from 'components/Container';

const NotFoundCover = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Main isMiddle={true}>
      <Box
        display={'flex'}
        flexDirection={{ xs: 'column', md: 'row' }}
        position={'relative'}
        justifyContent={'center'}
      >
        <Box display={'flex'} alignItems={'center'}>
          <Box>
            <Typography
              variant="h1"
              component={'h1'}
              align={isMd ? 'left' : 'center'}
              sx={{ fontWeight: 700 }}
            >
              404
            </Typography>
            <Typography
              variant="h6"
              component="p"
              color="text.secondary"
              align={isMd ? 'left' : 'center'}
            >
              Oops! Looks like you followed a bad link.
              <br />
              If you think this is a problem with us, please
              <Link href={'/signin-cover'} underline="none">
                tell us
              </Link>
            </Typography>
            <Box
              marginTop={4}
              display={'flex'}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              <Button
                component={Link}
                variant="contained"
                color="primary"
                size="large"
                href={'/signin-cover'}
              >
                Back home
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ height: 450 }}>
          <LogoImage
            sx={{ height: '400px !important' }}
            imgSrc={'/images/logo/logo_back.svg'}
          />
        </Box>
      </Box>
    </Main>
  );
};

export default NotFoundCover;
