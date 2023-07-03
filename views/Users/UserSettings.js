import _ from 'lodash';
import React, { useEffect, useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import SettingInput from './components/SettingInput';
import SettingSwitch from './components/SettingSwitch';
import { planService } from 'services';
import { AlertDlg } from 'views/Common';
import styles from './styles';
import Lang from 'constants/lang';

const amountFields = [
  'monthval',
  'yearval',
  'isfree',
  'pages',
  'profies',
  'csv',
  'saves',
];
const amountLabels = [
  '金額/月(半年契約)',
  '金額/月(一年契約)',
  'Free設定',
  'ページ検索',
  'レポート表示',
  'CSV',
  'キャンペーン登録',
];
const checkFields = ['isinsight', 'iscampaign', 'isaccount'];
const checkLabels = [
  'インサイトリスト',
  'キャンペーンリスト',
  'キーアカウント調査',
];

const UserSettings = () => {
  const [enterprise, setEnterprise] = useState({});
  const [advanced, setAdvanced] = useState({});
  const [performance, setPerformance] = useState({});
  const [essentials, setEssentials] = useState({});
  const [trial, setTrial] = useState({});
  const [showAlert, showAlertDlg] = useState(false);
  const closeAlertDlg = (status) => {
    if (status === false) {
      showAlertDlg(false);
      return;
    }

    enterprise.monthval = 900000;
    planService
      .savePlans(enterprise, advanced, performance, essentials, trial)
      .then((response) => {
        if (response.status !== 'ok') {
          toast.error(response.message);
          return;
        }
        toast.success('プラン設定を保存しました。');
        showAlertDlg(false);
      })
      .catch((err) => {
        toast.error('プラン設定保存に失敗しました。');
      });
  };

  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, { defaultTheme: theme });
  }, [theme]);
  const classes = useStyles();

  useEffect(() => {
    planService.getAllPlans().then((response) => {
      if (response.status !== 'ok') return;

      _.map(response.plans, (itm) => {
        if (itm.type === 'Enterprise') setEnterprise(itm);
        else if (itm.type === 'Advanced') setAdvanced(itm);
        else if (itm.type === 'Performance') setPerformance(itm);
        else if (itm.type === 'Essentials') setEssentials(itm);
        else if (itm.type === 'Free trial') setTrial(itm);
      });
    });
  }, []);

  const updateMembers = (type, field, val) => {
    if (type === 'enterprise') _.set(enterprise, field, val);
    else if (type === 'advanced') _.set(advanced, field, val);
    else if (type === 'performance') _.set(performance, field, val);
    else if (type === 'essentials') _.set(essentials, field, val);
    else _.set(trial, field, val);
  };

  return (
    <Fixed hideAnnouncement={true}>
      <Container>
        <Table style={{ width: '900px' }}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.settingCellNoPadding}></TableCell>
              <TableCell
                className={classes.settingCellNoPadding}
                style={{ width: '150px' }}
              >
                Enterprise
              </TableCell>
              <TableCell
                className={classes.settingCellNoPadding}
                style={{ width: '150px' }}
              >
                Advanced
              </TableCell>
              <TableCell
                className={classes.settingCellNoPadding}
                style={{ width: '150px' }}
              >
                Performance
              </TableCell>
              <TableCell
                className={classes.settingCellNoPadding}
                style={{ width: '150px' }}
              >
                Essentials
              </TableCell>
              <TableCell
                className={classes.settingCellNoPadding}
                style={{ width: '100px' }}
              >
                Free trial
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {_.map(amountLabels, (itm, idx) => (
                <TableRow key={idx}>
                  <TableCell
                    className={classes.settingCellNoPadding}
                    align="right"
                  >
                    {itm}
                  </TableCell>
                  <TableCell
                    className={classes.settingCellNoPadding}
                    align="center"
                  >{`${
                    amountFields[idx] === 'monthval' ? '900000' : 'ask'
                  }`}</TableCell>
                  <TableCell className={classes.settingCellNoPadding}>
                    <SettingInput
                      classes={classes}
                      initVal={_.get(advanced, amountFields[idx])}
                      type="advanced"
                      field={amountFields[idx]}
                      updateStores={updateMembers}
                    />
                  </TableCell>
                  <TableCell className={classes.settingCellNoPadding}>
                    <SettingInput
                      classes={classes}
                      initVal={_.get(performance, amountFields[idx])}
                      type="performance"
                      field={amountFields[idx]}
                      updateStores={updateMembers}
                    />
                  </TableCell>
                  <TableCell className={classes.settingCellNoPadding}>
                    <SettingInput
                      classes={classes}
                      initVal={_.get(essentials, amountFields[idx])}
                      type="essentials"
                      field={amountFields[idx]}
                      updateStores={updateMembers}
                    />
                  </TableCell>
                  <TableCell className={classes.settingCellNoPadding}>
                    <SettingInput
                      classes={classes}
                      initVal={_.get(trial, amountFields[idx])}
                      type="trial"
                      field={amountFields[idx]}
                      updateStores={updateMembers}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {_.map(checkLabels, (itm, idx) => (
                <TableRow key={idx}>
                  <TableCell
                    className={classes.settingCellNoPadding}
                    sx={{ textAlign: 'right' }}
                  >
                    {itm}
                  </TableCell>
                  <TableCell
                    className={classes.settingCellNoPadding}
                    align="center"
                  >
                    <SettingSwitch
                      initVal={_.get(enterprise, checkFields[idx])}
                      type="enterprise"
                      field={checkFields[idx]}
                      updateStores={updateMembers}
                    />
                  </TableCell>
                  <TableCell className={classes.settingCellNoPadding}>
                    <SettingSwitch
                      initVal={_.get(advanced, checkFields[idx])}
                      type="advanced"
                      field={checkFields[idx]}
                      updateStores={updateMembers}
                    />
                  </TableCell>
                  <TableCell className={classes.settingCellNoPadding}>
                    <SettingSwitch
                      initVal={_.get(performance, checkFields[idx])}
                      type="performance"
                      field={checkFields[idx]}
                      updateStores={updateMembers}
                    />
                  </TableCell>
                  <TableCell className={classes.settingCellNoPadding}>
                    <SettingSwitch
                      initVal={_.get(essentials, checkFields[idx])}
                      type="essentials"
                      field={checkFields[idx]}
                      updateStores={updateMembers}
                    />
                  </TableCell>
                  <TableCell className={classes.settingCellNoPadding}>
                    <SettingSwitch
                      initVal={_.get(trial, checkFields[idx])}
                      type="trial"
                      field={checkFields[idx]}
                      updateStores={updateMembers}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </>
          </TableBody>
        </Table>
        <Box sx={{ textAlign: 'center', width: '900px', marginTop: '20px' }}>
          <Button
            className="active"
            variant={'outlined'}
            onClick={(e) => showAlertDlg(true)}
          >
            {Lang.btn.save}
          </Button>
        </Box>
      </Container>
      <AlertDlg
        title={'注意'}
        caption={
          'ユーザープランの内容が変更されますが、本当によろしいでしょうか。'
        }
        dlgState={showAlert}
        closeDlg={closeAlertDlg}
      />
    </Fixed>
  );
};

export default UserSettings;
