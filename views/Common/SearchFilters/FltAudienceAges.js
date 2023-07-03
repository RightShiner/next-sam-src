/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RoundInfo from 'components/RoundInfo';
import InfoIcon from '@mui/icons-material/Info';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
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

export default function FltAudienceAges({
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
  const [itemValue, setItemValue] = useState([]);
  const [filterValue, setFilterValue] = useState([]);
  const theme = useTheme();

  const setAges = (value, forceClear = false, isFilter) => {
    let newItemValue = typeof value === 'string' ? value.split(',') : value;

    if (forceClear === true) {
      newItemValue = _.map(value, (val) => {
        return val.id;
      });
    }

    let newFilterValue = [];

    _.map(newItemValue, (itm) => {
      const fndIdx = _.findIndex(filterValue, (fltItm) => fltItm.id === itm);
      if (fndIdx === -1)
        newFilterValue.push({
          id: itm,
          weight: ['35-44', '45-64'].includes(itm) ? 4 * 0.05 : 6 * 0.05,
        });
      else newFilterValue.push({ id: itm, weight: filterValue[fndIdx].weight });
    });

    setFilterValue(newFilterValue);
    setItemValue(newItemValue);

    if (!forceClear) setValues('age', newFilterValue);
  };
  useEffect(() => {
    if (clearFlag === true || clearFlag === false) {
      let items =
        JSON.parse(localStorage.getItem(`${type}Filters`))?.audience?.age || '';

      setItemValue(items);
      setAges(items, true, true);
    }
  }, [clearFlag]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAges(value);
  };

  const removeFilter = (itm) => {
    const newItems = _.filter(itemValue, (arrayItm) => arrayItm !== itm.id);
    setItemValue(newItems);
    const newFilters = _.filter(
      filterValue,
      (arrayItm) => arrayItm.id !== itm.id,
    );
    setFilterValue(newFilters);
    setValues('age', newItems);
  };

  const changeWeightValues = (idx, value) => {
    filterValue[idx].weight = value;
    setFilterValue([...filterValue]);
    setValues('age', filterValue);
  };

  return (
    <Box className="flex-sub-wrapper">
      <Box className="search-item-wrapper">
        <Box className="search-item-header">
          <span>{tip}</span>
          {icon === true && <RoundInfo caption={caption} marginLeft={1} />}
        </Box>
        {itemValue.length > 0 && (
          <span className="clear" onClick={(e) => setAges([])}>
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
        renderValue={(selected) => selected.join(', ')}
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
            key={itm}
            value={itm}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '14px',
              padding: '0px 5px 0px 5px',
            }}
          >
            {itm}
            <Checkbox
              checked={itemValue.indexOf(itm) > -1}
              color="success"
              sx={{ '& .MuiSvgIcon-root': { fontSize: 26 } }}
            />
          </MenuItem>
        ))}
      </Select>
      {filterValue.length > 0 &&
        _.map(filterValue, (itm, idx) => (
          <Box
            key={idx}
            sx={{
              display: 'flex',
              //justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '.3rem',
              marginBottom: '.3rem',
              marginLeft: '.3rem',
            }}
          >
            <img
              src={'/images/svgs/smallclose.svg'}
              style={{ width: '6px', height: '6px', cursor: 'pointer' }}
              onClick={(e) => removeFilter(itm)}
            />
            <span className="text-ellipse" style={{ fontSize: '0.8rem' }}>
              {itm.id}
            </span>
            {/* <span className="text-width-40 text-ellipse">{itm.id}</span> */}
            {/* <Select
            size="small"
            value={itm.weight}
            MenuProps={MenuProps}
            onChange={e=>changeWeightValues(idx, e.target.value)}
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
        ))}
    </Box>
  );
}
