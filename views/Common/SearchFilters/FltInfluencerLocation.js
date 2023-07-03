/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';
import Constants from 'constants/constants';
import { useTheme } from '@mui/material/styles';
import { modashService } from 'services';
import { useRouter } from 'next/router';

export default function FltInfluencerLocation({
  clearFlag,
  tip,
  icon,
  phstr,
  caption,
  setValues,
}) {
  const { locale } = useRouter();
  const [itemValue, setItemValue] = useState({ title: '', id: '' });
  const theme = useTheme();

  useEffect(() => {
    if (clearFlag === true || clearFlag === false)
      setSelectedLocation({ title: '', id: '' }, true);
  }, [clearFlag]);

  const setSelectedLocation = (val, forceClear = false) => {
    setItemValue(val);

    if (forceClear) return;

    if (val.id !== '') setValues('location', [val.id]);
    else setValues('location', []);
  };

  const [options, setOptions] = useState([]);

  return (
    <Box className="flex-sub-wrapper">
      <Box className="search-item-wrapper">
        <Box className="search-item-header">
          <span>{tip}</span>
          {icon === true && <RoundInfo caption={caption} marginLeft={1} />}
        </Box>
        {itemValue && itemValue.title !== '' && (
          <span
            className="clear"
            onClick={(e) => setSelectedLocation({ title: '', id: '' })}
            style={{ color: theme.palette.clrVariables.cyanLight }}
          >
            {Keyword[locale].caption.clear}
          </span>
        )}
      </Box>
      <Autocomplete
        size="small"
        options={options}
        disableClearable
        getOptionLabel={(option) => option.title}
        renderOption={(props, option, { selected }) => (
          <li
            {...props}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '14px',
              padding: '0px 5px 0px 5px',
            }}
          >
            {option.title}
            <Checkbox
              checked={selected}
              color="success"
              sx={{ '& .MuiSvgIcon-root': { fontSize: 26 } }}
            />
          </li>
        )}
        value={itemValue}
        filterOptions={(options, state) => options}
        onChange={(event, newValue) => {
          setSelectedLocation(newValue);
        }}
        sx={{
          backgroundColor: `${
            itemValue && itemValue.title !== ''
              ? theme.palette.clrVariables.cyanVeryLight
              : theme.palette.clrVariables.grayWhite
          }`,
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              '& fieldset': {
                borderColor: `${
                  itemValue && itemValue.title !== ''
                    ? theme.palette.clrVariables.cyanLight
                    : 'rgba(0,0,0,0.23)'
                }`,
              },
            }}
            variant="outlined"
            placeholder={phstr}
            onChange={async (e) => {
              return modashService
                .getLocations(Constants.snsInstagram, e.target.value)
                .then((response) => {
                  let data = response.data;
                  if (data.error !== false) return;

                  setOptions(data.locations);
                });
            }}
            inputProps={{
              ...params.inputProps,
              style: {
                fontSize: '14px',
              },
            }}
          />
        )}
      />
    </Box>
  );
}
