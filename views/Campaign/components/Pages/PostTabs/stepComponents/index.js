import React, { useState, useRef, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Collapse from '@mui/material/Collapse';
import { StepPageTable } from '../../../Table';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import { campaignService } from 'services';
import { useRouter } from 'next/router';

const lang = {
  jp: {
    errorLoadingDetails: '詳しい情報を見つけてないです。',
    cancel: '戻る',
    ok: '決定',
  },
  en: {
    errorLoadingDetails: 'Unexpected error loading details.',
    cancel: 'Cancel',
    ok: 'OK',
  },
};
const steps = [
  {
    label: {
      jp: 'モニタリングするインフルエンサーを選択して下さい',
      en: 'Please select the influencers to monitor.',
    },
    subLabel: {
      jp: '(初期は全てのインフルエンサーが選択されます)',
      en: '(In default, all influencers in the campaign are selected.)',
    },
  },
  {
    label: {
      jp: '投稿取得の設定をしてください',
      en: 'Please select the tags to monitor.',
    },
    subLabel: {
      jp: '',
      en: '',
    },
  },
  {
    label: {
      jp: '計測期間を選択してください',
      en: 'Please select the period to monitor.',
    },
    subLabel: {
      jp: '',
      en: '',
    },
  },
];

const StepPage = ({ selCampId, catType, isMonitoring, setMonitoring }) => {
  const { locale } = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [members, setMembers] = useState([]);
  const [monitorPeriod, setMonitorPeriod] = useState([]);
  const [collections, setCollections] = useState({});
  const [tableData, setTableData] = useState([]);
  const [searchType, setSearchType] = useState();

  useEffect(async () => {
    fetchTableData().catch(console.error);
  }, [isMonitoring]);

  const fetchTableData = async () => {
    let ret = await campaignService
      .getCampaignDetail(selCampId, 'post')
      .catch(console.error);
    if (ret.status !== 'ok') {
      toast.error(lang[locale].errorLoadingDetails);
      return;
    }
    if (!ret.data) {
      setTableData({ name: ' ', members: [] });
      return;
    }
    setTableData(ret.data.members);
    let res = await campaignService
      .getMonitoring(selCampId)
      .catch(console.error);
    let data = res.data;
    const defaultSelected = ret.data.members.map((n) => n.infId);
    data.members.length === 0
      ? setMembers(defaultSelected)
      : setMembers(data.members);
    setCollections({
      hashtag: data.hashtag,
      mention: data.mention,
      tag: data.tag,
      hasAllTagAndMention: data.hasAllTagAndMention,
    });
    setMonitorPeriod([
      data.monitorFrom ? new Date(data.monitorFrom) : null,
      data.monitorTo ? new Date(data.monitorTo) : null,
    ]);
  };

  const firstStepDisabled = members?.length === 0;
  const secondStepDisabled =
    searchType === 'condition'
      ? collections?.hashtag?.length === 0 &&
        collections?.mention?.length === 0 &&
        collections?.tag?.length === 0
      : false;

  const handleNext = () => {
    // reset
    if (activeStep === 0) {
      setSearchType();
      setCollections((collections) => ({
        ...collections,
        hashtag: [],
        mention: [],
        tag: [],
      }));
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    const data = {
      members,
      ...collections,
      monitorFrom: monitorPeriod[0],
      monitorTo: monitorPeriod[1],
    };
    return campaignService
      .setMonitoring(selCampId, data)
      .then((ret) => {
        setMonitoring(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      sx={{
        width: 'max-content',
        '& .MuiStepConnector-root': {
          display: 'none',
        },
      }}
    >
      {steps.map((step, index) => (
        <Step key={step.label[locale]}>
          <StepLabel
            sx={{
              '& .MuiStepLabel-label': {
                color: activeStep === index ? '#1377eb!important' : 'inherit',
                fontWeight: activeStep === index ? 'bold!important' : 'inherit',
              },
            }}
          >
            {step.label[locale]}
            &nbsp;
            <small>{step.subLabel[locale]}</small>
          </StepLabel>
          <StepContent
            TransitionProps={{ in: true }}
            sx={{ border: 'none', transition: '300ms' }}
          >
            <Collapse in={activeStep >= index} unmountOnExit>
              {index === 0 && (
                <StepPageTable
                  data={tableData}
                  selected={members}
                  setSelected={setMembers}
                  disabled={activeStep !== index}
                />
              )}
              {index === 1 && (
                <SecondStep
                  collections={collections}
                  setCollections={setCollections}
                  disabled={activeStep !== index}
                  searchType={searchType}
                  setSearchType={setSearchType}
                  secondStepDisabled={secondStepDisabled}
                />
              )}
              {index === 2 && (
                <ThirdStep value={monitorPeriod} setValue={setMonitorPeriod} />
              )}
              {activeStep === index &&
                (activeStep !== 1 || (activeStep === 1 && searchType)) && (
                  <Box
                    mb={2}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Box>
                      {activeStep !== 0 && (
                        <Button
                          className="inactive"
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 3, width: '9em' }}
                        >
                          {lang[locale].cancel}
                        </Button>
                      )}
                      <Button
                        className="active"
                        variant="contained"
                        onClick={index === 2 ? handleSubmit : handleNext}
                        sx={{ mt: 1, width: '9em' }}
                        disabled={
                          (index === 0 && firstStepDisabled) ||
                          (index === 1 && secondStepDisabled)
                        }
                      >
                        {lang[locale].ok}
                      </Button>
                    </Box>
                  </Box>
                )}
            </Collapse>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepPage;
