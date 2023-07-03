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

const lang = {
  en: {
    normal: 'Regular',
    business: 'Business',
    creator: 'Creator',
  },
  jp: {
    normal: '一般',
    business: 'ビジネス',
    creator: 'クリエイター',
  },
};

export default function FltInfluencerAccount({
  clearFlag,
  tip,
  icon,
  caption,
  setValues,
  type,
  ...rest
}) {
  const { locale } = useRouter();
  const [itemValue, setItemValue] = useState([]);
  const theme = useTheme();
  const accountTypes = [
    { value: 1, text: lang[locale].normal },
    { value: 2, text: lang[locale].business },
    { value: 3, text: lang[locale].creator },
  ];

  useEffect(() => {
    if (clearFlag === true || clearFlag === false) {
      let items =
        JSON.parse(localStorage.getItem(`${type}Filters`))?.influencer
          ?.accountTypes || [];
      setItemValue(items);
      setAccounts(items, true);
    }
  }, [clearFlag]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAccounts(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const setAccounts = (value, forceClear = false) => {
    const newItemValue = typeof value === 'string' ? value.split(',') : value;
    setItemValue([...newItemValue]);

    if (!forceClear)
      setValues(
        'accountTypes',
        _.map(newItemValue, (itm) => {
          return itm;
        }),
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
          <span className="clear" onClick={(e) => setAccounts([])}>
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
        {_.map(accountTypes, (itm, index) => (
          <MenuItem
            key={itm.value}
            value={itm.value}
            sx={{
              fontSize: '14px',
            }}
          >
            {itm.text}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
