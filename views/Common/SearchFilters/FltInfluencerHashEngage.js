/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Keyword from 'constants/lang';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import Select from '@mui/material/Select';
import RoundInfo from 'components/RoundInfo';

const components = {
  DropdownIndicator: null,
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
    },
  },
};

const gtWeights = Array.from({ length: 9 }, (_, i) => {
  return { value: (i + 2) / 100, operator: 'gt', text: `>${i + 2}%` };
});

const ltWeights = Array.from({ length: 8 }, (_, i) => {
  return { value: (i + 3) / 20, operator: 'gt', text: `>${(i + 3) * 5}%` };
});

const weights = [...gtWeights, ...ltWeights];

const initWeightValue = {
  value: 0.02,
  operator: 'gt',
  text: '>2%',
};

const createOption = (label) => ({
  label: '#' + label,
  tag: label,
  ...initWeightValue,
});

export default function FltInfluencerHashEngage({
  clearFlag,
  icon,
  tip,
  caption,
  phstr,
  setValues,
  type,
}) {
  const theme = useTheme();
  const { locale } = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [itemValue, setItemValue] = useState([]);

  const styles = {
    control: (provided, state) => {
      const borderColor = state.hasValue
        ? theme.palette.clrVariables.cyanLight
        : provided.borderColor;
      const backgroundColor = state.hasValue
        ? theme.palette.clrVariables.cyanVeryLight
        : provided.backgroundColor;

      return { ...provided, backgroundColor, borderColor };
    },
    multiValueRemove: (base) => ({
      ...base,
    }),
    multiValueLabel: (base) => ({
      ...base,
      padding: '3px 8px',
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: '14px',
      color: '#bfc2c7',
    }),
  };

  useEffect(() => {
    if (clearFlag === true || clearFlag === false) {
      let items =
        JSON.parse(localStorage.getItem(`${type}Filters`))?.influencer
          ?.hashtagEngagement || [];

      setItemValue(items);
      setList(items, false, true);
    }
  }, [clearFlag]);

  const setList = (val, forceClear = false, isFilter) => {
    setInputValue('');
    if (!isFilter) {
      if (forceClear === 'clear') {
        setItemValue([]);
        setValues('hashtagEngagement', []);
      } else if (forceClear === 'remove') {
        setItemValue(itemValue.filter((itm) => itm.tag != val));
        setValues(
          'hashtagEngagement',
          itemValue.filter((itm) => itm.tag != val),
        );
      } else {
        setItemValue([...itemValue, createOption(val)]);
        setValues('hashtagEngagement', [...itemValue, createOption(val)]);
      }
    }
  };

  const changeWeightValues = (value, i) => {
    let temp = itemValue.map((itm, idx) => {
      if (idx === i) {
        return { ...itm, ...value };
      } else return itm;
    });

    setItemValue(temp);
    setValues('hashtagEngagement', temp);
  };

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const handleChange = (value, actionMeta) => {
    setList(
      actionMeta?.removedValue?.tag ?? '',
      actionMeta.action === 'clear' ? 'clear' : 'remove',
    );
  };

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    if (itemValue.map((itm) => itm.tag).includes(inputValue)) return;

    switch (event.key) {
      case 'Enter':
      case 'Tab':
        window.getSelection().collapseToEnd();
        setList(inputValue);
        event.preventDefault();
        setInputValue('');
    }
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
        {itemValue.length !== 0 && (
          <span
            className="clear"
            onClick={(e) => setList('', 'clear')}
            style={{ color: theme.palette.clrVariables.cyanLight }}
          >
            {Keyword[locale].caption.clear}
          </span>
        )}
      </Box>
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder={phstr}
        value={itemValue}
        styles={styles}
      />
      {itemValue.map((item, i) => {
        return (
          <Box
            key={i}
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
              onClick={(e) => setList(item.tag, 'remove')}
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
              {item.tag}
            </span>
            <Select
              size="small"
              value={item}
              MenuProps={MenuProps}
              renderValue={(selected) => selected.text}
              onChange={(e) => changeWeightValues(e.target.value, i)}
              sx={{
                fontSize: '14px',
                '& > .MuiSelect-select': {
                  backgroundColor: theme.palette.clrVariables.cyanVeryLight,
                },
                '& > svg': {
                  backgroundColor: 'inherit',
                },
                '& fieldset': {
                  borderColor: theme.palette.clrVariables.cyanLight,
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
        );
      })}
    </Box>
  );
}

FltInfluencerHashEngage.propTypes = {
  clearFlag: PropTypes.bool,
  tip: PropTypes.string.isRequired,
  phstr: PropTypes.string.isRequired,
};
