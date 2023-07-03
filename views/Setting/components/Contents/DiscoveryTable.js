import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Paper,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import RoundInfo from 'components/RoundInfo';

const amountFields = [
  'monthval',
  'yearval',
  'pages',
  'profies',
  'reports',
  'csv',
  'saves',
];
const amountLabels = [
  '金額/月(半年契約)',
  '金額/月(一年契約)',
  'ページ検索',
  'プロフィール表示',
  'フルレポート',
  'CSV',
  'キャンペーン登録',
];
const checkFields = ['isinsight', 'iscampaign', 'isaccount'];
const checkLabels = [
  'インサイトリスト',
  'キャンペーンリスト',
  'キーアカウント調査',
];

export default function DiscoveryTable({
  isMonth,
  enterprise,
  advanced,
  performance,
  essentials,
  trial,
}) {
  const formatter = new Intl.NumberFormat(
    process.env.NEXT_PUBLIC_REGION == 'SG' ? 'sg-SG' : 'ja-JP',
    {
      style: 'currency',
      currency: process.env.NEXT_PUBLIC_REGION == 'SG' ? 'SGD' : 'JPY',
    },
  );

  return (
    <Box sx={{ width: '100%' }}>
      {(!process.env.NEXT_PUBLIC_REGION ||
        process.env.NEXT_PUBLIC_REGION != 'SG') && (
        <Paper sx={{ width: '100%', boxShadow: 'none !important' }}>
          <TableContainer style={{ padding: '10px 10px 0 10px' }}>
            <Table
              className="styledTable"
              sx={{ Width: 1024 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TableHead>
                <TableRow sx={{ borderBottom: '3px solid #000' }}>
                  <TableCell padding="normal" style={{ width: '300px' }}>
                    Discovery
                  </TableCell>
                  <TableCell padding="normal" style={{ width: '150px' }}>
                    Enterprise
                  </TableCell>
                  <TableCell padding="normal" style={{ width: '150px' }}>
                    Advanced
                  </TableCell>
                  <TableCell padding="normal" style={{ width: '150px' }}>
                    Performance
                  </TableCell>
                  <TableCell padding="normal" style={{ width: '150px' }}>
                    Essentials
                  </TableCell>
                  <TableCell padding="normal" style={{ width: '200px' }}>
                    7-days Free trial
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <>
                  {_.map(amountLabels, (itm, idx) => (
                    <TableRow key={idx}>
                      <TableCell style={{ width: '300px' }}>{itm}</TableCell>
                      <TableCell style={{ width: '150px' }}>{`${
                        amountFields[idx] === 'monthval'
                          ? formatter.format(900000)
                          : 'ask'
                      }`}</TableCell>
                      <TableCell style={{ width: '150px' }}>{`${
                        amountFields[idx] === 'monthval' ||
                        amountFields[idx] === 'yearval'
                          ? formatter.format(_.get(advanced, amountFields[idx]))
                          : _.get(advanced, amountFields[idx])
                      }`}</TableCell>
                      <TableCell style={{ width: '150px' }}>{`${
                        amountFields[idx] === 'monthval' ||
                        amountFields[idx] === 'yearval'
                          ? formatter.format(
                              _.get(performance, amountFields[idx]),
                            )
                          : _.get(performance, amountFields[idx])
                      }`}</TableCell>
                      <TableCell style={{ width: '150px' }}>{`${
                        amountFields[idx] === 'monthval' ||
                        amountFields[idx] === 'yearval'
                          ? formatter.format(
                              _.get(essentials, amountFields[idx]),
                            )
                          : _.get(essentials, amountFields[idx])
                      }`}</TableCell>
                      <TableCell style={{ width: '200px' }}>
                        {_.get(trial, amountFields[idx]) ?? 0}
                      </TableCell>
                    </TableRow>
                  ))}
                  {_.map(checkLabels, (itm, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{itm}</TableCell>
                      <TableCell>ask</TableCell>
                      <TableCell>
                        {_.get(advanced, checkFields[idx]) && (
                          <Box
                            component={'img'}
                            src={'/images/svgs/tick.svg'}
                            marginRight={1.5}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {_.get(performance, checkFields[idx]) && (
                          <Box
                            component={'img'}
                            src={'/images/svgs/tick.svg'}
                            marginRight={1.5}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {_.get(essentials, checkFields[idx]) && (
                          <Box
                            component={'img'}
                            src={'/images/svgs/tick.svg'}
                            marginRight={1.5}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {_.get(trial, checkFields[idx]) && (
                          <Box
                            component={'img'}
                            src={'/images/svgs/tick.svg'}
                            marginRight={1.5}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>API</TableCell>
                    <TableCell>
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      />
                    </TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      {process.env.NEXT_PUBLIC_REGION == 'SG' && (
        <Paper sx={{ width: '100%', boxShadow: 'none !important' }}>
          <TableContainer style={{ padding: '10px 10px 0 10px' }}>
            <Table
              className="styledTable"
              sx={{ Width: 1024 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TableHead>
                <TableRow sx={{ borderBottom: '3px solid #000' }}>
                  <TableCell padding="normal" style={{ width: '300px' }}>
                    Discovery
                  </TableCell>
                  <TableCell padding="normal" style={{ width: '150px' }}>
                    AS Unlimited
                  </TableCell>
                  <TableCell padding="normal" style={{ width: '150px' }}>
                    AS Basic
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <>
                  <TableRow>
                    <TableCell style={{ width: '300px' }}>
                      金額/月(半年契約)
                    </TableCell>
                    <TableCell style={{ width: '150px' }}>{`${formatter.format(
                      2388,
                    )}`}</TableCell>
                    <TableCell style={{ width: '150px' }}>{`${formatter.format(
                      1488,
                    )}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: '300px' }}>
                      金額/月(一年契約)
                    </TableCell>
                    <TableCell style={{ width: '150px' }}>{`${formatter.format(
                      1888,
                    )}`}</TableCell>
                    <TableCell style={{ width: '150px' }}>{`${formatter.format(
                      1188,
                    )}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: '300px' }}>ユーザー数</TableCell>
                    <TableCell style={{ width: '150px' }}>5人まで</TableCell>
                    <TableCell style={{ width: '150px' }}>1人</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: '300px' }}>ページ検索</TableCell>
                    <TableCell style={{ width: '150px' }}>無制限</TableCell>
                    <TableCell style={{ width: '150px' }}>500</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: '300px' }}>
                      レポート表示
                    </TableCell>
                    <TableCell style={{ width: '150px' }}>無制限</TableCell>
                    <TableCell style={{ width: '150px' }}>300</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: '300px' }}>CSV</TableCell>
                    <TableCell style={{ width: '150px' }}>無制限</TableCell>
                    <TableCell style={{ width: '150px' }}>300</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: '300px' }}>
                      キャンペーン登録
                    </TableCell>
                    <TableCell style={{ width: '150px' }}>
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      />
                    </TableCell>
                    <TableCell style={{ width: '150px' }}>
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: '300px' }}>
                      インサイトリスト
                    </TableCell>
                    <TableCell style={{ width: '150px' }}>
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      />
                    </TableCell>
                    <TableCell style={{ width: '150px' }}>
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: '300px' }}>
                      キーアカウント調査
                    </TableCell>
                    <TableCell style={{ width: '150px' }}>
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      />
                    </TableCell>
                    <TableCell style={{ width: '150px' }}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>API</TableCell>
                    <TableCell>
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      />
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}
