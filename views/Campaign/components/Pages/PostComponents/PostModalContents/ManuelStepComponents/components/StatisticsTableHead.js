import React from 'react';
import { TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import jaLocale from 'date-fns/locale/ja';

const StatisticsTableHead = ({
  kind,
  title,
  columns,
  property,
  handleChange,
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{
            minWidth: '300px',
            fontWeight: 'bold',
            background: 'rgba(48, 48, 48, 0.1)',
          }}
        >
          {title}
        </TableCell>
        {Array.from({ length: columns }, (_, key) => {
          return (
            <TableCell
              key={key}
              sx={{
                minWidth: '100px',
                background: 'rgba(54, 112, 198, 0.1)',
              }}
            >
              {kind === 'confirm' ? (
                new Date(
                  property?.statistics?.[key]?.date ?? null,
                ).toLocaleDateString('ja-Ja', {
                  month: '2-digit',
                  day: '2-digit',
                })
              ) : (
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={jaLocale}
                >
                  <MobileDatePicker
                    className="date_picker"
                    inputFormat="MM/dd"
                    value={property?.statistics?.[key]?.date ?? null}
                    onChange={(newValue) => {
                      handleChange('main', key, 'date', newValue);
                    }}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    renderInput={(params) => {
                      return <TextField variant="standard" {...params} />;
                    }}
                  />
                </LocalizationProvider>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default StatisticsTableHead;
