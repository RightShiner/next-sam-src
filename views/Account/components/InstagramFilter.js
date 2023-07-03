/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import readXlsxFile from 'read-excel-file';
import Papa from 'papaparse';
import toast from 'react-hot-toast';
import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import GetAppIcon from '@mui/icons-material/GetApp';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import {
  FltInfluencerCampaign,
  FltInfluencerAccount,
  FltAudienceCredibility,
  FltAudienceAges,
  FltAudienceGender,
  FltAudienceInterests,
  FltAudienceLocation,
  FltInfluencerMention,
  FltInfluencerTopics,
  FltInfluencerBio,
  FltInfluencerContract,
  FltInfluencerEngage,
  FltInfluencerFollowers,
  FltInfluencerGender,
  FltInfluencerHash,
  FltInfluencerInterest,
  FltInfluencerKeyword,
  FltInfluencerPost,
  FltInfluencerGrowthRate,
  FltInfluencerHashEngage,
  FltInfluencerAverageReelsPlays,
} from '../../Common/SearchFilters';
import Lang from 'constants/lang';
import Constants, {
  audienceLocations,
  audienceLocationsAdditions,
  audienceLocationsAdditions2,
  audienceLocationsAdditions3,
  audienceLocationsAdditions4,
  audienceLocationsAdditions5,
  audienceLocationsAdditions7,
  audienceLocationsAdditions8,
  audienceLocationsAdditions9,
  audienceLocationsAdditions10,
  audienceLocationsSg,
  getNamesFromFileData,
  growthRate,
} from 'constants/constants';
import Async from 'react-select/async';
import { components } from 'react-select';
import { astreamService } from 'services';
import Keyword from '../../../constants/lang';
import RoundInfo from '../../../components/RoundInfo';
import { useRouter } from 'next/router';

const followers = [
  1000,
  2000,
  3000,
  4000,
  5000,
  10000,
  15000,
  20000,
  25000,
  30000,
  35000,
  40000,
  45000,
  50000,
  100000,
  250000,
  500000,
  1000000,
];

const averageReelsPlays = [
  3000,
  5000,
  10000,
  15000,
  25000,
  35000,
  50000,
  75000,
  100000,
  175000,
  250000,
  350000,
  500000,
  1000000,
  2000000,
];

const ages = ['13-17', '18-24', '25-34', '35-44', '45-64'];

const engages = Array.from({ length: 10 }, (_, i) => {
  return { value: (i + 1) * 0.01, text: `≥${i + 1}%` };
});

const credibility = [
  { value: 0.75, text: '≥75%' },
  { value: 0.65, text: '≥65%' },
  { value: 0.5, text: '≥50%' },
];

const initAudience = {
  age: [],
  gender: null,
  interests: [],
  language: null,
  location: [],
  credibility: null,
};
const initInfluencer = {
  accountTypes: [],
  bio: '',
  engagementRate: null,
  textTags: null,
  hashtagengage: null,
  followers: {},
  gender: null,
  hasContactDetails: null,
  hasYouTube: false,
  interests: [],
  language: null,
  lastposted: null,
  location: [],
  relevance: [],
  type: null,
  followersGrowthRate: null,
};

const lang = {
  en: {
    influencerFilterTitle: 'Influencer filter •',
    influencerFilterSubtitle:
      'Try starting with number of followers and audience filters narrowing your search',
    followerFilterTitle: 'Follower filter •',
    followerFilterSubtitle:
      'For best results, start with gender and age before adding more filters',
    userNameTitle: 'Search by Username •',
    userNameSubtitle:
      'Successful users often use this to check specific accounts and find similar influencers',
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
    fileRead: 'ファイルで読み込み(15アカウントまで)',
    gender: {
      male: '男性',
      female: '女性',
    },
    postPeriod: {
      month: '30日',
      threeMonths: '3ヶ月',
      sixMonths: '6ヶ月',
    },
    errorReadingXLSX: 'XLSXファイルを読み込み中にエラーが発生しました。',
    errorSelectCSVorXLSX: 'CSVとかXLSXファイルを選択してください。',
    placeHolderUsernameSearch: '@username(15アカウントまで)',
    errorUsernameSearchMax: 'ユーザーネーム検索は一度に15人まで可能です',
    warningUsernameSearchMax: '16人以上は入力できません',
  },
};

export default function InstagramFilter({
  interests,
  languages,
  campaigns,
  searchFromServer,
  setCampaigns,
  saveFromServer,
  userInfo,
}) {
  const { locale } = useRouter();
  const [clearFlag, setClearFlag] = useState(false);
  const theme = useTheme();
  const [maxUserCountState, setMaxUserCountState] = useState(false);
  const fileinputRef = useRef();

  const [userList, setUserList] = useState([]);

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
    setAudienceFilter({ ...initAudience });
    setInfluencerFilter({ ...initInfluencer });
    setClearFlag(!clearFlag);
    searchFromServer(null, false);
    localStorage.removeItem('instagramFilters');
    localStorage.removeItem('instagramCamps');
    fileinputRef.current.value = '';
  };

  const [audienceFilter, setAudienceFilter] = useState({ ...initAudience });
  const [influencerFilter, setInfluencerFilter] = useState({
    ...initInfluencer,
  });

  useEffect(() => {
    let instagramFilters = JSON.parse(localStorage.getItem('instagramFilters'));

    if (instagramFilters !== null) {
      setAudienceFilter({ ...instagramFilters.audience });
      setInfluencerFilter({ ...instagramFilters.influencer });

      searchFromServer(
        {
          audience: instagramFilters.audience,
          influencer: instagramFilters.influencer,
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
      'instagramFilters',
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

  const setInfluencer = (field, value, tag = null) => {
    if (field === 'textTags') {
      let orgFilter = influencerFilter.textTags ?? [];

      if (tag === 'hashtag') {
        orgFilter = orgFilter.filter((itm) => itm.type !== 'hashtag');
      } else {
        orgFilter = orgFilter.filter((itm) => itm.type !== 'mention');
      }

      if (value === null) {
        setInfluencerFilter({ ...influencerFilter, textTags: orgFilter });
      } else {
        setInfluencerFilter({
          ...influencerFilter,
          textTags: [...orgFilter, ...value],
        });
      }
    } else {
      setInfluencerFilter({ ...influencerFilter, [field]: value });
    }
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
    let items = JSON.parse(localStorage.getItem(`instagramFilters`))?.influencer
      ?.userlist;
    items = items || [];

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
    return astreamService.getInstagramUsers(input).then((res) => {
      if (res.users.length == 0) return [{ value: input, label: '@' + input }];

      let options = res.users.map((user, key) => {
        return {
          value: user.userId,
          label: '@' + user.username,
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
          <Box sx={{flex: 1, flexGrow: 1, alignItems: 'stretch', minWidth:'calc(200px + 0.5rem) !important'}}>
            <FltInfluencerLocation 
              clearFlag={clearFlag}
              tip={Lang[locale].caption.influencerlocation}
              phstr='インフルエンサ―の地域'
              icon={false} 
              setValues={setInfluencer}
            />
          </Box>
          */}
          <Box>
            <FltInfluencerFollowers
              clearFlag={clearFlag}
              tip={Lang[locale].caption.followers}
              icon={false}
              fromValues={followers}
              fromStyle={{ width: '8rem' }}
              toValues={[...followers, '1000000+']}
              toStyle={{ width: '8rem', marginLeft: '10px' }}
              setValues={setInfluencer}
              type={Constants.snsInstagram}
            />
          </Box>
          <Box>
            <FltInfluencerAverageReelsPlays
              clearFlag={clearFlag}
              tip={Lang[locale].caption.averageReelsPlays}
              caption={Lang[locale].caption.averageReelsPlaysInfo}
              icon={true}
              fromValues={[1000, ...averageReelsPlays]}
              fromStyle={{ width: '8rem' }}
              toValues={[...averageReelsPlays, '3000000+']}
              toStyle={{ width: '8rem', marginLeft: '10px' }}
              setValues={setInfluencer}
              type={Constants.snsInstagram}
            />
          </Box>
          <Box>
            <FltInfluencerGender
              clearFlag={clearFlag}
              tip={Lang[locale].caption.gender}
              icon={false}
              values={[
                { id: 'MALE', text: lang[locale].gender.male },
                { id: 'FEMALE', text: lang[locale].gender.female },
              ]}
              style={{ width: '7rem' }}
              setValues={setInfluencer}
              type={Constants.snsInstagram}
            />
          </Box>
          <Box sx={{ width: '15rem !important' }}>
            <FltInfluencerInterest
              clearFlag={clearFlag}
              tip={Lang[locale].caption.interestcare}
              icon={true}
              values={interests}
              caption={Lang[locale].caption.interestcare_tip}
              itmKey="id"
              itmValue="name"
              setValues={setInfluencer}
              type={Constants.snsInstagram}
            />
          </Box>
          {/*
          <Box sx={{minWidth:'150px', flex:1}}>
            <FltInfluencerLanguage
              clearFlag={clearFlag}
              tip={Lang[locale].caption.language}
              icon={false} 
              values={languages}
              itmKey='code'
              itmValue='name'
              setValues={setInfluencer}
            />
          </Box>
          */}
          <Box
            sx={{
              flex: 1,
              flexGrow: 1,
              alignItems: 'stretch',
              minWidth: '10rem !important',
            }}
          >
            <FltInfluencerEngage
              clearFlag={clearFlag}
              tip={Lang[locale].caption.engagement}
              icon={true}
              values={engages}
              caption={Lang[locale].caption.engagement_tip}
              setValues={setInfluencer}
              type={Constants.snsInstagram}
            />
          </Box>
          <Box sx={{ width: '15rem !important' }}>
            <FltInfluencerAccount
              clearFlag={clearFlag}
              tip={Lang[locale].caption.acctype}
              icon={true}
              caption={Lang[locale].caption.acctype_tip}
              setValues={setInfluencer}
              type={Constants.snsInstagram}
            />
          </Box>
          <Box>
            <FltInfluencerPost
              clearFlag={clearFlag}
              tip={Lang[locale].caption.post}
              icon={true}
              caption={Lang[locale].caption.post_tip}
              values={[
                { id: '30', text: lang[locale].postPeriod.month },
                { id: '90', text: lang[locale].postPeriod.threeMonths },
                { id: '180', text: lang[locale].postPeriod.sixMonths },
              ]}
              style={{ width: '8rem' }}
              setValues={setInfluencer}
              type={Constants.snsInstagram}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              flexGrow: 1,
              alignItems: 'stretch',
              minWidth: '220px !important',
            }}
          >
            <FltInfluencerBio
              clearFlag={clearFlag}
              tip={Lang[locale].caption.profile}
              icon={true}
              phstr="description"
              caption={Lang[locale].caption.profile_tip}
              setValues={setInfluencer}
              type={Constants.snsInstagram}
            />
          </Box>
          {/* <Box sx={{ width: '12rem' }}>
            <FltInfluencerContract
              clearFlag={clearFlag}
              tip={Lang[locale].caption.contractinfo}
              icon={true}
              caption={Lang[locale].caption.contract_info_tip}
              values={['Email情報あり']}
              setValues={setInfluencer}
            />
          </Box> */}
          {process.env.NEXT_PUBLIC_REGION == 'SG' && (
            <Box sx={{ width: '20rem !important' }}>
              <FltInfluencerTopics
                clearFlag={clearFlag}
                tip={Lang[locale].caption.topics}
                icon={true}
                phstr="#topics"
                caption={Lang[locale].caption.topics_tip}
                setValues={setInfluencer}
                type={Constants.snsInstagram}
              />
            </Box>
          )}
          <Box style={{ width: '20rem' }}>
            <FltInfluencerHash
              clearFlag={clearFlag}
              tip={Lang[locale].caption.hashtagonly}
              icon={true}
              phstr="#hashtag"
              caption={Lang[locale].caption.hashtag_tip}
              setValues={setInfluencer}
              type={Constants.snsInstagram}
            />
          </Box>
          <Box style={{ width: '20rem', flex: 1 }}>
            <FltInfluencerMention
              clearFlag={clearFlag}
              tip={Lang[locale].caption.mentiononyl}
              icon={true}
              phstr="@username"
              caption={Lang[locale].caption.mention_tip}
              setValues={setInfluencer}
              type={Constants.snsInstagram}
            />
          </Box>
          {(true ||
            process.env.NEXT_PUBLIC_REGION == 'SG' ||
            [
              '61be26c840a8daea0c2e642a',
              '61ef78e52f67a0525621ab21',
              '61c141d2408a5fb4af9ab7e4',
              '61cab9cef4b458c6de5c7536',
              '62d5f9daab0ce0f71365e264',
              '62cea9d8ab0ce0f713527f49',
              '6221d31e1fa3bb5a6e0c1b44',
              '62fdd55f62a0d02ed43be927',
            ].includes(userInfo?.id)) && (
            <Box sx={{ minWidth: '20rem !important' }}>
              <FltInfluencerGrowthRate
                clearFlag={clearFlag}
                tip={Lang[locale].caption.growthRate}
                icon={true}
                caption={Lang[locale].caption.growthRate_tip}
                values={growthRate[locale]}
                setValues={setInfluencer}
                type={Constants.snsInstagram}
              />
            </Box>
          )}
          <Box sx={{ minWidth: '20rem !important' }}>
            <FltInfluencerCampaign
              clearFlag={clearFlag}
              tip={Lang[locale].caption.exceptcampaign}
              icon={true}
              caption={Lang[locale].caption.exceptcampaign_tip}
              campaigns={campaigns}
              setValues={setCampaigns}
              type={Constants.snsInstagram}
            />
          </Box>
          <Box sx={{ minWidth: '17rem' }}>
            <FltInfluencerKeyword
              clearFlag={clearFlag}
              tip={Lang[locale].caption.keyword}
              icon={true}
              phstr="keyword"
              caption={Lang[locale].caption.keyword_instagram_tip}
              setValues={setInfluencer}
              type={Constants.snsInstagram}
            />
          </Box>
          {process.env.NEXT_PUBLIC_REGION != 'SG' && (
            <Box sx={{ minWidth: '40rem' }}>
              <FltInfluencerHashEngage
                clearFlag={clearFlag}
                tip={Lang[locale].caption.hashtagEngagement}
                icon={true}
                caption={Lang[locale].caption.hashtag_engagement_tip}
                phstr={Lang[locale].caption.hashtagEngagementPlaceHolder}
                setValues={setInfluencer}
                type={Constants.snsInstagram}
              />
            </Box>
          )}
          {/* <Box sx={{width:'14rem'}}>
            <FltInfluencerRate
              clearFlag={clearFlag}
              tip={Lang[locale].caption.rateinfo}
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
          {(!process.env.NEXT_PUBLIC_REGION ||
            process.env.NEXT_PUBLIC_REGION != 'SG') && (
            <Box
              sx={{
                flex: 1,
                flexGrow: 1,
                alignItems: 'stretch',
                minWidth: 'calc(150px + 0.5rem) !important',
              }}
            >
              <FltAudienceLocation
                clearFlag={clearFlag}
                tip={Lang[locale].caption.audiencelocation}
                phstr="フォロワーの地域"
                icon={false}
                caption={Lang[locale].caption.other_tip}
                setValues={setAudience}
                options={[
                  ...audienceLocations,
                  ...(([
                    '62f1c42ed2c300db0abbe8b5',
                    '62cea9d8ab0ce0f713527f49',
                  ].includes(userInfo?.id) &&
                    audienceLocationsAdditions) ||
                    []),
                  ...(([
                    '61be26c840a8daea0c2e642a',
                    '62358060ef457bfa3d6b9989',
                    '62cbc8efe46b68f371d3544f',
                    '61ef78e52f67a0525621ab21',
                    '637edc9a6a63e4dbc442e360',
                  ].includes(userInfo?.id) &&
                    audienceLocationsAdditions2) ||
                    []),
                  ...(([
                    '61be26c840a8daea0c2e642a',
                    '62358060ef457bfa3d6b9989',
                    '62cbc8efe46b68f371d3544f',
                  ].includes(userInfo?.id) &&
                    audienceLocationsAdditions3) ||
                    []),
                  ...((['6329719fb49b682b7854fb89'].includes(userInfo?.id) &&
                    audienceLocationsAdditions5) ||
                    []),
                  ...((['6307d2f3c3f35cc77b1ab146'].includes(userInfo?.id) &&
                    audienceLocationsAdditions7) ||
                    []),
                  ...((['61d5585e80dbf7ccc742e13a'].includes(userInfo?.id) &&
                    audienceLocationsAdditions9) ||
                    []),
                  ...((['62cea9d8ab0ce0f713527f49'].includes(userInfo?.id) &&
                    audienceLocationsAdditions10) ||
                    []),
                ]}
                type={Constants.snsInstagram}
              />
            </Box>
          )}
          {process.env.NEXT_PUBLIC_REGION == 'SG' &&
            ['635617e70f2b66794d105597'].includes(userInfo?.id) && (
              <Box
                sx={{
                  flex: 1,
                  flexGrow: 1,
                  alignItems: 'stretch',
                  minWidth: 'calc(150px + 0.5rem) !important',
                }}
              >
                <FltAudienceLocation
                  clearFlag={clearFlag}
                  tip={Lang[locale].caption.audiencelocation}
                  phstr="Location"
                  icon={false}
                  caption={Lang[locale].caption.other_tip}
                  setValues={setAudience}
                  options={audienceLocationsAdditions8}
                  type={Constants.snsInstagram}
                />
              </Box>
            )}
          <Box sx={{ width: '10rem' }}>
            <FltAudienceGender
              clearFlag={clearFlag}
              tip={Lang[locale].caption.gender}
              icon={false}
              values={[
                { id: 'MALE', text: lang[locale].gender.male },
                { id: 'FEMALE', text: lang[locale].gender.female },
              ]}
              caption={Lang[locale].caption.other_tip}
              setValues={setAudience}
              type={Constants.snsInstagram}
            />
          </Box>
          <Box sx={{ width: '13rem' }}>
            <FltAudienceAges
              clearFlag={clearFlag}
              tip={Lang[locale].caption.age}
              icon={false}
              values={ages}
              caption={Lang[locale].caption.other_tip}
              setValues={setAudience}
              type={Constants.snsInstagram}
            />
          </Box>
          <Box sx={{ width: '18rem !important' }}>
            <FltAudienceInterests
              clearFlag={clearFlag}
              tip={Lang[locale].caption.interest}
              icon={true}
              values={interests}
              itmKey="id"
              itmValue="name"
              caption={Lang[locale].caption.infu_interest_tip}
              setValues={setAudience}
              type={Constants.snsInstagram}
            />
          </Box>
          <Box sx={{ width: '13rem' }}>
            <FltAudienceCredibility
              clearFlag={clearFlag}
              tip={Lang[locale].caption.credibility}
              icon={true}
              values={credibility}
              caption={Lang[locale].caption.credibility_tip}
              setValues={setAudience}
              type={Constants.snsInstagram}
            />
          </Box>
          {/*
          <Box sx={{minWidth:'246px'}}>
            <FltAudienceLanguage 
              clearFlag={clearFlag}
              tip={Lang[locale].caption.language}
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
        <Box sx={{ marginTop: '10px' }}>
          <Async
            isMulti
            value={userList}
            onChange={setList}
            onInputChange={(e) => inputChangeEvent(e)}
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
                caption={Lang[locale].caption.fileinput_tip}
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
              {Lang[locale].caption.clearall}
            </Button>
            <Button
              className="active"
              variant={'outlined'}
              sx={{ marginLeft: '15px' }}
              startIcon={<SearchIcon />}
              onClick={startSearch}
            >
              {Lang[locale].caption.search}
            </Button>
            {userInfo?.id == '61be26c840a8daea0c2e642a' && (
              <Button
                className="active"
                variant={'outlined'}
                sx={{ marginLeft: '15px' }}
                startIcon={<GetAppIcon />}
                onClick={startExport}
              >
                {Lang[locale].btn.export}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
