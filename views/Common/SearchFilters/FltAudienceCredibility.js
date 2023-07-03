/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
    },
  },
};

export default function FltAudienceCredibility({
  clearFlag,
  tip,
  icon,
  values,
  caption,
  setValues,
  type,
  ...rest
}) {
  const { locale } = useRouter();
  const [itemValue, setItemValue] = useState('');
  const theme = useTheme();

  const setCredibility = (value, forceClear = false) => {
    setItemValue(value);
    if (!forceClear) {
      setValues('credibility', value === '' ? null : value);
    }
  };
  useEffect(() => {
    if (clearFlag === true || clearFlag === false) {
      let items =
        JSON.parse(localStorage.getItem(`${type}Filters`))?.audience
          ?.credibility || '';

      setItemValue(items);
      setCredibility(items, true);
    }
  }, [clearFlag]);

  return (
    <Box className="flex-sub-wrapper">
      <Box className="search-item-wrapper">
        <Box className="search-item-header">
          <span>{tip}</span>
          {icon === true && <RoundInfo caption={caption} marginLeft={1} />}
        </Box>
        {itemValue !== '' && (
          <span className="clear" onClick={(e) => setCredibility('')}>
            {Keyword[locale].caption.clear}
          </span>
        )}
      </Box>
      <Select
        value={itemValue}
        onChange={(e) => setCredibility(e.target.value)}
        size="small"
        MenuProps={MenuProps}
        sx={{
          fontSize: '14px',
          '& > .MuiSelect-select': {
            backgroundColor: `${
              itemValue > 0
                ? theme.palette.clrVariables.cyanVeryLight
                : theme.palette.clrVariables.grayWhite
            }`,
          },
          '& > svg': {
            backgroundColor: 'inherit',
          },
          '& fieldset': {
            borderColor: `${
              itemValue > 0
                ? theme.palette.clrVariables.cyanLight
                : 'rgba(0,0,0,0.23)'
            }`,
          },
        }}
        {...rest}
      >
        {_.map(values, (itm) => (
          <MenuItem key={itm.value} value={itm.value} sx={{ fontSize: '14px' }}>
            {itm.text}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
