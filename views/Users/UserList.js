import moment from 'moment';
import _ from 'lodash';
import CsvDownloader from 'react-csv-downloader';
import NextLink from 'next/link';
import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { userService } from 'services';
import Constants from 'constants/constants';
import styles from './styles';

const columnsUserlist = [
  {
    id: 'c1',
    displayName: '日付',
  },
  {
    id: 'c2',
    displayName: '会社名',
  },
  {
    id: 'c3',
    displayName: 'HP',
  },
  {
    id: 'c4',
    displayName: '担当者名',
  },
  {
    id: 'c5',
    displayName: '電話番号',
  },
  {
    id: 'c6',
    displayName: 'メールアドレス',
  },
  {
    id: 'c7',
    displayName: '住所',
  },
  {
    id: 'c8',
    displayName: '契約プラン',
  },
  {
    id: 'c9',
    displayName: '契約月',
  },
  {
    id: 'c10',
    displayName: '決済',
  },
  {
    id: 'c11',
    displayName: '終了予定',
  },
  {
    id: 'c12',
    displayName: '最終ログイン',
  },
];

const strPeriod = ['1週間', '単月', '半年', '1年', 'カスタム'];
const strPay = ['-', 'クレジットカード', 'カスタム'];

const UserList = () => {
  const [users, setUsers] = useState([]);

  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, { defaultTheme: theme });
  }, [theme]);
  const classes = useStyles();

  useEffect(() => {
    userService.getAll().then((response) => {
      if (response.status !== 'ok') return;

      let tUsers = _.map(response.users, (usr) => {
        return { ...usr, cdate: moment(usr.cdate).format('YYYY-MM-DD') };
      });

      setUsers([...tUsers]);
    });
  }, []);

  const getPayend = (user) => {
    // if (user.plantype === 'カスタム')
    //   return 'カスタム';

    // if (user.plantype === 'Free trial')
    //   return '-';

    if (!user.payend) return '';
    return moment(user.payend).format('YYYY-MM-DD');
  };

  const downloadCSVDatas = () => {
    const result = users.map((itm) => {
      return {
        c1: `"${itm.cdate}"`,
        c2: `"${itm.company}"`,
        c3: `"${itm.url}"`,
        c4: `"${itm.name}"`,
        c5: `"${itm.phone}"`,
        c6: `"${itm.email}"`,
        c7: `"${itm.addr}"`,
        c8: `"${itm.plantype}"`,
        c9: `"${strPeriod[itm.periodtype]}"`,
        c10: `"${strPay[itm.paytype]}"`,
        c11: `"${getPayend(itm)}"`,
        c12: `"${moment(itm.loginAt).format('YYYY-MM-DD HH:mm:ss')}"`,
      };
    });

    return Promise.resolve(result);
  };

  return (
    <Fixed hideAnnouncement={true}>
      <Container>
        <Box sx={{ width: '100%', overflow: 'auto' }}>
          <CsvDownloader
            filename="userlist.csv"
            extension=".csv"
            separator=","
            columns={columnsUserlist}
            datas={downloadCSVDatas}
          >
            <Button
              sx={{
                float: 'right',
                color: 'black !important',
                borderRadius: '20px !important',
                border: '1px solid #1377EB',
              }}
            >
              CSV
            </Button>
          </CsvDownloader>
          <Table className="evenoddTable" sx={{ minWidth: '1800px' }}>
            <TableHead>
              <TableRow>
                <TableCell>操作</TableCell>
                <TableCell>日付</TableCell>
                <TableCell>会社名</TableCell>
                <TableCell>HP</TableCell>
                <TableCell>担当者名</TableCell>
                <TableCell>電話番号</TableCell>
                <TableCell>メールアドレス</TableCell>
                <TableCell>住所</TableCell>
                <TableCell>契約プラン</TableCell>
                <TableCell>契約月</TableCell>
                <TableCell>決済</TableCell>
                <TableCell>終了予定</TableCell>
                <TableCell>最終ログイン</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(users, (usr, idx) => (
                <TableRow key={idx}>
                  <TableCell style={{ width: '80px' }}>
                    {usr.perms !== Constants.roleInfo.admin && (
                      <NextLink
                        href={`/users/detail/${usr._id}`}
                        passHref
                        replace
                      >
                        詳細
                      </NextLink>
                    )}
                  </TableCell>
                  <TableCell style={{ width: '100px' }}>{usr.cdate}</TableCell>
                  <TableCell
                    align="left"
                    style={{ width: '180px' }}
                    className={classes.ellipseCaption}
                  >
                    {usr.company}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ width: '200px' }}
                    className={classes.ellipseCaption}
                  >
                    {usr.url}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ width: '150px' }}
                    className={classes.ellipseCaption}
                  >
                    {usr.name}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ width: '100px' }}
                    className={classes.ellipseCaption}
                  >
                    {usr.phone}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ width: '180px' }}
                    className={classes.ellipseCaption}
                  >
                    {usr.email}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ width: '200px' }}
                    className={classes.ellipseCaption}
                  >
                    {usr.addr}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ width: '120px' }}
                    className={classes.ellipseCaption}
                  >
                    {usr.plantype}
                  </TableCell>
                  <TableCell align="left">
                    {strPeriod[usr.periodtype]}
                  </TableCell>
                  <TableCell align="left">{strPay[usr.paytype]}</TableCell>
                  <TableCell align="left">{getPayend(usr)}</TableCell>
                  <TableCell align="left" style={{ width: '150px' }}>
                    {moment(usr.loginAt).format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </Fixed>
  );
};

export default UserList;
