import * as React from 'react';
import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';

const lang = {
  en: {
    title: 'The monthly available amount for profile display has become 0!',
    content:
      'Please wait for the monthly usage reset date. If you want to use the profile display immediately, upgrade your plan and the monthly usage amount will be added.',
    action: 'Upgrade plan',
  },
  jp: {
    title: 'プロフィール表示の月間使用可能量が0になりました！',
    content:
      '月間使用可能量のリセット日をお待ちください。すぐにプロフィール表示をご利用になられたい場合はプランをアップグレード頂くと月間使用可能量が追加されます。',
    action: 'プランをアップグレードする',
  },
};

export default function OverflowDlg({ dlgState, closeDlg }) {
  const { locale } = useRouter();
  return (
    <Dialog
      open={dlgState}
      onClose={(e) => closeDlg(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {lang[locale].title}
          <Button
            sx={{ minWidth: '20px', padding: 0 }}
            onClick={(evt) => closeDlg(false)}
          >
            <CloseIcon fontSize="small" />
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontSize: '.8rem', whiteSpace: 'pre-wrap' }}
        >
          {lang[locale].content}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="manager">
        <Button className="active" autoFocus>
          <NextLink href="/setting" passHref>
            <a style={{ textDecoration: 'none', color: 'white' }}>
              {lang[locale].action}
            </a>
          </NextLink>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
