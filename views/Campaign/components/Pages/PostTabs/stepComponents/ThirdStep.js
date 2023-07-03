/* eslint-disable react/no-unescaped-entities */
import React, { useState, useMemo } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import jaLocale from 'date-fns/locale/ja';
import { DateRangePickerDay as MuiDateRangePickerDay } from '@mui/x-date-pickers-pro/DateRangePickerDay';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import styles from '../contentComponents/styles';
import { useTheme, makeStyles } from '@mui/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgba(0, 0, 0, 0.8)',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
}));

const DateRangePickerDay = styled(MuiDateRangePickerDay)(
  ({
    theme,
    isHighlighting,
    disabled,
    selected,
    today,
    isStartOfHighlighting,
    isEndOfHighlighting,
  }) => ({
    'button:hover': {
      borderRadius: '50% !important',
      backgroundColor: 'inherit',
      borderColor: theme.palette.monitoring.active,
    },
    ...(today && {
      button: {
        color: theme.palette.monitoring.active,
        border: 'none !important',
      },
    }),
    ...(selected && {
      borderRadius: '50%',
      overflow: 'hidden',
      button: {
        backgroundColor: `${theme.palette.monitoring.active} !important`,
      },
    }),
    ...(disabled && {
      'button:disabled': {
        backgroundColor: 'inherit !important',
      },
    }),
    ...(isStartOfHighlighting && {
      borderRadius: 'none',
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
      overflow: 'hidden',
    }),
    ...(isEndOfHighlighting && {
      borderRadius: 'none',
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
      overflow: 'hidden',
    }),
  }),
);

const ThirdStep = ({ value, setValue }) => {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, { defaultTheme: theme });
  }, [theme]);
  const classes = useStyles();

  return (
    <Box my={2} sx={{ width: 'fit-content' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
        <DateRangePicker
          calendars={1}
          startText=""
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          minDate={Date.now()}
          className={classes.pickerCalendar}
          renderDay={(date, dateRangePickerDayProps) => {
            if (dateRangePickerDayProps.disabled) {
              return (
                <DateRangePickerDay key={date} {...dateRangePickerDayProps} />
              );
            } else {
              const title = dateRangePickerDayProps.isPreviewing
                ? '終了日を選択してください'
                : '開始日を選択してください';
              return (
                <BootstrapTooltip key={date} title={title} placement="top">
                  <DateRangePickerDay {...dateRangePickerDayProps} />
                </BootstrapTooltip>
              );
            }
          }}
          renderInput={(startProps, endProps) => {
            const startValue = startProps.inputProps.value;
            delete startProps.inputProps.value;
            delete startProps.inputProps.placeholder;
            return (
              <React.Fragment>
                <TextField
                  size="small"
                  {...startProps}
                  placeholder="yyyy/mm/dd ~ yyyy/mm/dd"
                  value={
                    !!startValue
                      ? `${startValue} ~ ${endProps.inputProps.value}`
                      : ''
                  }
                  sx={{
                    width: '15em',
                    '& input': {
                      height: '20px',
                      cursor: 'pointer',
                    },
                  }}
                />
              </React.Fragment>
            );
          }}
        />
      </LocalizationProvider>
      <Box mt={1}>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          &#8251;開始後に計測期間を変更することはできません
        </Typography>
      </Box>
    </Box>
  );
};

export default ThirdStep;

ThirdStep.propTypes = {
  // curType: PropTypes.string.isRequired,
  // selCampId: PropTypes.string.isRequired,
  // catType: PropTypes.string.isRequired,
};
