import moment from 'moment';
import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import {TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Box, Button, Paper, Typography} from '@mui/material';
import {userService} from 'services';
import HistoryDlg from './HistoryDlg';

const strPeriod = ['1週間', '単月', '半年', '1年', 'カスタム'];
const strPay = ['-', 'クレジットカード', 'カスタム'];
const strStatus = ['開始', '継続', '終了'];

const LoginHistory = ({getDatas, classes}) => {
  const [userInfo, setUserInfo] = useState(getDatas());
  const [history, setHistory] = useState([]);
  useEffect(() => {
    return userService.getLoginHistory(
      userInfo._id
    ).then((response) => {
      setHistory([...response.data]);
    });
  }, []);

  return (
    <Paper className="user-wrapper user-padding-small" sx={{marginTop: '30px !important'}}>
      <Typography className={classes.userdetailwrappertitle}>ログイン履歴</Typography>
      <TableContainer style={{ padding: 10 }}>
        <Table
          className="styledTable"
          aria-labelledby="tableTitle"
        >
          <TableHead>
            <TableRow>
              <TableCell padding='normal'>日付</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.length > 0 ? 
              (_.map(history.slice(-100), (row, index) => (
                <TableRow key={index}>
                  <TableCell>{moment(row).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                </TableRow>
            ))) : 
            (
              <TableRow>
                <TableCell>履歴がありません</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LoginHistory;
