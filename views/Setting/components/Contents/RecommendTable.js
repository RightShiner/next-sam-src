import _ from 'lodash';
import * as React from 'react';
import {Paper, Box, Table, TableContainer, TableHead, TableBody, TableCell, TableRow} from '@mui/material';
import RoundInfo from 'components/RoundInfo';

export default function RecommendTable() {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', boxShadow: 'none !important' }}>
        <TableContainer style={{ padding: '0 10px 0 10px'}}>
          <Table
            className="styledTable"
            sx={{ Width: 1024 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <TableHead>
              <TableRow sx={{borderBottom: '3px solid #000'}}>
                <TableCell padding='normal' style={{width: '300px'}}>こんな方におすすめです</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                hover
              >
                <TableCell style={{width: '300px'}}>
                </TableCell>
                <TableCell style={{width: '150px', verticalAlign: 'top'}}>
                  <span>{'標準プラン以上の内容をご希望の場合、もしくは詳細についてお聞きになりたい場合は、お気軽にご連絡をください。'}</span>
                </TableCell>
                <TableCell style={{width: '150px', verticalAlign: 'top'}}>
                  <span>{'このプランはインフルエンサーマーケティングを複数人のチームで実施している場合に最適です。'}</span>
                </TableCell>
                <TableCell style={{width: '150px', verticalAlign: 'top'}}>
                  <span>{'このプランはインフルエンサーマーケティングに特化した担当者が一人以上いる場合に最適です。'}</span>
                </TableCell>
                <TableCell style={{width: '150px', verticalAlign: 'top'}}>
                  <span>{'このプランはこれから本格的にインフルエンサーマーケティングを行いたい方に最適です。'}</span>
                </TableCell>
                <TableCell style={{width: '200px', verticalAlign: 'top'}}>
                  <span>{'Just checking out the platform.'}</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}