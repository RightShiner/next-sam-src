/* eslint-disable react/no-unescaped-entities */
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import {
  Skeleton,
  Switch,
  Box,
  Button,
  Typography,
  Paper,
  TextField,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RoundInfo from 'components/RoundInfo';
import { AlertDlg } from 'views/Common';
import { campaignService } from 'services';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';

const PurpleSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#816BF7',
    '&:hover': {
      backgroundColor: alpha('#816BF7', 0.8),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#816BF7',
  },
}));

const lang = {
  en: {
    manuel: 'Manual',
    auto: 'Auto',
    period: 'Measure period',
    startDate: 'Start date',
    endDate: 'End date',
    money: 'Money',
    moneyCaption:
      'If the same account has posted more than once and there are more than two insights (e.g., posted stories and feeds on Instagram, posted two videos on Tiktok, etc.), the amount is one post. Only minutes are reflected. If you want to count it as the amount for 2 posts, please switch the report manually and change the number, or change the amount setting on the "Posts" tab.',
    sale: 'Sale',
    saleCaption:
      'If the same account has posted twice and there are two or more insights (e.g. posting stories and feeds on Instagram, posting two videos on Tiktok, etc.), each insight will We are adding sales.',
    people: 'People',
    peopleCaption:
      'Even if the same account posts twice and has two or more insights (e.g., posting stories and feeds on Instagram, uploading two videos on Tiktok, etc.), the number of people will be counted as one. increase. If you want to count the number of people as two people, switch the report manually and change the number.',
    totalReplay: 'Total replays',
    unit: 'Replay unit',
    averageEG: 'Average PREG',
    totalClick: 'Total click',
    averageClick: 'Average click%',
    totalCV: 'Total CV',
    averageCV: 'Average CV%',
    reach: 'Reach %',
    switchManuel: 'Switch to manuel',
    warning: 'Warning',
  },
  jp: {
    manual: '手動',
    auto: '自動',
    period: '計測期間',
    startDate: '開始日',
    endDate: '終了日',
    money: '金額',
    moneyCaption:
      '同一アカウントが二度以上投稿して、インサイトが二つ以上存在する場合(例：Instagramでストーリーとフィードの投稿を行った、Tiktokで二つの動画を上げた等)ですが、金額は1投稿分のみ反映されます。2投稿分の金額としてカウントしたい場合は、レポートを手動切替にして数値を変更して頂くか、「投稿」タブでの金額設定を変更してください。',
    sale: '売上',
    saleCaption:
      '同一アカウントが二度投稿して、インサイトが二つ以上存在する場合(例：Instagramでストーリーとフィードの投稿を行った、Tiktokで二つの動画を上げた等)は、それぞれのインサイトの売上を加算しています。',
    people: 'Number of people',
    peopleCaption:
      '同一アカウントが二度投稿して、インサイトが二つ以上存在する場合(例：Instagramでストーリーとフィードの投稿を行った、Tiktokで二つの動画を上げた等)も、人数は一人としてカウントされます。人数を二人としてカウントしたい場合は、レポートを手動切替にして数値を変更してください。',
    totalReplay: '合計再生回数',
    unit: '再生単価',
    averageEG: '平均PREG',
    totalClick: '合計クリック',
    averageClick: '平均クリック%',
    totalCV: '合計CV',
    averageCV: '平均CV%',
    reach: 'リーチ%',
    switchManuel: '手動に切り替える',
    warning: '注意',
  },
};

export default function YoutubeStatic({
  isLoading,
  getDatas,
  selCampId,
  classes,
}) {
  const { locale } = useRouter();
  const formatterInt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [staticType, setStaticType] = useState(true);
  const [showAlert, showAlertDlg] = useState(false);
  const [alertcaption, setAlertCaption] = useState('');

  const closeAlertDlg = (status) => {
    showAlertDlg(false);
    if (status === false) {
      return;
    }

    setStaticType(!staticType);
  };

  const switchCustomHandle = (val) => {
    if (staticType === false) {
      setAlertCaption(
        '自動に切り替えると、\r\n今まで手動で入力されたものが全て自動で取得した数字に更新されます。\r\n本当によろしいでしょうか？',
      );
      showAlertDlg(true);
      return;
    }

    setAlertCaption(
      '手動に切り替えると、\r\nレポート数値の自動反映が止まります。\r\n本当によろしいでしょうか？',
    );
    showAlertDlg(true);
  };
  // const [info, setInfos] = useState({
  //   amount:100, sells:0, roas:0, mems:0, followers:0, folvalue:0,
  //   feed:{mems: 0, rich:0, richper:0, savings:0, per:0, normal:0},
  //   story:{mems: 0, inp:0, inpper:0, clicks:0, clickper:0, staf:0, stafper:0},
  //   ril:{mems: 0, rich:0, richper:0, savings:0, per:0, normal:0}
  // });

  const amountRef = useRef();
  const sellRef = useRef();
  const roasRef = useRef();
  const memsRef = useRef();
  const recycleRef = useRef();
  const recycleVal = useRef();
  const normalRef = useRef();
  const clickRef = useRef();
  const clickPerRef = useRef();
  const cvRef = useRef();
  const cvPerRef = useRef();
  const richPerRef = useRef();

  useEffect(() => {
    let tmp = getDatas();
    if (!tmp || tmp.length < 1) return;

    let amount = 0,
      sells = 0,
      recycle = 0,
      followers = 0;
    let normal = 0,
      click = 0,
      clickPer = 0,
      cv = 0,
      cvPer = 0,
      prs = 0;
    let mems = tmp.length;

    if (staticType === true) {
      _.map(tmp, (itm) => {
        // amount += itm.amount ? +(itm.amount) : 0;
        sells += itm.sell ? +itm.sell : 0;
        recycle += itm.prs ? +itm.prs : 0;
        normal += itm.normal ? +itm.normal : 0;
        click += itm.click ? +itm.click : 0;
        clickPer += !itm.click || !itm.prs ? 0 : (itm.click / itm.prs) * 100;
        cv += itm.cv ? +itm.cv : 0;
        followers += itm.followers ? +itm.followers : 0;
        prs += itm.prs ? +itm.prs : 0;
        cvPer += !itm.cv || !itm.prs ? 0 : (itm.cv / itm.prs) * 100;
      });

      amount = 0;
      let distinctMems = Array.from(new Set(tmp.map((x) => x.accountId))).map(
        (id) => {
          amount += +tmp.find((s) => s.accountId === id).amount;
        },
      );

      amountRef.current.value = formatterInt.format(amount);
      sellRef.current.value = formatterInt.format(sells);
      roasRef.current.value =
        mems > 0 && amount > 0
          ? (((sells / amount) * 100) / mems).toFixed(1) + ' %'
          : '0 %';
      memsRef.current.value = formatterInt.format(distinctMems.length);
      recycleRef.current.value = formatterInt.format(recycle);
      recycleVal.current.value = recycle ? (amount / recycle).toFixed(1) : '-';
      normalRef.current.value = ((normal / mems) * 100).toFixed(1) + ' %';
      clickRef.current.value = formatterInt.format(click);
      clickPerRef.current.value =
        mems > 0 ? (clickPer / mems).toFixed(1) + ' %' : '0 %';
      cvRef.current.value = formatterInt.format(cv);
      cvPerRef.current.value =
        mems > 0 ? (cvPer / mems).toFixed(1) + ' %' : '0 %';
      richPerRef.current.value =
        followers > 0 ? ((prs / followers) * 100).toFixed(1) + ' %' : '0 %';
    }
  }, [staticType, getDatas]);

  const exportPDF = async () => {
    const input = document.getElementById('content-above-wrapper');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'pt', [
        (input.offsetWidth * 72) / 96,
        (input.offsetHeight * 72) / 96,
      ]);
      pdf.addImage(
        imgData,
        'JPEG',
        0,
        0,
        (input.offsetWidth * 72) / 96,
        (input.offsetHeight * 72) / 96,
      );
      // pdf.output('dataurlnewwindow');
      pdf.save('YOUTUBEレポート.pdf');
    });
    // let datas = await campaignService.downloadCSVData(selCampId, Constants.snsYoutube)
    //   .then((ret) => {
    //     if (ret.status !== 'ok') {
    //       toast.error(ret.msg);
    //       return null;
    //     }

    //     return ret.data;
    //   })
    //   .catch(error => {
    //     return null;
    //   });

    // if (datas === null)
    //   return;

    // const doc = <ReportPDF rowData={datas}/>;
    // const asPdf = pdf([]); // {} is important, throws without an argument
    // asPdf.updateContainer(doc);
    // const blob = await asPdf.toBlob();
    // saveAs(blob, 'レポット.pdf');
  };

  return (
    <Paper
      className="detail-section"
      sx={{
        padding: '10px 0',
        position: 'relative',
        width: '1024px',
      }}
    >
      <Button
        sx={{
          position: 'absolute',
          right: 20,
          top: 20,
          color: 'black !important',
          borderRadius: '20px !important',
          border: '1px solid #1377EB',
        }}
        onClick={(e) => exportPDF()}
      >
        PDF
      </Button>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          right: 20,
          top: 50,
          alignItems: 'center',
          marginTop: '10px',
        }}
      >
        <Typography
          className={clsx('text', !staticType ? 'auto-manual-caption' : '')}
        >
          {lang[locale].manuel}
        </Typography>
        <PurpleSwitch
          checked={staticType}
          onChange={(e) => setStaticType(e.target.checked)}
        />
        <Typography
          className={clsx('text', staticType ? 'auto-manual-caption' : '')}
        >
          {lang[locale].auto}
        </Typography>
      </Box>
      <Box className="label-container">
        <Typography className="text">{lang[locale].period}</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label={lang[locale].startDate}
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            inputFormat={'yyyy/MM/dd'}
            renderInput={(params) => <TextField {...params} />}
          />
          <MobileDatePicker
            label={lang[locale].endDate}
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            inputFormat={'yyyy/MM/dd'}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box className="value-container">
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
        ) : (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography className={classes.staticCaption}>
                {lang[locale].money}
              </Typography>
              <RoundInfo
                sx={{ marginLeft: '.5rem' }}
                caption={lang[locale].moneyCaption}
              />
            </Box>
            <TextField
              variant="standard"
              size="small"
              inputProps={{ readOnly: staticType }}
              inputRef={amountRef}
            />
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
        ) : (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography className={classes.staticCaption}>
                {lang[locale].sale}
              </Typography>
              <RoundInfo
                sx={{ marginLeft: '.5rem' }}
                caption={lang[locale].saleCaption}
              />
            </Box>
            <TextField
              variant="standard"
              size="small"
              inputProps={{ readOnly: staticType }}
              inputRef={sellRef}
            />
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>ROAS</Typography>
            <TextField
              variant="standard"
              size="small"
              inputProps={{ readOnly: staticType }}
              inputRef={roasRef}
            />
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
        ) : (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography className={classes.staticCaption}>
                {lang[locale].people}
              </Typography>
              <RoundInfo
                sx={{ marginLeft: '.5rem' }}
                caption={lang[locale].peopleCaption}
              />
            </Box>
            <TextField
              variant="standard"
              size="small"
              inputProps={{ readOnly: staticType }}
              inputRef={memsRef}
            />
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>
              {lang[locale].totalReplay}
            </Typography>
            <TextField
              variant="standard"
              size="small"
              inputProps={{ readOnly: staticType }}
              inputRef={recycleRef}
            />
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>
              {lang[locale].unit}
            </Typography>
            <TextField
              variant="standard"
              size="small"
              inputProps={{ readOnly: staticType }}
              inputRef={recycleVal}
            />
          </Box>
        )}
      </Box>
      <Box className="value-container">
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>
              {lang[locale].averageEG}
            </Typography>
            <TextField
              variant="standard"
              size="small"
              inputProps={{ readOnly: staticType }}
              inputRef={normalRef}
            />
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>
              {lang[locale].totalClick}
            </Typography>
            <TextField
              variant="standard"
              size="small"
              inputProps={{ readOnly: staticType }}
              inputRef={clickRef}
            />
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>
              {lang[locale].averageClick}
            </Typography>
            <TextField
              variant="standard"
              size="small"
              inputProps={{ readOnly: staticType }}
              inputRef={clickPerRef}
            />
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>
              {lang[locale].totalCV}
            </Typography>
            <TextField
              variant="standard"
              size="small"
              inputProps={{ readOnly: staticType }}
              inputRef={cvRef}
            />
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>
              {lang[locale].averageCV}
            </Typography>
            <TextField
              variant="standard"
              size="small"
              inputProps={{ readOnly: staticType }}
              inputRef={cvPerRef}
            />
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>
              {lang[locale].reach}
            </Typography>
            <TextField
              variant="standard"
              size="small"
              inputProps={{ readOnly: staticType }}
              inputRef={richPerRef}
            />
          </Box>
        )}
      </Box>
      <AlertDlg
        title={lang[locale].warning}
        okcaption={lang[locale].switchManueller}
        caption={alertcaption}
        dlgState={showAlert}
        closeDlg={closeAlertDlg}
      />
    </Paper>
  );
}
