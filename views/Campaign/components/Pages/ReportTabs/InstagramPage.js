/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { InstagramEditDlg, InstagramStatic, ReportTabSelect } from '.';
import {
  ReportFeedTable,
  ReportStoryTable,
  ReportRilTable,
  ReportCandidateTable,
} from '../../Table';
import { campaignService } from 'services';
import { AlertDlg } from 'views/Common';
import styles from '../../Table/styles';
import { useRouter } from 'next/router';

const lang = {
  en: {
    error: "Couldn't find any detailed information.",
    edit: 'Edit',
    warning: 'Warning',
    caption: 'Switch to edit mode?',
    yes: 'Yes',
    no: 'No',
  },
  jp: {
    error: '詳しい情報を見つけてないです。',
    edit: '編集',
    warning: '注意',
    caption: '編集モードに切り替えますか？',
    yes: 'はい',
    no: 'いいえ',
  },
};

const InstagramPage = ({ selCampId, isLoading, data }) => {
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

  const [showAlert, showAlertDlg] = useState(false);
  const closeAlertDlg = (status) => {
    showAlertDlg(false);
    if (status === true) {
      return;
    }

    setOpenEditDlg(true);
  };

  const [selType, onSelect] = useState('feed');

  const [feeds, setFeeds] = useState([]);
  const [stories, setStories] = useState([]);
  const [rils, setRils] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [updatedMembers, setUpdatedMembers] = useState([]);

  useEffect(() => {
    if (data.length < 1) return;

    let tFeeds = _.filter(data, (itm) => itm.rtype && itm.rtype === 1);
    let tStories = _.filter(data, (itm) => itm.rtype && itm.rtype === 2);
    let tRils = _.filter(data, (itm) => itm.rtype && itm.rtype === 3);
    let tCandidates = _.filter(data, (itm) => !itm.rtype || itm.rtype === 0);

    setFeeds([...tFeeds]);
    setStories([...tStories]);
    setRils([...tRils]);
    setCandidates([...tCandidates]);
    setUpdatedMembers([...data]);
  }, [data]);

  const getUpdatedMembers = useCallback(() => {
    return updatedMembers;
  }, [updatedMembers]);

  const getFeeds = useCallback(() => {
    return feeds;
  }, [feeds]);

  const getStories = useCallback(() => {
    return stories;
  }, [stories]);

  const getRils = useCallback(() => {
    return rils;
  }, [rils]);

  const getCandidates = useCallback(() => {
    return candidates;
  }, [candidates]);

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
        let tFeeds = _.filter(members, (itm) => itm.rtype && itm.rtype === 1);
        let tStories = _.filter(members, (itm) => itm.rtype && itm.rtype === 2);
        let tRils = _.filter(members, (itm) => itm.rtype && itm.rtype === 3);
        let tCandidates = _.filter(
          members,
          (itm) => !itm.rtype || itm.rtype === 0,
        );

        setFeeds([...tFeeds]);
        setStories([...tStories]);
        setRils([...tRils]);
        setCandidates([...tCandidates]);
        setUpdatedMembers([...members]);
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  return (
    <Box className="report-page">
      <InstagramStatic
        isLoading={isLoading}
        getDatas={getUpdatedMembers}
        classes={classes}
        selCampId={selCampId}
      />
      <Box marginTop={4}>
        <Button
          className="active"
          sx={{ width: '100px', marginBottom: '16px' }}
          onClick={(e) => setOpenEditDlg(true)}
        >
          {lang[locale].edit}
        </Button>
        <ReportTabSelect
          curType={selType}
          onSelect={onSelect}
          classes={classes}
        />
      </Box>
      <Box marginTop={1}>
        <ReportFeedTable
          getDatas={getFeeds}
          classes={classes}
          sx={{ display: selType === 'feed' ? 'block' : 'none' }}
        />
        <ReportStoryTable
          getDatas={getStories}
          classes={classes}
          sx={{ display: selType === 'story' ? 'block' : 'none' }}
        />
        <ReportRilTable
          getDatas={getRils}
          classes={classes}
          sx={{ display: selType === 'rir' ? 'block' : 'none' }}
        />
      </Box>
      <Box marginTop={4}>
        <ReportCandidateTable
          getDatas={getCandidates}
          displayAlert={showAlertDlg}
          classes={classes}
        />
      </Box>
      <AlertDlg
        title={lang[locale].warning}
        caption={lang[locale].caption}
        dlgState={showAlert}
        closeDlg={closeAlertDlg}
        cancelcaption={lang[locale].yes}
        okcaption={lang[locale].no}
      />
      <InstagramEditDlg
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

export default InstagramPage;
