/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { Box, Select, MenuItem, Button } from '@mui/material';
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

export default function FltAudienceGender({
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
  const [filterValue, setFilterValue] = useState({
    title: '',
    val: '',
    weight: 0,
  });
  const theme = useTheme();

  useEffect(() => {
    if (clearFlag === true || clearFlag === false) {
      let items =
        JSON.parse(localStorage.getItem(`${type}Filters`))?.audience?.gender ||
        '';

      setItemValue(items);
      setGenderValue(items, true);
    }
  }, [clearFlag]);

  const setGenderValue = (val, forceClear = false) => {
    setItemValue(val);

    if (val !== '') {
      _.map(values, (itm) => {
        if (itm.id === val)
          setFilterValue({ title: itm.text, val: itm.id, weight: 0.05 * 6 });
      });
    } else {
      setFilterValue({ title: '', val: '', weight: 0 });
    }
    if (!forceClear) setValues('gender', val === '' ? null : val);
  };

  const changeWeightValues = (value) => {
    setFilterValue({ ...filterValue, weight: value });
    setValues('gender', filterValue.val);
  };

  const removeFilter = () => {
    setGenderValue('');
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
            onClick={(e) => setGenderValue('')}
            style={{ color: theme.palette.clrVariables.cyanLight }}
          >
            {Keyword[locale].caption.clear}
          </span>
        )}
      </Box>
      <Select
        value={itemValue}
        onChange={(e) => setGenderValue(e.target.value)}
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
          <MenuItem key={itm.id} value={itm.id} sx={{ fontSize: '14px' }}>
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
              minWidth: '20px',
              fontSize: '0.8rem',
            }}
          >
            {filterValue.title}
          </span>
          {/* <Select
            size="small"
            value={filterValue.weight}
            MenuProps={MenuProps}
            onChange={e=>changeWeightValues(e.target.value)}
            sx={{
              fontSize:'14px',
              '& > .MuiSelect-select': {
                backgroundColor: `${theme.palette.clrVariables.cyanVeryLight}`
              },
              '& > svg': {
                backgroundColor: 'inherit'
              },
              '& fieldset': {
                borderColor:`${theme.palette.clrVariables.cyanLight}`
              },
              width: '6rem'
            }}
          >
            {_.map(weights, weight=> (
              <MenuItem
                key={weight.value}
                value={weight.value}
                sx={{fontSize:'14px'}}
              >
                {weight.text}
              </MenuItem>
            ))}
          </Select> */}
        </Box>
      )}
    </Box>
  );
}
