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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useRouter } from 'next/router';

const rilHeadCells = [
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
    id: 'richper',
    label: { en: 'Reach%', jp: 'リーチ%' },
  },
  {
    id: 'saving',
    label: { en: 'Number of save', jp: '保存数' },
  },
  {
    id: 'savingper',
    label: { en: 'Save%', jp: '保存%' },
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
    id: 'normal',
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

const ReportRilRow = ({ row, updateDatas, classes }) => {
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
  const richRef = useRef();
  const savingRef = useRef();
  const oksRef = useRef();
  const commentRef = useRef();
  const prsRef = useRef();
  const richPerRef = useRef();
  const savingPerRef = useRef();
  const sellRef = useRef();
  const roasRef = useRef();

  const handleMenuClose = (type, memId, accId) => {
    switch (type) {
      case 'add':
        updateDatas(memId, 'add', 3);
        break;
      case 'del':
        updateDatas(memId, 'del', 3, accId);
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  const richValueChanged = (evt) => {
    let oksVal = +oksRef.current.value;
    let richVal = +richRef.current.value;
    let savingVal = +savingRef.current.value;
    let commentVal = +commentRef.current.value;
    let sellVal = +sellRef.current.value;
    let amountVal = +row.amount;

    if (isNaN(richVal)) return;

    richPerRef.current.value =
      !richVal || !row.followers || row.followers === 0
        ? 0
        : ((richVal / row.followers) * 100).toFixed(1);

    if (!isNaN(commentVal) && !isNaN(oksVal) && row.followers) {
      prsRef.current.value = (
        ((commentVal + oksVal) / row.followers) *
        100
      ).toFixed(1);
    }

    if (!isNaN(savingVal)) {
      savingPerRef.current.value =
        !savingVal || !richVal ? 0 : ((savingVal / richVal) * 100).toFixed(1);
    }

    if (!isNaN(amountVal) && !isNaN(sellVal)) {
      roasRef.current.value =
        !amountVal || !sellVal ? 0 : ((sellVal / amountVal) * 100).toFixed(1);
    }
  };

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
      !row.saving || !row.rich || row.rich === 0
        ? 0
        : ((row.saving / row.rich) * 100).toFixed(1);
    richPerRef.current.value =
      !row.rich || !row.followers
        ? 0
        : ((row.rich / row.followers) * 100).toFixed(1);
    prsRef.current.value = !row.followers
      ? 0
      : (((row.comment + row.oks) / row.followers) * 100).toFixed(1);
    roasRef.current.value =
      !row.sell || !row.amount || row.amount === 0
        ? 0
        : ((row.sell / row.amount) * 100).toFixed(1);

    setPostDate(row.postAt ? row.postAt : null);
  }, [row]);

  const blurInput = (memId, field, val) => {
    updateDatas(memId, 'update', 3, { field, val });
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
                updateDatas(row._id, 'update', 3, {
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
            type="Number"
            sx={{ width: '100px' }}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputRef={sellRef}
            onBlur={(e) => blurInput(row._id, 'sell', e.currentTarget.value)}
            onChange={richValueChanged}
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
            type="Number"
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

export default function ReportRilEditTable({
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
                {rilHeadCells.map((headCell) => (
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
                <ReportRilRow
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
