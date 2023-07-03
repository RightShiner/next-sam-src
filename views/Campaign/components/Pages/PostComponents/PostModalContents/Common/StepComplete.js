import React, { useState, useEffect, useMemo } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';

const StepComplete = ({ method, saving, detailInfo }) => {
  const imgSrc =
    method === 'auto'
      ? '/images/monitoring/monitoring_done.png'
      : detailInfo
      ? '/images/monitoring/editing_done.png'
      : '/images/monitoring/posting_done.png';

  return (
    <Box className="step_complete">
      {saving ? (
        <>
          <Typography className="title" mb="50px">
            {method === 'auto'
              ? 'モニタリングを準備中...'
              : detailInfo
              ? '投稿を修正中...'
              : '投稿を作成中...'}
          </Typography>
          <CircularProgress
            sx={{ color: detailInfo ? '#814BC7' : '#1377eb' }}
          />
        </>
      ) : (
        <>
          <Typography className="title">
            {method === 'auto'
              ? 'モニタリングの準備が完了しました！'
              : detailInfo
              ? '修正が完了しました！'
              : '投稿が正常に作成されました！'}
          </Typography>
          <Typography fontSize="14px">
            {method === 'auto'
              ? '投稿されるまでゆったりとお待ちください'
              : '実際に確認してみましょう'}
          </Typography>
          <img src={imgSrc} alt="done" />
        </>
      )}
    </Box>
  );
};

export default StepComplete;
