/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import jaLocale from 'date-fns/locale/ja';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';

const StatusBar = ({ period, setPeriod, setOpen }) => {
  return (
    <Box className="status_bar box">
      <Box>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
          <DateRangePicker
            calendars={1}
            startText=""
            value={period}
            inputFormat="MM/dd"
            onChange={(newValue) => {
              setPeriod(newValue);
            }}
            className="date_picker_calendar"
            renderInput={(startProps, endProps) => {
              const startValue = startProps.inputProps.value;
              delete startProps.inputProps.value;
              return (
                <React.Fragment>
                  <Box>
                    <TextField
                      variant="standard"
                      size="small"
                      InputProps={{ disableUnderline: true }}
                      {...startProps}
                      value={
                        period[0] === null
                          ? '日付を選択'
                          : `${startValue} ~ ${endProps.inputProps.value}`
                      }
                      sx={{
                        width: '160px',
                        '& input': {
                          height: '18px',
                          cursor: 'pointer',
                        },
                      }}
                    />
                  </Box>
                </React.Fragment>
              );
            }}
          />
        </LocalizationProvider>
      </Box>
      <Box gap={1} display="flex" alignItems="center">
        <Button className="bar_download_button" onClick={() => setOpen(true)}>
          フィルター
        </Button>
        <IconButton className="bar_download_button" sx={{ p: '8px!important' }}>
          <img src={'/images/monitoring/download.png'} alt="download" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default StatusBar;
