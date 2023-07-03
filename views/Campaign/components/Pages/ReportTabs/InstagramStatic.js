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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RoundInfo from 'components/RoundInfo';
import { AlertDlg } from 'views/Common';
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
    follower: 'Followers',
    followerCaption:
      'Even if the same account posts twice and has two or more insights (e.g., posted stories and feeds on Instagram, posted two videos on Tiktok, etc.), the number of followers is equal to one. counted. If you want to count as more than two followers, please switch the report manually and change the number.',
    unit: 'Unit price',
    reach: 'Reach%',
    feed: 'Feed',
    totalReach: 'Total reach',
    averageReach: 'Average reach',
    totalSave: 'Total save',
    averageSave: 'Average save%',
    story: 'Story',
    totalImp: 'Total imp',
    averageImp: 'Average imp%',
    totalClick: 'Total click',
    averageClick: 'Average click%',
    totalStamp: 'Total stamp',
    averageStamp: 'Average stamp%',
    reel: 'Reel',
    switchManuel: 'Switch to manual',
    yes: 'Yes',
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
    follower: 'フォロワー数',
    followerCaption:
      '同一アカウントが二度投稿して、インサイトが二つ以上存在する場合(例：Instagramでストーリーとフィードの投稿を行った、Tiktokで二つの動画を上げた等)も、フォロワー数は一人分がカウントされます。二人分以上のフォロワー数としてカウントしたい場合は、レポートを手動切替にして数値を変更してください。',
    unit: 'フォロワー単価',
    reach: 'リーチ%',
    feed: 'フィード',
    totalReach: '合計リーチ',
    averageReach: '平均リーチ%',
    totalSave: '合計保存',
    averageSave: '平均保存%',
    story: 'ストーリー',
    totalImp: '合計インプ',
    averageImp: '平均インプ%',
    totalClick: '合計クリック',
    averageClick: '平均クリック%',
    totalStamp: '合計スタンプ',
    averageStamp: '平均スタンプ%',
    reel: 'リール',
    switchManuel: '手動に切り替える',
    yes: 'はい',
  },
};

export default function InstagramStatic({
  isLoading,
  getDatas,
  selCampId,
  classes,
}) {
  const { locale } = useRouter();
  const formatterInt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
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
  //   story:{mems: 0, inp:0, inpper:0, clicks:0, clickper:0, stamp:0, stampper:0},
  //   ril:{mems: 0, rich:0, richper:0, savings:0, per:0, normal:0}
  // });

  const amountRef = useRef();
  const totalRichPerRef = useRef();
  const sellRef = useRef();
  const roasRef = useRef();
  const memsRef = useRef();
  const followersRef = useRef();
  const followerValRef = useRef();
  const frichRef = useRef();
  const frichPerRef = useRef();
  const fsavingRef = useRef();
  const fsavingPerRef = useRef();
  const fegRef = useRef();
  const sinpRef = useRef();
  const sinpPerRef = useRef();
  const sclickRef = useRef();
  const sclickPerRef = useRef();
  const sstampRef = useRef();
  const sstampPerRef = useRef();
  const rrichRef = useRef();
  const rrichPerRef = useRef();
  const rsavingRef = useRef();
  const rsavingPerRef = useRef();
  const rprsRef = useRef();

  useEffect(() => {
    let tmp = getDatas();
    if (!tmp || tmp.length < 1) return;

    let amount = 0,
      sells = 0,
      followers = 0,
      trich = 0,
      tinp = 0;
    let feed = { mems: 0, rich: 0, richper: 0, savings: 0, per: 0, eg: 0 };
    let story = {
      mems: 0,
      inp: 0,
      inpper: 0,
      clicks: 0,
      clickper: 0,
      stamp: 0,
      stampper: 0,
    };
    let ril = { mems: 0, rich: 0, richper: 0, savings: 0, per: 0, prs: 0 };

    if (staticType === true) {
      _.map(tmp, (itm) => {
        // amount += itm.amount ? +(itm.amount) : 0;
        if (itm.rtype === 1) {
          feed.rich += itm.rich ? +itm.rich : 0;
          feed.savings += itm.saving ? +itm.saving : 0;
          feed.eg +=
            !itm.oks || !itm.rich || !itm.comment
              ? 0
              : ((itm.oks + itm.comment) / itm.rich) * 100;
          feed.richper +=
            !itm.rich || !itm.followers ? 0 : (itm.rich / itm.followers) * 100;
          feed.per +=
            !itm.saving || !itm.rich ? 0 : (itm.saving / itm.rich) * 100;
          feed.mems++;
        } else if (itm.rtype === 2) {
          story.inp += itm.inp ? +itm.inp : 0;
          story.clicks += itm.click ? +itm.click : 0;
          story.stamp += itm.stamp ? +itm.stamp : 0;
          story.inpper +=
            !itm.inp || !itm.followers ? 0 : (itm.inp / itm.followers) * 100;
          story.clickper +=
            !itm.click || !itm.followers
              ? 0
              : (itm.click / itm.followers) * 100;
          story.stampper +=
            !itm.stamp || !itm.followers
              ? 0
              : (itm.stamp / itm.followers) * 100;
          story.mems++;
        } else if (itm.rtype === 3) {
          ril.rich += itm.rich ? +itm.rich : 0;
          ril.savings += itm.saving ? +itm.saving : 0;
          ril.prs += !itm.followers
            ? 0
            : ((itm.comment + itm.oks) / itm.followers) * 100;
          ril.richper +=
            !itm.rich || !itm.followers ? 0 : (itm.rich / itm.followers) * 100;
          ril.per +=
            !itm.saving || !itm.followers ? 0 : (itm.saving / itm.rich) * 100;
          ril.mems++;
        }
      });

      amount = 0;
      trich = 0;
      tinp = 0;
      let distinctMems = Array.from(new Set(tmp.map((x) => x.accountId))).map(
        (id) => {
          amount += +tmp.find((s) => s.accountId === id).amount;
          sells += +tmp.find((s) => s.accountId === id).sell;
          followers += +tmp.find((s) => s.accountId === id).followers;
          trich += +tmp.find((s) => s.accountId === id).rich;
          tinp += +tmp.find((s) => s.accountId === id).inp;
        },
      );

      let mems = tmp.length;

      totalRichPerRef.current.value =
        (((trich + tinp) / followers) * 100).toFixed(1) + ' %';
      amountRef.current.value = formatterInt.format(amount);
      sellRef.current.value = formatterInt.format(sells);
      roasRef.current.value =
        (mems > 0 && amount > 0
          ? ((sells / amount / mems) * 100).toFixed(1)
          : 0) + ' %';
      memsRef.current.value = formatterInt.format(distinctMems.length);
      followersRef.current.value = formatterInt.format(followers);
      followerValRef.current.value = formatter.format(amount / followers);
      frichRef.current.value = feed.rich;
      frichPerRef.current.value =
        (feed.mems > 0 ? (feed.richper / feed.mems).toFixed(1) : 0) + ' %';
      fsavingRef.current.value = feed.savings;
      fsavingPerRef.current.value =
        (feed.mems > 0 ? (feed.per / feed.mems).toFixed(1) : 0) + ' %';
      fegRef.current.value =
        (feed.mems > 0 ? (feed.eg / feed.mems).toFixed(1) : 0) + ' %';
      sinpRef.current.value = story.inp;
      sinpPerRef.current.value =
        (story.mems > 0 ? (story.inpper / story.mems).toFixed(1) : 0) + ' %';
      sclickRef.current.value = story.clicks;
      sclickPerRef.current.value =
        (story.mems > 0 ? (story.clickper / story.mems).toFixed(1) : 0) + ' %';
      sstampRef.current.value = story.stamp;
      sstampPerRef.current.value =
        (story.mems > 0 ? (story.stampper / story.mems).toFixed(1) : 0) + ' %';
      rrichRef.current.value = ril.rich;
      rrichPerRef.current.value =
        (ril.mems > 0 ? (ril.richper / ril.mems).toFixed(1) : 0) + ' %';
      rsavingRef.current.value = ril.savings;
      rsavingPerRef.current.value =
        (ril.mems > 0 ? (ril.per / ril.mems).toFixed(1) : 0) + ' %';
      rprsRef.current.value =
        (ril.mems > 0 ? (ril.prs / ril.mems).toFixed(1) : 0) + ' %';
    }
  }, [staticType, getDatas]);

  const [startDownload, setStartDownload] = useState(false);
  const exportPDF = async () => {
    setFeedOpen(true);
    setRilOpen(true);
    setStoryOpen(true);
    setStartDownload(true);
    // let datas = await campaignService.downloadCSVData(selCampId, Constants.snsInstagram)
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

  const [feedOpen, setFeedOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [rilOpen, setRilOpen] = useState(false);
  const [allOpend, setAllOpened] = useState(false);

  useEffect(() => {
    if (!feedOpen || !storyOpen || !rilOpen || !startDownload) return;

    setAllOpened(true);
  }, [feedOpen, storyOpen, rilOpen, startDownload]);

  useEffect(() => {
    if (!allOpend) return;

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
      pdf.save('INSTAGRAMレポート.pdf');

      setStartDownload(false);
      setAllOpened(false);
    });
  }, [allOpend]);

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
          onChange={(e) => switchCustomHandle(e.target.checked)}
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
          <Skeleton width={100} height={40} sx={{ transform: 'unset' }} />
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
          <Skeleton width={100} height={40} sx={{ transform: 'unset' }} />
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
          <Skeleton width={100} height={40} sx={{ transform: 'unset' }} />
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
          <Skeleton width={100} height={40} sx={{ transform: 'unset' }} />
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
          <Skeleton width={100} height={40} sx={{ transform: 'unset' }} />
        ) : (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography className={classes.staticCaption}>
                {lang[locale].follower}
              </Typography>
              <RoundInfo
                sx={{ marginLeft: '.5rem' }}
                caption={lang[locale].followerCaption}
              />
            </Box>
            <TextField
              variant="standard"
              size="small"
              inputProps={{ readOnly: staticType }}
              inputRef={followersRef}
            />
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={100} height={40} sx={{ transform: 'unset' }} />
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>
              {lang[locale].unit}
            </Typography>
            <TextField
              variant="standard"
              size="small"
              inputProps={{ readOnly: staticType }}
              inputRef={followerValRef}
            />
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={100} height={40} sx={{ transform: 'unset' }} />
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>
              {lang[locale].reach}
            </Typography>
            <TextField
              variant="standard"
              size="small"
              inputProps={{ readOnly: staticType }}
              inputRef={totalRichPerRef}
            />
          </Box>
        )}
      </Box>
      <Accordion
        expanded={feedOpen}
        onChange={(e) => setFeedOpen((prevState) => !prevState)}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box className="label-container label-container-nested">
            <Typography className="text">{lang[locale].feed}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="value-container">
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>
                  {lang[locale].totalReach}
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ readOnly: staticType }}
                  inputRef={frichRef}
                />
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>
                  {lang[locale].averageReach}
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ readOnly: staticType }}
                  inputRef={frichPerRef}
                />
              </Box>
            )}

            {isLoading ? (
              <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>
                  {lang[locale].totalSave}
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ readOnly: staticType }}
                  inputRef={fsavingRef}
                />
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>
                  {lang[locale].averageSave}
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ readOnly: staticType }}
                  inputRef={fsavingPerRef}
                />
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>EG</Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ readOnly: staticType }}
                  inputRef={fegRef}
                />
              </Box>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={storyOpen}
        onChange={(e) => setStoryOpen((prevState) => !prevState)}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box className="label-container label-container-nested">
            <Typography className="text">{lang[locale].story}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="value-container">
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>
                  {lang[locale].totalImp}
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ readOnly: staticType }}
                  inputRef={sinpRef}
                />
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>
                  {lang[locale].averageImp}
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ readOnly: staticType }}
                  inputRef={sinpPerRef}
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
                  inputRef={sclickRef}
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
                  inputRef={sclickPerRef}
                />
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>
                  {lang[locale].totalStamp}
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ readOnly: staticType }}
                  inputRef={sstampRef}
                />
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>
                  {lang[locale].averageStamp}
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ readOnly: staticType }}
                  inputRef={sstampPerRef}
                />
              </Box>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={rilOpen}
        onChange={(e) => setRilOpen((prevState) => !prevState)}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box className="label-container label-container-nested">
            <Typography className="text">{lang[locale].reel}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="value-container">
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>
                  {lang[locale].totalReach}
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ readOnly: staticType }}
                  inputRef={rrichRef}
                />
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>
                  {lang[locale].averageReach}
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ readOnly: staticType }}
                  inputRef={rrichPerRef}
                />
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>
                  {lang[locale].totalSave}
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ readOnly: staticType }}
                  inputRef={rsavingRef}
                />
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>
                  {lang[locale].averageSave}
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ readOnly: staticType }}
                  inputRef={rsavingPerRef}
                />
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{ transform: 'unset' }} />
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>EG</Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ readOnly: staticType }}
                  inputRef={rprsRef}
                />
              </Box>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
      <AlertDlg
        title={lang[locale].warning}
        okcaption={
          staticType === true ? lang[locale].switchManuel : lang[locale].yes
        }
        caption={alertcaption}
        dlgState={showAlert}
        closeDlg={closeAlertDlg}
      />
    </Paper>
  );
}
