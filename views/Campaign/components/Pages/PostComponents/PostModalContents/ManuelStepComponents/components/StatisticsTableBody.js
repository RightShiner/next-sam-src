import React from 'react';
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import jaLocale from 'date-fns/locale/ja';

const EndAdornment = ({ type, row }) => {
  let value = '';
  if (type === 'audience') {
    if (row.key.startsWith('age_') || row.key === 'japan') value = '%';
  } else {
    switch (row.key) {
      case 'play_time_sum_hour':
        value = '時間';
        break;
      case 'play_time_sum_min':
        value = '分';
        break;
      case 'play_time_sum_sec':
        value = '秒';
        break;
      case 'avg_audience_time':
        value = '秒';
        break;
      case 'full_video':
        value = '%';
        break;
      case 'recommendation':
        value = '%';
        break;
      default:
        break;
    }
  }
  return <InputAdornment position="end">{value}</InputAdornment>;
};

const StatisticsTableBody = ({
  kind,
  rows,
  columns,
  type,
  property,
  handleChange,
}) => {
  const value = (row, key) => {
    let temp = 0;
    if (type === 'main') {
      if (row.key === 'play_time_sum') {
        let hr = property?.statistics?.[key]?.play_time_sum_hour ?? '';
        let min = property?.statistics?.[key]?.play_time_sum_min ?? '';
        let sec = property?.statistics?.[key]?.play_time_sum_sec ?? '';
        temp =
          hr === '' && min === '' && sec === ''
            ? '自動'
            : hr + ':' + min + ':' + sec;
      } else {
        temp = property?.statistics?.[key]?.[row.key] ?? '';
      }
    } else {
      temp = property?.statistics?.[key]?.audience?.[row.key] ?? '';
    }
    return temp;
  };

  const className = (row) => {
    let name = '';
    if (row.key === 'play_time_sum') name = 'play_time_sum';
    if (
      row.key === 'play_time_sum_hour' ||
      row.key === 'play_time_sum_min' ||
      row.key === 'play_time_sum_sec'
    )
      name = 'sub_play_time_sum';
    return name;
  };

  return (
    <TableBody>
      {rows.map((row, i) => (
        <TableRow
          key={i}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell className={row.isChildren ? 'sub_item' : 'item'}>
            {row.isChildren ? `${'・' + row.name}` : row.name}
          </TableCell>
          {Array.from({ length: columns }, (_, key) => {
            return (
              <TableCell key={key}>
                {kind === 'confirm' ? (
                  value(row, key)
                ) : (
                  <TextField
                    value={value(row, key)}
                    onChange={(e) =>
                      handleChange(type, key, row.key, e.target.value)
                    }
                    className={className(row)}
                    variant="standard"
                    disabled={row.hasChildren && row.key !== 'play_time_sum'}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: <EndAdornment type={type} row={row} />,
                    }}
                  />
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default StatisticsTableBody;
