import React from 'react';
import {
  styled,
  Typography,
  Step,
  Stepper,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
} from '@mui/material';

const steps = {
  auto: [
    'アカウントを選択',
    'モニタリングする期間を設定',
    '投稿の条件を指定',
    'モニタリング内容の確認',
  ],
  manual: [
    '投稿の基本情報',
    '内容の作成',
    '数値データを入力',
    '作成内容の確認',
  ],
};

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 7,
    left: 'calc(-50% + 8px)',
    right: 'calc(50% + 8px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#3670C6',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#3670C6',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const CustomStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  border: '1px solid #eaeaf0',
  backgroundColor: '#eaeaf0',
  borderRadius: '50%',
  display: 'flex',
  height: 16,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#3670C6',
  }),
  '& .CustomStepIcon-completedIcon': {
    width: 16,
    height: 16,
    borderRadius: '50%',
    backgroundColor: '#3670C6',
  },
  '& .CustomStepIcon-circle': {
    width: 16,
    height: 16,
    borderRadius: '50%',
    border: '1px solid',
    backgroundColor: 'transparent',
  },
}));

const CustomStepIcon = (props) => {
  const { active, completed, className } = props;

  return (
    <CustomStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <div className="CustomStepIcon-completedIcon" />
      ) : (
        <div className="CustomStepIcon-circle" />
      )}
    </CustomStepIconRoot>
  );
};

const ContentStepper = ({ method, activeStep }) => {
  return (
    activeStep < 4 && (
      <>
        <Typography
          variant="h6"
          textAlign="center"
          sx={{
            pb: 4,
            fontWeight: 'bold',
          }}
          gutterBottom
        >
          {steps[method][activeStep]}
        </Typography>
        <Stepper
          className="stepper"
          alternativeLabel
          activeStep={activeStep}
          connector={<CustomConnector />}
        >
          {Array.from({ length: 3 }, (_, i) => {
            return (
              <Step key={i}>
                <StepLabel StepIconComponent={CustomStepIcon} />
              </Step>
            );
          })}
        </Stepper>
      </>
    )
  );
};
export default ContentStepper;
