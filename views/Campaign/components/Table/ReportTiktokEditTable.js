import React, { useEffect, useState, useRef } from 'react';
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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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

const ReportTiktokRow = ({ row, updateDatas, classes }) => {
  const formatterInt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpened = Boolean(anchorEl);

  const [postDate, setPostDate] = useState();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const postAtRef = useRef();
  const postLinkRef = useRef();
  const shoppingRef = useRef();
  const oksRef = useRef();
  const prsRef = useRef();
  const commentRef = useRef();
  const shareRef = useRef();
  const sharePerRef = useRef();
  const prPerRef = useRef();
  const sellRef = useRef();
  const roasRef = useRef();

  const handleMenuClose = (type, memId, accId) => {
    switch (type) {
      case 'add':
        updateDatas(type, memId);
        break;
      case 'del':
        updateDatas(type, memId, accId);
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!row) return;

    postAtRef.current.value = row.postAt ? row.postAt : '';
    postLinkRef.current.value = row.postLink ? row.postLink : '';
    shoppingRef.current.value = row.shopping ? row.shopping : '';
    prsRef.current.value = row.prs ? row.prs : 0;
    oksRef.current.value = row.oks ? row.oks : 0;
    commentRef.current.value = row.comment ? row.comment : 0;
    shareRef.current.value = row.share ? row.share : 0;
    sellRef.current.value = row.sell ? row.sell : 0;
    prPerRef.current.value = !row.prs
      ? 0
      : (((row.oks + row.comment) / row.followers) * 100).toFixed(1);
    sharePerRef.current.value =
      !row.share || !row.prs ? 0 : ((row.share / row.prs) * 100).toFixed(1);
    roasRef.current.value =
      !row.amount || !row.sell || row.amount === 0
        ? '0%'
        : ((row.sell / row.amount) * 100).toFixed(1) + '%';

    setPostDate(row.postAt ? row.postAt : null);
  }, [row]);

  const amountValueChanged = (evt) => {
    let amountVal = +row.amount;
    let sellVal = +sellRef.current.value;
    if (isNaN(sellVal) || isNaN(amountVal)) return;

    roasRef.current.value =
      !amountVal || !sellVal || amountVal === 0
        ? '0%'
        : ((sellVal / amountVal) * 100).toFixed(1) + '%';
  };

  const shareValueChanged = (evt) => {
    let shareVal = +shareRef.current.value;
    let prsVal = +prsRef.current.value;
    let oksVal = +oksRef.current.value;
    let commentVal = +commentRef.current.value;
    if (!shareVal || !prsVal) return;

    sharePerRef.current.value = ((shareVal / prsVal) * 100).toFixed(1);
    prPerRef.current.value = (((oksVal + commentVal) / prsVal) * 100).toFixed(
      1,
    );
  };

  const okValueChanged = (evt) => {
    let oksVal = +oksRef.current.value;
    let commentVal = +commentRef.current.value;
    let prsVal = +prsRef.current.value;
    if (!prsVal) return;

    prPerRef.current.value = (((oksVal + commentVal) / prsVal) * 100).toFixed(
      1,
    );
  };

  const blurInput = (memId, field, val) => {
    updateDatas('update', memId, { field, val });
  };

  return (
    <>
      <TableRow>
        <TableCell className={classes.feedtableCell} sx={{ minWidth: '150px' }}>
          {row.name}
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{ minWidth: '120px' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              value={postDate}
              onChange={(newValue) => {
                setPostDate(newValue);
                updateDatas('update', row._id, {
                  field: 'postAt',
                  val: newValue,
                });
              }}
              inputFormat={'yyyy/MM/dd'}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className={classes.feedtableTextField}
                  variant="outlined"
                  inputRef={postAtRef}
                />
              )}
            />
          </LocalizationProvider>
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{ minWidth: '180px' }}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputRef={postLinkRef}
            onBlur={(e) =>
              blurInput(row._id, 'postLink', e.currentTarget.value)
            }
          />
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{ minWidth: '150px' }}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputRef={shoppingRef}
            onBlur={(e) =>
              blurInput(row._id, 'shopping', e.currentTarget.value)
            }
          />
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
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputRef={prsRef}
            onChange={shareValueChanged}
            onBlur={(e) => blurInput(row._id, 'prs', e.currentTarget.value)}
            type="Number"
            sx={{ width: '100px' }}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputRef={oksRef}
            onChange={okValueChanged}
            onBlur={(e) => blurInput(row._id, 'oks', e.currentTarget.value)}
            type="Number"
            sx={{ width: '100px' }}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputRef={commentRef}
            onChange={okValueChanged}
            onBlur={(e) => blurInput(row._id, 'comment', e.currentTarget.value)}
            type="Number"
            sx={{ width: '100px' }}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatter.format(row.engagerate * 100)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputProps={{ disabled: true }}
            inputRef={prPerRef}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputRef={shareRef}
            onChange={shareValueChanged}
            onBlur={(e) => blurInput(row._id, 'share', e.currentTarget.value)}
            type="Number"
            sx={{ width: '100px' }}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputProps={{ readOnly: true }}
            inputRef={sharePerRef}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputRef={sellRef}
            onChange={amountValueChanged}
            onBlur={(e) => blurInput(row._id, 'sell', e.currentTarget.value)}
            type="Number"
            sx={{ width: '100px' }}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputProps={{ readOnly: true }}
            inputRef={roasRef}
          />
        </TableCell>
        <TableCell align="center" className={classes.feedtableCell}>
          <Button
            aria-haspopup="true"
            onClick={handleMenuClick}
            className="active"
          >
            ...
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={menuOpened}
            onClose={(e) => handleMenuClose('')}
            sx={{
              boxShadow: '0 3px 6px 0 rgb(140 152 164 / 25%)',
            }}
          >
            <MenuItem onClick={(e) => handleMenuClose('add', row._id)}>
              追加
            </MenuItem>
            <MenuItem
              onClick={(e) => handleMenuClose('del', row._id, row.accountId)}
            >
              削除
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    </>
  );
};

export default function ReportTiktokEditTable({
  getDatas,
  updateDatas,
  classes,
  ...rest
}) {
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
      <Paper sx={{ width: '100%', mt: 2, mb: 2, overflow: 'auto', padding: 1 }}>
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
                <ReportTiktokRow
                  key={index}
                  row={row}
                  updateDatas={updateDatas}
                  classes={classes}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
