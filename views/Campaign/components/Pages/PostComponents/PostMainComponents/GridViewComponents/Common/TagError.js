import React, { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const TagError = () => {
  return (
    <Box className="tag_error">
      <WarningAmberIcon sx={{ fontSize: '20px', color: '#F41E51' }} />
      <Typography>内容が一部異なります</Typography>
    </Box>
  );
};

export default TagError;
