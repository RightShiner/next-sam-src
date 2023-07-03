/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const lang = {
  en: {
    feed: 'Feed',
    story: 'Story',
    reel: 'Reel',
  },
  jp: {
    feed: 'フィード',
    story: 'ストーリー',
    reel: 'リール',
  },
};

export default function ReportTabSelect({ curType, onSelect }) {
  const { locale } = useRouter();
  return (
    <Box>
      <Button
        className={`${curType === 'feed' ? 'report-tab active' : 'report-tab'}`}
        variant={'outlined'}
        size="medium"
        onClick={(e) => onSelect('feed')}
      >
        {lang[locale].feed}
      </Button>
      <Button
        className={`${
          curType === 'story' ? 'report-tab active' : 'report-tab'
        }`}
        variant={'outlined'}
        size="medium"
        onClick={(e) => onSelect('story')}
      >
        {lang[locale].story}
      </Button>
      <Button
        className={`${curType === 'rir' ? 'report-tab active' : 'report-tab'}`}
        variant={'outlined'}
        size="medium"
        onClick={(e) => onSelect('rir')}
      >
        {lang[locale].reel}
      </Button>
    </Box>
  );
}

ReportTabSelect.propTypes = {
  curType: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};
