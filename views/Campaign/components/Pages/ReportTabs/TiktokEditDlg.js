/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import moment from 'moment';
import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Button, Dialog, DialogContent } from '@mui/material';
import { AlertDlg } from 'views/Common';
import { ReportTiktokEditTable } from '../../Table';
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

const TiktokEditDlg = ({
  open,
  handleClose,
  data,
  updateDatas,
  selCampId,
  classes,
}) => {
  const { locale } = useRouter();
  const [isChanged, setIsChanged] = useState(false);
  const [rows, setRows] = useState([]);
  const [updatedMembers, setUpdatedMembers] = useState([]);

  useEffect(() => {
    if (!open) return;

    if (data.length < 1) return;

    setRows([...data]);
    setUpdatedMembers([...data]);
  }, [open, data]);

  const getUpdatedMembers = useCallback(() => {
    return updatedMembers;
  }, [updatedMembers]);

  const getRows = useCallback(() => {
    return rows;
  }, [rows]);

  const changeMembers = (type, memId, detail = {}) => {
    if (type === 'add') {
      // 同じアカウント追加
      let temp = _.filter(updatedMembers, (itm) => itm._id === memId);
      let newId = -moment().unix();
      setRows([...rows, { ...temp[0], _id: newId }]);
      setUpdatedMembers([...updatedMembers, { ...temp[0], _id: newId }]);
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

      let tRows = _.filter(rows, (itm) => itm._id !== memId);
      setRows(tRows);

      let tUpdates = _.map(updatedMembers, (itm) => {
        if (itm._id !== memId) return itm;
        return { ...itm, deleted: true };
      });
      setUpdatedMembers([...tUpdates]);
    }

    if (type === 'update') {
      let results = _.map(updatedMembers, (itm) => {
        if (itm._id !== memId) return itm;

        return { ...itm, [detail.field]: detail.val, modified: true };
      });
      setUpdatedMembers([...results]);
    }

    setIsChanged(true);
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
      .updateReportTiktok(selCampId, updatedRecords)
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
        <div style={{ overflow: 'auto', height: 'calc(100% - 40px)' }}>
          <ReportTiktokEditTable
            getDatas={getRows}
            updateDatas={changeMembers}
            classes={classes}
          />
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
};

export default TiktokEditDlg;
