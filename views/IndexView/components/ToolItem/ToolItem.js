import React from 'react';
import Box from '@mui/material/Box';
import PropsTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from 'components/Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ToolItem = ({ item }) => {
  return (
    <Box
      backgroundColor={'#f7f7ff'}
      borderBottom={'2px solid #ebecff'}
      paddingY={'50px'}
      id={item.type}
    >
      <Container>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: '700',
          }}
          gutterBottom
          color={item.color}
          align={'left'}
        >
          {item.type}
        </Typography>
        <Grid container spacing={5}>
          <Grid 
            item 
            xs={6} 
            marginTop={5}
            data-aos={'fade-up'}
            data-aos-delay={100}
          >
            <Typography
              variant="h3"
              align={'left'}
              color={'text.primary'}
              fontWeight={'bold'}
            >
              {item.title}
            </Typography>
            <Typography
              variant="h6"
              align={'left'}
              color={'text.primary'}
              fontWeight={'bold'}
              marginTop={3}
            >
              {item.text1}
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
                START FREE TRIAL
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
                  Book a Demo
                </Button>
              </Box>
            </Box>
            <Typography
              fontWeight={'medium'}
              gutterBottom
              color={'text.primary'}
              align={'left'}
              marginTop={4}
            >
              {item.text2}
            </Typography>
            <Box 
              display={'flex'}
              marginTop={2}
              alignItems={'center'}
            >
              <Box
                component={LazyLoadImage}
                effect="blur"
                src={
                  item.avatar
                }
                height={80}
                width={80}
                borderRadius={40}
              />
              <Typography
                fontWeight={'medium'}
                fontSize={'14px'}
                color={'text.primary'}
                align={'left'}
                marginLeft={2}
              >
                {item.name} <br/> {item.profile}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              component={LazyLoadImage}
              effect="blur"
              src={
                item.image
              }
              height={1}
              width={1}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

ToolItem.propTypes = {
  item: PropsTypes.object.isRequired,
};

export default ToolItem;
