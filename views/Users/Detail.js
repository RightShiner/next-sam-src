import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Fixed from 'layouts/Fixed';
import styles from './styles';
import Container from 'layouts/Fixed/components/Container';
import { Info, History, Usage, LoginHistory } from './details';

const Detail = ({ userInfo, usage, history }) => {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, { defaultTheme: theme });
  }, [theme]);
  const classes = useStyles();

  const getInfo = useCallback(() => {
    return userInfo;
  }, [userInfo]);

  const getUsage = useCallback(() => {
    return usage;
  }, [usage]);

  const getHistory = useCallback(() => {
    return history;
  }, [history]);

  return (
    <Fixed hideAnnouncement={true}>
      <Container>
        <Box display="flex">
          <Button
            component="a"
            size="small"
            href={'/users/userlist'}
            sx={{
              width: 200,
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
            <Typography style={{ color: 'black', fontSize: '20px' }}>
              ユーザーリストへ
            </Typography>
          </Button>
        </Box>
        <Info getDatas={getInfo} classes={classes} />
        <Usage
          getDatas={getInfo}
          getUsages={getUsage}
          getHistory={getHistory}
          classes={classes}
        />
        <LoginHistory
          getDatas={getInfo}
          classes={classes}
          data-aos={'fade-up'}
        />
      </Container>
    </Fixed>
  );
};

export default Detail;
