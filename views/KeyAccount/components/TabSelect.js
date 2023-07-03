/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import InstagramIcon from '@mui/icons-material/Instagram';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

const lang = {
  en: {
    influencer: 'Search influencers',
    target: 'Search a target',
    support: 'Only supports Instagram, now',
  },
  jp: {
    influencer: 'インフルエンサーを探す',
    target: 'ターゲットを探す',
    support: '現在、Instagramのみ対応',
  },
};

export default function TabSelect({ curType, onSelect }) {
  const { locale } = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '2em',
      }}
    >
      <>
        <Box sx={{ display: 'flex' }}>
          <Button
            className={`${
              curType === 'influencer' ? 'active' : 'key-inactive-influencer'
            }`}
            variant={'outlined'}
            size="medium"
            onClick={(e) => onSelect('influencer')}
            sx={{ minWidth: '90px' }}
          >
            {lang[locale].influencer}
          </Button>
          <Button
            className={`${
              curType === 'target' ? 'key-active' : 'key-inactive-target'
            }`}
            variant={'outlined'}
            size="medium"
            onClick={(e) => onSelect('target')}
          >
            {lang[locale].target}
          </Button>
        </Box>
      </>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <InstagramIcon
          sx={{
            mr: '5px',
            fontSize: '33px',
            color: curType === 'influencer' ? '#1477eb' : '#a17fef',
          }}
        />
        <Typography
          variant="body2"
          color={curType === 'influencer' ? '#1477eb' : '#a17fef'}
        >
          {lang[locale].support}
        </Typography>
      </Box>
    </Box>
  );
}

TabSelect.propTypes = {
  curType: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};
