import React from 'react';
import { Box, Chip } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const TagError = () => {
  return (
    <Box
      mt={1}
      sx={{
        width: 'fit-content',
        height: 'fit-content',
        backgroundColor: 'white',
      }}
    >
      <Chip
        variant="outlined"
        color="warning"
        icon={<WarningAmberIcon sx={{fontSize: '1rem'}} />}
        label="一部のタグがありません"
        size="medium"
        sx={{
          borderRadius: '2px',
          fontSize: '0.8rem',
        }}
      />
    </Box>
  );
};

export default TagError;
