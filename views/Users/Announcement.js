import moment from 'moment';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import NextLink from 'next/link';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { announcementService } from 'services';

const status = { '0': '有効', '1': '無効' };

const Announcement = () => {
  const [announcement, setAnnouncement] = useState([]);

  useEffect(() => {
    announcementService.getAll().then((response) => {
      if (response.status !== 'ok') return;
      setAnnouncement(response.announcement);
    });
  }, []);

  return (
    <Fixed>
      <Container>
        <Box sx={{ width: '100%', overflow: 'auto' }}>
          <Button
            sx={{
              float: 'right',
              color: '#1377EB !important',
              borderRadius: '20px !important',
              border: '1px solid #1377EB',
              width: '8em',
            }}
            href={'/users/createannouncement'}
          >
            新規作成
          </Button>
          <Table className="evenoddTable">
            <TableHead>
              <TableRow>
                <TableCell>お知らせ</TableCell>
                <TableCell>from</TableCell>
                <TableCell>to</TableCell>
                <TableCell>状態</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(announcement, (itm, idx) => (
                <TableRow key={idx}>
                  <TableCell>{itm.text}</TableCell>
                  <TableCell style={{ width: '200px' }}>
                    {moment(itm.from).format('YYYY-MM-DD')}
                  </TableCell>
                  <TableCell style={{ width: '200px' }}>
                    {moment(itm.to).format('YYYY-MM-DD')}
                  </TableCell>
                  <TableCell style={{ width: '150px' }}>
                    {status[itm.status]}
                  </TableCell>
                  <TableCell style={{ width: '80px' }}>
                    <NextLink
                      href={`/users/announcementdetail/${itm._id}`}
                      passHref
                      replace
                    >
                      編集
                    </NextLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </Fixed>
  );
};

export default Announcement;
