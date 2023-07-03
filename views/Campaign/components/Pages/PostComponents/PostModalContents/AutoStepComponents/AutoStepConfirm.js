import React, { useState, useEffect, useMemo } from 'react';
import { Box, Collapse, Divider, Stack, Typography } from '@mui/material';
import {
  LocalizationProvider,
  StaticDateRangePicker,
} from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import jaLocale from 'date-fns/locale/ja';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TransitionGroup } from 'react-transition-group';

import RelativeImage from 'components/RelativeImage';
import { DateToString } from 'libs/commonFunc';

const AutoStepConfirm = ({
  alert,
  members,
  collections,
  searchType,
  monitorPeriod,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Box className="step_confirm">
      <Typography
        variant="body2"
        fontSize="14px"
        sx={{ color: '#E5466C', lineHeight: '1.5', mb: 4 }}
        gutterBottom
      >
        &#8251; モニタリング期間内に設定を変更することはできません
      </Typography>
      <Stack spacing={5} divider={<Divider flexItem />}>
        <Stack spacing={3}>
          <Typography className="title">アカウント</Typography>
          <Typography px="10px" fontWeight="bold">
            {members.length}アカウント
          </Typography>
          <TransitionGroup className="account">
            {members
              .slice(0, showMore ? members.length : 12)
              .map((member, index) => (
                <Collapse className="account_collapse">
                  <Box className="account_box">
                    <RelativeImage
                      isRound
                      imgSrc={member?.avatar}
                      sx={{
                        width: '3.125rem !important',
                        height: '3.125rem !important',
                        margin: '.5rem',
                      }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography sx={{ fontSize: '15px', color: '#303030' }}>
                        {member?.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          color: 'rgba(48, 48, 48, 0.5)',
                        }}
                      >
                        {'@' + member?.infName}
                      </Typography>
                    </Box>
                  </Box>
                </Collapse>
              ))}
          </TransitionGroup>
          {members.length > 12 && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography
                onClick={() => setShowMore((prev) => !prev)}
                sx={{
                  fontSize: '14px',
                  color: '#0092E4',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                {showMore ? '短く表示' : 'すべて表示'}
              </Typography>
              {showMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Box>
          )}
        </Stack>
        <Stack spacing={3}>
          <Typography className="title">モニタリング期間</Typography>
          <Typography px="10px" fontWeight="bold">
            {DateToString(monitorPeriod[0])} ~ {DateToString(monitorPeriod[1])}
          </Typography>
          <Box display="flex" justifyContent="center">
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={jaLocale}
            >
              <StaticDateRangePicker
                className="calendar"
                displayStaticWrapperAs="desktop"
                value={[new Date(monitorPeriod[0]), new Date(monitorPeriod[1])]}
              />
            </LocalizationProvider>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Typography className="title">投稿の条件</Typography>
          <Typography px="10px" fontWeight="bold">
            {searchType === 'all' ? 'すべての投稿' : '条件を指定'}
          </Typography>
          {searchType === 'all' && (
            <>
              <Typography className="title">アラート</Typography>
              <Typography px="10px" fontWeight="bold">
                {alert ? 'あり' : 'なし'}
              </Typography>
            </>
          )}
          {((searchType === 'all' && alert) || searchType === 'condition') && (
            <>
              <Typography className="title">
                ハッシュタグ・メンション
              </Typography>
              <Typography px="10px" fontWeight="bold">
                {collections.hashtag.map((item) => {
                  return '#' + item + ' ';
                })}
              </Typography>
              <Typography px="10px" fontWeight="bold">
                {collections.mention.map((item) => {
                  return '@' + item + ' ';
                })}
              </Typography>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default AutoStepConfirm;
