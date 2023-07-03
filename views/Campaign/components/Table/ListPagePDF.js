/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import RelativeImage from 'components/RelativeImage';
import React, {useState, useEffect} from 'react';
import {Button, Box, Paper} from '@mui/material';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from '@mui/material';
import { getComparator, stableSort } from 'libs/commonFunc'
import {ListPageTableHead, ListPageTableRow} from '.';

const headCells = [
  {
    id: 'star',
    numeric: true,
    label: '',
    align: 'center'
  },
  {
    id: 'name',
    numeric: true,
    label: 'アカウント名',
    align: 'left'
  },
  {
    id: 'followers',
    numeric: true,
    label: 'フォロワー数',
    align: 'left'
  },
  {
    id: 'eg',
    numeric: true,
    label: 'EG',
    align: 'left'
  },
  {
    id: 'status',
    numeric: true,
    label: 'ステータス',
    align: 'center'
  },
  {
    id: 'action',
    numeric: true,
    label: '',
    align: 'center'
  },
];

const statusValues = [
  '社内確認中',
  '交渉中',
  'NG',
  'OK'
];

const ListPagePDF = ({updatedInfos}) => {
  const formatterInt = new Intl.NumberFormat('en-US', {maximumFractionDigits: 0});
  const [staticInfo, setStaticInfo] = useState({mems:0, oks: 0, okfols: 0, memfols: 0, imems: 0, cmems: 0, nmems:0});

  useEffect(() => {
    let datas = updatedInfos();
    if (!datas || datas.length < 1)
      return;

    let oks = 0, okfols = 0, cmems = 0, imems = 0, nmems = 0, fols = 0;
    _.map(datas, itm => {
      if (itm.status === 1) { //社内確認中
        cmems ++;
      } else if (itm.status === 2) { //交渉中
        imems ++;
      } else if (itm.status === 3) { //NG
        nmems ++;
      } else { //OK
        oks ++;
        okfols += itm.followers;
      }

      fols += itm.followers;
    });

    setStaticInfo({mems: datas.length, oks: oks, okfols: okfols, memfols: fols, imems: imems, cmems: cmems, nmems: nmems});
  }, [updatedInfos]);

  return (
    <Box
      sx={{backgroundColor: 'white !important'}}
    >
      <Box className='valueItemContainer' >
        <Box className='valueItem'>
          <p className='value'>{formatterInt.format(staticInfo.mems)}</p>
          <p className='title'>人数</p>
        </Box>
        <Box className='valueItem'>
          <p className='value'>{formatterInt.format(staticInfo.memfols)}</p>
          <p className='title'>リストフォロワー</p>
        </Box>
        <Box className='valueItem'>
          <p className='value'>{formatterInt.format(staticInfo.oks)}</p>
          <p className='title'>OK人数</p>
        </Box>
        <Box className='valueItem'>
          <p className='value'>{formatterInt.format(staticInfo.okfols)}</p>
          <p className='title'>OKフォロワー</p>
        </Box>
      </Box>
      <Box className='valueItemContainer'>
        <Box className='valueItem'>
          <p className='value'>{formatterInt.format(staticInfo.cmems)}</p>
          <p className='title'>社内確認中</p>
        </Box>
        <Box className='valueItem'>
          <p className='value'>{formatterInt.format(staticInfo.imems)}</p>
          <p className='title'>交渉中</p>
        </Box>
        <Box className='valueItem'>
          <p className='value'>{formatterInt.format(staticInfo.nmems)}</p>
          <p className='title'>NG</p>
        </Box>
        <Box className='valueItem'>
          <p className='value'>{formatterInt.format(staticInfo.oks)}</p>
          <p className='title'>OK</p>
        </Box>
      </Box>
      <TableContainer style={{ padding: 10 }}>
        <Table
          sx={{ minWidth: '100%' }}
          aria-labelledby="tableTitle"
          size='medium'
        >
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.align}
                  padding='normal'
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(updatedInfos(), (row, index) => (
              <TableRow
                key={index}
              >
                <TableCell align="center" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px !important', width: '4.25rem !important'}}>
                  <RelativeImage
                    isRound
                    imgSrc={row.avatar}
                    sx={{width: '3.125rem !important', height: '3.125rem !important', margin: '0 .5rem 0 .5rem !important;'}}
                  />
                </TableCell>
                <TableCell align="left" sx={{padding: '0px !important', width: '120px'}}>{row.name}</TableCell>
                <TableCell align="left" sx={{padding: '0px !important', width: '120px'}}>{formatterInt.format(row.followers)}</TableCell>
                <TableCell align="left" sx={{padding: '0px !important', width: '120px'}}>{formatterInt.format(row.engage)}</TableCell>
                <TableCell align="center" sx={{padding: '0px !important'}}>{statusValues[row.status - 1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListPagePDF;
