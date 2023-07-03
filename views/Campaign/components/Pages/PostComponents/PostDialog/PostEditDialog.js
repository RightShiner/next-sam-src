import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { monitoringService } from 'services';
import { ManualStepper } from '../PostModalContents';

const PostEditDialog = ({
  open,
  detailInfo,
  catType,
  selCampId,
  handleClose,
  setReload,
}) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      className="post-dialog"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        投稿を取得・作成
        <Box aria-label="close" className="cross_symbol" onClick={handleClose}>
          <span>&#10006;</span>
        </Box>
      </DialogTitle>
      <ManualStepper
        catType={catType}
        selCampId={selCampId}
        setReload={setReload}
        detailInfo={detailInfo}
        handleCancelClick={handleClose}
      />
    </Dialog>
  );
};

export default PostEditDialog;
