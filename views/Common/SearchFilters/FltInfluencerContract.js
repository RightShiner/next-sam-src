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

export default function FltSingleSelect({
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
  const theme = useTheme();
  const [defClearFlag, setDefClearFlag] = useState(null);

  useEffect(() => {
    if (defClearFlag !== null)
      localStorage.removeItem(`${type}HasContactDetails`);

    if (clearFlag === true || clearFlag === false) {
      let items =
        JSON.parse(localStorage.getItem(`${type}HasContactDetails`)) || '';
      setDefClearFlag(clearFlag);
      setContract(items, false);
    }
  }, [clearFlag]);

  const setContract = (val, forceClear = false) => {
    setItemValue(val);

    if (!forceClear && val !== '') {
      setValues('hasContactDetails', [
        { contactType: 'email', contactTypeAction: 'must' },
      ]);

      localStorage.setItem(`${type}HasContactDetails`, JSON.stringify(val));
    } else {
      setValues('hasContactDetails', []);
    }
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
            onClick={(e) => setContract('')}
            style={{ color: theme.palette.clrVariables.cyanLight }}
          >
            {Keyword[locale].caption.clear}
          </span>
        )}
      </Box>
      <Select
        value={itemValue}
        onChange={(e) => setContract(e.target.value)}
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
          <MenuItem key={itm} value={itm} sx={{ fontSize: '14px' }}>
            {itm}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
