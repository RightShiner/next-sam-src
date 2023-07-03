import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from 'components/Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const items = [
  {
    name: 'Bolt',
    image: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9b1448848185f58658eb_bolt_logo.svg',
    bio: 'A global leader in consumer mobility. According to the Financial Times, Bolt was the third fastest growing company in Europe in 2018, 2019 & 2020.'
  },
  {
    name: 'Bondora',
    image: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9b15c892d8ec8e382abe_bondora_logo.svg',
    bio: '128,000 people have invested over €374M and earned €46M with Bondora’s peer-to-peer lending platform as of July 2020.'
  },
  {
    name: 'Bonprix',
    image: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9b15b5a619f6ce8e2617_bonprix_logo.svg',
    bio: 'With around 35 million customers in 30 countries, Hamburg-based Bonprix is one of the leading fashion retailers internationally.'
  },
  {
    name: 'Busuu',
    image: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9b15a5d4076a14fd49f5_busuu_logo.svg',
    bio: 'Busuu is the world’s largest community for language learning, providing courses in 12 different languages to more than 100 million learners worldwide.'
  },
  {
    name: 'DDB',
    image: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9b16302cc1f9d09e68db_ddb_logo.svg',
    bio: 'DDB employs 11,000 team members and is one of the most successful advertising agencies in global history.'
  },
  {
    name: 'Healfaster',
    image: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9b171f0966048e23e288_healfaster_logo.svg',
    bio: 'The official Canadian dealer of Theragun, Game Ready, NormaTec and Alter G products, Healfaster counts the MLB, NFL, NBA & NHL amongst their customer base.'
  },
  {
    name: 'Lonely Label',
    image: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9b17e73d413435c78c60_lonely_logo.svg',
    bio: 'Often worn by celebrities such as Kylie Jenner, the NZ based Lonely Label fashion brand is known for embracing body positivity to the fullest and has grown a cult following behind their lingerie.'
  },
  {
    name: 'Class101',
    image: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9b17b8968a8030967a8d_class101_logo.svg',
    bio: 'Korea’s “hobby-based social network” startup offers immersive online video courses taught by creators. They have an impressive 10,000 teachers on their platform and have raised 11M dollars to date.'
  }
];

const Sponsors = () => {
  return (
    <Box
      backgroundColor={'#f7f7ff'}
      paddingY={'50px'}
      data-aos={'fade-up'}
    >
      <Container>
        <Typography
          variant={'h5'}
          sx={{
            fontWeight: '600',
          }}
          gutterBottom
          align={'center'}
        >
          Powering no-fluff influencer programs for ambitious companies globally:
        </Typography>
        <Box
          display={'flex'}
          justifyContent={'space-evenly'}
          flexWrap={'wrap'}
          marginTop={5}
        >
          {items.map((item, i) => (
            <Box 
              key={i}
              display={'block'}
              height={250}
              width={250}
              position={'relative'}
            >
              <Box 
                position={'absolute'}
                height={1}
                width={1}
                zIndex={0}
                display={'flex'}
                flexDirection={'column'}
              >
                <Typography
                  variant={'h6'}
                  sx={{
                    fontWeight: '600',
                    lineHeight: '70px'
                  }}
                  gutterBottom
                  align={'center'}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 'medium',
                  }}
                  gutterBottom
                  align={'center'}
                >
                  {item.bio}
                </Typography>
              </Box>
              <Box
                position={'relative'}
                zIndex={2}
                display={'flex'}
                justifyContent={'center'}
                backgroundColor={'#f7f7ff'}
                alignItems={'center'}
                height={1}
                width={1}
                sx={{
                  transition: 'all .2s ease-in-out',
                  '&:hover': {
                    opacity: 0,
                  },
                }}
              >
                <Box
                  key={i}
                  component={LazyLoadImage}
                  effect="blur"
                  
                  src={
                    item.image
                  }
                  height={150}
                  width={150}
                />
              </Box>
            </Box>
          ))}          
        </Box>
      </Container>
    </Box>
  );
};

export default Sponsors;
