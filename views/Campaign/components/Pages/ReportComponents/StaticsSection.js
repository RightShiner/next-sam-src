/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Box, Typography } from '@mui/material';

const StatisticBox = ({ title, val }) => {
  return (
    <Box className="statistic_box box">
      <Typography className="text_normal">{title}</Typography>
      <Typography className="value">{val}</Typography>
    </Box>
  );
};

const StaticsSection = ({ originData, statisticData }) => {
  let follower_sum = 0;
  for (const item of originData) {
    follower_sum += item?.infProfile?.profile?.followers ?? 0;
  }
  let save = 0;
  let share = 0;
  Object.values(statisticData);
  for (const item of Object.values(statisticData)) {
    save += +(item?.save ?? 0);
    share += +(item?.share ?? 0);
  }
  return (
    <Box display="flex" gap="12px">
      <StatisticBox title="アカウント数" val={originData.length} />
      <StatisticBox title="フォロワー数" val={follower_sum} />
      <StatisticBox title="保存" val={save} />
      <StatisticBox title="シェア" val={share} />
      <StatisticBox title="アサインコスト" val={originData.length} />
    </Box>
  );
};

export default StaticsSection;
