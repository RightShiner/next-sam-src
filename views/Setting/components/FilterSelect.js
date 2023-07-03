/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const lang = {
  en: {
    plan: 'Usage plan',
    info: 'Registration information',
    upgrade: 'Upgrade',
  },
  jp: {
    plan: '利用プラン',
    info: '登録情報',
    upgrade: 'アップグレード',
  },
};

export default function FilterSelect({ curType, onSelect }) {
  const { locale } = useRouter();

  return (
    <Box>
      <Button
        className={`${curType === 'plan' ? 'active' : 'inactive'}`}
        variant={'outlined'}
        size="medium"
        onClick={(e) => onSelect('plan')}
      >
        {lang[locale].plan}
      </Button>
      <Button
        className={`${curType === 'bill' ? 'active' : 'inactive'}`}
        variant={'outlined'}
        size="medium"
        onClick={(e) => onSelect('bill')}
      >
        {lang[locale].info}
      </Button>
      <Button
        className={`${curType === 'upgrade' ? 'active' : 'inactive'}`}
        variant={'outlined'}
        size="medium"
        onClick={(e) => onSelect('upgrade')}
      >
        {lang[locale].upgrade}
      </Button>
    </Box>
  );
}

FilterSelect.propTypes = {
  curType: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};
