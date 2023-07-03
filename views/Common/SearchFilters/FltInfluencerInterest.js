/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RoundInfo from 'components/RoundInfo';
import InfoIcon from '@mui/icons-material/Info';
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

export default function FltInfluencerInterest({
  clearFlag,
  tip,
  icon,
  values,
  itmKey,
  itmValue,
  caption,
  setValues,
  type,
  ...rest
}) {
  const { locale } = useRouter();
  const [itemValue, setItemValue] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (clearFlag === true || clearFlag === false) {
      let items =
        JSON.parse(localStorage.getItem(`${type}Filters`))?.influencer
          ?.interests || [];
      setInterests(items, true);
    }
  }, [clearFlag]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterests(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const setInterests = (value, forceClear = false) => {
    setItemValue(typeof value === 'string' ? value.split(',') : value);
    if (!forceClear)
      setValues(
        'interests',
        typeof value === 'string' ? value.split(',') : value,
      );
  };

  return (
    <Box className="flex-sub-wrapper">
      <Box className="search-item-wrapper">
        <Box className="search-item-header">
          <span>{tip}</span>
          {icon === true && <RoundInfo caption={caption} marginLeft={1} />}
        </Box>
        {itemValue.length > 0 && (
          <span className="clear" onClick={(e) => setInterests([])}>
            {Keyword[locale].caption.clear}
          </span>
        )}
      </Box>
      <Select
        multiple
        value={itemValue}
        onChange={handleChange}
        size="small"
        MenuProps={MenuProps}
        sx={{
          fontSize: '14px',
          '& > .MuiSelect-select': {
            backgroundColor: `${
              itemValue.length > 0
                ? theme.palette.clrVariables.cyanVeryLight
                : theme.palette.clrVariables.grayWhite
            }`,
          },
          '& > svg': {
            backgroundColor: 'inherit',
          },
          '& fieldset': {
            borderColor: `${
              itemValue.length > 0
                ? theme.palette.clrVariables.cyanLight
                : 'rgba(0,0,0,0.23)'
            }`,
          },
        }}
        {...rest}
      >
        {_.map(values, (itm) => (
          <MenuItem
            key={_.get(itm, itmKey)}
            value={_.get(itm, itmKey)}
            sx={{ fontSize: '14px' }}
          >
            {_.get(itm, itmValue)}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
