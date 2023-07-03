import React, { useState, useEffect } from 'react';
import { campaignService } from 'services';
import ContentPage from './contentComponents';
import StepPage from './stepComponents';
import { Box, CircularProgress } from '@mui/material';

const PostPage = ({ selCampId, catType }) => {
  const [loading, setLoading] = useState(false);
  const [isMonitoring, setMonitoring] = useState(false);

  useEffect(async () => {
    setLoading(true);
    return campaignService
      .getMonitoring(selCampId)
      .then((ret) => {
        setMonitoring(ret.data.isSet);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            width: '100%',
            height: '50vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress sx={{ color: '#1377eb' }} />
        </Box>
      ) : isMonitoring === false ? (
        <StepPage
          selCampId={selCampId}
          catType={catType}
          isMonitoring={isMonitoring}
          setMonitoring={setMonitoring}
        />
      ) : (
        <ContentPage selCampId={selCampId} setMonitoring={setMonitoring} />
      )}
    </>
  );
};

export default PostPage;
