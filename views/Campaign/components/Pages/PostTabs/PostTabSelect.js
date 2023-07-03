/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PostTabSelect({ curType, onSelect, disabled }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '2em',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Button
          className={`${curType === 'list' ? 'relative-action' : 'inactive'}`}
          variant={'outlined'}
          size="medium"
          onClick={(e) => onSelect('list')}
          sx={{ minWidth: '90px' }}
        >
          リスト
        </Button>
        <Button
          className={`${curType === 'post' ? 'relative-action' : 'inactive'}`}
          variant={'outlined'}
          size="medium"
          onClick={(e) => onSelect('post')}
          disabled={disabled}
          sx={{
            color: disabled ? '#ccc!important' : 'inherit',
            lineHeight: 'inherit',
          }}
        >
          投稿コンテンツ{' '}
          <Typography
            component="span"
            variant="subtitle1"
            color="white"
            fontWeight="bold"
            sx={{
              position: 'relative',
              paddingLeft: '20px',
              paddingRight: '20px',
              marginLeft: '15px',
              fontSize: '12px',
              backgroundColor: '#865FE1',
              lineHeight: '2',
              borderRadius: '50px',
            }}
          >
            β版
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

PostTabSelect.propTypes = {
  curType: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};
