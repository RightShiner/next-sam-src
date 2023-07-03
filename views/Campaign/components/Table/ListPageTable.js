import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Table, TableBody, TableContainer, Paper, Button } from '@mui/material';
import { getComparator, stableSort } from 'libs/commonFunc';
import { ListPageTableHead, ListPageTableRow } from '.';
import Lang from 'constants/lang';
import { useRouter } from 'next/router';

const statusValues = ['社内確認中', '交渉中', 'NG', 'OK'];

const headCells = [
  {
    id: 'star',
    numeric: true,
    label: { en: '', jp: '' },
    align: 'center',
  },
  {
    id: 'name',
    numeric: true,
    label: { en: 'Account name', jp: 'アカウント名' },
    align: 'left',
  },
  {
    id: 'tag',
    numeric: false,
    label: { en: 'Tag', jp: 'タグ' },
    align: 'left',
  },
  {
    id: 'followers',
    numeric: true,
    label: { en: 'Number of followers', jp: 'フォロワー数' },
    align: 'left',
  },
  {
    id: 'eg',
    numeric: true,
    label: { en: 'EG', jp: 'EG' },
    align: 'left',
  },
  {
    id: 'status',
    numeric: true,
    label: 'ステータス',
    label: { en: 'Status', jp: 'ステータス' },
    align: 'center',
  },
  {
    id: 'action',
    numeric: true,
    label: { en: '', jp: '' },
    align: 'center',
  },
];

export default function ListPageTable({
  catType,
  getMembers,
  handleSaveMember,
  tags,
  reload,
  loadMorePage,
}) {
  const { locale } = useRouter();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getMembers());
  }, [getMembers]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* '0 0px 6px 0 rgb(140 152 164 / 53%)' */}
      <Paper
        sx={{
          width: '100%',
          mt: 2,
          mb: 2,
          overflow: 'auto',
          boxShadow: 'none !important',
        }}
      >
        <TableContainer style={{ padding: 10 }}>
          <Table
            className="styledTable"
            sx={{ minWidth: '100%' }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <ListPageTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              reload={reload}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy)).map(
                (row, index) => {
                  return (
                    <ListPageTableRow
                      key={index}
                      row={row}
                      index={index}
                      catType={catType}
                      handleSaveMember={handleSaveMember}
                      orgTags={tags}
                    />
                  );
                },
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className="load-more" sx={{ display: 'flex' }}>
          <Button
            className="active"
            sx={{ marginLeft: 'auto', marginRight: 'auto' }}
            onClick={(e) => {
              loadMorePage();
            }}
          >
            {Lang.caption.nextpage}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
