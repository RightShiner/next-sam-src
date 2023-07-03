import React, { useState, useEffect, useMemo } from 'react';
import {
  Stack,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
} from '@mui/material';
import { monitoringService } from 'services';

const PostDeleteDialog = ({ open, detailInfo, selCampId, handleClose }) => {
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSubmit = async () => {
    setConfirm(true);
    setDeleting(true);
    const data = {
      campId: selCampId,
      infId: detailInfo.inf_profile.userId,
      pk: detailInfo.pk,
    };
    return monitoringService
      .deletePosts(data)
      .then((ret) => {
        setDeleting(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      className="delete-dialog"
    >
      <DialogContent className="content" dividers>
        {!confirm ? (
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Typography className="title">投稿を削除しますか？</Typography>
            <Typography className="detail">
              ・ 一度消した投稿はもとには戻せません
              <br />・ PRダッシュボードの数値が変動します
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Typography className="title">
              {deleting ? '削除中...' : '投稿を削除しました'}
            </Typography>
            {deleting ? (
              <CircularProgress sx={{ color: 'rgba(48, 48, 48, 0.3)' }} />
            ) : (
              <img src="/images/delete_confirm.png" alt="delete" />
            )}
          </Stack>
        )}
      </DialogContent>
      <DialogActions className="action" sx={{ justifyContent: 'center' }}>
        {!confirm && (
          <Button onClick={handleClose} className="gray_button">
            キャンセル
          </Button>
        )}
        <Button
          onClick={confirm ? handleClose : handleSubmit}
          className={confirm ? 'gray_button' : 'pink_button'}
          disabled={confirm && deleting}
        >
          {confirm ? '閉じる' : '削除'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDeleteDialog;
