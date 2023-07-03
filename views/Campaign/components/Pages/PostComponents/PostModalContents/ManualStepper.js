import React, { useState, useEffect, useCallback } from 'react';
import { Button, DialogContent, DialogActions } from '@mui/material';

import { campaignService, monitoringService } from 'services';
import { ContentStepper, StepComplete, StepOne } from './Common';
import {
  ManualStepConfirm,
  ManualStepThree,
  ManualStepTwo,
} from './ManuelStepComponents';

const initProperty = {
  type: 'tiktok',
};

const ManualStepper = ({
  catType,
  selCampId,
  isMonitoring,
  setReload,
  setContentState,
  handleCancelClick,
  detailInfo,
}) => {
  const [saving, setSaving] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [members, setMembers] = useState([]);
  const [property, setProperty] = useState(initProperty);

  const nextContent = [
    `次へ`,
    '次へ',
    '内容を確認',
    detailInfo ? '確定' : '作成',
    '確認する',
  ];

  const backContent = [
    (isMonitoring ?? false) || catType !== 'instagram'
      ? 'キャンセル'
      : '取得方法を変更',
    '戻る',
    '戻る',
    '修正する',
    '閉じる',
  ];

  const firstStepDisabled =
    (!detailInfo && members?.length === 0) ||
    !property?.post_date ||
    (catType !== 'tiktok' && property.type === 'tiktok');
  const secondStepDisabled = (property?.display_url ?? []).length === 0;
  const thirdStepDisabled = (property?.statistics ?? [{}])
    .map((statistic) => !statistic?.date)
    .some((el) => el === true);
  const completeStepDisabled = saving === true;

  useEffect(async () => {
    if (detailInfo) {
      let property = {
        caption: detailInfo?.caption?.text,
        post_date: new Date(detailInfo?.taken_at_org * 1000),
        statistics: detailInfo?.statistics ?? [{ audience: {} }],
        song_used: detailInfo?.song_used,
        type: detailInfo?.type,
      };
      setMembers([detailInfo.member]);
      setProperty(property);
    }
  }, []);

  const handleProperty = (key, value) => {
    setProperty((prev) => ({ ...prev, [key]: value }));
  };

  const handleBack = () => {
    if (activeStep === 0) {
      if (catType !== 'instagram' || detailInfo) {
        handleCancelClick();
      } else setContentState('init');
    } else setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setSaving(true);
    const data = {
      pk: detailInfo?.pk ?? null,
      campId: selCampId,
      member: members[0],
      ...property,
    };

    return monitoringService
      .setPosts(data)
      .then((ret) => setSaving(false))
      .catch((err) => console.log(err));
  };

  const handleNext = () => {
    if (activeStep === 4) {
      setReload((prev) => !prev);
      setProperty(initProperty);
      handleCancelClick();
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
        <ContentStepper method="manual" activeStep={activeStep} />
        {activeStep === 0 && (
          <StepOne
            method="manual"
            catType={catType}
            selCampId={selCampId}
            selected={members}
            setSelected={setMembers}
            property={property}
            handleProperty={handleProperty}
          />
        )}
        {activeStep === 1 && (
          <ManualStepTwo
            catType={catType}
            members={members}
            property={property}
            handleProperty={handleProperty}
          />
        )}
        {activeStep === 2 && (
          <ManualStepThree
            catType={catType}
            property={property}
            handleProperty={handleProperty}
          />
        )}
        {activeStep === 3 && (
          <ManualStepConfirm
            catType={catType}
            members={members}
            property={property}
          />
        )}
        {activeStep === 4 && (
          <StepComplete
            detailInfo={detailInfo}
            method="manual"
            saving={saving}
          />
        )}
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
          className={
            activeStep === 3
              ? detailInfo
                ? 'final_edit'
                : 'final_create'
              : 'confirm'
          }
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
export default ManualStepper;
