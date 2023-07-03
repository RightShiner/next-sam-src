import _ from 'lodash';
import NextLink from 'next/link'
import * as React from 'react';
import {Paper, Box, Table, TableContainer, TableHead, TableBody, TableCell, TableRow} from '@mui/material';

export default function BillListTable({data}) {
  return (
    <Box sx={{ width: '100%' }} data-aos={'fade-up'} >
      <Paper sx={{ width: '100%', mt: 2, mb: 2, overflow: 'auto', boxShadow: 'none !important' }}>
        <TableContainer style={{ padding: 10 }}>
          <Table
            className="styledTable"
            sx={{ Width: 1024 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <TableHead>
              <TableRow>
                <TableCell padding='normal' style={{width: '250px'}}>請求書番号</TableCell>
                <TableCell padding='normal' style={{width: '200px'}}>請求日</TableCell>
                <TableCell padding='normal' style={{width: '120px'}}>金額</TableCell>
                <TableCell padding='normal' style={{width: '100px'}}>ステータス</TableCell>
                <TableCell padding='normal' style={{width: '200px'}}>支払済み</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(data, (row, index) => (
                <TableRow
                  hover
                  key={index}
                >
                  <TableCell style={{width: '250px'}}>{row.inumber}</TableCell>
                  <TableCell style={{width: '200px'}}>{row.bdate}</TableCell>
                  <TableCell style={{width: '120px'}}>${row.amount}</TableCell>
                  <TableCell style={{width: '100px'}}>{row.status}</TableCell>
                  <TableCell style={{width: '200px'}}>
                    <NextLink
                      href="#"
                      component={'a'}
                    >
                      ダウンロード
                    </NextLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}