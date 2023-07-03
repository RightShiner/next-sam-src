import React from 'react';
import Typed from 'react-typed';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, useTheme } from '@mui/material/styles';

import Container from 'components/Container';

const image = "https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f211d6ebae5e42c12dff046_web_illustration_hero2.svg";
const logos = [
  "https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/601a976004900713f6f9f1df_google_b%26w_logo.svg",
  "https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9b1448848185f58658eb_bolt_logo.svg",
  "https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9b15a5d4076a14fd49f5_busuu_logo.svg",
  "	https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9b17b8968a8030967a8d_class101_logo.svg"
]

const Hero = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'light' ? '#d6daff' : '#3b4972',
        backgroundRepeat: 'repeat-x',
        position: 'relative',
      }}
    >
      <Box paddingY={'1rem'}>
        <Container>
          <Box maxWidth={{ xs: 1, sm: '50%' }}>
            <Typography
              variant="h3"
              color="text.primary"
              gutterBottom
              sx={{
                fontWeight: 700,
              }}
            >
              Convert customers<br/>
              with high performance<br/>
              influencer marketing
            </Typography>
            <Typography
              variant="h6"
              component="p"
              color="text.primary"
              sx={{ fontWeight: 600 }}
              marginTop={5}
            >
              Influencer discovery, audience analysis and monitoring<br/>
              trusted by more than 300 B2C brands
            </Typography>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'flex-start' }}
              marginTop={5}
            >
              <Button
                component={'a'}
                variant="contained"
                color="primary"
                size="large"
                fullWidth={isMd ? false : true}
                href={'/'}
              >
                Get Started
              </Button>
              <Box
                marginTop={{ xs: 2, sm: 0 }}
                marginLeft={{ sm: 2 }}
                width={{ xs: '100%', md: 'auto' }}
              >
                <Button
                  component={'a'}
                  href={'/'}
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth={isMd ? false : true}
                >
                  Book a Demo
                </Button>
              </Box>
            </Box>
            <Typography
              component="p"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
              marginTop={4}
            >
              Improving creator partnerships at brands like:
            </Typography>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={'center'}
              marginTop={2}
              height={120}
              style={{ filter: 'grayscale(100%)'}}
            >
              {logos.map((logo, i) => (
                <Box
                  key={i}
                  component={LazyLoadImage}
                  effect="blur "
                  src={
                    logo
                  }
                  marginLeft={i > 0 ? 2 : 0}
                  maxHeight={i === 1 ? 80 : 120}
                  width={'auto'}
                />
              ))}
            </Box>
          </Box>
        </Container>
        <Box
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Box
            display={'flex'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            width={'50%'}
            height={'100%'}
            left={'50%'}
            top={'-4rem'}
            position={'absolute'}
          >
            <Box
              padding={1}
              marginTop={2}
              maxHeight={'500px'}
              maxWidth={'500px'}
            >
              <Box
                component={LazyLoadImage}
                effect="blur"
                src={
                  image
                }
                height={1}
                width={1}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
