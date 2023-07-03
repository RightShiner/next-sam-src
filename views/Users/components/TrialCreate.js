import React, { useCallback } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { trialService } from 'services';

export const TrialCreate = ({ fetchTrial }) => {
  const createTrial = useCallback(async () => {
    try {
      await trialService.createTrial();
      await fetchTrial();
    } catch (e) {
      alert(e);
    }
  }, []);

  return (
    <>
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          トライアルURL発行
        </Typography>
      </Box>
      <Box marginTop={2} sx={{ textAlign: 'center' }}>
        <Button
          className="active"
          variant={'outlined'}
          onClick={createTrial}
          sx={{
            paddingTop: 3,
            paddingBottom: 3,
            paddingLeft: 5,
            paddingRight: 5,
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          URLを発行する
        </Button>
      </Box>
    </>
  );
};
