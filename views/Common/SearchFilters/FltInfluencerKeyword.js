/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';
import { useRouter } from 'next/router';

export default function FltTextField({
  clearFlag,
  tip,
  icon,
  phstr,
  caption,
  setValues,
  type,
  ...rest
}) {
  const { locale } = useRouter();
  const theme = useTheme();
  const [itemValue, setItemValue] = useState('');

  useEffect(() => {
    if (clearFlag === true || clearFlag === false) {
      let items =
        JSON.parse(localStorage.getItem(`${type}Filters`))?.influencer
          ?.keywords || '';

      setItemValue(items);
      setKeyword(items, true);
    }
  }, [clearFlag]);

  const setKeyword = (val, forceClear = false) => {
    setItemValue(val);
    if (forceClear) return;

    setValues('keywords', val);
  };

  return (
    <Box className="flex-sub-wrapper">
      <Box className="search-item-wrapper">
        <Box
          className="search-item-header"
          sx={{ height: tip ? 'unset' : '21px' }}
        >
          <span>{tip}</span>
          {icon && <RoundInfo caption={caption} marginLeft={1} />}
        </Box>
        {itemValue !== '' && (
          <span
            className="clear"
            onClick={(e) => setKeyword('')}
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
        onChange={(e) => setKeyword(e.target.value)}
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

FltTextField.propTypes = {
  clearFlag: PropTypes.bool,
  tip: PropTypes.string.isRequired,
  phstr: PropTypes.string.isRequired,
  icon: PropTypes.bool.isRequired,
  caption: PropTypes.string,
};
