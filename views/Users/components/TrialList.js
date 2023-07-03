import * as clipboard from 'clipboard-polyfill';
import _ from 'lodash';
import React, { useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import { trialService } from 'services';
import { AlertDlg } from 'views/Common';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

export const TrialList = ({ fetchTrial, trials }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showMemoDialog, setShowMemoDialog] = useState(false);
  const [defaultValueNote, setDefaultValueNote] = useState();
  const [selectId, setSelectId] = useState();

  const noteValue = useRef();

  const deleteTrial = useCallback(async (id) => {
    setShowDeleteAlert(true);
    setSelectId(id);
  }, []);

  const closeDeleteAlert = useCallback(
    async (status) => {
      if (status === false) {
        setShowDeleteAlert(false);
        return;
      }

      if (status) {
        await trialService.deleteTrial(selectId);
        await fetchTrial();
        setShowDeleteAlert(false);
      }
    },
    [selectId],
  );

  const memoTrial = useCallback(
    async (idx) => {
      setDefaultValueNote(trials[idx].note);
      setShowMemoDialog(true);
      setSelectId(trials[idx]._id);
    },
    [trials],
  );

  const handleCloseDialog = useCallback(
    async (status) => {
      if (status) {
        await trialService.updateTrial(selectId, {
          note: noteValue.current.value,
        });
        await fetchTrial();
      }
      setShowMemoDialog(false);
    },
    [selectId, noteValue],
  );

  const handleTrialIdClick = useCallback(async (e) => {
    e.preventDefault();
    const url = e.currentTarget.dataset.url || '';
    await clipboard.writeText(`${window.location.origin}${url}`);
    toast.success('URLをコピーしました');
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
          発行済みURL一覧
        </Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>発行日</TableCell>
            <TableCell>ステータス</TableCell>
            <TableCell>トライアルID</TableCell>
            <TableCell>メモ</TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(trials, (trial, idx) => (
            <TableRow
              key={idx}
              sx={{
                backgroundColor: trial.isAvailable ? 'transparent' : '#ccc',
              }}
            >
              <TableCell>{trial.createdDate}</TableCell>
              <TableCell>{trial.isAvailable ? '有効' : '無効'}</TableCell>
              <TableCell>
                {trial.isAvailable ? (
                  <Box sx={{ display: 'flex' }}>
                    <a
                      href={`/trial/${trial.trialId}`}
                      data-url={`/trial/${trial.trialId}`}
                      onClick={handleTrialIdClick}
                    >
                      {trial.trialId}
                    </a>
                    <ContentCopyIcon sx={{ width: 16, marginLeft: 0.5 }} />
                  </Box>
                ) : (
                  <span>{trial.trialId}</span>
                )}
              </TableCell>
              <TableCell>
                <Box sx={{ whiteSpace: 'pre-wrap' }}>{trial.note}</Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box>
                    <Button
                      className="error"
                      variant={'outlined'}
                      onClick={(e) => deleteTrial(trial._id)}
                    >
                      削除
                    </Button>
                  </Box>
                  <Box sx={{ marginLeft: 1 }}>
                    <Button
                      variant={'outlined'}
                      onClick={(e) => memoTrial(idx)}
                    >
                      編集
                    </Button>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={showMemoDialog}
        onClose={(e) => handleCloseDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth={'sm'}
      >
        <DialogTitle id="alert-dialog-title">メモ</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ whiteSpace: 'pre', paddingX: 1 }}
          >
            <TextField
              multiline
              rows={5}
              fullWidth
              defaultValue={defaultValueNote}
              inputRef={noteValue}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => handleCloseDialog(false)}
            autoFocus
            sx={{ color: '#d32f2f' }}
          >
            キャンセル
          </Button>
          <Button onClick={(e) => handleCloseDialog(true)} autoFocus>
            登録
          </Button>
        </DialogActions>
      </Dialog>
      <AlertDlg
        title={'注意'}
        caption={'本当に削除しますか？'}
        dlgState={showDeleteAlert}
        closeDlg={closeDeleteAlert}
      />
    </>
  );
};
