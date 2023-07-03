import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { CP } from 'views/Common/CP';
import { useRouter } from 'next/router';

const feedHeadCells = [
  {
    id: 'name',
    label: { en: 'Account name', jp: 'アカウント名' },
  },
  {
    id: 'postAt',
    label: { en: 'Posted date', jp: '投稿日' },
  },
  {
    id: 'postLink',
    label: { en: 'Post URL', jp: '投稿URL' },
  },
  {
    id: 'shopping',
    label: { en: 'Product name', jp: '商品名' },
  },
  {
    id: 'amount',
    label: { en: 'Amount of money', jp: '金額' },
  },
  {
    id: 'followers',
    label: { en: 'Number of followers', jp: 'フォロワー数' },
  },
  {
    id: 'recycle',
    label: { en: 'Average replay', jp: '平均再生' },
  },
  {
    id: 'prs',
    label: { en: 'PR replay', jp: 'PR再生' },
  },
  {
    id: 'oks',
    label: { en: 'Likes', jp: 'いいね' },
  },
  {
    id: 'comment',
    label: { en: 'Number of comments', jp: 'コメント数' },
  },
  {
    id: 'normal',
    label: { en: 'Normal EG%', jp: '通常EG%' },
  },
  {
    id: 'prper',
    label: { en: 'PREG%', jp: 'PREG%' },
  },
  {
    id: 'share',
    label: { en: 'Share', jp: 'シェア' },
  },
  {
    id: 'shareper',
    label: { en: 'Share%', jp: 'シェア率' },
  },
  {
    id: 'sell',
    label: { en: 'Sale', jp: '売上' },
  },
  {
    id: 'roas',
    label: { en: 'ROAS', jp: 'ROAS' },
  },
];

const ReportTiktokRow = ({ row, classes }) => {
  const formatterInt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
  });

  const [selAccountId, setAccountId] = useState('');
  const closeCP = (val) => {
    setAccountId('');
  };

  return (
    <>
      <TableRow>
        <TableCell className={classes.feedtableCell} sx={{ minWidth: '150px' }}>
          {row.name}
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{ minWidth: '120px' }}>
          {row.postAt ? moment(row.postAt).format('YYYY/MM/DD') : ''}
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{ minWidth: '180px' }}>
          {row.postLink ?? ''}
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{ minWidth: '150px' }}>
          {row.shopping ?? ''}
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{ minWidth: '100px' }}>
          {formatterInt.format(row.amount)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatterInt.format(row.followers)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatterInt.format(row.recycle)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatterInt.format(row.prs)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatterInt.format(row.oks)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatterInt.format(row.comment)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatter.format(row.engagerate * 100)}%
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatter.format(
            !row.prs ? 0 : ((row.oks + row.comment) / row.prs) * 100,
          )}
          %
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatterInt.format(row.share)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatter.format(
            !row.share || !row.prs ? 0 : (row.share / row.prs) * 100,
          )}
          %
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatterInt.format(row.sell)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatter.format(
            !row.amount || !row.sell ? 0 : (row.sell / row.amount) * 100,
          )}
          %
        </TableCell>
        <TableCell align="center" className={classes.feedtableCell}>
          <Button
            onClick={(e) => setAccountId(row.accountId)}
            className="active"
          >
            DB
          </Button>
        </TableCell>
      </TableRow>
      <CP accountId={selAccountId} setCollapse={closeCP} />
    </>
  );
};

export default function ReportTiktokTable({ getDatas, classes, ...rest }) {
  const { locale } = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    let data = getDatas();
    if (!data) return;

    setData(data);
  }, [getDatas]);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: '100%' }} {...rest}>
      <Paper
        sx={{
          width: 'fit-content',
          mt: 2,
          mb: 2,
          overflow: 'auto',
          padding: 1,
          border: '1px solid rgb(140 152 164 / 25%)',
          boxShadow: 'unset',
        }}
      >
        <TableContainer style={{ padding: 10 }}>
          <Table
            className="styledTable"
            sx={{ minWidth: 1350 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead>
              <TableRow>
                {feedHeadCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    padding="normal"
                    align="left"
                    sortDirection={orderBy === headCell.id ? order : false}
                    className={classes.feedtableCell}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={(e) => handleRequestSort(headCell.id)}
                      sx={{ fontWeight: 'bold', whiteSpace: 'pre' }}
                    >
                      {headCell.label[locale]}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <ReportTiktokRow key={index} row={row} classes={classes} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
