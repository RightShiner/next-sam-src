/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useMemo } from 'react';
import { Box, CircularProgress } from '@mui/material';
import styles from './styles';
import { useTheme, makeStyles } from '@mui/styles';
import { GroupByDate, GroupByInfluencer } from './components';

const ContentPageMain = ({
  data,
  group,
  settings,
  fetchDone,
  hiddenMode,
  hiddenList,
  setHiddenList,
}) => {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, { defaultTheme: theme });
  }, [theme]);
  const classes = useStyles();

  return (
    <Box sx={{ mt: '-70px' }}>
      {fetchDone && (
        <>
          {(group === 1 || group === 2) && (
            <GroupByInfluencer
              data={data}
              settings={settings}
              classes={classes}
              hiddenMode={hiddenMode}
              hiddenList={hiddenList}
              setHiddenList={setHiddenList}
            />
          )}
          {group === 4 && (
            <GroupByDate
              data={data}
              settings={settings}
              classes={classes}
              hiddenMode={hiddenMode}
              hiddenList={hiddenList}
              setHiddenList={setHiddenList}
            />
          )}
        </>
      )}
      {!fetchDone && (
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
      )}
    </Box>
  );
};

export default ContentPageMain;
