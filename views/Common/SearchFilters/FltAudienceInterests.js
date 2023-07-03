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

const weights = Array.from({ length: 19 }, (_, i) => {
  return { value: (i + 1) * 0.05, text: `≥${(i + 1) * 5}%` };
});

export default function FltAudienceInterests({
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
  const [filterValue, setFilterValue] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (clearFlag === true || clearFlag === false) {
      let items =
        JSON.parse(localStorage.getItem(`${type}Filters`))?.audience
          ?.interests || [];

      setItemValue(items?.map((itm) => itm.id) || []);
      setInterests(items, true, true);
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

  const setInterests = (value, forceClear = false, isFilter) => {
    let newItemValue = typeof value === 'string' ? value.split(',') : value;

    let newFilterValue = [];

    if (isFilter && forceClear) {
      newFilterValue = value;
    } else {
      _.map(newItemValue, (itm) => {
        const fndIdx = _.findIndex(filterValue, (fltItm) => fltItm.id === itm);

        const selItm = _.findIndex(
          values,
          (valItm) => _.get(valItm, itmKey) === itm,
        );

        if (fndIdx === -1) {
          newFilterValue.push({
            id: itm,
            weight: 6 * 0.05,
            text: _.get(values[selItm], itmValue),
            origin: _.get(values[selItm], 'origin'),
          });
        } else {
          newFilterValue.push({
            id: itm,
            weight: filterValue[fndIdx].weight,
            text: _.get(values[selItm], itmValue),
            origin: _.get(values[selItm], 'origin'),
          });
        }
      });
    }

    newItemValue = isFilter ? value.map((itm) => itm.id) : value;
    setFilterValue(newFilterValue);
    setItemValue(newItemValue);
    if (!forceClear) setValues('interests', newFilterValue);
  };

  const removeFilter = (itm) => {
    const newItems = _.filter(itemValue, (arrayItm) => arrayItm !== itm.id);
    setInterests(newItems);
  };

  const changeWeightValues = (idx, value) => {
    filterValue[idx].weight = value;
    setFilterValue([...filterValue]);
    setValues(setValues('interests', filterValue));
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
            <span
              className="text-ellipse"
              style={{
                flex: 'auto',
                marginLeft: '.5rem',
                width: '60px',
                fontSize: '0.8rem',
              }}
            >
              {itm.text}
            </span>
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
