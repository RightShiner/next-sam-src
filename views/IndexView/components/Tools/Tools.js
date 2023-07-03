import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from 'components/Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ToolItem } from '../../components';

const mock = [
  {
    type: 'DISCOVERY',
    title: 'Find influencers who exceed expectations',
    color: '#f26d40',
    image: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9ef69bfb9a925190fe8d_web_illustration_01.svg',
    bio: '100,000,000+ Influencers across all major platforms — easily filter to find the ones who reach your audience',
    text1: 'Get a list of every influencer who reaches your audience anywhere in the world. Lookalike audiences and recommendations help you get more of what works best.',
    text2: '\"We have run thousands of searches through Modash without fail, finding influencers for clients like Aldi UK and Warner Leisure Hotels. Within a few clicks, there are results we\'re super happy with.\"',
    avatar: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1abc6548ff5b0f466ba037_paul_strong.png',
    name: 'Paul Strong',
    profile: 'Creative Director at Hoopla Marketing UK'
  },
  {
    type: 'INSIGHTS',
    title: 'Don’t leave money on the table.. Or have it stolen by fake followers',
    color: '#ef476f',
    image: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/6108d9b1a1b1d51aaf4b858c_web_illustration_11.svg',
    bio: 'Get in depth audience and influencer data. Fake followers, demographics, contact info and performance insights.',
    text1: 'Start verifying influencer audiences without contacting them, check fake followers, get contact details for the ones who reach your target audience and use analytics to optimize your decisions over time.',
    text2: '\"We’re working with hundreds of influencers globally. Modash is our go-to for verifying Instagram influencers’ accounts at scale.\"',
    avatar: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f183f9c506b5a370d7f67d4_mykhailo_kudla.jpg',
    name: 'Mykhailo Kudla',
    profile: 'Global Marketing Partnerships Lead at Bolt'
  },
  {
    type: 'MONITORING',
    title: 'Track campaigns and never screenshot a post or story again',
    color: '#8338ec',
    image: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e9ef992078c2d901bb19e_web_illustration_12.svg',
    bio: 'Be first to know when influencer posts go live and if they match campaign guidelines. Get alerts, export content & more.',
    text1: 'You tell us who to track, we’ll collect your branded content, let you know who posted when they post, alert you to any missing hashtags, and help you comply with laws and regulations.',
    text2: '\"Modash allows so much scale, that our customers began having trouble keeping up with the content being posted. We built monitoring to stay on top of posts and guidelines, so they don’t have to.\"',
    avatar: 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1abc6637e38d0f28430c1d_avery_schrader.png',
    name: 'Avery Schrader',
    profile: 'Founder & CEO of Modash'
  },
];

const Tools = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        backgroundColor={'#f7f7ff'}
        padding={'80px 0 100px'}
        borderBottom={'2px solid #ebecff'}
      >
        <Box marginBottom={4}>
          
          <Typography
            variant="h3"
            align={'center'}
            data-aos={'fade-up'}
            gutterBottom
            color={'text.primary'}
            sx={{
              fontWeight: 'bold',
              marginTop: theme.spacing(1),
            }}
          >
            Influencer tools for growth focused marketers
          </Typography>
          <Typography
            variant="h6"
            align={'center'}
            color={'text.primary'}
            data-aos={'fade-up'}
            marginTop={theme.spacing(5)}
            fontWeight={'bold'}
          >
            We help you grow your business with influencers while reducing your cost per acquisition (CPA).<br/>
            We support every step in your influencer partnerships.
          </Typography>
          
        </Box>
        <Container>
          <Box
            display={'flex'}
            columnGap={'5%'}
          >
            {mock.map((item, i) => (
              <Box
                key={i}
                width={1}
                height={1}
                data-aos={'fade-up'}
                data-aos-delay={i * 100}
              >
                <Typography
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: '700',
                  }}
                  gutterBottom
                  color={item.color}
                  align={'center'}
                >
                  {item.type}
                </Typography>
                <Box 
                  component='a'
                  href={ '#' + item.type }
                >
                  <Box
                    component={LazyLoadImage}
                    effect="blur"
                    src={
                      item.image
                    }
                    height={1}
                    width={1}
                  />
                </Box>
                <Typography
                  fontWeight={'medium'}
                  gutterBottom
                  color={'text.primary'}
                  align={'center'}
                >
                  {item.bio}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Box
        backgroundColor={'#d6daff'}
      >
        <Container>
          <Grid container spacing={2}>
            <Grid 
              item
              xs={6}
              display={'flex'}
              alignItems={'center'}
            >
              <Typography
                variant="h3"
                align={'left'}
                color={'text.primary'}
                data-aos={'fade-up'}
                fontWeight={'bold'}
              >
               Not just another<br/>
               influencer marketing<br/>
               platform
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant={'h6'}
                align={'left'}
                color={'text.primary'}
                data-aos={'fade-up'}
                fontWeight={'bold'}
              >
               Other platforms lock you in to long term contracts, upsell you ineffective services, lie to your face about data accuracy and forget what matters most: Growing your business!
              </Typography>
              <Box marginTop={5}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fontWeight={'bold'}
                >
                  BOOK A CALL
                </Button>
              </Box>
              <Typography
                align={'left'}
                color={'text.secondary'}
                data-aos={'fade-up'}
                fontWeight={'500'}
                marginTop={5}
              >
                Ask us why we're 20% more accurate than the leading alternative.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {mock.map((content, i) => (
        <ToolItem key={i} item={content}></ToolItem>
      ))}
    </Box>
  );
};

export default Tools;
