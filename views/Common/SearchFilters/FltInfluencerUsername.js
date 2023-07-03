/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';
import Async from 'react-select/async';
import { components } from 'react-select';
import { astreamService } from 'services';
import { useRouter } from 'next/router';

export default function FltInfluencerUsername({
  type,
  clearFlag,
  tip,
  phstr,
  setValues,
}) {
  const theme = useTheme();
  const { locale } = useRouter();
  const [itemValue, setItemValue] = useState([]);

  useEffect(() => {
    if (clearFlag === true || clearFlag === false) setList('', true);
  }, [clearFlag]);

  const url = {
    instagram: 'getInstagramUsers',
    youtube: 'getYoutubeUsers',
    tiktok: 'getTiktokUsers',
  };

  const setList = (val, forceClear = false) => {
    let list = [];
    if (val !== '' && val.length > 0) {
      list = Array.prototype.map.call(val, (a) => a.label.substring(1));
    }

    setValues('username', list);
    setItemValue(val);
  };

  const styles = {
    placeholder: (base) => ({
      ...base,
      fontSize: '14px',
      color: '#bfc2c7',
    }),
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

  const getOptions = async (input) => {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    let res = await astreamService[url[type]](input);
    if (res.users.length == 0) return [{ value: input, label: '@' + input }];

    let options = res.users.map((user, key) => {
      return {
        value: user.username,
        label: user.username ? '@' + user.username : user.fullname,
        picture: user.picture,
      };
    });

    if (!options.map((itm) => itm.label.substring(1)).includes(input)) {
      options = [...options, { value: input, label: '@' + input }];
    }
    return options;
  };

  return (
    <Box className="flex-sub-wrapper">
      <Box className="search-item-wrapper">
        <Box
          className="search-item-header"
          sx={{ height: tip ? 'unset' : '21px' }}
        >
          <span>{tip}</span>
        </Box>
        {itemValue.length !== 0 && (
          <span
            className="clear"
            onClick={(e) => setList([])}
            style={{ color: theme.palette.clrVariables.cyanLight }}
          >
            {Keyword[locale].caption.clear}
          </span>
        )}
      </Box>
      <Async
        isMulti
        value={itemValue}
        onChange={setList}
        loadOptions={getOptions}
        placeholder={phstr}
        isClearable={false}
        openMenuOnClick={false}
        styles={styles}
        components={{ Option: AvatarOption }}
      />
    </Box>
  );
}

FltInfluencerUsername.propTypes = {
  clearFlag: PropTypes.bool,
  tip: PropTypes.string.isRequired,
  phstr: PropTypes.string.isRequired,
  icon: PropTypes.bool.isRequired,
  caption: PropTypes.string,
};
