import React from 'react';
import { Box } from '@mui/material';

const Disabled = () => {
  return (
    <Box
      marginTop={16}
      sx={{
        padding: 2,
        textAlign: 'center',
      }}
    >
      <p>
        無効なURLです。
        <br />
        お手数ですが最初から手続きしてください。
      </p>
    </Box>
  );
};

export default Disabled;
