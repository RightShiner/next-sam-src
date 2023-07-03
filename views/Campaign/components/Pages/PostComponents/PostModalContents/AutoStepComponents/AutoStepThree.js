import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Radio,
  RadioGroup,
  Typography,
  FormControlLabel,
  Button,
  Checkbox,
  FormControl,
  Switch,
  styled,
} from '@mui/material';

import {
  FltInfluencerHash,
  FltInfluencerMention,
} from 'views/Common/SearchFilters';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 38,
  height: 22,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#3670C6' : '#3670C6',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#3670C6',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 18,
    height: 18,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const AutoStepThree = ({
  checked,
  setChecked,
  searchType,
  setSearchType,
  collections,
  setCollections,
}) => {
  const handleOperator = (tag, items, field) => {
    let fieldArray = items.map((item) => {
      return item.value;
    });

    setCollections({
      ...collections,
      [field]: fieldArray,
    });
  };

  const handleSwitchChange = (e) => {
    setChecked(e.target.checked);
    if (!e.target.checked) {
      setCollections((collections) => ({
        ...collections,
        hashtag: [],
        mention: [],
      }));
    }
  };

  const handleRadioChange = (e) => {
    setCollections((collections) => ({
      ...collections,
      hasAllTagAndMention: e.target.value === 'all',
    }));
    setSearchType(e.target.value);
  };

  const showField =
    (searchType === 'all' && checked) || searchType === 'condition';

  return (
    <Box>
      <FormControl sx={{ py: 5 }}>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={searchType}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="all"
            control={<Radio />}
            label={
              <Typography
                className={searchType === 'all' ? 'active' : 'normal'}
              >
                すべての投稿&nbsp;
                <span>(期間内のすべての投稿を取得します)</span>
              </Typography>
            }
          />
          <FormControlLabel
            value="condition"
            control={<Radio />}
            label={
              <Typography
                className={searchType === 'condition' ? 'active' : 'normal'}
              >
                条件を指定&nbsp;
                <span>
                  (ハッシュタグ、メンションにマッチした投稿を取得します)
                </span>
              </Typography>
            }
          />
        </RadioGroup>
      </FormControl>
      {searchType === 'all' ? (
        <FormControlLabel
          className="switch"
          checked={checked}
          onChange={handleSwitchChange}
          control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
          label={
            <Typography className={checked ? 'active' : 'disable'}>
              警告アラート&nbsp;
              <span>
                (指定したハッシュタグ、メンションが付いていない投稿を分かりやすくします)
              </span>
            </Typography>
          }
        />
      ) : (
        <Typography color="black" fontSize="16px">
          指定する条件
        </Typography>
      )}
      {showField && (
        <Box>
          <FltInfluencerHash
            clearFlag={false}
            tip=""
            icon={false}
            phstr="#ハッシュタグ"
            initValue={collections?.hashtag}
            setValues={handleOperator}
          />
          <FltInfluencerMention
            mt="unset!important"
            clearFlag={false}
            tip=""
            icon={false}
            phstr="@メンション"
            initValue={collections?.mention}
            setValues={handleOperator}
          />
        </Box>
      )}
    </Box>
  );
};
export default AutoStepThree;
