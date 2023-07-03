import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { Tabs, TabSelect } from './components';
import { RightSideBar } from './components/RightSideBar';
import { useRouter } from 'next/router';

const lang = {
  en: {
    title: 'Key account survey',
    firstSubtitle:
      'You will receive the results by email within 3-5 business days.',
    secondSubtitle:
      'Also, if there is a change in the API specifications of Instagram, the investigation may be significantly delayed, so we would appreciate your understanding.',
  },
  jp: {
    title: 'キーアカウント調査',
    firstSubtitle: '3~5営業日以内にメールにて結果をお送りします。',
    secondSubtitle:
      'また、InstagramのAPI仕様の変更があった際に、大幅に調査が遅れる場合もありますので、ご理解頂ければ幸いです。',
  },
};

const KeyAccount = ({ userInfo, userPlanInfo }) => {
  const { locale } = useRouter();
  const [type, setType] = useState('influencer');

  return (
    <Fixed userInfo={userPlanInfo} paidOnly={true}>
      <Container className="research key-container">
        <Box marginTop={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            {lang[locale].title}
          </Typography>
          <Typography fontSize={13}>{lang[locale].firstSubtitle}</Typography>
          <Typography fontSize={13} gutterBottom>
            {lang[locale].secondSubtitle}
          </Typography>
          <Box marginTop={4}>
            <TabSelect curType={type} onSelect={setType} />
          </Box>
          <Box marginTop={4}>
            <Tabs curType={type} userInfo={userInfo} />
          </Box>
        </Box>
      </Container>
      <RightSideBar type={type} />
    </Fixed>
  );
};

export default KeyAccount;
