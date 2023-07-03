import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const TagError = ({ missingTags }) => {
  let label = [];
  missingTags?.missingHashtag.map((el) => {
    label.push('#' + el);
  });
  missingTags?.missingMention.map((el) => {
    label.push('@' + el);
  });
  missingTags?.missingTag.map((el) => {
    label.push('@' + el);
  });

  return (
    <Box sx={{ mt: '18px', }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <WarningAmberIcon color="error" />
        <Typography ml={1} sx={{fontSize: '0.8rem'}} color="error">
          一部のタグがありません
        </Typography>
      </Box>
      <Box
        mt={1}
        sx={{
          width: 'inherit',
          height: 'fit-content',
          backgroundColor: 'white',
          border: '1px solid #ff5959',
          borderRadius: '2px',
          padding: '5px 15px',
        }}
      >
        <Typography color="error" sx={{fontSize: '0.8rem'}}>{label.join(', ')}</Typography>
      </Box>
    </Box>
  );
};

export default TagError;
