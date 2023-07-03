/* eslint-disable react/no-unescaped-entities */
import moment from 'moment';
import clsx from 'clsx';
import React, {useEffect, useCallback, useState} from 'react';
import {Box, Button, Paper} from '@mui/material';
import {AlertDlg} from 'views/Common';
import {UsageNormal, UsageCustom, UsageInfo} from '.';
import {planService} from 'services';
import {History} from '.';

const Usage = ({getDatas, getUsages, getHistory, classes}) => {
  const [usages, setUsages] = useState(getUsages());

  const setCustomUsages = (usageInfo) => {
    setUsages({...usages, ...usageInfo});
  }

  const getUsageFromServer = () => {
    let userInfo = getDatas();
    return planService.getUsage(userInfo._id)
    .then((response) => {
      setUsages({...response.data});
    });
  }

  const [userInfo, setUserInfo] = useState(getDatas());
  const getInfo = useCallback(() => {
    return userInfo;
  }, [userInfo]);

  const [showAlert, showAlertDlg] = useState(false);
  const [alertcaption, setAlertCaption] = useState('');
  const closeAlertDlg = (status) => {
    if (status === false) {
      showAlertDlg(false);
      return;
    }

    if (userInfo.plantype === 'カスタム') {
      return planService.closeCustom(userInfo._id, moment().format('YYYY-MM-DD'))
      .then((response) => {
        setUserInfo({...userInfo, plantype: 'Free trial', periodtype: 0, paytype: 0});
        getUsageFromServer();
        setReload(true);
        showAlertDlg(false);
      });
    } else {
      return planService.switchToCustom(
        userInfo._id, 
        moment().format('YYYY-MM-DD')
      )
      .then((response) => {
        setUserInfo({...userInfo, plantype: 'カスタム', paystatus: 0, paystart: moment().format('YYYY/MM/DD'), payend: moment().add(7, 'days').format('YYYY/MM/DD')});
        setReload(true);
        showAlertDlg(false);
      });
    }
  }

  const switchCustomHandle = (e) => {
    if (userInfo.plantype === 'カスタム') {
      setAlertCaption('カスタムを終了すると、\r\nこのユーザーのプランは「Free trial」に自動で切り替わります。\r\nよろしいでしょうか？');
      showAlertDlg(true);
      return;
    }

    setAlertCaption('カスタムモードに切り替えると\r\n現在の設定が全て終了となります。\r\nよろしいですか？');
    showAlertDlg(true);
  }

  const [reloadHistory, setReload] = useState(false);
  const closeReload = () => {
    setReload(false);
  }
  return (
    <Box>
      <Paper className="user-wrapper user-padding-small" sx={{marginTop: '30px !important'}}>
        {(userInfo.paystatus < 2 && userInfo.plantype === 'カスタム') ? 
          <UsageCustom getDatas={getInfo} setCustomUsages={setCustomUsages} classes={classes} /> : 
          <UsageNormal getDatas={getInfo} classes={classes} />
        }
        <UsageInfo getDatas={getInfo} usages={usages} classes={classes} />
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Button className="active" onClick={switchCustomHandle}>
            {`${(userInfo.paystatus < 2 && userInfo.plantype === 'カスタム') ? 'カスタム終了' : 'カスタム'}`}
          </Button>
        </Box>
        <AlertDlg 
          title={'注意'} 
          caption={alertcaption}
          dlgState={showAlert}
          closeDlg={closeAlertDlg}
        />
      </Paper>

      <History 
        getDatas={getInfo} 
        getHistory={getHistory} 
        isreload={reloadHistory}
        setDone={closeReload}
        classes={classes} 
      />
    </Box>
  );
};

export default Usage;