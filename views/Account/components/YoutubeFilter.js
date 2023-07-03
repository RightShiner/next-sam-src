/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import readXlsxFile from 'read-excel-file';
import Papa from 'papaparse';
import toast from 'react-hot-toast';
import React, { useRef, useState, useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import GetAppIcon from '@mui/icons-material/GetApp';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import {
  FltInfluencerCampaign,
  FltInfluencerView,
  FltAudienceAges,
  FltAudienceGender,
  FltInfluencerContract,
  FltInfluencerEngage,
  FltInfluencerFollowers,
  FltInfluencerGender,
  FltInfluencerKeyword,
  FltInfluencerPost,
  FltInfluencerGrowthRate,
  FltInfluencerTopics,
} from '../../Common/SearchFilters';
import Keyword from 'constants/lang';
import Constants, {
  getNamesFromFileData,
  growthRate,
} from 'constants/constants';
import { components } from 'react-select';
import Async from 'react-select/async';
import { astreamService } from 'services';
import RoundInfo from 'components/RoundInfo';
import { useRouter } from 'next/router';
import { LocalCafe } from '@mui/icons-material';

const followers = [
  1000,
  5000,
  10000,
  15000,
  25000,
  50000,
  100000,
  250000,
  500000,
  1000000,
];

const ages = ['13-17', '18-24', '25-34', '35-44', '45-64', '65-'];

const engages = Array.from({ length: 10 }, (_, i) => {
  return { value: (i + 1) * 0.01, text: `≥${i + 1}%` };
});

const lang = {
  en: {
    influencerFilterTitle: 'Influencer filter •',
    influencerFilterSubtitle:
      'Try starting with number of subscribers and audience filters narrowing your search',
    followerFilterTitle: 'Follower filter •',
    followerFilterSubtitle:
      'For best results, start with location, gender and age before adding more filters',
    userNameTitle: 'Search by username •',
    userNameSubtitle: 'Check for a specific account',
    fileRead: 'File Read(only max. 15 users)',
    gender: {
      male: 'Male',
      female: 'Female',
    },
    postPeriod: {
      month: '30 days',
      threeMonths: '3 Months',
      sixMonths: '6 Months',
    },
    contact: 'Email information available',
    errorReadingXLSX: 'Unexpected error while reading XLSX.',
    errorSelectCSVorXLSX: 'Select the file type of CSV or XLSX.',
    placeHolderUsernameSearch: '@username(only max. 15 users)',
    errorUsernameSearchMax:
      'Cannot search with usernames more than 15 at a time',
    warningUsernameSearchMax: 'Cannot input more',
  },
  jp: {
    influencerFilterTitle: 'インフルエンサーフィルター •',
    influencerFilterSubtitle:
      'インフルエンサーの条件を指定してインフルエンサーを抽出する。',
    followerFilterTitle: 'フォロワーフィルター •',
    followerFilterSubtitle:
      'フォロワーの条件を指定してインフルエンサーを抽出する。',
    userNameTitle: 'ユーザーネーム •',
    userNameSubtitle: '特定のアカウントをチェックします',
    fileRead: 'ファイル読み込み(15アカウントまで)',
    gender: {
      male: '男性',
      female: '女性',
    },
    postPeriod: {
      month: '30日',
      threeMonths: '3ヶ月',
      sixMonths: '6ヶ月',
    },
    contact: 'Email情報あり',
    errorReadingXLSX: 'XLSXファイルを読み込み中にエラーが発生しました。',
    errorSelectCSVorXLSX: 'CSVとかXLSXファイルを選択してください。',
    placeHolderUsernameSearch: '@username(15アカウントまで)',
    errorUsernameSearchMax: 'ユーザーネーム検索は一度に15人まで可能です',
    warningUsernameSearchMax: '16人以上は入力できません',
  },
};

export default function YoutubeFilter({
  interests,
  languages,
  campaigns,
  searchFromServer,
  setCampaigns,
  saveFromServer,
  isShowCSVButton,
  isShowGrowthRate = false,
}) {
  const { locale } = useRouter();
  const [clearFlag, setClearFlag] = useState(false);
  const theme = useTheme();
  const [maxUserCountState, setMaxUserCountState] = useState(false);
  const fileinputRef = useRef();

  const [userList, setUserList] = useState([]);
  // const [showPlus, setShowPlus] = useState(true);

  const parseFile = (file) => {
    Papa.parse(file, {
      header: false,
      complete: (results) => {
        setKeywordFromFile(results.data);
      },
    });
  };

  const setKeywordFromFile = (values) => {
    let result = getNamesFromFileData(values);

    setList(
      Array.prototype.map.call(result, (a) => ({
        value: a,
        label: a.startsWith('@') ? a : '@' + a,
      })),
    );
  };

  const fileSelected = (e) => {
    const files = e.target.files;
    if (files.length < 1) return;

    let extension = files[0].name.split('.').at(-1);
    if (extension === 'xlsx') {
      readXlsxFile(files[0])
        .then((rows) => {
          setKeywordFromFile(rows);
        })
        .catch((e) => {
          toast.error(lang[locale].errorReadingXLSX);
        });
    } else if (extension === 'csv') {
      parseFile(files[0]);
    } else {
      toast.error(lang[locale].errorSelectCSVorXLSX);
    }
  };

  const clearFilterClicked = (e) => {
    setList([]);
    setAudienceFilter({
      age: [],
      gender: null,
      interests: [],
      language: null,
      location: [],
      fake: null,
    });
    setInfluencerFilter({
      engagementRate: null,
      followers: {},
      gender: null,
      hasContactDetails: null,
      interests: [],
      language: null,
      location: [],
      relevance: [],
      lastposted: null,
      views: {},
      type: null,
      followersGrowthRate: null,
    });
    setClearFlag(!clearFlag);
    searchFromServer(null, false);
    localStorage.removeItem('youtubeFilters');
    localStorage.removeItem('youtubeCamps');
    fileinputRef.current.value = '';
  };

  const [audienceFilter, setAudienceFilter] = useState({
    age: [],
    gender: null,
    interests: [],
    language: null,
    location: [],
    fake: null,
  });
  const [influencerFilter, setInfluencerFilter] = useState({
    engagementRate: null,
    followers: {},
    gender: null,
    hasContactDetails: null,
    interests: [],
    language: null,
    location: [],
    relevance: [],
    lastposted: null,
    views: {},
    type: null,
    keywords: '',
    followersGrowthRate: null,
  });

  useEffect(() => {
    let youtubeFilters = JSON.parse(
      window.localStorage.getItem('youtubeFilters'),
    );

    if (youtubeFilters !== null) {
      setAudienceFilter({ ...youtubeFilters.audience });
      setInfluencerFilter({ ...youtubeFilters.influencer });

      searchFromServer(
        {
          audience: youtubeFilters.audience,
          influencer: youtubeFilters.influencer,
        },
        false,
      );
    }
  }, []);

  const startSearch = (e) => {
    searchFromServer(
      {
        audience: audienceFilter,
        influencer: influencerFilter,
      },
      true,
    );

    localStorage.setItem(
      'youtubeFilters',
      JSON.stringify({
        audience: audienceFilter,
        influencer: influencerFilter,
      }),
    );
  };

  const startExport = (e) => {
    saveFromServer({ audience: audienceFilter, influencer: influencerFilter });
  };

  const setAudience = (field, value) => {
    setAudienceFilter({ ...audienceFilter, [field]: value });
  };

  const setInfluencer = (field, value) => {
    setInfluencerFilter({ ...influencerFilter, [field]: value });
  };

  const styles = {
    placeholder: (base) => ({
      ...base,
      fontSize: '14px',
      color: '#bfc2c7',
    }),
    control: (base) => ({
      ...base,
      borderColor:
        maxUserCountState === true
          ? theme.palette.monitoring.danger
          : base.borderColor,
      '&:hover': {
        borderColor:
          maxUserCountState === true
            ? theme.palette.monitoring.danger
            : base.borderColor,
      },
      boxShadow: 'none',
    }),
  };

  const setList = (val, forceClear = false) => {
    setInfluencerFilter({ ...influencerFilter, userlist: val });
    setUserList(val);
    setMaxUserCountState(val?.length === 15);
  };

  useEffect(() => {
    let items = JSON.parse(localStorage.getItem(`youtubeFilters`))?.influencer
      ?.userlist;
    items = items !== undefined && items !== null ? items : [];

    setUserList(items?.slice(0, 15) ?? []);
  }, []);

  const inputChangeEvent = (e) => {
    setMaxUserCountState(userList?.length === 15 && e !== '');
  };

  const AvatarOption = (props) => (
    <components.Option {...props}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={props.data.picture}
          aria-label="recipe"
          sx={{ width: '1.3em', height: '1.3em' }}
        />
        &nbsp;{props.data.label}
      </Box>
    </components.Option>
  );

  const getOptions = (input) => {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    return astreamService.getYoutubeUsers(input).then((res) => {
      if (res.users.length == 0) return [{ value: input, label: '@' + input }];

      let options = res.users.map((user, key) => {
        return {
          value: user.userId,
          label: user.username ? '@' + user.username : user.fullname,
          picture: user.picture,
        };
      });

      if (!options.map((itm) => itm.label.substring(1)).includes(input)) {
        options = [...options, { value: input, label: '@' + input }];
      }
      return options;
    });
  };

  return (
    <Box>
      <Box className="search-box">
        <Typography variant="body1" style={{ fontWeight: '600' }}>
          {lang[locale].influencerFilterTitle}
          <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
            {lang[locale].influencerFilterSubtitle}
          </span>
        </Typography>

        <Box sx={{ display: 'flex', flexShrink: 0, flexWrap: 'wrap' }}>
          {/*
          <Box sx={{flex: 1, flexGrow: 1, alignItems: 'stretch', minWidth:'250px !important'}}>
            <FltInfluencerLocation 
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.influencerlocation}
              phstr='インフルエンサ―の地域'
              icon={false} 
              setValues={setInfluencer}
            />
          </Box>
          */}
          <Box>
            <FltInfluencerFollowers
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.subscriber}
              icon={false}
              fromValues={followers}
              fromStyle={{ width: '9rem' }}
              toValues={[...followers, '1000000+']}
              toStyle={{ width: '9rem', marginLeft: '10px' }}
              setValues={setInfluencer}
              type={Constants.snsYoutube}
            />
          </Box>
          <Box>
            <FltInfluencerView
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.averageview}
              icon={false}
              fromValues={followers}
              fromStyle={{ width: '9rem' }}
              toValues={[...followers, '1000000+']}
              toStyle={{ width: '9rem', marginLeft: '10px' }}
              setValues={setInfluencer}
              type={Constants.snsYoutube}
            />
          </Box>
          <Box>
            <FltInfluencerGender
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.gender}
              icon={false}
              values={[
                { id: 'MALE', text: lang[locale].gender.male },
                { id: 'FEMALE', text: lang[locale].gender.female },
              ]}
              style={{ width: '9rem' }}
              setValues={setInfluencer}
              type={Constants.snsYoutube}
            />
          </Box>
          {/*
          <Box sx={{width:'200px'}}>
            <FltInfluencerLanguage
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.language}
              icon={false} 
              values={languages}
              itmKey='code'
              itmValue='name'
              style={{width: '100% !important'}}
              setValues={setInfluencer}
            />
          </Box>
          */}
          <Box>
            <FltInfluencerPost
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.post}
              icon={true}
              caption={Keyword[locale].caption.post_tip}
              values={[
                { id: 30, text: lang[locale].postPeriod.month },
                { id: 90, text: lang[locale].postPeriod.threeMonths },
                { id: 180, text: lang[locale].postPeriod.sixMonths },
              ]}
              style={{ width: '12rem' }}
              setValues={setInfluencer}
              type={Constants.snsYoutube}
            />
          </Box>
          <Box>
            <FltInfluencerEngage
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.engagement}
              icon={true}
              values={engages}
              style={{ width: '12rem' }}
              caption={Keyword[locale].caption.youtube_engagement_tip}
              setValues={setInfluencer}
              type={Constants.snsYoutube}
            />
          </Box>
          {/* <Box>
            <FltInfluencerContract
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.contractinfo}
              icon={true}
              caption={Keyword[locale].caption.contract_info_tip}
              values={[lang[locale].contact]}
              style={{ width: '13rem' }}
              setValues={setInfluencer}
              type={Constants.snsYoutube}
            />
          </Box> */}
          {/* <Box sx={{ width: '15rem !important' }}>
            <FltInfluencerTopics
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.topics}
              icon={true}
              phstr="#topics"
              caption={Keyword[locale].caption.topics_tip}
              setValues={setInfluencer}
              type={Constants.snsYoutube}
            />
          </Box> */}
          <Box sx={{ minWidth: '220px', flex: 1 }}>
            <FltInfluencerCampaign
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.exceptcampaign}
              icon={true}
              caption={Keyword[locale].caption.exceptcampaign_tip}
              campaigns={campaigns}
              setValues={setCampaigns}
              type={Constants.snsYoutube}
            />
          </Box>
          <Box sx={{ width: '250px' }}>
            <FltInfluencerKeyword
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.keyword}
              icon={true}
              phstr="Keyword"
              caption={Keyword[locale].caption.keyword_youtube_tip}
              setValues={setInfluencer}
              type={Constants.snsYoutube}
            />
          </Box>
          {isShowGrowthRate && (
            <Box sx={{ minWidth: '20rem !important' }}>
              <FltInfluencerGrowthRate
                clearFlag={clearFlag}
                tip={Keyword[locale].caption.growthRate}
                icon={true}
                caption={Keyword[locale].caption.growthRate_tip}
                values={growthRate[locale]}
                setValues={setInfluencer}
                type={Constants.snsYoutube}
              />
            </Box>
          )}
          {/* <Box sx={{width:'14rem'}}>
            <FltInfluencerRate
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.rateinfo}
              icon={false} 
              setValues={setInfluencer}
            />
          </Box> */}
        </Box>
      </Box>
      <Box className="search-box">
        <Typography variant="body1" style={{ fontWeight: '600' }}>
          {lang[locale].followerFilterTitle}
          <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
            {lang[locale].followerFilterSubtitle}
          </span>
        </Typography>

        <Box sx={{ display: 'flex', flexShrink: 0, flexWrap: 'wrap' }}>
          {/*
          <Box sx={{flex: 1, flexGrow: 1, alignItems: 'stretch', minWidth:'250px !important'}}>
            <FltAudienceLocation 
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.audiencelocation}
              phstr='フォロワーの地域' 
              icon={true} 
              caption={Keyword[locale].caption.other_tip} 
              setValues={setAudience}
              options={audienceLocations}
            />
          </Box>
          */}
          <Box>
            <FltAudienceGender
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.gender}
              icon={false}
              values={[
                { id: 'MALE', text: lang[locale].gender.male },
                { id: 'FEMALE', text: lang[locale].gender.female },
              ]}
              caption={Keyword[locale].caption.other_tip}
              style={{ width: '10rem' }}
              setValues={setAudience}
              type={Constants.snsYoutube}
            />
          </Box>
          <Box sx={{ width: '10rem' }}>
            <FltAudienceAges
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.age}
              icon={false}
              values={ages}
              caption={Keyword[locale].caption.other_tip}
              setValues={setAudience}
              type={Constants.snsYoutube}
            />
          </Box>
          {/*
          <Box sx={{minWidth:'246px'}}>
            <FltAudienceLanguage 
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.language}
              icon={false} 
              values={languages}
              itmKey='code'
              itmValue='name'
              setValues={setAudience}
            />
          </Box>
          */}
        </Box>
      </Box>
      <Box className="search-box">
        <Box display="flex">
          <Typography variant="body1" style={{ fontWeight: '600' }}>
            {lang[locale].userNameTitle}
            <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
              {lang[locale].userNameSubtitle}
            </span>
            {maxUserCountState === true && (
              <span
                style={{
                  color: theme.palette.monitoring.danger,
                  fontSize: '14px',
                  marginLeft: '15px',
                  fontWeight: 'normal',
                }}
              >
                {lang[locale].warningUsernameSearchMax}
              </span>
            )}
          </Typography>
          <RoundInfo
            caption={Keyword[locale].caption.youtube_username_tip}
            marginLeft={1}
          />
        </Box>
        <Box sx={{ marginTop: '10px' }}>
          <Async
            isMulti
            value={userList}
            onChange={setList}
            onInputChange={inputChangeEvent}
            loadOptions={getOptions}
            placeholder={lang[locale].placeHolderUsernameSearch}
            isClearable={false}
            openMenuOnClick={false}
            // onFocus={handleFocus}
            // onBlur={handleBlur}
            styles={styles}
            isOptionDisabled={(option) => userList?.length >= 15}
            components={{ Option: AvatarOption }}
            // components={{ ValueContainer }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            marginTop: '15px',
          }}
        >
          <Box>
            <Box display="flex">
              <Typography
                sx={{
                  textDecoration: 'underline',
                  color: '#16acf3',
                  cursor: 'pointer',
                  paddingLeft: '1rem',
                  fontSize: '12px',
                }}
                onClick={(e) => fileinputRef.current.click()}
              >
                {lang[locale].fileRead}
              </Typography>
              <RoundInfo
                caption={Keyword[locale].caption.fileinput_tip}
                marginLeft={1}
              />
            </Box>
            <input
              type="file"
              accept=".csv,.xlsx"
              hidden
              ref={fileinputRef}
              onChange={fileSelected}
            />
          </Box>
          <Box>
            <Button
              className="error"
              variant={'outlined'}
              onClick={clearFilterClicked}
              startIcon={<ClearIcon />}
            >
              {Keyword[locale].caption.clearall}
            </Button>
            <Button
              className="active"
              variant={'outlined'}
              sx={{ marginLeft: '15px' }}
              startIcon={<SearchIcon />}
              onClick={startSearch}
            >
              {Keyword[locale].caption.search}
            </Button>
            {isShowCSVButton && (
              <Button
                className="active"
                variant={'outlined'}
                sx={{ marginLeft: '15px' }}
                startIcon={<GetAppIcon />}
                onClick={startExport}
              >
                {Keyword[locale].btn.export}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
