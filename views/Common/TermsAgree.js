import _ from 'lodash';
import React from 'react';
import {Box, Checkbox, Dialog, DialogContent, Typography} from '@mui/material';
import {userService} from 'services';

export default function TermsAgree({open, handleClose, userId}) {
  const agreeTerms = async () => {
    await userService.setAgree(userId);
    handleClose();
  }

  return (
    <Dialog
      open={open}
      // onClose={handleClose}
      scroll={'body'}
      sx={{ '& .MuiDialog-paper': { 
        maxWidth: '450px',
        width: '450px',
        background: 'linear-gradient(157.53deg,#edf7fe 11.25%,#fff 50.77%,#edf7fe 92.83%)'
      }}}
    >
      <DialogContent>
        <Box>
          <Typography gutterBottom>
            この度はご登録いただき、誠にありがとうございます。
          </Typography>
          <Typography gutterBottom>
            A streamのご利用にあたりまして、まずは利用規約にご同意いただく必要がございます。
          </Typography>
          <Typography gutterBottom>
            恐れ入りますが、利用規約を一読いただいた上で、ご同意いただける場合は以下のチェックボックスにチェックをお願いします。
          </Typography>
          <Box sx={{margin: '1rem 1rem 0.2rem'}}>
            <a href='/terms' target='_blank' style={{color: 'blue', textDecoration: 'none'}}>利用規約はこちらから</a>
          </Box>
          <Box sx={{margin: '0.2rem 1rem 1rem'}}>
            <a href='/policy' target='_blank' style={{color: 'blue', textDecoration: 'none'}}>プライバシーポリシーはこちらから</a>
          </Box>
          <Checkbox
            onChange={evt=>agreeTerms()}
            sx={{ color: '#A3DE97 !important', '& .MuiSvgIcon-root': { fontSize: 24 }}}
          />利用規約とプライバシーポリシーに同意します
        </Box>
      </DialogContent>
    </Dialog>
  );
};