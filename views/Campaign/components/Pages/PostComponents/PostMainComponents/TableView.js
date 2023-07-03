import React, { useState, useEffect, useMemo } from 'react';
import { Box, Table, TableBody, TableContainer } from '@mui/material';
import { getComparator, stableSort } from 'libs/commonFunc';
import { PostTableHead, PostTableRow } from './TableViewComponents';

const TableView = ({ data, handleOpen }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('taken_at_org');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Box className="table_view">
      <TableContainer style={{ padding: 10 }}>
        <Table
          className="styledTable"
          sx={{ minWidth: '100%' }}
          aria-labelledby="tableTitle"
          size="small"
        >
          <PostTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy)).map((row) => {
              return <PostTableRow row={row} handleOpen={handleOpen} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableView;
