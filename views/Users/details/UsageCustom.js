/* eslint-disable react/no-unescaped-entities */
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import {
  Skeleton,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Switch,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { planService } from 'services';
import toast from 'react-hot-toast';

const UsageCustom = ({ getDatas, setCustomUsages, classes }) => {
  const [userInfo, setUserInfo] = useState(getDatas());
  const [updatemode, setUpdatemode] = useState(false);
  const [keyrequested, setKeyRequested] = useState(false);
  const [insight, setInsight] = useState(false);
  const [campaign, setCampaign] = useState(false);
  const [keyaccount, setKeyaccount] = useState(false);

  const nameRef = useRef();
  const searchRef = useRef();
  const profileRef = useRef();
  const reportRef = useRef();
  const csvRef = useRef();
  const saveRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  const useSearchRef = useRef();
  const useProfileRef = useRef();
  const useReportRef = useRef();
  const useCsvRef = useRef();
  const useSaveRef = useRef();

  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [isloading, setLoading] = useState(false);

  const updateValues = (data) => {
    nameRef.current.value = data.name;
    searchRef.current.value = data.search;
    profileRef.current.value = data.profile;
    reportRef.current.value = data.report;
    csvRef.current.value = data.csv;
    saveRef.current.value = data.saves;

    useSearchRef.current.value = data.usesearch;
    useProfileRef.current.value = data.useprofile;
    useReportRef.current.value = data.usereport;
    useCsvRef.current.value = data.usecsv;
    useSaveRef.current.value = data.usesaves;

    setStartDate(data.startdate);
    setEndDate(data.enddate);
    setUpdatemode(data.updatemode);
    setKeyRequested(data.keyrequested);
    setInsight(data.iscampaign ?? false);
    setCampaign(data.isinsight ?? false);
    setKeyaccount(data.iskeyaccount ?? false);
  };

  useEffect(() => {
    //setLoading(true);
    return planService.getCustomInfo(userInfo._id).then((response) => {
      //setLoading(false);
      setTimeout(updateValues, 1000, response.data);
    });
  }, []);

  const saveClicked = (e) => {
    if (searchRef.current.value === '' || searchRef.current.value === '0') {
      toast.error('検索数を入力してください。');
      searchRef.current.focus();
      return;
    }
    if (profileRef.current.value === '' || profileRef.current.value === '0') {
      toast.error('プロフィール数を入力してください。');
      profileRef.current.focus();
      return;
    }
    if (reportRef.current.value === '' || reportRef.current.value === '0') {
      toast.error('レポート数を入力してください。');
      reportRef.current.focus();
      return;
    }
    if (csvRef.current.value === '' || csvRef.current.value === '0') {
      toast.error('CSV数を入力してください。');
      csvRef.current.focus();
      return;
    }
    if (saveRef.current.value === '' || saveRef.current.value === '0') {
      toast.error('保存数を入力してください。');
      csvRef.current.focus();
      return;
    }
    if (startRef.current.value.trim() === '') {
      toast.error('プラン開始日を入力してください。');
      startRef.current.focus();
      return;
    }
    if (endRef.current.value.trim() === '') {
      toast.error('プラン終了日を入力してください。');
      endRef.current.focus();
      return;
    }

    return planService
      .saveToCustom(
        userInfo._id,
        nameRef.current.value,
        searchRef.current.value,
        profileRef.current.value,
        reportRef.current.value,
        csvRef.current.value,
        saveRef.current.value,
        startRef.current.value,
        endRef.current.value,
        useSearchRef.current.value,
        useProfileRef.current.value,
        useReportRef.current.value,
        useCsvRef.current.value,
        useSaveRef.current.value,
        updatemode,
        keyrequested,
        insight,
        campaign,
        keyaccount,
      )
      .then((response) => {
        setCustomUsages({
          pagesuse: useSearchRef.current.value,
          pagesplan: searchRef.current.value,
          profiesuse: useProfileRef.current.value,
          profiesplan: profileRef.current.value,
          reportsuse: useReportRef.current.value,
          reportsplan: reportRef.current.value,
          csvuse: useCsvRef.current.value,
          csvplan: csvRef.current.value,
          savesuse: useSaveRef.current.value,
          savesplan: saveRef.current.value,
        });
        toast.success('更新しました。');
      });
  };

  return (
    <Box>
      <Typography className={classes.userdetailwrappertitle}>プラン</Typography>
      {/* {isloading && 
        <Skeleton width={'100%'} height={600} sx={{transform:'unset'}}/>
      } */}
      <Box>
        {/*sx={{display: `${isloading ? 'none' : 'relative'}`}}>*/}
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>現在のプラン</Typography>
          <TextField
            inputRef={nameRef}
            sx={{ width: '200px' }}
            inputProps={{ style: { padding: '.5rem' } }}
          />
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>検索数</Typography>
          <TextField
            inputRef={searchRef}
            sx={{ width: '200px' }}
            type="number"
            inputProps={{ style: { padding: '.5rem' } }}
          />
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>プロフィール</Typography>
          <TextField
            inputRef={profileRef}
            sx={{ width: '200px' }}
            type="number"
            inputProps={{ style: { padding: '.5rem' } }}
          />
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>レポート</Typography>
          <TextField
            inputRef={reportRef}
            sx={{ width: '200px' }}
            type="number"
            inputProps={{ style: { padding: '.5rem' } }}
          />
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>CSV</Typography>
          <TextField
            inputRef={csvRef}
            sx={{ width: '200px' }}
            type="number"
            inputProps={{ style: { padding: '.5rem' } }}
          />
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>キャンペーン登録</Typography>
          <TextField
            inputRef={saveRef}
            sx={{ width: '200px' }}
            type="number"
            inputProps={{ style: { padding: '.5rem' } }}
          />
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>プラン開始日</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              inputFormat={'yyyy/MM/dd'}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: '200px',
                    '& input': {
                      padding: '4px',
                    },
                  }}
                  variant="outlined"
                  inputRef={startRef}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>プラン終了日</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              inputFormat={'yyyy/MM/dd'}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: '200px',
                    '& input': {
                      padding: '4px',
                    },
                  }}
                  variant="outlined"
                  inputRef={endRef}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>インサイトリスト</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              className={clsx('text', !insight ? 'auto-manual-caption' : '')}
            >
              OFF
            </Typography>
            <Switch
              checked={insight}
              onChange={(e) => setInsight(e.target.checked)}
            />
            <Typography
              className={clsx('text', insight ? 'auto-manual-caption' : '')}
            >
              ON
            </Typography>
          </Box>
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>キャンペーンリスト</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              className={clsx('text', !campaign ? 'auto-manual-caption' : '')}
            >
              OFF
            </Typography>
            <Switch
              checked={campaign}
              onChange={(e) => setCampaign(e.target.checked)}
            />
            <Typography
              className={clsx('text', campaign ? 'auto-manual-caption' : '')}
            >
              ON
            </Typography>
          </Box>
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>キーアカウント調査</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              className={clsx('text', !keyaccount ? 'auto-manual-caption' : '')}
            >
              OFF
            </Typography>
            <Switch
              checked={keyaccount}
              onChange={(e) => setKeyaccount(e.target.checked)}
            />
            <Typography
              className={clsx('text', keyaccount ? 'auto-manual-caption' : '')}
            >
              ON
            </Typography>
          </Box>
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>キーアカウント申請</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              className={clsx(
                'text',
                !keyrequested ? 'auto-manual-caption' : '',
              )}
            >
              OFF
            </Typography>
            <Switch
              checked={keyrequested}
              onChange={(e) => setKeyRequested(e.target.checked)}
            />
            <Typography
              className={clsx(
                'text',
                keyrequested ? 'auto-manual-caption' : '',
              )}
            >
              ON
            </Typography>
          </Box>
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>更新モード</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              className={clsx('text', !updatemode ? 'auto-manual-caption' : '')}
            >
              OFF
            </Typography>
            <Switch
              checked={updatemode}
              onChange={(e) => setUpdatemode(e.target.checked)}
            />
            <Typography
              className={clsx('text', updatemode ? 'auto-manual-caption' : '')}
            >
              1カ月
            </Typography>
          </Box>
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>現在の検索数</Typography>
          <TextField
            inputRef={useSearchRef}
            sx={{ width: '200px' }}
            type="number"
            inputProps={{ style: { padding: '.5rem' } }}
          />
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>現在のプロフィール数</Typography>
          <TextField
            inputRef={useProfileRef}
            sx={{ width: '200px' }}
            type="number"
            inputProps={{ style: { padding: '.5rem' } }}
          />
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>現在のレポート数</Typography>
          <TextField
            inputRef={useReportRef}
            sx={{ width: '200px' }}
            type="number"
            inputProps={{ style: { padding: '.5rem' } }}
          />
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>現在のCSV数</Typography>
          <TextField
            inputRef={useCsvRef}
            sx={{ width: '200px' }}
            type="number"
            inputProps={{ style: { padding: '.5rem' } }}
          />
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>現在のキャンペーン登録数</Typography>
          <TextField
            inputRef={useSaveRef}
            sx={{ width: '200px' }}
            type="number"
            inputProps={{ style: { padding: '.5rem' } }}
          />
        </Box>
        <Button
          className="active"
          onClick={saveClicked}
          sx={{ marginLeft: '100px' }}
        >
          保存
        </Button>
      </Box>
    </Box>
  );
};

export default UsageCustom;
