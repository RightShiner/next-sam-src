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
import { useTheme } from '@mui/material/styles';
import { userService } from 'services';
import { useRouter } from 'next/router';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
    },
  },
};

export default function FltCreateAnnouncementUsers({
  clearFlag,
  tip,
  icon,
  phstr,
  caption,
  setValues,
  toStyle,
  options,
}) {
  const [users, setUsers] = useState([]);
  const initVal = [];
  const { locale } = useRouter();
  const theme = useTheme();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    userService.getAll().then((response) => {
      if (response.status !== 'ok') return;

      setUsers([...response.users]);
    });
  }, []);

  const setSelectedUser = (values, forceClear = false) => {
    setSelected(values);

    if (forceClear) return;

    setValues(values);
  };

  const render = (values) => {
    let letter = [];
    _.map(values, (value) => {
      letter.push(value.name);
    });
    return letter.join(', ');
  };

  const removeFilter = (itm) => {
    _.pull(selected, itm);
    setSelectedUser(selected);
  };

  return (
    <Box>
      <Select
        multiple
        value={selected}
        onChange={(e) => setSelectedUser(e.target.value)}
        renderValue={(value) => render(value)}
        size="medium"
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
        style={toStyle}
        MenuProps={MenuProps}
      >
        <MenuItem key={-1} sx={{ height: '35px' }}>
          <ListItem>All</ListItem>
          <ListItemIcon>
            <Checkbox
              checked={users == selected}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 26 } }}
              color="success"
              onChange={(e) =>
                e.target.checked === true
                  ? setSelectedUser(users)
                  : setSelected([])
              }
            />
          </ListItemIcon>
        </MenuItem>
        {users.map((user, index) => (
          <MenuItem key={index} value={user} sx={{ height: '35px' }}>
            <ListItem>{user.name}</ListItem>
            <ListItemIcon>
              <Checkbox
                checked={selected.indexOf(user) > -1}
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
              {itm.name}
            </span>
          </Box>
        ))}
    </Box>
  );
}
