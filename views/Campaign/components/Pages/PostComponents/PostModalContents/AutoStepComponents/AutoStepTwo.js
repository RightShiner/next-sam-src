import React, { useState, useEffect, useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {
  LocalizationProvider,
  StaticDateRangePicker,
} from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import jaLocale from 'date-fns/locale/ja';

import { DateToString } from 'libs/commonFunc';

const AutoStepTwo = ({ value, setValue }) => {
  const [startDate, setStartDate] = useState(DateToString(new Date()));
  const [endDate, setEndDate] = useState(null);

  return (
    <Box>
      <Box py={3} display="flex" justifyContent="center">
        <Typography
          variant="body2"
          fontSize="14px"
          sx={{ color: '#814BC7', lineHeight: '2' }}
          gutterBottom
        >
          &#8251; 設定された期間内に投稿されたデータを取得します
          <br />
          &#8251; 1投稿あたりのデータ計測は、投稿された日から1ヶ月です
        </Typography>
      </Box>
      <Box display="flex" mb={2}>
        <Stack
          spacing={2}
          width="50%"
          pr={3}
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ fontSize: '14px', color: 'rgba(48, 48, 48, 0.7)' }}>
            開始
          </Typography>
          <Box
            width="155px"
            height="35px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ background: 'rgba(54, 112, 198, 0.1)', borderRadius: '8px' }}
          >
            <Typography sx={{ color: '#3670C6' }}>{startDate}</Typography>
          </Box>
        </Stack>
        <Stack
          spacing={2}
          width="50%"
          pl={3}
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ fontSize: '14px', color: 'rgba(48, 48, 48, 0.7)' }}>
            終了
          </Typography>
          <Box
            width="155px"
            height="35px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ background: 'rgba(129, 75, 199, 0.1)', borderRadius: '8px' }}
          >
            <Typography sx={{ color: '#814BC7' }}>{endDate ?? '-'}</Typography>
          </Box>
        </Stack>
      </Box>
      <Box display="flex" justifyContent="center">
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
          <StaticDateRangePicker
            className="calendar"
            displayStaticWrapperAs="desktop"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              setStartDate(DateToString(newValue[0]));
              setEndDate(DateToString(newValue[1]));
            }}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};
export default AutoStepTwo;
