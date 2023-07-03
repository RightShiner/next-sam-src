/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';

export default function FltInfluencerMemo({
  clearFlag,
  tip,
  icon,
  phstr,
  caption,
  setValues,
  ...rest
}) {
  const { locale } = useRouter();
  const theme = useTheme();
  const [itemValue, setItemValue] = useState('');
  useEffect(() => {
    if (clearFlag === true || clearFlag === false) setMemo('', true);
  }, [clearFlag]);

  const setMemo = (val, forceClear = false) => {
    setItemValue(val);

    if (!forceClear) setValues('memo', val === '' ? null : val);
  };

  return (
    <Box className="flex-sub-wrapper">
      <Box className="search-item-wrapper">
        <Box
          className="search-item-header"
          sx={{ height: tip ? 'unset' : '21px' }}
        >
          <span>{tip}</span>
          {icon === true && <RoundInfo caption={caption} marginLeft={1} />}
        </Box>
        {itemValue !== '' && (
          <span
            className="clear"
            onClick={(e) => setMemo('')}
            style={{ color: theme.palette.clrVariables.cyanLight }}
          >
            {Keyword[locale].caption.clear}
          </span>
        )}
      </Box>
      <TextField
        size="small"
        placeholder={phstr}
        {...rest}
        value={itemValue}
        onChange={(e) => setMemo(e.target.value)}
        inputProps={{
          style: {
            fontSize: '14px',
            backgroundColor: `${
              itemValue !== ''
                ? theme.palette.clrVariables.cyanVeryLight
                : theme.palette.clrVariables.grayWhite
            }`,
          },
        }}
        sx={{
          '& fieldset': {
            borderColor: `${
              itemValue !== ''
                ? theme.palette.clrVariables.cyanLight
                : 'rgba(0,0,0,0.23)'
            }`,
          },
        }}
      />
    </Box>
  );
}
