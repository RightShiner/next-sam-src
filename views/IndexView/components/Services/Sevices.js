/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const mock = [
  {
    title: 'Instagram',
    icon: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e98a65a04f3a82f12e54c_channel_instagram.svg',
    link: '/'
  },
  {
    title: 'YouTube',
    icon: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e98a7f60f94c223607cd7_channel_youtube.svg',
    link: '/'
  },
  {
    title: 'TikTok',
    icon: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e98a6db81f1c3429618c2_channel_tiktok.svg',
    link: '/'
  },
]

const Services = () => {
  const theme = useTheme();
  return (
    <Box 
      backgroundColor={'#f7f7ff'}
      padding={'100px 0 150px'}
      borderBottom={'2px solid #ebecff'}
    >
      <Box marginBottom={4}>
        <Typography
          variant="h5"
          color="text.primary"
          align={'center'}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          We list every influencer globally on:
        </Typography>
      </Box>
      <Box 
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        columnGap={'10%'}
        height={'250px'}
      >
        {mock.map((item, i) => (
          <Box
            key={i}
            display={'block'}
            data-aos={'zoom-in-up'}
          >
            <Box
              display={'block'}
              sx={{
                transition: 'all .5s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-12px)',
                },
              }}
            >
              <Box
                component={LazyLoadImage}
                effect="blur"
                src={
                  item.icon
                }
                height={120}
                width={120}
              />
            </Box>
            <Typography
              variant={'h6'}
              align={'center'}
              sx={{ fontWeight: 500, marginTop: 2 }}
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Services;
