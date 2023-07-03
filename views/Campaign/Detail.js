import React, { useState } from 'react';
import { Box } from '@mui/material';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { TabSelect, Tabs } from './components';
import { TitleBox } from './components/TitleBox';
import { InfluencerBrief } from '../Common';

const Detail = ({ userInfo, cmpId, cmpName, cmpSns }) => {
  const [selType, onSelect] = useState('list');
  return (
    <Fixed userInfo={userInfo}>
      <Container className="content-wrapper">
        <TitleBox cmpId={cmpId} cmpName={cmpName} />
        <Box marginTop={4}>
          <TabSelect curType={selType} onSelect={onSelect} />
        </Box>
        <Box marginTop={4}>
          <Tabs
            userInfo={userInfo}
            curType={selType}
            campaignId={cmpId}
            campaignSNS={cmpSns}
          />
        </Box>
        <InfluencerBrief />
      </Container>
    </Fixed>
  );
};

export default Detail;
