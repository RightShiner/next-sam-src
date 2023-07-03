/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useMainContext } from 'context/MainContext';
import { useRouter } from 'next/router';

const lang = {
  en: {
    list: 'List',
    post: 'Post',
    report: 'Report',
    statusManagement: 'Status management',
  },
  jp: {
    list: 'リストアップ',
    post: '投稿',
    report: 'レポート',
    statusManagement: 'ステータス管理',
  },
};

export default function TabSelect({ curType, onSelect }) {
  const { locale } = useRouter();
  const {
    setInfluencerCollapsable,
    setSelectedInfluencer,
    selectedInfluencer,
  } = useMainContext();
  const tabChanged = (val) => {
    if (curType === val) return;

    setInfluencerCollapsable(true);
    setSelectedInfluencer(null);

    onSelect(val);
  };

  return (
    <Box>
      <Button
        className={`${curType === 'list' ? 'active' : 'inactive'}`}
        variant={'outlined'}
        size="medium"
        onClick={(e) => tabChanged('list')}
      >
        {lang[locale].list}
      </Button>
      <Button
        className={`${curType === 'status' ? 'active' : 'inactive'}`}
        variant={'outlined'}
        size="medium"
        onClick={(e) => tabChanged('status')}
      >
        {lang[locale].statusManagement}
      </Button>
      <Button
        className={`${curType === 'post' ? 'active' : 'inactive'}`}
        variant={'outlined'}
        size="medium"
        onClick={(e) => tabChanged('post')}
      >
        {lang[locale].post}
      </Button>
      <Button
        className={`${curType === 'report' ? 'active' : 'inactive'}`}
        variant={'outlined'}
        size="medium"
        onClick={(e) => tabChanged('report')}
      >
        {lang[locale].report}
      </Button>
    </Box>
  );
}

TabSelect.propTypes = {
  curType: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};
