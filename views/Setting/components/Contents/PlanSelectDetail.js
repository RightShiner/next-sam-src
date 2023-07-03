import _ from 'lodash';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import {Button, Box, Dialog, DialogContent, Typography} from '@mui/material';
import {AlertDlg} from 'views/Common';

export default function PlanSelectDetail({open, handleClose, data, transferToStrip}) {

  const [showAlert, showAlertDlg] = useState(false);
  const closeAlertDlg = (status) => {
    showAlertDlg(false);
    if (status === false) {
      handleClose();
      return;
    }

    handleClose();
    transferToStrip(data.type, !data.isAnnualy ? (data.plan.monthval ?? 0) : (data.plan.yearval ?? 0));
  }

  const formatter = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  });
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={'body'}
      sx={{ '& .MuiDialog-paper': { 
        maxWidth: '830px',
        width: '830px',
        background: 'linear-gradient(157.53deg,#edf7fe 11.25%,#fff 50.77%,#edf7fe 92.83%)'
      }}}
    >
      <DialogContent>
        {open === true && data && 
          <Box>
            <Box sx={{marginTop:'.5rem', marginBottom: '1rem', width: '100%'}}>
              {data.direction === false ? 
                <Typography style={{fontSize:'1.5rem', fontWeight: 600}}>
                  {data.type}にダウングレードしようとしています。
                </Typography> : 
                <Typography style={{fontSize:'1.5rem', fontWeight: 600}}>
                  {data.type}にアップグレードしようとしています。
                </Typography>
              }
            </Box>
            <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box
                  component={'img'}
                  src={'/images/svgs/planleft.svg'}
                />
              </Box>
              <Box sx={{display: 'flex', flexDirection: 'column', padding: '1.5rem', width: 'fit-content'}} className="box-wrapper-shadow">
                <Box sx={{marginTop: '2rem'}}>
                  <Typography style={{textAlign: 'center', fontWeight: 400, fontSize: '20px', lineHeight: '30px'}}>{data.type}</Typography>
                  <Typography style={{textAlign: 'center', fontWeight: 400, fontSize: '20px', lineHeight: '30px'}}>{data.isAnnualy === false ? 'Monthly' : 'Annual'}</Typography>
                </Box>
                <Box style={{marginTop: '.5rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 400, fontSize: '16px'}}>
                  Ideal for larger teams
                </Box>
                <Box sx={{textAlign: 'center'}}>
                  <span style={{fontWeight: 700, fontSize: '36px', lineHeight: '54px'}} >
                    {formatter.format(!data.isAnnualy ? (data.plan.monthval ?? 0) : (data.plan.yearval ?? 0))}
                    <span style={{fontSize: '.9rem'}}>/月</span>
                  </span>
                </Box>
                {/* <Box sx={{marginBottom: '1.5rem', fontSize: '14px', textAlign: 'center'}}>
                  {`年間で${formatter.format(data.plan.monthval ? data.plan.monthval * 0.8 * 12 : 0)}の請求になります`}
                </Box> */}
                <Box sx={{marginLeft: '1rem'}}>
                  <span style={{marginRight: '8px', fontWeight: 600, fontSize: '14px'}}>
                    {data.plan.pages} 
                  </span>
                  <span style={{color: '#616161', fontWeight: 400, fontSize: '14px'}}>ページ検索</span>
                </Box>
                <Box sx={{marginLeft: '1rem'}}>
                  <span style={{marginRight: '8px', fontWeight: 600, fontSize: '14px'}}>
                    {data.plan.profies} 
                  </span>
                  <span style={{color: '#616161', fontWeight: 400, fontSize: '14px'}}>プロフィール表示</span>
                </Box>
                <Box sx={{marginLeft: '1rem'}}>
                  <span style={{marginRight: '8px', fontWeight: 600, fontSize: '14px'}}>
                    {data.plan.reports} 
                  </span>
                  <span style={{color: '#616161', fontWeight: 400, fontSize: '14px'}}>フルレポート</span>
                </Box>
                <Box sx={{marginLeft: '1rem'}}>
                  <span style={{marginRight: '8px', fontWeight: 600, fontSize: '14px'}}>
                    {data.plan.csv} 
                  </span>
                  <span style={{color: '#616161', fontWeight: 400, fontSize: '14px'}}>CSV</span>
                </Box>
                <Box sx={{marginLeft: '1rem', marginBottom: '1rem'}}>
                  <span style={{marginRight: '8px', fontWeight: 600, fontSize: '14px'}}>
                    {data.plan.saves} 
                  </span>
                  <span style={{color: '#616161', fontWeight: 400, fontSize: '14px'}}>キャンペン登録</span>
                </Box>
              </Box>
            </Box>
            <Box style={{marginTop: '1.5rem', marginBottom: '.5rem'}}>
              <span>
                次回の請求{moment().add(1, 'months').format('YYYY年MM月DD日')}から、{formatter.format(!data.isAnnualy ? (data.plan.monthval ?? 0) : (data.plan.yearval ?? 0))}/月の請求が適用となります。
              </span>
            </Box>
            <Box className="manager" onClick={e=>showAlertDlg(true)}>
              <Button className="active">プラン変更</Button>
            </Box>
          </Box>
        }
      </DialogContent>
      <AlertDlg 
        title={'注意'} 
        caption={'本当に、\r\n変更でよろしいでしょうか？'}
        dlgState={showAlert}
        closeDlg={closeAlertDlg}
      />
    </Dialog>
  );
};