import Rect, { useState, useEffect } from 'react';
import moment from 'moment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography, TextField, Select, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const strPeriod = ['1週間', '単月', '半年', '1年'];
const strPay = ['-', 'クレジットカード'];
const strStatus = ['開始', '継続', '終了'];

export default function HistoryDlg({
  dlgState,
  closeDlg,
  deleteHistory,
  saveHistory,
  selRow,
}) {
  const [historyDate, setHistoryDate] = useState(moment().format('YYYY/MM/DD'));
  const [amount, setAmount] = useState(0);
  const [period, setPeriod] = useState(0);
  const [status, setStatus] = useState(0);
  const [pay, setPay] = useState(0);

  const appendHistory = () => {
    saveHistory({ historyDate, amount, period, status, pay });
  };

  useEffect(() => {
    if (dlgState === false && selRow === null) {
      return;
    }

    if (dlgState === true && selRow === null) {
      setHistoryDate(moment().format('YYYY-MM-DD'));
      setAmount(0);
      setPeriod(0);
      setStatus(0);
      setPay(0);
      return;
    }

    setHistoryDate(selRow.historydate);
    setAmount(selRow.amount);
    setPeriod(selRow.periodtype);
    setStatus(selRow.status);
    setPay(selRow.paytype);
  }, [selRow, dlgState]);

  return (
    <Dialog
      open={dlgState}
      onClose={(e) => closeDlg(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">履歴入力</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 3fr 7fr',
            padding: '.2rem 0',
          }}
        >
          <Box />
          <Typography>日付</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              value={historyDate}
              onChange={(newValue) =>
                setHistoryDate(moment(newValue).format('YYYY/MM/DD'))
              }
              inputFormat={'yyyy/MM/dd'}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: '200px',
                    '& input': {
                      padding: '4px',
                    },
                  }}
                  variant="outlined"
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 3fr 7fr',
            padding: '.2rem 0',
          }}
        >
          <Box />
          <Typography>金額</Typography>
          <TextField
            value={amount}
            sx={{ width: '200px' }}
            type="number"
            inputProps={{ style: { padding: '.5rem' } }}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 3fr 7fr',
            padding: '.2rem 0',
          }}
        >
          <Box />
          <Typography>期間</Typography>
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            size="small"
            sx={{ fontSize: '14px' }}
          >
            {_.map(strPeriod, (itm, idx) => (
              <MenuItem key={itm} value={idx} sx={{ fontSize: '14px' }}>
                {itm}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 3fr 7fr',
            padding: '.2rem 0',
          }}
        >
          <Box />
          <Typography>詳細</Typography>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            size="small"
            sx={{ fontSize: '14px' }}
          >
            {_.map(strStatus, (itm, idx) => (
              <MenuItem key={itm} value={idx} sx={{ fontSize: '14px' }}>
                {itm}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 3fr 7fr',
            padding: '.2rem 0',
          }}
        >
          <Box />
          <Typography>決済</Typography>
          <Select
            value={pay}
            onChange={(e) => setPay(e.target.value)}
            size="small"
            sx={{ fontSize: '14px' }}
          >
            {_.map(strPay, (itm, idx) => (
              <MenuItem key={itm} value={idx} sx={{ fontSize: '14px' }}>
                {itm}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => closeDlg(false)}>閉じる</Button>
        <Button disabled={selRow === null} onClick={(e) => deleteHistory()}>
          削除
        </Button>
        <Button onClick={(e) => appendHistory()} autoFocus>
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
}
