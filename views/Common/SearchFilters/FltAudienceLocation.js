/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import {
  Box,
  Select,
  MenuItem,
  Checkbox,
  ListItem,
  ListItemIcon,
} from '@mui/material';
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

export default function FltAudienceLocation({
  clearFlag,
  tip,
  icon,
  phstr,
  caption,
  setValues,
  options,
  type,
}) {
  const initVal = [];
  const { locale } = useRouter();
  const theme = useTheme();
  const [selected, setSelected] = useState([]);
  let filter = [];

  useEffect(() => {
    if (clearFlag === true || clearFlag === false) {
      let items =
        JSON.parse(localStorage.getItem(`${type}Filters`))?.audience
          ?.location || [];

      setSelected(items);
      setSelectedLocation(items, true, true);
    }
  }, [clearFlag]);

  const setSelectedLocation = (values, forceClear = false, isFilter) => {
    setSelected(values);
    _.map(values, (value) => {
      filter.push(...value.val);
    });

    if (forceClear) return;

    if (filter.length > 0) {
      setValues('location', values);
    } else {
      setValues('location', []);
    }
  };

  const render = (values) => {
    let letter = [];
    _.map(values, (value) => {
      letter.push(value.title);
    });
    return letter.join(', ');
  };

  const removeFilter = (itm) => {
    _.pull(selected, itm);
    setSelectedLocation(selected);
  };

  return (
    <Box className="flex-sub-wrapper">
      <Box className="search-item-wrapper">
        <Box className="search-item-header">
          <span>{tip}</span>
          {icon === true && <RoundInfo caption={caption} marginLeft={1} />}
        </Box>
        {selected.length !== 0 && (
          <span
            className="clear"
            onClick={(e) => setSelectedLocation(initVal)}
            style={{ color: theme.palette.clrVariables.cyanLight }}
          >
            {Keyword[locale].caption.clear}
          </span>
        )}
      </Box>
      <Select
        multiple
        value={selected}
        onChange={(e) => setSelectedLocation(e.target.value)}
        renderValue={(value) => render(value)}
        size="small"
        sx={{
          fontSize: '14px',
          '& > .MuiSelect-select': {
            backgroundColor: `${
              selected.length > 0
                ? theme.palette.clrVariables.cyanVeryLight
                : theme.palette.clrVariables.grayWhite
            }`,
          },
          '& > svg': {
            backgroundColor: 'inherit',
          },
          '& fieldset': {
            borderColor: `${
              selected.length > 0
                ? theme.palette.clrVariables.cyanLight
                : 'rgba(0,0,0,0.23)'
            }`,
          },
        }}
        MenuProps={MenuProps}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option} sx={{ height: '35px' }}>
            <ListItem>{option.title}</ListItem>
            <ListItemIcon>
              <Checkbox
                checked={
                  selected.findIndex((sel) => sel.title == option.title) > -1
                }
                sx={{ '& .MuiSvgIcon-root': { fontSize: 26 } }}
                color="success"
              />
            </ListItemIcon>
          </MenuItem>
        ))}
      </Select>
      {selected.length !== 0 &&
        _.map(selected, (itm, idx) => (
          <Box
            key={idx}
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
              onClick={(e) => removeFilter(itm)}
            />
            <span
              className="text-ellipse"
              style={{
                flex: 'auto',
                marginLeft: '.5rem',
                minWidth: '120px',
                fontSize: '0.8rem',
              }}
            >
              {itm.title}
            </span>
          </Box>
        ))}
    </Box>
  );
}
