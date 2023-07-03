/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { TiktokEditDlg, TiktokStatic } from '.';
import { ReportTiktokTable } from '../../Table';
import { campaignService } from 'services';
import styles from '../../Table/styles';
import { useRouter } from 'next/router';

const lang = {
  en: {
    error: "Couldn't find any detailed information.",
    edit: 'Edit',
  },
  jp: {
    error: '詳しい情報を見つけてないです。',
    edit: '編集',
  },
};

const TiktokPage = ({ selCampId, isLoading, data }) => {
  const { locale } = useRouter();
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, { defaultTheme: theme });
  }, [theme]);
  const classes = useStyles();

  const [openEditDlg, setOpenEditDlg] = useState(false);
  const closeEditDlg = () => {
    setOpenEditDlg(false);
  };

  const [updatedMembers, setUpdatedMembers] = useState([]);

  useEffect(() => {
    if (data.length < 1) return;

    setUpdatedMembers([...data]);
  }, [data]);

  const getUpdatedMembers = useCallback(() => {
    return updatedMembers;
  }, [updatedMembers]);

  const updateDatas = () => {
    return campaignService
      .getCampaignDetail(selCampId, 'report')
      .then((ret) => {
        if (ret.status !== 'ok') {
          toast.error(lang[locale].error);
          return;
        }

        if (!ret.data) return;

        const members = ret.data.members;
        setUpdatedMembers([...members]);
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  return (
    <Box className="report-page">
      <TiktokStatic
        isLoading={isLoading}
        getDatas={getUpdatedMembers}
        classes={classes}
        selCampId={selCampId}
      />
      <Box marginTop={4}>
        <Button
          className="active"
          sx={{ width: '100px' }}
          onClick={(e) => setOpenEditDlg(true)}
        >
          {lang[locale].edit}
        </Button>
      </Box>
      <Box marginTop={1}>
        <ReportTiktokTable getDatas={getUpdatedMembers} classes={classes} />
      </Box>
      <TiktokEditDlg
        open={openEditDlg}
        handleClose={closeEditDlg}
        data={updatedMembers}
        updateDatas={updateDatas}
        selCampId={selCampId}
        classes={classes}
      />
    </Box>
  );
};

export default TiktokPage;
