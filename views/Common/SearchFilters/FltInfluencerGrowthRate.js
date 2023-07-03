/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
    },
  },
};

const gtWeights = Array.from({ length: 40 }, (_, i) => {
  return { value: (i + 1) / 10, operator: 'gt', text: `>${(i + 1) * 10}%` };
});

const ltWeights = Array.from({ length: 50 }, (_, i) => {
  return { value: (i + 1) / 10, operator: 'lt', text: `<${(i + 1) * 10}%` };
});

const weights = [...gtWeights, ...ltWeights];

const initWeightValue = {
  value: 1.5,
  operator: 'gt',
  text: '>150%',
};

export default function FltInfluencerGrowthRate({
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
  const [weightValue, setWeightValue] = useState('');
  const theme = useTheme();
  
  useEffect(() => {  
    if (clearFlag === true || clearFlag === false) {
      let items = JSON.parse(localStorage.getItem(`${type}Filters`))?.influencer?.followersGrowthRate;
      items = items || [];
      
      setWeightValue(items.weight ?? initWeightValue);
      setGrowthRate(items.month ?? '', true, true);
    }
  }, [clearFlag]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setGrowthRate(value);
  };

  const setGrowthRate = (val, forceClear = false, isFilter) => {  
    setItemValue(val);    

    if (val === '') {
      setWeightValue(initWeightValue);
      setValues('followersGrowthRate', null);
    } else {
      setValues('followersGrowthRate', {
        interval: `i${val}month` + (val > 1 ? 's' : ''),
        weight: weightValue,
        month: val,
      });        
    }
  };

  const changeWeightValues = (value) => {
    setWeightValue(value);
    setValues('followersGrowthRate', {
      interval: `i${itemValue}month` + (itemValue > 1 ? 's' : ''),
      weight: value,
      month: itemValue,
    });
  };

  return (
    <Box className="flex-sub-wrapper">
      <Box className="search-item-wrapper">
        <Box className="search-item-header">
          <span>{tip}</span>
          {icon === true && <RoundInfo caption={caption} marginLeft={1} />}
        </Box>
        {itemValue !== '' && (
          <span className="clear" onClick={(e) => setGrowthRate('')}>
            {Keyword[locale].caption.clear}
          </span>
        )}
      </Box>
      <Select
        value={itemValue}
        onChange={handleChange}
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
        {_.map(values, (itm, index) => (
          <MenuItem key={index} value={itm.value} sx={{ fontSize: '14px' }}>
            {itm.text}
          </MenuItem>
        ))}
      </Select>
      {itemValue !== '' && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '.3rem',
            marginBottom: '.3rem',
            marginLeft: '.3rem',
          }}
        >
          <img
            src={'/images/svgs/smallclose.svg'}
            style={{ width: '6px', height: '6px', cursor: 'pointer' }}
            onClick={(e) => setGrowthRate('')}
          />
          <span
            className="text-ellipse"
            style={{
              flex: 'auto',
              marginLeft: '.5rem',
              width: '60px',
              fontSize: '0.8rem',
            }}
          >
            {`${itemValue}ヶ月`}
          </span>
          <Select
            size="small"
            value={weightValue}
            MenuProps={MenuProps}
            renderValue={(selected) => selected.text}
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
            {_.map(weights, (weight, idx) => (
              <MenuItem key={idx} value={weight} sx={{ fontSize: '14px' }}>
                {weight.text}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
}
