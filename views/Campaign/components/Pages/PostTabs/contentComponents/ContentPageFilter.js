/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  Select,
  Menu,
  MenuItem,
  Checkbox,
  TextField,
  ListItem,
  ListItemIcon,
  IconButton,
  Typography,
} from '@mui/material';
import RelativeImage from 'components/RelativeImage';
import jaLocale from 'date-fns/locale/ja';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import styles from './styles';
import { useTheme, makeStyles } from '@mui/styles';
import { evaluateValue } from 'constants/constants';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreHoriz from '@mui/icons-material/MoreHoriz';

const ContentPageFilter = ({
  options,
  from,
  to,
  fetchDone,
  group,
  setGroup,
  setFilter,
  setHiddenMode,
}) => {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, { defaultTheme: theme });
  }, [theme]);
  const classes = useStyles();

  const nameOfOptions = options?.map((option, key) => {
    return option.name;
  });

  const [value, setValue] = useState([new Date(), new Date()]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setValue([new Date(from ?? new Date()), new Date(to ?? new Date())]);
    setSelected(nameOfOptions);
  }, [fetchDone]);

  const isAllSelected =
    options?.length > 0 && selected.length === options?.length;

  const totalFollowers = () => {
    let sum = 0;
    options?.map((option, key) => {
      sum += option.followers ?? 0;
    });
    return sum;
  };

  const handleChange = (event) => {
    let value = event.target.value;
    if (value.at(-1) === 'all')
      value = selected.length === options.length ? [] : nameOfOptions;
    setSelected(value);
    setFilter((prev) => ({
      ...prev,
      influencer: value,
    }));
  };

  const handleChangeDate = (val) => {
    setValue(val);
    setFilter((prev) => ({
      ...prev,
      date: val,
    }));
  };

  const handleClear = () => {
    setValue([new Date(from), new Date(to)]);
    setFilter((prev) => ({
      ...prev,
      date: [new Date(from), new Date(to)],
    }));
  };

  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = React.useState(null);
  const isMoreMenuOpen = Boolean(moreMenuAnchorEl);

  const handleMoreMenuClick = (event) => {
    setMoreMenuAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchorEl(null);
  };

  const handleHiddenClick = () => {
    setHiddenMode(true);
    setMoreMenuAnchorEl(null);
  };

  return (
    <Box marginTop={4} sx={{ display: 'flex', width: 'max-content' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="button"
          sx={{
            fontWeight: 'bold',
            marginRight: '1em',
          }}
        >
          グループ表示
        </Typography>
        <Select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          size="small"
          sx={{
            fontSize: '14px',
            width: '11em',
            height: '33px',
            marginRight: '3em',
          }}
        >
          <MenuItem value={1} sx={{ fontSize: '14px' }} disabled>
            選択なし
          </MenuItem>
          <MenuItem value={2} sx={{ fontSize: '14px' }}>
            インフルエンサー
          </MenuItem>
          <MenuItem value={3} sx={{ fontSize: '14px' }}>
            アラート
          </MenuItem>
          <MenuItem value={4} sx={{ fontSize: '14px' }}>
            日付
          </MenuItem>
        </Select>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="button"
          sx={{
            fontWeight: 'bold',
            marginRight: '1em',
          }}
        >
          インフルエンサー選択
        </Typography>
        <Select
          multiple
          placeholder="全て"
          value={selected}
          onChange={handleChange}
          renderValue={(value) =>
            isAllSelected ? <span>全て</span> : value.join(', ')
          }
          size="small"
          sx={{
            fontSize: '14px',
            width: '12em',
            height: '33px',
            marginRight: '3em',
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 300,
              },
            },
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'menu',
          }}
        >
          <MenuItem value="all" sx={{ height: '35px' }}>
            <ListItem>
              <Typography
                sx={{
                  fontSize: '15px',
                  mx: '2.6em',
                }}
              >
                全て
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  ml: '2em',
                }}
              >
                {evaluateValue(totalFollowers())}
              </Typography>
            </ListItem>
            <ListItemIcon>
              <Checkbox
                checked={isAllSelected}
                indeterminate={
                  selected.length > 0 && selected.length < options.length
                }
              />
            </ListItemIcon>
          </MenuItem>
          {options?.map((option, index) => (
            <MenuItem key={index} value={option.name} sx={{ height: '35px' }}>
              <ListItem>
                <RelativeImage
                  isRound
                  imgSrc={option.avatar}
                  sx={{
                    width: '1.4rem !important',
                    height: '1.4rem !important',
                    marginRight: '.8em',
                  }}
                ></RelativeImage>
                <Typography
                  sx={{
                    fontSize: '14px',
                    width: '6em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginRight: '1.2em',
                  }}
                >
                  {option.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                  }}
                >
                  {evaluateValue(option.followers)}
                </Typography>
              </ListItem>
              <ListItemIcon>
                <Checkbox checked={selected.indexOf(option.name) > -1} />
              </ListItemIcon>
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="button"
          sx={{
            fontWeight: 'bold',
            marginRight: '1em',
          }}
        >
          表示期間
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
          <DateRangePicker
            calendars={1}
            startText=""
            value={value}
            minDate={new Date(from)}
            maxDate={new Date(to)}
            onChange={(newValue) => {
              handleChangeDate(newValue);
            }}
            className={classes.pickerCalendar}
            renderInput={(startProps, endProps) => {
              const startValue = startProps.inputProps.value;
              delete startProps.inputProps.value;
              return (
                <React.Fragment>
                  <Box>
                    <TextField
                      size="small"
                      {...startProps}
                      value={
                        value[0] === 0
                          ? 'choose the date range'
                          : `${startValue} ~ ${endProps.inputProps.value}`
                      }
                      sx={{
                        width: '15em',
                        '& input': {
                          height: '20px',
                          cursor: 'pointer',
                        },
                      }}
                    />
                    <IconButton
                      aria-label="cancel"
                      color="secondary"
                      onClick={handleClear}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </React.Fragment>
              );
            }}
          />
        </LocalizationProvider>
      </Box>
      <Box
        sx={{
          marginLeft: '1rem',
        }}
      >
        <Box
          sx={{
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: theme.palette.monitoring.moreIcon,
            borderRadius: '50%',
            overflow: 'hidden',
            width: '33px',
            height: '33px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0.2rem',
          }}
        >
          <IconButton onClick={handleMoreMenuClick}>
            <MoreHoriz
              sx={{
                color: theme.palette.monitoring.moreIcon,
              }}
            />
          </IconButton>
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={moreMenuAnchorEl}
          open={isMoreMenuOpen}
          onClose={handleMoreMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleHiddenClick}>
            非表示にする投稿を選択
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default ContentPageFilter;
