import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PlanChangeAlertDlg({ dlgState, closeDlg }) {
  return (
    <Dialog
      open={dlgState}
      onClose={(e) => closeDlg(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        プランのご変更を承ります。
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ whiteSpace: 'pre-wrap' }}
        >
          {process.env.NEXT_PUBLIC_REGION == 'SG'
            ? 'プランの変更については、A streamの営業担当または問い合わせメールでご連絡ください。\r\nhello@astream.sg'
            : 'クレジットカード決済は現在使用することができません。\r\n大変恐れ入りますが、Astreamサポートチームまで、メールもしくはチャットにてプラン変更の連絡を頂ければ幸いです。\r\nastream@acetokyo.com'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => closeDlg(true)}>戻る</Button>
        {/* <Button onClick={e=>closeDlg(true)} autoFocus>
          プラン変更
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}
