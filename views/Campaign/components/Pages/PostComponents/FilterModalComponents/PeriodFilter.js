import React, { useState, useEffect, useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {
  LocalizationProvider,
  StaticDateRangePicker,
} from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import jaLocale from 'date-fns/locale/ja';

import { DateToString } from 'libs/commonFunc';

const PeriodFilter = ({ filter, setFilter }) => {
  const [startDate, setStartDate] = useState(DateToString(new Date()));
  const [endDate, setEndDate] = useState(null);

  const handleClear = () => {
    setFilter((prev) => ({ ...prev, period: undefined }));
  };

  return (
    <Stack spacing={3}>
      <Box className="section_title">
        <Typography className="title">日時</Typography>
        <Typography className="clear" onClick={handleClear}>
          リセット
        </Typography>
      </Box>
      <Box className="filter_period_section">
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
            value={filter?.period ?? [null, null]}
            onChange={(newValue) => {
              setFilter((prev) => ({ ...prev, period: newValue }));
              setStartDate(DateToString(newValue[0]));
              setEndDate(DateToString(newValue[1]));
            }}
          />
        </LocalizationProvider>
      </Box>
    </Stack>
  );
};

export default PeriodFilter;
