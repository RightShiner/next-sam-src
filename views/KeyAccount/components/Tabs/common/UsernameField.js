import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  FormControl,
  FormHelperText,
} from '@mui/material';
import CreatableSelect from 'react-select/creatable';
import { astreamService } from 'services';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label: label.startsWith('@') ? label : '@' + label,
  tag: label.startsWith('@') ? label.substring(1) : label,
});

const lang = {
  en: {
    title: 'Username •',
    subtitle: 'Please enter at least 2 target personal accounts.',
    error: 'Please enter at least 2 people.',
  },
  jp: {
    title: 'ユーザーネーム •',
    subtitle: 'ターゲットとなるペルソナのアカウントを2名以上入力してください。',
    error: '2名以上入力してください。',
  },
};

const UsernameField = ({ userList, setUserList, error, setUsernameError }) => {
  const { locale } = useRouter();
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [itemValue, setItemValue] = useState([]);

  const styles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: error
        ? 'red'
        : userList.length !== 0
        ? theme.palette.clrVariables.cyanLight
        : state.isFocused
        ? '#1377EB'
        : '#cccccc',
      boxShadow: 'none',
      '&:hover': {
        borderColor: error && 'red',
        boxShadow: 'none',
      },
    }),
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

  const setList = (val, type = false) => {
    val = val.startsWith('@') ? val.substring(1) : val;
    setUsernameError(false);
    setInputValue('');
    if (type === 'clear') {
      setItemValue([]);
      setUserList([]);
    } else if (type === 'remove') {
      setItemValue(itemValue.filter((itm) => itm.tag != val));
      setUserList(itemValue.filter((itm) => itm.tag != val));
    } else {
      setItemValue([...itemValue, createOption(val)]);
      setUserList([...itemValue, createOption(val)]);
    }
  };

  const AvatarOption = (props) => (
    <components.Option {...props}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={props.data.picture}
          aria-label="recipe"
          sx={{ width: '1.3em', height: '1.3em' }}
        />
        &nbsp;{props.data.label}
      </Box>
    </components.Option>
  );

  const getOptions = (input) => {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    return astreamService.getInstagramUsers(input).then((res) => {
      if (res.users.length == 0) return [{ value: input, label: '@' + input }];

      let options = res.users.map((user, key) => {
        return {
          value: user.userId,
          label: '@' + user.username,
          picture: user.picture,
        };
      });

      if (!options.map((itm) => itm.label.substring(1)).includes(input)) {
        options = [...options, { value: input, label: '@' + input }];
      }
      return options;
    });
  };

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const handleChange = (value, actionMeta) => {
    setList(actionMeta?.removedValue?.tag ?? '', 'remove');
  };

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    if (itemValue.map((itm) => itm.tag).includes(inputValue)) return;

    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setList(inputValue);
        event.preventDefault();
        setInputValue('');
    }
  };

  return (
    <>
      <Typography
        variant="body1"
        style={{
          fontWeight: '600',
        }}
      >
        {lang[locale].title}
        <span
          style={{
            fontSize: '14px',
            fontWeight: 'normal',
          }}
        >
          {lang[locale].subtitle}
        </span>
      </Typography>
      <Box mt={1} mb={3}>
        <FormControl sx={{ width: '100%' }} error>
          {error && <FormHelperText>{lang[locale].error}</FormHelperText>}
          <CreatableSelect
            components={components}
            inputValue={inputValue}
            isClearable
            isMulti
            menuIsOpen={false}
            onInputChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            placeholder={'@username'}
            value={itemValue}
            styles={styles}
          />
        </FormControl>
      </Box>
    </>
  );
};

export default UsernameField;
