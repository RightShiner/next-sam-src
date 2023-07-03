import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function RemoveAlertDlg({dlgState, closeDlg, title, caption}) {
  return (
    <Dialog
      open={dlgState}
      onClose={e=>closeDlg(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{whiteSpace:'pre-wrap'}}>
          {caption}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={e=>closeDlg(false)} autoFocus>
          いいえ
        </Button>
        <Button onClick={e=>closeDlg(true)}>
          はい
        </Button>
      </DialogActions>
    </Dialog>
  );
}