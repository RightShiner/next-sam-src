/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useRef, useState } from 'react';
import {
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  FltInfluencerTag,
  FltInsightTextField,
  FltInfluencerFollowers,
  FltInfluencerAmount,
  FltInfluencerGenre,
  FltInfluencerMemo,
  FltInfluencerEngage,
  FltInfluencerPost,
  FltInfluencerGender,
  FltInfluencerUsername,
  FltAudienceGender,
  FltAudienceAges,
  FltAudienceCredibility,
  FltAudienceCity,
  FltAudienceHobby,
} from '../../../Common/SearchFilters';
import Constants, {
  ages,
  engages,
  audienceLocations,
  audienceLocationsAdditions,
  audienceLocationsAdditions2,
  audienceLocationsAdditions3,
  audienceLocationsAdditions4,
  audienceLocationsAdditions5,
  audienceLocationsAdditions7,
  audienceLocationsSg,
} from 'constants/constants';
import Lang from 'constants/lang';
import { useRouter } from 'next/router';

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

const credibility = [
  { value: 0.75, text: '≥75%' },
  { value: 0.65, text: '≥65%' },
  { value: 0.5, text: '≥50%' },
];

const initInfluencer = {
  followers: {},
  gender: null,
  engagementRate: null,
  lastposted: null,
  amount: {},
  genre: null,
  memo: null,
  tags: [],
  username: [],
  feed: {
    rich: null,
    richper: null,
    saving: null,
    savingper: null,
    eg: null,
    roas: null,
  },
  story: {
    inp: null,
    inpper: null,
    click: null,
    clickper: null,
    stamp: null,
    stampper: null,
    roas: null,
  },
  ril: {
    rich: null,
    richper: null,
    saving: null,
    savingper: null,
    eg: null,
    roas: null,
  },
};

const initAudience = {
  age: [],
  gender: null,
  interests: [],
  location: [],
  credibility: null,
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
    feed: {
      title: 'Feed',
      reachNumber: 'Number of reach',
      reach: 'Reach%',
      saveNumber: 'Number of saves',
      save: 'Save%',
    },
    story: {
      title: 'Story',
      impNumber: 'Number of imps',
      imp: 'Imp%',
      linkClickNumber: 'Link clicks',
      linkClick: 'Link click%',
      stamp: 'Stamp%',
      stampNumber: 'Number of stamps',
      ROAS: 'ROAS',
    },
    reel: 'Reel',
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
    feed: {
      title: 'フィード',
      reachNumber: 'リーチ数',
      reach: 'リーチ%',
      saveNumber: '保存数',
      save: '保存%',
    },
    story: {
      title: 'ストーリー',
      impNumber: 'インプ数',
      imp: 'インプ%',
      linkClickNumber: 'リンククリック数',
      linkClick: 'リンククリック%',
      stamp: 'スタンプ%',
      stampNumber: 'スタンプ数',
    },
    reel: 'リール',
  },
};

export default function InstagramFilter({ loadFromServer, userInfo, ...rest }) {
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
  const [audienceFilter, setAudienceFilter] = useState({ ...initAudience });

  const setInfluencer = (field, value) => {
    setInfluencerFilter({ ...influencerFilter, [field]: value });
  };

  const setFeedFilter = (field, value) => {
    influencerFilter.feed[field] = value;
    setInfluencerFilter({ ...influencerFilter });
  };

  const setStoryFilter = (field, value) => {
    influencerFilter.story[field] = value;
    setInfluencerFilter({ ...influencerFilter });
  };

  const setRilFilter = (field, value) => {
    influencerFilter.ril[field] = value;
    setInfluencerFilter({ ...influencerFilter });
  };

  const setAudience = (field, value) => {
    setAudienceFilter({ ...audienceFilter, [field]: value });
  };

  return (
    <Box {...rest}>
      <Box className="search-box">
        <Typography variant="body1" style={{ fontWeight: 600 }}>
          {lang[locale].basicInfo}
        </Typography>

        <Box sx={{ display: 'flex', flex: 1 }}>
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
            />
          </Box>
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
            />
          </Box>
          <Box>
            <FltInfluencerPost
              clearFlag={clearFlag}
              tip={Lang[locale].caption.post}
              icon={true}
              caption={Lang[locale].caption.post_tip}
              values={[
                { id: 30, text: lang[locale].postPeriod.month },
                { id: 90, text: lang[locale].postPeriod.threeMonths },
                { id: 180, text: lang[locale].postPeriod.sixMonths },
              ]}
              style={{ width: '8rem' }}
              setValues={setInfluencer}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Box>
            <FltInfluencerAmount
              clearFlag={clearFlag}
              tip={Lang[locale].caption.requestFee}
              icon={false}
              fromStyle={{ width: '8rem' }}
              toStyle={{ width: '8rem', marginLeft: '10px' }}
              setValues={setInfluencer}
            />
          </Box>
          <Box sx={{ minWidth: '150px' }}>
            <FltInfluencerGenre
              clearFlag={clearFlag}
              tip={Lang[locale].caption.type}
              icon={false}
              values={Constants.campaignTypes}
              setValues={setInfluencer}
            />
          </Box>
          <Box sx={{ width: '19em' }}>
            <FltInfluencerTag clearFlag={clearFlag} setValues={setInfluencer} />
          </Box>
          <Box sx={{ width: '250px' }}>
            <FltInfluencerMemo
              clearFlag={clearFlag}
              tip={Lang[locale].caption.freeWord}
              icon={true}
              caption={Lang[locale].caption.memo_tip}
              phstr="Any"
              setValues={setInfluencer}
            />
          </Box>
        </Box>
        <Box>
          <Box>
            <FltInfluencerUsername
              type="instagram"
              clearFlag={clearFlag}
              tip={Lang[locale].caption.username}
              phstr="@username"
              setValues={setInfluencer}
            />
          </Box>
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
              <FltAudienceCity
                clearFlag={clearFlag}
                tip={Lang[locale].caption.audiencelocation}
                phstr="フォロワーの地域"
                icon={false}
                caption={Lang[locale].caption.other_tip}
                setValues={setAudience}
                options={
                  [
                    '62cea9d8ab0ce0f713527f49',
                    '62f1c42ed2c300db0abbe8b5',
                  ].includes(userInfo?.id)
                    ? [...audienceLocations, ...audienceLocationsAdditions]
                    : [
                        '61be26c840a8daea0c2e642a',
                        '62358060ef457bfa3d6b9989',
                      ].includes(userInfo?.id)
                    ? [
                        ...audienceLocations,
                        ...audienceLocationsAdditions2,
                        ...audienceLocationsAdditions3,
                      ]
                    : ['61ef78e52f67a0525621ab21'].includes(userInfo?.id)
                    ? [...audienceLocations, ...audienceLocationsAdditions2]
                    : ['6307d2f3c3f35cc77b1ab146'].includes(userInfo?.id)
                    ? [...audienceLocations, ...audienceLocationsAdditions7]
                    : ['6329719fb49b682b7854fb89'].includes(userInfo?.id)
                    ? [...audienceLocations, ...audienceLocationsAdditions5]
                    : audienceLocations
                }
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
            />
          </Box>
          <Box sx={{ width: '18rem !important' }}>
            <FltAudienceHobby
              clearFlag={clearFlag}
              tip={Lang[locale].caption.interest}
              icon={true}
              values={rest.interests}
              itmKey="id"
              itmValue="name"
              caption={Lang[locale].caption.infu_interest_tip}
              setValues={setAudience}
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
            />
          </Box>
        </Box>
      </Box>
      <Box className="search-box">
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="body1">{lang[locale].feed.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexShrink: 0 }}>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip={lang[locale].feed.reachNumber}
                  icon={false}
                  phstr={lang[locale].feed.reachNumber}
                  setValues={setFeedFilter}
                  field="rich"
                />
              </Box>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip={lang[locale].feed.reach}
                  icon={false}
                  phstr={lang[locale].feed.reach}
                  setValues={setFeedFilter}
                  field="richper"
                />
              </Box>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip={lang[locale].feed.saveNumber}
                  icon={false}
                  phstr={lang[locale].feed.saveNumber}
                  setValues={setFeedFilter}
                  field="saving"
                />
              </Box>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip={lang[locale].feed.save}
                  icon={false}
                  phstr={lang[locale].feed.save}
                  setValues={setFeedFilter}
                  field="savingper"
                />
              </Box>
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
                  tip="ROAS"
                  icon={false}
                  phstr="ROAS"
                  setValues={setFeedFilter}
                  field="roas"
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2a-content"
            id="pane21a-header"
          >
            <Typography variant="body1">{lang[locale].story.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexShrink: 0 }}>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip={lang[locale].story.impNumber}
                  icon={false}
                  phstr={lang[locale].story.impNumber}
                  setValues={setStoryFilter}
                  field="inp"
                />
              </Box>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip={lang[locale].story.imp}
                  icon={false}
                  phstr={lang[locale].story.imp}
                  setValues={setStoryFilter}
                  field="inpper"
                />
              </Box>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip={lang[locale].story.linkClickNumber}
                  icon={false}
                  phstr={lang[locale].story.linkClickNumber}
                  setValues={setStoryFilter}
                  field="click"
                />
              </Box>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip={lang[locale].story.linkClick}
                  icon={false}
                  phstr={lang[locale].story.linkClick}
                  setValues={setStoryFilter}
                  field="clickper"
                />
              </Box>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip={lang[locale].story.stamp}
                  icon={false}
                  phstr={lang[locale].story.stamp}
                  setValues={setStoryFilter}
                  field="stamp"
                />
              </Box>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip={lang[locale].story.stampNumber}
                  icon={false}
                  phstr={lang[locale].story.stampNumber}
                  setValues={setStoryFilter}
                  field="stampper"
                />
              </Box>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip="ROAS"
                  icon={false}
                  phstr="ROAS"
                  setValues={setStoryFilter}
                  field="roas"
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel3a-content"
            id="pane31a-header"
          >
            <Typography variant="body1">{lang[locale].reel}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexShrink: 0 }}>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip={lang[locale].feed.reachNumber}
                  icon={false}
                  phstr={lang[locale].feed.reachNumber}
                  setValues={setRilFilter}
                  field="rich"
                />
              </Box>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip={lang[locale].feed.reach}
                  icon={false}
                  phstr={lang[locale].feed.reach}
                  setValues={setRilFilter}
                  field="richper"
                />
              </Box>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip={lang[locale].feed.saveNumber}
                  icon={false}
                  phstr={lang[locale].feed.saveNumber}
                  setValues={setRilFilter}
                  field="saving"
                />
              </Box>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip={lang[locale].feed.save}
                  icon={false}
                  phstr={lang[locale].feed.save}
                  setValues={setRilFilter}
                  field="savingper"
                />
              </Box>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip="EG%"
                  icon={false}
                  phstr="EG%"
                  setValues={setRilFilter}
                  field="eg"
                />
              </Box>
              <Box>
                <FltInsightTextField
                  clearFlag={clearFlag}
                  tip="ROAS"
                  icon={false}
                  phstr="ROAS"
                  setValues={setRilFilter}
                  field="roas"
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
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
            {Lang[locale].caption.clearall}
          </Button>
          <Button
            className="active"
            variant={'outlined'}
            sx={{ marginLeft: '15px' }}
            startIcon={<SearchIcon />}
            onClick={searchClicked}
          >
            {Lang[locale].caption.search}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
