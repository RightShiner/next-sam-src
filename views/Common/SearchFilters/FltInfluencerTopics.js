/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';
import Async from 'react-select/async';
import { components } from 'react-select';
import { astreamService } from 'services';

export default function FltInfluencerTopics({
  clearFlag,
  tip,
  icon,
  phstr,
  caption,
  initValue,
  setValues,
  type,
  ...rest
}) {
  const { locale } = useRouter();
  const theme = useTheme();
  const [itemValue, setItemValue] = useState([]);

  const apiNames = {
    instagram: 'getInstagramTopics',
    tiktok: 'getTiktokTopics',
    youtube: 'getYoutubeTopics',
  };

  useEffect(() => {
    if (initValue === undefined) {
      if (clearFlag === true || clearFlag === false) {
        let items =
          JSON.parse(localStorage.getItem(`${type}Filters`))?.influencer
            ?.topics || [];
        setItemValue(items);
        setTopics(items, true);
      }
    }
  }, [clearFlag]);

  useEffect(() => {
    if (initValue) {
      let temp = initValue.map((itm) => {
        return { label: itm, value: itm };
      });
      setItemValue(temp);
    }
  }, [initValue]);

  const setTopics = (val, forceClear = false) => {
    setValues('topics', val);
    setItemValue(val);
  };

  const styles = {
    placeholder: (base) => ({
      ...base,
      fontSize: '14px',
      color: '#bfc2c7',
    }),
  };
  const getOptions = (input) => {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    return astreamService[apiNames[type]](input).then((res) => {
      let tags = res.tags;

      if (!tags || tags.length == 0)
        return [{ value: input, label: '#' + input }];

      let options = tags.map((tag, key) => {
        let name = (tag.startsWith('#') ? '' : '#') + tag;
        return { value: name, label: name };
      });

      if (!options.map((itm) => itm.label.substring(1)).includes(input)) {
        options = [...options, { value: input, label: '#' + input }];
      }
      return options;
    });
  };

  return (
    <Box className="flex-sub-wrapper">
      <Box className="search-item-wrapper">
        <Box
          className="search-item-header"
          sx={{ height: tip ? 'unset' : '21px' }}
        >
          <span>{tip}</span>
          {icon === true && <RoundInfo caption={caption} marginLeft={1} />}
        </Box>
        {itemValue.length !== 0 && (
          <span
            className="clear"
            onClick={(e) => setTopics([])}
            style={{ color: theme.palette.clrVariables.cyanLight }}
          >
            {Keyword[locale].caption.clear}
          </span>
        )}
      </Box>
      <Async
        isMulti
        value={itemValue}
        onChange={setTopics}
        loadOptions={getOptions}
        placeholder={phstr}
        isClearable={false}
        openMenuOnClick={false}
        // onFocus = {handleFocus}
        // onBlur = {handleBlur}
        styles={styles}
        isDisabled={rest.disabled}
        // components={{ ValueContainer }}
      />
    </Box>
  );
}

const ValueContainer = ({ children, getValue, ...props }) => {
  let maxToShow = 0;
  var length = getValue().length;
  let shouldBadgeShow = length > maxToShow;
  let displayLength = length - maxToShow;

  return (
    <components.ValueContainer {...props}>
      {children}
      <div style={{ position: 'absoulte', left: '0' }}>
        {shouldBadgeShow &&
          props.selectProps.showPlus &&
          ` ${displayLength} item${length !== 1 ? 's' : ''} selected`}
      </div>
    </components.ValueContainer>
  );
};

FltInfluencerTopics.propTypes = {
  clearFlag: PropTypes.bool,
  tip: PropTypes.string.isRequired,
  phstr: PropTypes.string.isRequired,
  icon: PropTypes.bool.isRequired,
  caption: PropTypes.string,
};
