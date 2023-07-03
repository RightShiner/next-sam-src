/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useRef, useState } from 'react';

import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
  FltInfluencerTag,
  FltInsightTextField,
  FltInfluencerFollowers,
  FltInfluencerView,
  FltInfluencerAmount,
  FltInfluencerGenre,
  FltInfluencerGender,
  FltInfluencerMemo,
  FltInfluencerPost,
  FltInfluencerEngage,
  FltInfluencerUsername,
  FltAudienceGender,
  FltAudienceAges,
} from '../../../Common/SearchFilters';
import Keyword from 'constants/lang';
import Constants, { ages, engages } from 'constants/constants';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  typodata: {
    marginTop: '1rem',
  },
});

const followers = [
  1000,
  3000,
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
const initInfluencer = {
  followers: {},
  gender: null,
  engagementRate: null,
  lastposted: null,
  amount: {},
  view: {},
  genre: null,
  memo: null,
  tags: [],
  username: [],
  tiktok: { eg: null, share: null, roas: null },
};

const lang = {
  en: {
    basicInfo: 'Basic Information',
    followerFilterTitle: 'Follower filter •',
    followerFilterSubtitle:
      'For best results, start with gender and age before adding more filters',
    gender: {
      male: 'Male',
      female: 'Female',
    },
    postPeriod: {
      month: '30 days',
      threeMonths: '3 Months',
      sixMonths: '6 Months',
    },
    share: 'Share%',
  },
  jp: {
    basicInfo: '基本情報',
    followerFilterTitle: 'フォロワーフィルター •',
    followerFilterSubtitle:
      'フォロワーの条件を指定してインフルエンサーを抽出する。',
    gender: {
      male: '男性',
      female: '女性',
    },
    postPeriod: {
      month: '30日',
      threeMonths: '3ヶ月',
      sixMonths: '6ヶ月',
    },
    share: 'シェア%',
  },
};

export default function TiktokFilter({ loadFromServer, ...rest }) {
  const { locale } = useRouter();
  const [clearFlag, setClearFlag] = useState(false);

  const clearFilterClicked = (e) => {
    setInfluencerFilter({ ...initInfluencer });
    setAudienceFilter({ ...initAudience });
    setClearFlag(!clearFlag);
    loadFromServer(null);
  };

  const searchClicked = (e) => {
    loadFromServer({ audience: audienceFilter, influencer: influencerFilter });
  };

  const [influencerFilter, setInfluencerFilter] = useState({
    ...initInfluencer,
  });
  const [audienceFilter, setAudienceFilter] = useState({
    age: [],
    gender: null,
  });

  const setInfluencer = (field, value) => {
    setInfluencerFilter({ ...influencerFilter, [field]: value });
  };

  const setAudience = (field, value) => {
    setAudienceFilter({ ...audienceFilter, [field]: value });
  };

  const setFeedFilter = (field, value) => {
    influencerFilter.tiktok[field] = value;
    setInfluencerFilter({ ...influencerFilter });
  };

  return (
    <Box {...rest}>
      <Box className="search-box">
        <Typography variant="body1" style={{ fontWeight: 600 }}>
          {lang[locale].basicInfo}
        </Typography>

        <Box sx={{ display: 'flex', flexShrink: 0 }}>
          <Box>
            <FltInfluencerFollowers
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.subscriber}
              icon={false}
              fromValues={followers}
              fromStyle={{ width: '7rem' }}
              toValues={[...followers, '1000000+']}
              toStyle={{ width: '7rem', marginLeft: '10px' }}
              setValues={setInfluencer}
            />
          </Box>
          <Box>
            <FltInfluencerView
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.averageview}
              icon={false}
              fromValues={followers}
              fromStyle={{ width: '7rem' }}
              toValues={[...followers, '1000000+']}
              toStyle={{ width: '7rem', marginLeft: '10px' }}
              setValues={setInfluencer}
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
              style={{ width: '8rem' }}
              setValues={setInfluencer}
            />
          </Box>
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
              style={{ width: '9rem' }}
              setValues={setInfluencer}
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
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Box>
            <FltInfluencerAmount
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.requestFee}
              icon={false}
              fromStyle={{ width: '7rem' }}
              toStyle={{ width: '7rem', marginLeft: '10px' }}
              setValues={setInfluencer}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <FltInfluencerGenre
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.type}
              icon={false}
              values={Constants.campaignTypes}
              setValues={setInfluencer}
            />
          </Box>
          <Box sx={{ width: '250px' }}>
            <FltInfluencerTag clearFlag={clearFlag} setValues={setInfluencer} />
          </Box>
          <Box sx={{ width: '200px' }}>
            <FltInfluencerMemo
              clearFlag={clearFlag}
              tip={Keyword[locale].caption.freeWord}
              icon={true}
              caption={Keyword[locale].caption.memo_tip}
              phstr="Any"
              setValues={setInfluencer}
            />
          </Box>
        </Box>
        <Box>
          <FltInfluencerUsername
            type="tiktok"
            clearFlag={clearFlag}
            tip={Keyword[locale].caption.username}
            phstr="@username"
            setValues={setInfluencer}
          />
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
            />
          </Box>
        </Box>
      </Box>
      <Box className="search-box">
        <Box sx={{ display: 'flex', flexShrink: 0 }}>
          <Box>
            <FltInsightTextField
              clearFlag={clearFlag}
              tip="EG%"
              icon={false}
              phstr="EG%"
              setValues={setFeedFilter}
              field="eg"
            />
          </Box>
          <Box>
            <FltInsightTextField
              clearFlag={clearFlag}
              tip={lang[locale].share}
              icon={false}
              phstr={lang[locale].share}
              setValues={setFeedFilter}
              field="share"
            />
          </Box>
          <Box>
            <FltInsightTextField
              clearFlag={clearFlag}
              tip="ROAS"
              icon={false}
              phstr="ROAS"
              setValues={setFeedFilter}
              field="roas"
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '15px',
          }}
        >
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
            onClick={searchClicked}
          >
            {Keyword[locale].caption.search}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
