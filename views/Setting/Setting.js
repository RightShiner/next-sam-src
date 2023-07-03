import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { InfluencerBrief } from '../Common';
import { FilterSelect, PlanContent } from './components';
import toast from 'react-hot-toast';
import { planService } from 'services';

import Keyword from 'constants/lang';

const lang = {
  en: {
    success: 'STRIPE payment was successful.',
    error: 'STRIPE payment failed.',
  },
  jp: {
    success: 'STRIPE支払いが成功しました。',
    error: 'STRIPE支払いが失敗しました。',
  },
};

const Setting = ({ user }) => {
  const router = useRouter();
  const { status, type } = router.query;

  const [selType, onSelect] = useState('plan');

  const switchToUpgrade = () => {
    onSelect('upgrade');
  };

  useEffect(() => {
    if (!status) return;

    if (status === 'cancel') {
      toast.error(lang[router.locale].error);
      return;
    }

    toast.success(lang[router.locale].success);
    return planService
      .updatePayStatus(user.id, type, true)
      .then((response) => {})
      .catch((ex) => {
        console.log(ex.toString());
      });
  }, [status, type]);

  return (
    <Fixed userInfo={user}>
      <Container className="research content-wrapper">
        <Box marginTop={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            {Keyword[router.locale].nav.plan}
          </Typography>
        </Box>
        <Box marginTop={4}>
          <FilterSelect curType={selType} onSelect={onSelect} />
        </Box>
        <Box marginTop={2} data-aos={'fade-up'}>
          <PlanContent
            user={user}
            selType={selType}
            switchToUpgrade={switchToUpgrade}
          />
        </Box>
        <InfluencerBrief />
      </Container>
    </Fixed>
  );
};

export default Setting;
