/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';

const lang = {
  en: {
    errorUnableToChangeStatusPosting:
      'This account is in the progress of posting and cannot be changed to any other status.',
    errorUnableToChangeStatusReporting:
      'This account is in the progress of reporting and cannot be changed to any other status.',
  },
  jp: {
    errorUnableToChangeStatusPosting:
      'このアカウントは投稿が進んでいるので、他のステータスに変更できません。',
    errorUnableToChangeStatusReporting:
      'このアカウントはレポートが進んでいるので、他のステータスに変更できません。',
  },
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
    },
  },
};

export default function StatusSelect({
  initValue,
  values,
  step,
  row,
  updateStatus,
  ...rest
}) {
  const { locale } = useRouter();
  const [itemValue, setItemValue] = useState(initValue);

  const handleStatusChange = (val) => {
    if (step === 1) {
      if (row.status == 4 && row.pstatus > 1) {
        toast.error(lang[locale].errorUnableToChangeStatusPosting);
        return;
      }
    } else if (row.pstatus == 6 && row.rtype > 0) {
      toast.error(lang[locale].errorUnableToChangeStatusReporting);
      return;
    }

    setItemValue(val);
    updateStatus(val);
  };

  useEffect(() => {
    setItemValue(initValue);
  }, [initValue]);

  return (
    <Box>
      <Select
        value={itemValue}
        onChange={(e) => handleStatusChange(e.target.value)}
        size="small"
        MenuProps={MenuProps}
        sx={{ fontSize: '14px' }}
        {...rest}
      >
        {_.map(values, (itm, idx) => (
          <MenuItem key={itm} value={idx + 1} sx={{ fontSize: '14px' }}>
            {itm}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

StatusSelect.propTypes = {
  initValue: PropTypes.number.isRequired,
  values: PropTypes.array.isRequired,
  updateStatus: PropTypes.func,
  step: PropTypes.number,
  row: PropTypes.object,
};
