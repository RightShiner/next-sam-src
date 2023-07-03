import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from 'components/Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const image = "https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f211d6ebae5e42c12dff046_web_illustration_hero2.svg";

const Recruiting = () => {
  return (
    <Box
      backgroundColor={'#d6daff'}
    >
      <Container>
        <Grid 
          container 
          data-aos={'fade-up'}
          alignItems={'center'}
          spacing={5}
        >
          <Grid 
            item 
            xs={5}
          >
            <Typography
              variant="h3"
              align={'left'}
              color={'text.primary'}
              fontWeight={'bold'}
            >
              Why wait?
            </Typography>
            <Typography
              variant="h6"
              align={'left'}
              color={'text.primary'}
              fontWeight={'600'}
              marginTop={5}
            >
              Recruiting just 2 micro-influencers per week means 104 partners after 1 year generating 1040 customers per month, minimum.
            </Typography>
            <Box
              marginTop={3}
            >
              <Button
                component={'a'}
                variant="contained"
                color="primary"
                size="large"
                href={'/'}
              >
                START GROWING
              </Button>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box
              component={LazyLoadImage}
              effect="blur"
              src={
                image
              }
              height={640}
              width={640}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Recruiting;
