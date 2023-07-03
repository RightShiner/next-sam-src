import _ from 'lodash';
import moment from 'moment';
import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Button, Box, Dialog, DialogContent } from '@mui/material';

import { AlertDlg } from 'views/Common';
import { ReportTabSelect } from '.';
import {
  ReportFeedEditTable,
  ReportStoryEditTable,
  ReportRilEditTable,
  ReportCandidateEditTable,
} from '../../Table';
import { campaignService } from 'services';
import { useRouter } from 'next/router';

const lang = {
  en: {
    save: 'Save',
    cancel: 'Cancel',
    warning: 'Warning',
    caption:
      'The contents of the report will be lost because the save button has not been pressed.',
    yes: 'Yes',
    no: 'Back and save',
    errorDelete: 'Unable to delete.',
    error: 'Failed to update status.',
    success: 'Updated successfully.',
  },
  jp: {
    save: '保存',
    cancel: 'キャンセル',
    warning: '注意',
    caption:
      '保存ボタンが押されていないため、\r\nレポート内容が失われますがよろしいでしょうか？',
    yes: 'はい',
    no: '戻って保存します',
    errorDelete: '削除できません。',
    error: '状態更新に失敗しました。',
    success: '更新しました。',
  },
};

export default function InstagramEditDlg({
  open,
  handleClose,
  data,
  updateDatas,
  selCampId,
  classes,
}) {
  const { locale } = useRouter();
  const [selType, onSelect] = useState('feed');
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    if (!open) return;

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
  }, [open, data]);

  const [feeds, setFeeds] = useState([]);
  const [stories, setStories] = useState([]);
  const [rils, setRils] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [updatedMembers, setUpdatedMembers] = useState([]);

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

  const changeCandidates = (selId, selType) => {
    let tempResults = _.map(updatedMembers, (itm) => {
      if (itm._id !== selId) return itm;

      if (selType === 'feed') {
        setFeeds([...feeds, { ...itm, rtype: 1 }]);
        return { ...itm, rtype: 1, modified: true };
      } else if (selType === 'story') {
        setStories([...stories, { ...itm, rtype: 2 }]);
        return { ...itm, rtype: 1, modified: true };
      } else {
        setRils([...rils, { ...itm, rtype: 3 }]);
        return { ...itm, rtype: 1, modified: true };
      }
    });

    setCandidates(_.filter(candidates, (itm) => itm._id !== selId));
    setUpdatedMembers([...tempResults]);
    if (!isChanged) setIsChanged(true);
  };

  const changeFeeds = (memId, type, rtype, detail = {}) => {
    if (type === 'add') {
      // 同じアカウント追加
      let temp = _.filter(updatedMembers, (itm) => itm._id === memId);
      let newId = -moment().unix();

      setUpdatedMembers([
        ...updatedMembers,
        { ...temp[0], _id: newId, rtype: 0 },
      ]);
      setCandidates([...candidates, { ...temp[0], _id: newId, rtype: 0 }]);
    }

    if (type === 'del') {
      //　アカウントを削除
      let sameMembers = 0;
      updatedMembers.map((itm) => {
        if (itm.accountId === detail) sameMembers++;
      });

      if (sameMembers === 1) {
        toast.error(lang[locale].errorDelete);
        return;
      }

      if (rtype === 1) {
        let tFeeds = _.filter(feeds, (itm) => itm._id !== memId);
        setFeeds(tFeeds);
      } else if (rtype === 2) {
        let tStories = _.filter(stories, (itm) => itm._id !== memId);
        setStories(tStories);
      } else if (rtype === 3) {
        let tRils = _.filter(rils, (itm) => itm._id !== memId);
        setRils(tRils);
      }

      let tUpdates = _.map(updatedMembers, (itm) => {
        if (itm._id !== memId) return itm;
        return { ...itm, deleted: true };
      });
      setUpdatedMembers([...tUpdates]);
    }

    if (type === 'update') {
      // 入力情報を保存
      let results = _.map(updatedMembers, (itm) => {
        if (itm._id !== memId) return itm;

        return {
          ...itm,
          [detail.field]: detail.val,
          modified: true,
          rtype: rtype,
        };
      });
      setUpdatedMembers([...results]);
    }

    if (!isChanged) setIsChanged(true);
  };

  const [showAlert, showAlertDlg] = useState(false);
  const closeAlertDlg = (status) => {
    if (status !== false) {
      showAlertDlg(false);
      setIsChanged(false);
      handleClose();
      return;
    }

    showAlertDlg(false);
    //saveUpdatedData();
  };

  const onCancelClicked = (e) => {
    if (!isChanged) {
      handleClose();
      return;
    }

    showAlertDlg(true);
  };

  const onSaveClicked = (e) => {
    if (!isChanged) {
      handleClose();
      return;
    }

    saveUpdatedData();
  };

  const saveUpdatedData = () => {
    let updatedRecords = _.filter(updatedMembers, (itm) => {
      if (itm.deleted) {
        if (itm._id < 0) return false;
        return true;
      }

      if (itm._id < 0) return true;

      if (itm.modified === true) return true;

      return false;
    });

    return campaignService
      .updateReport(selCampId, updatedRecords)
      .then((ret) => {
        if (ret.status !== 'ok') {
          toast.error(lang[locale].error);
        } else {
          toast.success(lang[locale].success);
        }

        setIsChanged(false);
        updateDatas();
        handleClose();
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  return (
    <Dialog
      open={open}
      // onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: '100vw',
          width: '100vw',
          margin: '0 !important',
          position: 'fixed !important',
          left: '0 !important',
          bottom: '0 !important',
          height: '70vh',
        },
      }}
    >
      <DialogContent className="manager" style={{ padding: '0 !important' }}>
        <div
          style={{
            margin: '4px !important',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            className="active"
            style={{ marginRight: '4px' }}
            onClick={onSaveClicked}
          >
            {lang[locale].save}
          </Button>
          <Button className="inactive" onClick={onCancelClicked}>
            {lang[locale].cancel}
          </Button>
        </div>
        <ReportTabSelect
          curType={selType}
          onSelect={onSelect}
          classes={classes}
        />
        <div style={{ overflow: 'auto', height: 'calc(100% - 80px)' }}>
          <ReportFeedEditTable
            getDatas={getFeeds}
            updateDatas={changeFeeds}
            classes={classes}
            sx={{ display: selType === 'feed' ? 'block' : 'none' }}
          />
          <ReportStoryEditTable
            getDatas={getStories}
            updateDatas={changeFeeds}
            classes={classes}
            sx={{ display: selType === 'story' ? 'block' : 'none' }}
          />
          <ReportRilEditTable
            getDatas={getRils}
            updateDatas={changeFeeds}
            classes={classes}
            sx={{ display: selType === 'rir' ? 'block' : 'none' }}
          />
          <Box marginTop={1}>
            <ReportCandidateEditTable
              getDatas={getCandidates}
              updateCandiates={changeCandidates}
              classes={classes}
            />
          </Box>
        </div>
        <AlertDlg
          title={lang[locale].warning}
          caption={lang[locale].caption}
          dlgState={showAlert}
          closeDlg={closeAlertDlg}
          okcaption={lang[locale].yes}
          cancelcaption={lang[locale].no}
        />
      </DialogContent>
    </Dialog>
  );
}
