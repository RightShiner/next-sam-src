/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

export default function FltInfluencerAmount({
  clearFlag,
  tip,
  icon,
  fromStyle,
  toStyle,
  setValues,
}) {
  const { locale } = useRouter();
  const [itemValue, setItemValue] = useState({ from: '', to: '' });
  const theme = useTheme();

  useEffect(() => {
    if (clearFlag === true || clearFlag === false)
      setFollowers({ from: '', to: '' }, true);
  }, [clearFlag]);

  const setFollowers = ({ from, to }, forceClear = false) => {
    setItemValue({ from, to });

    if (forceClear) return;

    if (from === '' && to === '') setValues('amount', {});
    else
      setValues('amount', {
        min: from === '' ? null : from,
        max: to === '' ? null : to,
      });
  };

  return (
    <Box className="flex-sub-wrapper">
      <Box className="search-item-wrapper">
        <Box className="search-item-header">
          <span>{tip}</span>
          {icon === true && <RoundInfo marginLeft={1} />}
        </Box>
        {(itemValue.from !== '' || itemValue.to !== '') && (
          <span
            className="clear"
            onClick={(e) => setFollowers({ from: '', to: '' })}
          >
            {Keyword[locale].caption.clear}
          </span>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          size="small"
          placeholder={'From'}
          style={fromStyle}
          type="number"
          value={itemValue.from}
          onChange={(e) => setFollowers({ ...itemValue, from: e.target.value })}
          inputProps={{
            style: {
              fontSize: '14px',
              backgroundColor: `${
                itemValue.from !== ''
                  ? theme.palette.clrVariables.cyanVeryLight
                  : theme.palette.clrVariables.grayWhite
              }`,
            },
          }}
          sx={{
            '& fieldset': {
              borderColor: `${
                itemValue.from !== ''
                  ? theme.palette.clrVariables.cyanLight
                  : 'rgba(0,0,0,0.23)'
              }`,
            },
          }}
        />
        <TextField
          size="small"
          placeholder={'To'}
          style={toStyle}
          type="number"
          value={itemValue.to}
          onChange={(e) => setFollowers({ ...itemValue, to: e.target.value })}
          inputProps={{
            style: {
              fontSize: '14px',
              backgroundColor: `${
                itemValue.to !== ''
                  ? theme.palette.clrVariables.cyanVeryLight
                  : theme.palette.clrVariables.grayWhite
              }`,
            },
          }}
          sx={{
            '& fieldset': {
              borderColor: `${
                itemValue.to !== ''
                  ? theme.palette.clrVariables.cyanLight
                  : 'rgba(0,0,0,0.23)'
              }`,
            },
          }}
        />
      </Box>
    </Box>
  );
}
