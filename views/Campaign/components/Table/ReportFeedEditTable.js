import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import {
  Menu,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableSortLabel,
  Paper,
  Button,
  TextField,
} from '@mui/material';
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

const ReportFeedRow = ({ row, updateDatas, classes }) => {
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

  const handleMenuClose = (type, memId, accId) => {
    switch (type) {
      case 'add':
        updateDatas(memId, 'add', 1);
        break;
      case 'del':
        updateDatas(memId, 'del', 1, accId);
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  const postAtRef = useRef();
  const postLinkRef = useRef();
  const shoppingRef = useRef();
  const richRef = useRef();
  const richPerRef = useRef();
  const savingRef = useRef();
  const savingPerRef = useRef();
  const oksRef = useRef();
  const commentRef = useRef();
  const prsRef = useRef();
  const sellRef = useRef();
  const roasRef = useRef();

  useEffect(() => {
    if (!row) return;

    postAtRef.current.value = row.postAt ? row.postAt : '';
    postLinkRef.current.value = row.postLink ? row.postLink : '';
    shoppingRef.current.value = row.shopping ? row.shopping : '';
    richRef.current.value = row.rich ? row.rich : 0;
    savingRef.current.value = row.saving ? row.saving : 0;
    oksRef.current.value = row.oks ? row.oks : 0;
    commentRef.current.value = row.comment ? row.comment : 0;
    sellRef.current.value = row.sell ? row.sell : 0;

    savingPerRef.current.value =
      !row.saving || !row.rich ? 0 : ((row.saving / row.rich) * 100).toFixed(1);
    richPerRef.current.value =
      !row.rich || !row.followers || row.followers === 0
        ? 0
        : ((row.rich / row.followers) * 100).toFixed(1);
    prsRef.current.value =
      !row.oks || !row.rich || !row.comment || row.rich === 0
        ? 0
        : (((row.oks + row.comment) / row.rich) * 100).toFixed(1);
    roasRef.current.value =
      !row.sell || !row.amount || row.amount === 0
        ? '0%'
        : ((row.sell / row.amount) * 100).toFixed(1) + '%';

    setPostDate(row.postAt ? row.postAt : null);
  }, [row]);

  const richValueChanged = (evt) => {
    let oksVal = +oksRef.current.value;
    let richVal = +richRef.current.value;
    let savingVal = +savingRef.current.value;
    let commentVal = +commentRef.current.value;

    if (isNaN(richVal)) return;

    richPerRef.current.value =
      !richVal || !row.followers || row.followers === 0
        ? 0
        : ((richVal / row.followers) * 100).toFixed(1);

    if (!isNaN(savingVal)) {
      savingPerRef.current.value = !richVal
        ? 0
        : ((savingVal / richVal) * 100).toFixed(1);
    }

    if (!isNaN(commentVal) && !isNaN(oksVal)) {
      prsRef.current.value = !richVal
        ? 0
        : (((commentVal + oksVal) / richVal) * 100).toFixed(1);
    }
  };

  const amountValueChanged = (evt) => {
    let amountVal = +row.amount;
    let sellVal = +sellRef.current.value;
    if (isNaN(amountVal) || isNaN(sellVal)) return;

    roasRef.current.value =
      !amountVal || !sellVal || sellVal === 0
        ? '0%'
        : ((sellVal / amountVal) * 100).toFixed(1) + '%';
  };

  const blurInput = (memId, field, val) => {
    updateDatas(memId, 'update', 1, { field, val });
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
                updateDatas(row._id, 'update', 1, {
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
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputRef={richRef}
            onChange={richValueChanged}
            onBlur={(e) => blurInput(row._id, 'rich', e.currentTarget.value)}
            type="Number"
            sx={{ width: '100px' }}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputProps={{ disabled: true }}
            inputRef={richPerRef}
            type="Number"
            sx={{ width: '100px' }}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputRef={savingRef}
            onChange={richValueChanged}
            onBlur={(e) => blurInput(row._id, 'saving', e.currentTarget.value)}
            type="Number"
            sx={{ width: '100px' }}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputProps={{ readOnly: true }}
            inputRef={savingPerRef}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputRef={oksRef}
            onChange={richValueChanged}
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
            onChange={richValueChanged}
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
            inputProps={{ readOnly: true }}
            inputRef={prsRef}
            onBlur={(e) => blurInput(row._id, 'prs', e.currentTarget.value)}
            type="Number"
            sx={{ width: '100px' }}
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
            sx={{ width: '100px' }}
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

export default function ReportFeedEditTable({
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
      <Paper
        sx={{
          width: 'fit-content',
          mt: 0,
          mb: 0,
          overflow: 'auto',
          padding: 0,
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
                <ReportFeedRow
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
