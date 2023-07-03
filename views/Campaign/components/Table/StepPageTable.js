import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material';
import { campaignService } from 'services';
import { getComparator, stableSort } from 'libs/commonFunc';
import { StepPageTableHead, StepPageTableRow } from '.';

const headCells = [
  {
    id: 'infName',
    label: 'インフルエンサー',
    align: 'center',
  },
  {
    id: 'followers',
    label: 'フォロワー',
    align: 'left',
  },
  {
    id: 'post_count',
    label: '投稿',
    align: 'left',
  },
  {
    id: 'story',
    label: 'ストーリー',
    align: 'left',
  },
  {
    id: 'reel',
    label: 'リール',
    align: 'left',
  },
  {
    id: 'last_contents',
    label: '最後のコンテンツ',
    align: 'center',
    caption: 'last_contents',
  },
  {
    id: 'engage',
    label: '総eng。',
    align: 'center',
    caption: 'total_engagement',
  },
  {
    id: 'engagerate',
    label: 'ER',
    align: 'center',
    caption: 'engagement_rate',
  },
];

export default function StepPageTable({
  data,
  disabled,
  selected,
  setSelected,
}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.infId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <Box sx={{ width: '100%' }}>
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
            size="small"
          >
            <StepPageTableHead
              headCells={headCells}
              selected={selected}
              order={order}
              orderBy={orderBy}
              rowCount={data.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              disabled={disabled}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy)).map(
                (row, index) => {
                  return (
                    <StepPageTableRow
                      key={index}
                      row={row}
                      selected={selected}
                      setSelected={setSelected}
                      index={index}
                      disabled={disabled}
                    />
                  );
                },
              )}
            </TableBody>
          </Table>
          {/* <Typography
            sx={{ fontWeight: 'bold', color: '#1377eb', pl: '5em', pt: '2em' }}
          >
            {selected.length} 人が選択されました。
          </Typography> */}
        </TableContainer>
      </Paper>
    </Box>
  );
}
