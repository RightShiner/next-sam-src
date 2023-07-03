import _ from 'lodash';
import React, { useCallback } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { trialService } from 'services';
import { AlertDlg } from 'views/Common';

export const TrialUserList = ({ trialUsers }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectId, setSelectId] = useState();

  const deleteTrial = useCallback(async (id) => {
    setShowDeleteAlert(true);
    setSelectId(id);
  }, []);

  const closeDeleteAlert = useCallback(
    async (status) => {
      if (status === false) {
        setShowDeleteAlert(false);
        return;
      }

      if (status) {
        await trialService.deleteTrial(selectId);
        await fetchTrial();
        setShowDeleteAlert(false);
      }
    },
    [selectId],
  );

  return (
    <>
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          発行済みユーザ
        </Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>作成日</TableCell>
            <TableCell>トライアルID</TableCell>
            <TableCell>会社名</TableCell>
            <TableCell>名前</TableCell>
            <TableCell>メールアドレス</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(trialUsers, (trialUser, idx) => (
            <TableRow key={idx}>
              <TableCell>{trialUser.createdDate}</TableCell>
              <TableCell>{trialUser.trialId}</TableCell>
              <TableCell>{trialUser.company}</TableCell>
              <TableCell>{trialUser.name}</TableCell>
              <TableCell>{trialUser.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
