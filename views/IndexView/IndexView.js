import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import {
  Hero,
  Services,
  Tools,
  Plugins,
  Sponsors,
  Recruiting,
} from './components';

const IndexView = () => {
  const theme = useTheme();

  useEffect(() => {
    Array.from(document.getElementsByTagName('iframe')).forEach((iframe) => {
      iframe.height = window.innerHeight - 63;
      iframe.contentWindow.addEventListener(
        'load',
        () => {
          const doc = iframe.contentWindow.document;
          iframe.height = window.innerHeight - 63;
        },
        true,
      );
      iframe.contentWindow.addEventListener(
        'resize',
        () => {
          iframe.height = window.innerHeight - 63;
        },
        true,
      );
    });
  }, []);

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Main>
        {/* <Hero />
        <Services/>
        <Tools/>
        <Plugins/>
        <Sponsors/>
        <Recruiting/> */}
        {process.env.NEXT_PUBLIC_REGION == 'SG' && (
          <iframe
            src="https://astream-sg-en.firebaseapp.com"
            width="100%"
            borderWidth="0"
          ></iframe>
        )}
      </Main>
    </Box>
  );
};

export default IndexView;
