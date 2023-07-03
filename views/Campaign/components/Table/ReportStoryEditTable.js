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

const storyHeadCells = [
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
    id: 'inp',
    label: { en: 'Imp', jp: 'インプ' },
  },
  {
    id: 'inpper',
    label: { en: 'Imp%', jp: 'インプ%' },
  },
  {
    id: 'click',
    label: { en: 'Click', jp: 'クリック' },
  },
  {
    id: 'clickper',
    label: { en: 'Click%', jp: 'クリック%' },
  },
  {
    id: 'stamp',
    label: { en: 'Stamp', jp: 'スタンプ' },
  },
  {
    id: 'stampper',
    label: { en: 'Stamp%', jp: 'スタンプ%' },
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

const ReportStoryRow = ({ row, updateDatas, classes }) => {
  const formatterInt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
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
        updateDatas(memId, 'add', 2);
        break;
      case 'del':
        updateDatas(memId, 'del', 2, accId);
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  const postAtRef = useRef();
  const postLinkRef = useRef();
  const shoppingRef = useRef();
  const inpRef = useRef();
  const clickRef = useRef();
  const stampRef = useRef();
  const sellRef = useRef();
  const roasRef = useRef();
  const inpPerRef = useRef();
  const clickPerRef = useRef();
  const stampPerRef = useRef();

  const inpValueChanged = (evt) => {
    let inpVal = +evt.target.value;
    if (!row.followers || isNaN(inpVal) || row.followers === 0) return;

    inpPerRef.current.value = ((inpVal / row.followers) * 100).toFixed(1);
  };

  const clickValueChanged = (evt) => {
    let clickVal = +evt.target.value;
    if (!row.followers || isNaN(clickVal) || row.followers === 0) return;

    clickPerRef.current.value = ((clickVal / row.followers) * 100).toFixed(1);
  };

  const stampValueChanged = (evt) => {
    let stampVal = +evt.target.value;
    if (!row.followers || isNaN(stampVal) || row.followers === 0) return;

    stampPerRef.current.value = ((stampVal / row.followers) * 100).toFixed(1);
  };

  const amountValueChanged = (evt) => {
    let amountVal = +row.amount;
    let sellVal = +sellRef.current.value;
    if (isNaN(amountVal) || isNaN(sellVal)) return;

    roasRef.current.value =
      !amountVal || !sellVal || sellVal === 0
        ? 0
        : ((sellVal / amountVal) * 100).toFixed(1);
  };

  useEffect(() => {
    if (!row) return;

    postAtRef.current.value = row.postAt ? row.postAt : '';
    postLinkRef.current.value = row.postLink ? row.postLink : '';
    shoppingRef.current.value = row.shopping ? row.shopping : '';
    inpRef.current.value = row.inp ? row.inp : 0;
    clickRef.current.value = row.click ? row.click : 0;
    stampRef.current.value = row.stamp ? row.stamp : 0;
    sellRef.current.value = row.sell ? row.sell : 0;

    inpPerRef.current.value =
      !row.inp || !row.followers || row.followers === 0
        ? 0
        : ((row.inp / row.followers) * 100).toFixed(1);
    clickPerRef.current.value =
      !row.click || !row.followers || row.followers === 0
        ? 0
        : ((row.click / row.followers) * 100).toFixed(1);
    stampPerRef.current.value =
      !row.stamp || !row.followers || row.followers === 0
        ? 0
        : ((row.stamp / row.followers) * 100).toFixed(1);
    roasRef.current.value =
      !row.sell || !row.amount || row.amount === 0
        ? 0
        : ((row.sell / row.amount) * 100).toFixed(1);

    setPostDate(row.postAt ? row.postAt : null);
  }, [row]);

  const blurInput = (memId, field, val) => {
    updateDatas(memId, 'update', 2, { field, val });
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
                updateDatas(row._id, 'update', 2, {
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
            inputRef={inpRef}
            onChange={inpValueChanged}
            onBlur={(e) => blurInput(row._id, 'inp', e.currentTarget.value)}
            type="Number"
            sx={{ width: '100px' }}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputProps={{ disabled: true }}
            inputRef={inpPerRef}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputRef={clickRef}
            onChange={clickValueChanged}
            onBlur={(e) => blurInput(row._id, 'click', e.currentTarget.value)}
            type="Number"
            sx={{ width: '100px' }}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputProps={{ readOnly: true }}
            inputRef={clickPerRef}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputRef={stampRef}
            onChange={stampValueChanged}
            onBlur={(e) => blurInput(row._id, 'stamp', e.currentTarget.value)}
            type="Number"
            sx={{ width: '100px' }}
          />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField
            className={classes.feedtableTextField}
            variant="outlined"
            inputProps={{ readOnly: true }}
            inputRef={stampPerRef}
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
            inputRef={roasRef}
            onBlur={(e) => blurInput(row._id, 'roas', e.currentTarget.value)}
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

export default function ReportStoryEditTable({
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
                {storyHeadCells.map((headCell) => (
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
                <ReportStoryRow
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
