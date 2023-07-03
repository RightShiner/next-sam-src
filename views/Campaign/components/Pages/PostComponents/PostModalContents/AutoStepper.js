import React, { useState, useEffect, useMemo } from 'react';
import { Button, DialogContent, DialogActions } from '@mui/material';

import {
  AutoStepTwo,
  AutoStepThree,
  AutoStepConfirm,
} from './AutoStepComponents';
import { campaignService } from 'services';
import { ContentStepper, StepComplete, StepOne } from './Common';

const AutoStepper = ({
  selCampId,
  isMonitoring,
  setMonitoring,
  setReload,
  setContentState,
  handleCancelClick,
}) => {
  const [saving, setSaving] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [members, setMembers] = useState([]);
  const [monitorPeriod, setMonitorPeriod] = useState([null, null]);
  const [searchType, setSearchType] = useState('all');
  const [alert, setAlert] = useState(true);
  const [collections, setCollections] = useState({
    hasAllTagAndMention: true,
  });

  const nextContent = [
    `${members.length}アカウントを選択`,
    '条件設定へ',
    '設定内容を確認',
    'モニタリングを開始',
    '閉じる',
  ];

  const backContent = [
    isMonitoring ? 'キャンセル' : '取得方法を変更',
    '戻る',
    '戻る',
    '修正する',
  ];

  const firstStepDisabled = members?.length === 0;
  const secondStepDisabled = monitorPeriod[1] === null;
  const thirdStepDisabled =
    searchType === 'condition'
      ? collections?.hashtag?.length === 0 && collections?.mention?.length === 0
      : collections?.hashtag?.length === 0 &&
        collections?.mention?.length === 0 &&
        alert;
  const completeStepDisabled = saving === true;

  useEffect(async () => {
    if (isMonitoring) {
      let res = await campaignService.getMonitoring(selCampId);
      let data = res.data;
      setMembers(data.memberDetails);
      setCollections({
        hashtag: data.hashtag,
        mention: data.mention,
      });
      setMonitorPeriod([new Date(data.monitorFrom), new Date(data.monitorTo)]);
      setSearchType(data.hasAllTagAndMention ? 'all' : 'condition');
    }
  }, [isMonitoring]);

  const handleBack = () => {
    if (activeStep === 0) {
      if (isMonitoring) {
        handleCancelClick();
      } else setContentState('init');
    } else setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setSaving(true);
    let memberId = members.map((member) => {
      return member.infId;
    });
    const data = {
      members: memberId,
      ...collections,
      monitorFrom: monitorPeriod[0],
      monitorTo: monitorPeriod[1],
    };
    return campaignService
      .setMonitoring(selCampId, data)
      .then((ret) => {
        setMonitoring(true);
        setSaving(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNext = () => {
    // reset
    if (activeStep === 0 && !isMonitoring) {
      setSearchType('all');
      setCollections((collections) => ({
        ...collections,
        hashtag: [],
        mention: [],
      }));
    }
    if (activeStep === 4) {
      handleCancelClick();
      setReload((prev) => !prev);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      if (activeStep === 3) {
        handleSubmit();
      }
    }
  };

  return (
    <>
      <DialogContent className="content" dividers>
        <ContentStepper method="auto" activeStep={activeStep} />
        {activeStep === 0 && (
          <StepOne
            method="auto"
            selCampId={selCampId}
            selected={members}
            setSelected={setMembers}
          />
        )}
        {activeStep === 1 && (
          <AutoStepTwo value={monitorPeriod} setValue={setMonitorPeriod} />
        )}
        {activeStep === 2 && (
          <AutoStepThree
            checked={alert}
            searchType={searchType}
            collections={collections}
            setChecked={setAlert}
            setSearchType={setSearchType}
            setCollections={setCollections}
          />
        )}
        {activeStep === 3 && (
          <AutoStepConfirm
            alert={alert}
            members={members}
            collections={collections}
            searchType={searchType}
            monitorPeriod={monitorPeriod}
          />
        )}
        {activeStep === 4 && <StepComplete method="auto" saving={saving} />}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          className="cancel"
          onClick={handleBack}
          sx={{ display: activeStep === 4 ? 'none' : 'block' }}
        >
          {backContent[activeStep]}
        </Button>
        <Button
          className={activeStep === 3 ? 'final' : 'confirm'}
          onClick={handleNext}
          disabled={
            (activeStep === 0 && firstStepDisabled) ||
            (activeStep === 1 && secondStepDisabled) ||
            (activeStep === 2 && thirdStepDisabled) ||
            (activeStep === 4 && completeStepDisabled)
          }
        >
          {nextContent[activeStep]}
        </Button>
      </DialogActions>
    </>
  );
};
export default AutoStepper;
