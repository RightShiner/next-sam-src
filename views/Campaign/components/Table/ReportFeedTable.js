import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableSortLabel,
  Paper,
  Button,
} from '@mui/material';
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
    id: 'rich',
    label: { en: 'Number of reach', jp: 'リーチ数' },
  },
  {
    id: 'percentOfReach',
    label: { en: 'Reach%', jp: 'リーチ%' },
  },
  {
    id: 'saving',
    label: { en: 'Number of saves', jp: '保存数' },
  },
  {
    id: 'savePercent',
    label: { en: 'Save %', jp: '保存%' },
  },
  {
    id: 'oks',
    label: { en: 'Number of likes', jp: 'いいね数' },
  },
  {
    id: 'comment',
    label: { en: 'Number of comments', jp: 'コメント数' },
  },
  {
    id: 'engagerate',
    label: { en: 'Normal EG%', jp: '通常EG%' },
  },
  {
    id: 'prs',
    label: { en: 'PREG%', jp: 'PREG%' },
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

const ReportFeedRow = ({ row, classes }) => {
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
        <TableCell className={classes.feedtableCell} sx={{ minWidth: '10em' }}>
          {row.name}
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{ minWidth: '6em' }}>
          {row.postAt ? moment(row.postAt).format('YYYY/MM/DD') : ''}
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{ minWidth: '15em' }}>
          {row.postLink ?? ''}
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{ minWidth: '10em' }}>
          {row.shopping ?? ''}
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{ minWidth: '5em' }}>
          {formatterInt.format(row.amount)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatterInt.format(row.followers)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatterInt.format(row.rich)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatter.format(
            !row.rich || !row.followers ? 0 : (row.rich / row.followers) * 100,
          )}
          %
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatterInt.format(row.saving)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatter.format(
            !row.rich || !row.saving ? 0 : (row.saving / row.rich) * 100,
          )}
          %
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
            !row.oks || !row.rich || !row.comment
              ? 0
              : ((row.oks + row.comment) / row.rich) * 100,
          )}
          %
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatterInt.format(row.sell)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatter.format(
            !row.sell || !row.amount ? 0 : (row.sell / row.amount) * 100,
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

export default function ReportFeedTable({ getDatas, classes, ...rest }) {
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
            sx={{ minWidth: 1000 }}
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
                <ReportFeedRow key={index} row={row} classes={classes} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
