import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from 'components/Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const images = [
  'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9945eee7b65f4ebd0e99_looker_logo.svg',
  'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9945c13bc8231aa63e74_shopify_logo.svg',
  'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e99451bda1c59180a23e6_mailchimp_logo.svg',
  'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e99f3447e5067f90bfbc5_woodpecker_logo.svg',
  'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e99462a6ad0bb236fea7e_aweber_logo.svg',
  'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9945b8968a52b0967768_zapier_logo.svg'
]

const Plugins = () => {
  return (
    <Box
      backgroundColor={'#d6daff'}
      paddingY={'50px'}
    >
      <Container>
        <Grid 
          container 
          data-aos={'fade-up'}
          alignItems={'center'}
        >
          <Grid 
            item 
            xs={6} 
          >
            <Typography
              variant="h3"
              align={'left'}
              color={'text.primary'}
              fontWeight={'bold'}
            >
              We’re not the best at everything
            </Typography>
            
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h6"
              align={'left'}
              color={'text.primary'}
              fontWeight={'600'}
              marginTop={3}
            >
              We’re the best at what we do - we let our friends cover the rest. Plug in via API, export contact details via CSV or use our custom built integrations to optimize your workflow.
            </Typography>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'flex-start' }}
              marginTop={4}
            >
              <Button
                component={'a'}
                variant="contained"
                color="primary"
                size="large"
                href={'/'}
              >
                TRY FOR FREE
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
                >
                  API DOCS
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box
          display={'flex'}
          justifyContent={'space-evenly'}
          marginTop={5}
          style={{ filter: 'grayscale(100%)'}}
        >
          {images.map((image, i) => (
            <Box
              key={i}
              component={LazyLoadImage}
              effect="blur"
              src={
                image
              }
              height={128}
              width={128}
            />
          ))}          
        </Box>
      </Container>
    </Box>
  );
};

export default Plugins;
