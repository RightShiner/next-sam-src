/* eslint-disable react/no-unescaped-entities */
import clsx from 'clsx';
import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';

const strPeriod = ['1週間', '単月', '半年', '1年', 'カスタム'];
const strPay = ['-', 'クレジットカード', 'カスタム'];

const UsageNormal = ({getDatas, classes}) => {
  const [userInfo, setUserInfo] = useState(getDatas());

  return (
    <Box>
      <Typography className={classes.userdetailwrappertitle}>プラン</Typography>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>現在のプラン</Typography>
        <Typography>{userInfo.plantype}</Typography>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>プランの開始日</Typography>
        <Typography>{userInfo.paystart}</Typography>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>プランの終了日</Typography>
        <Typography>{userInfo.payend}</Typography>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>契約月</Typography>
        <Typography>{strPeriod[userInfo.periodtype]}</Typography>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>決済</Typography>
        <Typography>{strPay[userInfo.paytype]}</Typography>
      </Box>
    </Box>
  );
};

export default UsageNormal;