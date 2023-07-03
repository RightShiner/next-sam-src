/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Select, MenuItem, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
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

const weights = Array.from({ length: 19 }, (_, i) => {
  return { value: (i + 1) * 0.05, text: `≥${(i + 1) * 5}%` };
});

export default function FltAudienceLanguage({
  clearFlag,
  tip,
  icon,
  values,
  caption,
  itmKey,
  itmValue,
  setValues,
  ...rest
}) {
  const { locale } = useRouter();
  const [itemValue, setItemValue] = useState('');
  const [filterValue, setFilterValue] = useState({ title: '', weight: 0 });
  const theme = useTheme();
  useEffect(() => {
    if (clearFlag === true || clearFlag === false) setLanguage('', true);
  }, [clearFlag]);

  const setLanguage = (val, forceClear = false) => {
    setItemValue(val);
    if (val !== '') {
      const selItm = _.findIndex(
        values,
        (valItm) => _.get(valItm, itmKey) === val,
      );
      setFilterValue({
        title: _.get(values[selItm], itmValue),
        weight: 0.05 * 6,
      });
    } else {
      setFilterValue({ title: val, weight: 0.05 * 6 });
    }

    if (!forceClear)
      setValues('language', val === '' ? null : { id: val, weight: 0.3 });
  };

  const changeWeightValues = (value) => {
    setFilterValue({ ...filterValue, weight: value });
    setValues({ id: filterValue.title, weight: value });
  };

  const removeFilter = () => {
    setLanguage('');
  };

  return (
    <Box className="flex-sub-wrapper">
      <Box className="search-item-wrapper">
        <Box className="search-item-header">
          <span>{tip}</span>
          {icon === true && <RoundInfo caption={caption} marginLeft={1} />}
        </Box>
        {itemValue !== '' && (
          <span
            className="clear"
            onClick={(e) => setLanguage('')}
            style={{ color: theme.palette.clrVariables.cyanLight }}
          >
            {Keyword[locale].caption.clear}
          </span>
        )}
      </Box>
      <Select
        value={itemValue}
        onChange={(e) => setLanguage(e.target.value)}
        size="small"
        MenuProps={MenuProps}
        sx={{
          fontSize: '14px',
          '& > .MuiSelect-select': {
            backgroundColor: `${
              itemValue !== ''
                ? theme.palette.clrVariables.cyanVeryLight
                : theme.palette.clrVariables.grayWhite
            }`,
          },
          '& > svg': {
            backgroundColor: 'inherit',
          },
          '& fieldset': {
            borderColor: `${
              itemValue !== ''
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
      {filterValue.title !== '' && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '.3rem',
            marginBottom: '.3rem',
            marginLeft: '.3rem',
          }}
        >
          <img
            src={'/images/svgs/smallclose.svg'}
            style={{ width: '6px', height: '6px', cursor: 'pointer' }}
            onClick={(e) => removeFilter()}
          />
          <span
            className="text-ellipse"
            style={{
              flex: 'auto',
              marginLeft: '.5rem',
              minWidth: '80px',
              fontSize: '0.8rem',
            }}
          >
            {filterValue.title}
          </span>
          <Select
            size="small"
            value={filterValue.weight}
            MenuProps={MenuProps}
            onChange={(e) => changeWeightValues(e.target.value)}
            sx={{
              fontSize: '14px',
              '& > .MuiSelect-select': {
                backgroundColor: `${theme.palette.clrVariables.cyanVeryLight}`,
              },
              '& > svg': {
                backgroundColor: 'inherit',
              },
              '& fieldset': {
                borderColor: `${theme.palette.clrVariables.cyanLight}`,
              },
              width: '6rem',
            }}
          >
            {_.map(weights, (weight) => (
              <MenuItem
                key={weight.value}
                value={weight.value}
                sx={{ fontSize: '14px' }}
              >
                {weight.text}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
}
