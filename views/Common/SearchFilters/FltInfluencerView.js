/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  selectdisabled: {
    color: '#bfc2c7',
  },
  menuitemhidden: {
    display: 'none',
  },
}));

export default function FltInfluencerView({
  clearFlag,
  tip,
  icon,
  fromValues,
  fromStyle,
  toValues,
  toStyle,
  setValues,
  type,
}) {
  const { locale } = useRouter();
  const [itemValue, setItemValue] = useState({ from: '', to: '' });
  const theme = useTheme();
  const classes = useStyles();

  useEffect(() => {
    if (clearFlag === true || clearFlag === false) {
      let items = JSON.parse(localStorage.getItem(`${type}Filters`))?.influencer
        ?.views;
      items = { from: items?.min || '', to: items?.max || '' };

      setItemValue(items);
      setViews(items, true);
    }
  }, [clearFlag]);

  const setViews = ({ from, to }, forceClear = false) => {
    setItemValue({ from, to });

    if (forceClear) return;

    if (from === '' && to === '') {
      setValues('views', {});
    } else {
      setValues('views', {
        min: from || null,
        max: to === '' || to === '1000000+' ? null : to,
      });

      localStorage.setItem(
        `${type}Views`,
        JSON.stringify({
          from: from || null,
          to: to === '' || to === '1000000+' ? null : to,
        }),
      );
    }
  };

  return (
    <Box className="flex-sub-wrapper">
      <Box className="search-item-wrapper">
        <Box className="search-item-header">
          <span>{tip}</span>
          {icon === true && <RoundInfo marginLeft={1} />}
        </Box>
        {(itemValue.from !== '' || itemValue.to !== '') && (
          <span
            className="clear"
            onClick={(e) => setViews({ from: '', to: '' })}
          >
            {Keyword[locale].caption.clear}
          </span>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Select
          size="small"
          sx={{
            fontSize: '14px',
            '& > .MuiSelect-select': {
              backgroundColor: `${
                itemValue.from !== ''
                  ? theme.palette.clrVariables.cyanVeryLight
                  : theme.palette.clrVariables.grayWhite
              }`,
            },
            '& > svg': {
              backgroundColor: 'inherit',
            },
            '& fieldset': {
              borderColor: `${
                itemValue.from !== ''
                  ? theme.palette.clrVariables.cyanLight
                  : 'rgba(0,0,0,0.23)'
              }`,
            },
          }}
          style={fromStyle}
          value={itemValue.from}
          onChange={(e) => setViews({ ...itemValue, from: e.target.value })}
          className={clsx(
            itemValue.from === '' ? classes.selectdisabled : null,
          )}
          displayEmpty
          renderValue={(value) =>
            value !== '' ? value : Keyword[locale].caption.min
          }
        >
          {_.map(fromValues, (flwItm) => (
            <MenuItem key={flwItm} value={flwItm} style={{ fontSize: '14px' }}>
              {flwItm}
            </MenuItem>
          ))}
        </Select>

        <Select
          size="small"
          sx={{
            fontSize: '14px',
            '& > .MuiSelect-select': {
              backgroundColor: `${
                itemValue.to !== ''
                  ? theme.palette.clrVariables.cyanVeryLight
                  : theme.palette.clrVariables.grayWhite
              }`,
            },
            '& > svg': {
              backgroundColor: 'inherit',
            },
            '& fieldset': {
              borderColor: `${
                itemValue.to !== ''
                  ? theme.palette.clrVariables.cyanLight
                  : 'rgba(0,0,0,0.23)'
              }`,
            },
          }}
          style={toStyle}
          value={itemValue.to}
          onChange={(e) => setViews({ ...itemValue, to: e.target.value })}
          className={clsx(itemValue.to === '' ? classes.selectdisabled : null)}
          displayEmpty
          renderValue={(value) =>
            value !== '' ? value : Keyword[locale].caption.max
          }
        >
          {_.map(toValues, (flwItm) => (
            <MenuItem key={flwItm} value={flwItm} style={{ fontSize: '14px' }}>
              {flwItm}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
}
