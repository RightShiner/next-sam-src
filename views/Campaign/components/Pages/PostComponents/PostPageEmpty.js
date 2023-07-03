import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const PostPageEmpty = ({ setOpen, monitoringStatus }) => {
  const handleOpen = () => setOpen((prev) => ({ ...prev, monitoring: true }));

  return (
    <>
      <Box className="empty">
        {monitoringStatus === 'none' ? (
          <img src={'/images/monitoring/monitoring_not_set.png'} alt="noPost" />
        ) : (
          <img src={'/images/monitoring/monitoring_hold.png'} alt="noPost" />
        )}
      </Box>
      <Typography
        fontSize="16px"
        textAlign="center"
        variant="body2"
        sx={{
          color:
            monitoringStatus === 'none' ? 'rgba(48, 48, 48, 0.5)' : '#969696',
        }}
        gutterBottom
      >
        表示できる投稿がありません。
      </Typography>
      <Typography
        fontSize="14px"
        textAlign="center"
        variant="body2"
        sx={{
          color:
            monitoringStatus === 'none' ? 'rgba(48, 48, 48, 0.5)' : '#969696',
        }}
      >
        投稿の表示設定、作成をしてください
      </Typography>
      {monitoringStatus === 'none' && (
        <Box py={3} display="flex" justifyContent="center">
          <Button className="modal_button" onClick={handleOpen}>
            投稿の設定・作成をする
          </Button>
        </Box>
      )}
    </>
  );
};

export default PostPageEmpty;
