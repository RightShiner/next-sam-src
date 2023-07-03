import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Table, TableBody, TableContainer, Paper, Button } from '@mui/material';
import { getComparator, stableSort } from 'libs/commonFunc';
import { ListPageTableHead, PostPageTableRow } from '.';
import Lang from 'constants/lang';
import { useRouter } from 'next/router';

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
    id: 'engagerate',
    numeric: true,
    label: { en: 'EG', jp: 'EG' },
    align: 'left',
  },
  {
    id: 'price',
    numeric: true,
    label: { en: 'Amount of money', jp: '金額' },
    align: 'center',
  },
  {
    id: 'status',
    numeric: true,
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

export default function PostPageTable({
  catType,
  getMembers,
  handleSaveAmount,
  handleSaveMember,
  tags,
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
    <Box sx={{ width: 'fit-content' }}>
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
              hideCSV={true}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy)).map(
                (row, index) => {
                  return (
                    <PostPageTableRow
                      key={index}
                      row={row}
                      catType={catType}
                      index={index}
                      handleSaveAmount={handleSaveAmount}
                      handleSaveMember={handleSaveMember}
                      orgTags={tags}
                    />
                  );
                },
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
