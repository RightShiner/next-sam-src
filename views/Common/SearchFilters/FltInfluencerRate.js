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

const options = Array.from({ length: 6 }, (_, i) => {
  return { value: (i + 1) * 30, text: `${i + 1}ヶ月` };
});

const weights = Array.from({ length: 90 }, (_, i) => {
  return {
    value: `${i < 40 ? 'a' : 'b'}${i < 40 ? (i + 1) * 0.1 : (i - 39) * 0.1}`,
    text: `${i < 40 ? '>' : '<'}${i < 40 ? (i + 1) * 10 : (i - 39) * 10}%`,
  };
});

export default function FltInfluencerRate({
  clearFlag,
  tip,
  icon,
  caption,
  setValues,
  ...rest
}) {
  const { locale } = useRouter();
  const [itemValue, setItemValue] = useState('');
  const [filterValue, setFilterValue] = useState({ title: '', weight: '' });
  const theme = useTheme();
  useEffect(() => {
    if (clearFlag === true || clearFlag === false) setRate('', true);
  }, [clearFlag]);

  const setRate = (val, forceClear = false) => {
    setItemValue(val);

    if (forceClear) return;

    if (val !== '') {
      const selItm = _.findIndex(options, (valItm) => valItm.value === val);
      setFilterValue({ title: options[selItm].text, weight: 'a1.5' });
    } else {
      setFilterValue({ title: '', weight: '' });
    }
    //setValues('language', val === '' ? null : {id:val, weight:'a1.5'});
  };

  const changeWeightValues = (value) => {
    setFilterValue({ ...filterValue, weight: value });
    //setValues({id:itemValue, weight:value});
  };

  const removeFilter = () => {
    setRate('');
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
            onClick={(e) => setRate('')}
            style={{ color: theme.palette.clrVariables.cyanLight }}
          >
            {Keyword[locale].caption.clear}
          </span>
        )}
      </Box>
      <Select
        value={itemValue}
        onChange={(e) => setRate(e.target.value)}
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
        {_.map(options, (itm) => (
          <MenuItem key={itm.value} value={itm.value} sx={{ fontSize: '14px' }}>
            {itm.text}
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
