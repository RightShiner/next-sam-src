import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Paper,
} from '@mui/material';
import Async from 'react-select/async';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import RoundInfo from 'components/RoundInfo';
import { makeStyles } from '@mui/styles';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import { userService, announcementService } from 'services';
import { useRouter } from 'next/router';

import toast from 'react-hot-toast';

const statusCaption = ['有効', '無効'];

const AnnouncementCreate = () => {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [status, setStatus] = useState(0);
  const [value, setValue] = useState([null, null]);
  const [itemValue, setItemValue] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [link, setLink] = useState('');
  let initValue;

  const styles = {
    container: (base) => ({
      ...base,
      minWidth: '350px',
      maxWidth: '350px',
      marginRight: '20px',
    }),
    input: (base) => ({
      ...base,
      minHeight: '45px',
    }),
  };

  useEffect(() => {
    if (initValue === undefined) {
      setList('', true);
    }

    if (initValue) {
      let temp = initValue.map((itm) => {
        return { label: itm, value: itm };
      });
      setItemValue(temp);
    }

    userService.getAll().then((response) => {
      if (response.status !== 'ok') return;

      setUsers([...response.users]);
    });
  }, [true]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleDateRangeChange = (newValue) => {
    setValue(newValue);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const setList = (val, forceClear = false) => {
    let userList = [];

    if (val !== '' && val.length > 0) {
      userList = Array.prototype.map.call(val, (a) => a.value);
    }

    setSelectedUsers(userList);
    setItemValue(val);
  };

  const getOptions = (input) => {
    return userService.getAll().then((res) => {
      let users = res.users;

      let options = users.map((user) => {
        return { value: user._id, label: `${user.name} ('${user.email}')` };
      });

      let filteredUsers = options.filter((itm) =>
        itm.label
          .substring(1)
          .toLowerCase()
          .includes(input.toLowerCase()),
      );

      return filteredUsers;
    });
  };

  const onSelectAllClick = (e) => {
    setSelectedUsers(e.target.checked ? users.map((user) => user._id) : []);

    let userList = !e.target.checked
      ? []
      : users.map((user) => {
          return { value: user._id, label: `${user.name} ('${user.email}')` };
        });

    setItemValue(userList);
  };

  const save = () => {
    if (!text) {
      toast.error('お知らせ内容をご入力してください。');
      return;
    }

    return announcementService
      .createAnnouncement({
        text,
        status,
        from: value[0],
        to: value[1],
        users: selectedUsers,
        link,
      })
      .then((ret) => {
        if (ret.status === 'ok') {
          toast.success('保存しました。');
        } else {
          toast.error(ret.msg);
        }
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  return (
    <Fixed hideAnnouncement={true}>
      <Container>
        <Box display="flex">
          <Button
            component="a"
            size="small"
            href={'/users/announcement'}
            sx={{
              width: 200,
              height: 36,
              minWidth: 'unset',
            }}
          >
            <ArrowBackIcon
              sx={{
                width: 24,
                height: 24,
                color: '#2d3748',
              }}
            />
            <Typography style={{ color: 'black', fontSize: '20px' }}>
              お知らせ一覧へ
            </Typography>
          </Button>
        </Box>
        <Paper
          sx={{
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '1000px',
            mt: 10,
            mb: 2,
            boxShadow: '0 0px 6px 0 rgb(140 152 164 / 53%)',
            padding: '30px 30px 30px',
          }}
        >
          <Box
            display="block"
            sx={{
              margin: '0 auto 20px',
            }}
          >
            <TextField
              label={'お知らせ内容'}
              variant="outlined"
              sx={{
                width: '100%',
              }}
              value={text}
              onChange={handleTextChange}
            />
          </Box>
          <Box
            display="block"
            sx={{
              margin: '20px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              localeText={{ start: 'From', end: 'To' }}
            >
              <DateRangePicker
                value={value}
                onChange={(newValue) => {
                  handleDateRangeChange(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> ~ </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
            <TextField
              select
              label={'ステータス'}
              variant="outlined"
              value={status}
              onChange={handleStatusChange}
              sx={{
                width: '200px',
              }}
            >
              {statusCaption.map((option, index) => (
                <MenuItem key={index} value={index}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box
            display="flex"
            sx={{
              margin: '0 auto 20px',
              alignItems: 'start',
              justifyContent: 'space-between',
            }}
          >
            <Async
              isMulti
              value={itemValue}
              onChange={setList}
              loadOptions={getOptions}
              placeholder="マルチユーザー選択"
              isClearable={true}
              openMenuOnClick={true}
              styles={styles}
              defaultOptions
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    itemValue.length == users.length && itemValue.length != 0
                  }
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 26, margin: '6px 0' },
                  }}
                  color="primary"
                  onChange={onSelectAllClick}
                />
              }
              label="全選択"
              sx={{
                width: '100%',
              }}
            />
            <TextField
              label={'リンク'}
              variant="outlined"
              sx={{
                width: '100%',
              }}
              value={link}
              onChange={handleLinkChange}
            />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              className="active"
              variant={'outlined'}
              onClick={(e) => save()}
            >
              登録
            </Button>
          </Box>
        </Paper>
      </Container>
    </Fixed>
  );
};

export default AnnouncementCreate;
