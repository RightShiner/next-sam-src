import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const TitleBox = ({ cmpId, cmpName }) => {
  const router = useRouter();

  return (
    <Box display="flex" alignItems="flex-end" paddingTop={2}>
      <Button
        component="a"
        size="small"
        href={'/campaign/list'}
        sx={{
          width: 36,
          height: 36,
          minWidth: 'unset',
        }}
      >
        <ArrowBackIcon
          sx={{
            width: 24,
            height: 24,
            color: '#2d3748',
          }}
        />
      </Button>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
        }}
      >
        {cmpName}
      </Typography>
      <Button
        component="a"
        size="small"
        onClick={() => {
          router.push(`/campaign/edit/${cmpId}`);
        }}
        sx={{
          width: 36,
          height: 36,
          marginLeft: '5em',
          minWidth: 'unset',
        }}
      >
        <ModeEditIcon
          sx={{
            width: 24,
            height: 24,
            color: '#2d3748',
          }}
        />
      </Button>
    </Box>
  );
};

export default TitleBox;
