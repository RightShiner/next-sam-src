import _ from 'lodash';
import * as React from 'react';
import {Paper, Box, Table, TableContainer, TableHead, TableBody, TableCell, TableRow} from '@mui/material';
import RoundInfo from 'components/RoundInfo';

const mockdata = [
  {caption: 'Campaigns', en: 'Unlimited', ad: 'Unlimited', pe: 'Unlimited', es: 'Unlimited', tr: 'Unlimited'},
  {caption: 'Unique influencers', en: '500+ / month', ad: '500 / month', pe: '175 / month', es: '50 / month', tr: '25'},
  {caption: 'Exports', en: 'ok', ad: 'ok', pe: 'ok', es: '-', tr: '-'},
  {caption: 'Alerts', en: 'ok', ad: 'ok', pe: 'ok', es: '-', tr: '-'},
];

export default function MonitorTable() {
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
                <TableCell padding='normal' style={{width: '300px'}}>Monitoring</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(mockdata, (row, index) => (
                <TableRow
                  hover
                  key={index}
                >
                  <TableCell style={{width: '300px'}}>
                    <Box sx={{display:'flex', alignItems:'center'}}>
                      <span>{row.caption}</span>
                      <RoundInfo marginLeft={1} />
                    </Box>
                  </TableCell>
                  <TableCell style={{width: '150px'}}>
                    {row.en === 'ok' ? 
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      /> : 
                      <span>{row.en}</span>
                    }
                  </TableCell>
                  <TableCell style={{width: '150px'}}>
                    {row.ad === 'ok' ? 
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      /> : 
                      <span>{row.ad}</span>
                    }
                  </TableCell>
                  <TableCell style={{width: '150px'}}>
                    {row.pe === 'ok' ? 
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      /> : 
                      <span>{row.pe}</span>
                    }
                  </TableCell>
                  <TableCell style={{width: '150px'}}>
                    {row.es === 'ok' ? 
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      /> : 
                      <span>{row.es}</span>
                    }
                  </TableCell>
                  <TableCell style={{width: '200px'}}>
                    {row.tr === 'ok' ? 
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      /> : 
                      <span>{row.tr}</span>
                    }
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