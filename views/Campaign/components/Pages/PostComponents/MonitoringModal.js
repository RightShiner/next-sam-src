import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from '@mui/material';
import { AutoStepper, ManualStepper, MethodSelect } from './PostModalContents';
import { userService } from 'services';

const PostModal = ({
  open,
  catType,
  userInfo,
  handleClose,
  selCampId,
  manualModal,
  isMonitoring,
  setReload,
  setMonitoring,
}) => {
  const [contentState, setContentState] = useState('init');
  const [method, setMethod] = useState('auto');
  const [checked, setChecked] = useState('');
  const [initMethod, setInitMethod] = useState('');

  useEffect(async () => {
    let ret = await userService.getPostingMethod(userInfo.id);
    setInitMethod(ret.data);
    setChecked(ret.data);
    if (catType !== 'instagram') {
      setContentState('process');
      setMethod('manual');
    }
  }, [open]);

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleCheckChange = (val) => {
    setChecked(checked === val ? 'none' : val);
    setInitMethod('');
  };

  const handleConfirmClick = async () => {
    setContentState('process');
    if (initMethod !== checked) {
      return userService
        .setPostingMethod(userInfo.id, checked)
        .then((ret) => console.log(ret))
        .catch((err) => console.log(err));
    }
  };

  const handleCancelClick = () => {
    handleClose();
    setContentState('init');
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      className="post-dialog"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        投稿を取得・作成
        <Box
          aria-label="close"
          className="cross_symbol"
          onClick={handleCancelClick}
        >
          <span>&#10006;</span>
        </Box>
      </DialogTitle>
      {!isMonitoring && contentState === 'init' ? (
        <MethodSelect
          method={method}
          checked={checked}
          initMethod={initMethod}
          handleCancelClick={handleClose}
          handleChange={handleMethodChange}
          handleCheckChange={handleCheckChange}
          handleConfirmClick={handleConfirmClick}
        />
      ) : (manualModal || method === 'manual') ? (
        <ManualStepper
          catType={catType}
          isMonitoring={isMonitoring}
          setMonitoring={setMonitoring}
          selCampId={selCampId}
          setReload={setReload}
          setContentState={setContentState}
          handleCancelClick={handleCancelClick}
        />
      ) : (
        <AutoStepper
          isMonitoring={isMonitoring}
          setMonitoring={setMonitoring}
          selCampId={selCampId}
          setReload={setReload}
          setContentState={setContentState}
          handleCancelClick={handleCancelClick}
        />
      )}
    </Dialog>
  );
};

export default PostModal;
