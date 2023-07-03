/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';
import Async from 'react-select/async';
import { components } from 'react-select';
import { astreamService } from 'services';
import { useRouter } from 'next/router';

export default function FltInfluencerHash({
  clearFlag,
  tip,
  icon,
  phstr,
  caption,
  initValue,
  setValues,
  isError,
  type,
  ...rest
}) {
  const { locale } = useRouter();
  const theme = useTheme();
  const [itemValue, setItemValue] = useState([]);
  const [showPlus, setShowPlus] = useState(false);

  useEffect(() => {
    if (clearFlag === true || clearFlag === false) {
      let items =
        JSON.parse(
          localStorage.getItem(`${type}Filters`),
        )?.influencer?.textTags?.filter((item) => item.type === 'hashtag') ||
        [];
      setItemValue(items);
      setList(items, true);
    }
  }, [clearFlag]);

  useEffect(() => {
    if (initValue) {
      let temp = initValue.map((itm) => {
        return { label: '#' + itm, value: itm };
      });

      setItemValue(temp);
    }
  }, [initValue]);

  const setList = (val, forceClear = false) => {
    let list = [];

    if (val !== '' && val?.length > 0) {
      list = Array.prototype.map.call(val, (a) => ({ ...a, type: 'hashtag' }));
    }

    setValues('textTags', list, 'hashtag');
    setItemValue(val);
  };

  const handleFocus = () => {
    setShowPlus(false);
  };

  const handleBlur = () => {
    // setShowPlus(true);
  };

  const styles = {
    control: (base) => ({
      ...base,
      borderColor: isError ? theme.palette.monitoring.danger : base.borderColor,
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: '14px',
      color: '#bfc2c7',
    }),
    multiValue: (provided, state) => {
      const display = showPlus ? 'none' : 'flex';
      return { ...provided, display };
    },
  };

  const getOptions = (input) => {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    return astreamService.getInstagramHashtags(input).then((res) => {
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        styles={styles}
        showPlus={showPlus}
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

FltInfluencerHash.propTypes = {
  clearFlag: PropTypes.bool,
  tip: PropTypes.string.isRequired,
  phstr: PropTypes.string.isRequired,
  icon: PropTypes.bool.isRequired,
  caption: PropTypes.string,
};
