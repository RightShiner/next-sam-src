import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import RoundInfo from 'components/RoundInfo';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import { getMatchInterests, getMatchLocations } from 'constants/constants';
import { useRouter } from 'next/router';

const lang = {
  jp: {
    title: 'フォロワーデータ',
    titleInfo: 'インフルエンサーをフォローしている人のデータ。',
    activeRate: 'アクティブ率',
    activeRateInfo:
      'フォロワーの実在率(もしくはアクティブ率)。70%を下回ると広告効果に影響をもたらすので注意です。',
    locationByCountry: '国',
    locationByCountryInfo: 'フォロワーがどこの国にいるのか。',
    locationByCity: '都市',
    locationByCityInfo: 'フォロワーがどこの都市にいるのか。',
    genderSplit: '男女比',
    genderSplitInfo: 'フォロワーの男女比率。',
    male: '男',
    female: '女',
    ageAndGenderSplit: '年代別男女比',
    ageAndGenderSplitInfo: 'フォロワーの年代別男女比率。',
    brandAffinity: 'ブランド属性',
    brandAffinityInfo:
      '独自のアルゴリズムにより、ユーザー(フォロワー)が好む傾向にあるブランドを算出しています。そ􏰀インフルエンサーがどんな投稿をすることを好むのかを判断する時に有効です。',
    interests: '興味',
    interestsInfo:
      'フォロワーがどんな物事に興味関心を抱いているか。フォロワーが「いいねしている投稿」「フォローしているアカウント」「投稿内容」などから、総合的に独自のアルゴリズムで測っています。',
  },
  en: {
    title: 'Audience data by followers',
    titleInfo: 'Data of people who follow an influencer.',
    activeRate: 'Audience Credibility',
    activeRateInfo:
      'Does this influencer have real audience? Less than 75% is typically a sign of fraud.',
    locationByCountry: 'Location by country',
    locationByCountryInfo:
      "This indicates the countries the influencer's audience is located in.",
    locationByCity: 'Location by city',
    locationByCityInfo:
      "This indicates the cities the influencer's audience is located in.",
    genderSplit: 'Gender Split',
    genderSplitInfo: 'What gender categories does the influencer reach?',
    male: 'Male',
    female: 'Female',
    ageAndGenderSplit: 'Age and gender split',
    ageAndGenderSplitInfo:
      'A breakdown of the age and gender an influencer reaches.',
    brandAffinity: 'Brand Affinity',
    brandAffinityInfo:
      'Brand affinity shows which brands the audience frequently interacts with on Instagram.',
    interests: 'Interests',
    interestsInfo:
      'These are the topics the audience posts about and interacts with the most often.',
  },
};

const useStyles = makeStyles({
  audiencedata: {
    marginTop: '2rem',
  },

  fontsize12: {
    fontSize: '12px',
  },
});

const AudienceData = ({ data }) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });

  const getMaleOrFemale = (isMale) => {
    if (!data?.genders || data?.genders.length !== 2) return 0;

    if (data?.genders[0].code === 'MALE') {
      if (isMale) return data?.genders[0].weight;
      else return data?.genders[1].weight;
    } else {
      if (isMale) return data?.genders[1].weight;
      else return data?.genders[0].weight;
    }
  };

  const getDistinctCities = () => {
    if (!data?.geoCities || data?.geoCities.length < 1) return [];

    let topThree = [],
      jpName = '';
    for (let _itm of data?.geoCities) {
      jpName = getMatchLocations(_itm.name);

      if (topThree.findIndex((itm) => itm.name === jpName) === -1)
        topThree.push({ name: jpName, weight: _itm.weight });

      if (topThree.length === 3) break;
    }

    return topThree;
  };

  return (
    <Box className={classes.audiencedata}>
      <Box
        sx={{
          display: 'flex',
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '.5rem',
        }}
      >
        <span style={{ fontWeight: '600' }}>{lang[locale].title}</span>
        <RoundInfo
          sx={{ marginLeft: '.5rem' }}
          caption={lang[locale].titleInfo}
        />
      </Box>

      <Box className="wrapper-grid" sx={{ gridTemplateColumns: '1fr 1fr' }}>
        <Box className="grid-item">
          <img
            src={'/images/svgs/detailfollowers.svg'}
            className="mgr5"
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
        <Box
          className="box-wrapper-shadow grid-item"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            fill="none"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.48 11.95c.17.02.34.05.52.05 2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4c0 .18.03.35.05.52l3.43 3.43zm2.21 2.21l5.74 5.74c.33-.17.57-.5.57-.9v-1c0-2.14-3.56-3.5-6.31-3.84zM2.12 2.42A.996.996 0 10.71 3.83L4 7.12V10H2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2.88l2.51 2.51C9.19 15.11 7 16.3 7 18v1c0 .55.45 1 1 1h8.88l3.29 3.29a.996.996 0 101.41-1.41L2.12 2.42zM6 10v-.88l.88.88H6z"
              fill="#FA8F38"
            ></path>
          </svg>
          <Box
            className="subtitle"
            style={{ fontSize: '30px !import' }}
          >{`${formatter.format((data?.credibility ?? 0) * 100)}%`}</Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <span>{lang[locale].activeRate}</span>
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].activeRateInfo}
            />
          </Box>
        </Box>
      </Box>

      <Box
        className="wrapper-grid"
        sx={{ gridTemplateColumns: '1fr 1fr', marginTop: '.5rem' }}
      >
        <Box className="box-wrapper-shadow grid-item leftalign">
          <Box className="subtitle1" sx={{ display: 'flex' }}>
            {lang[locale].locationByCountry}
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].locationByCountryInfo}
            />
          </Box>
          {_.map(
            data?.geoCountries,
            (itm, idx) =>
              idx < 3 && (
                <Box key={idx}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '30px',
                    }}
                  >
                    <span>{itm.name}</span>
                    <span>{`${formatter.format(itm.weight * 100)}%`}</span>
                  </Box>
                  <Box className="ui-bar-comp">
                    <Box
                      className="ui-bar-progress"
                      sx={{ width: `${itm.weight * 100}%` }}
                    ></Box>
                  </Box>
                </Box>
              ),
          )}
        </Box>
        <Box className="box-wrapper-shadow grid-item leftalign">
          <Box className="subtitle1" sx={{ display: 'flex' }}>
            {lang[locale].locationByCity}
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].locationByCityInfo}
            />
          </Box>
          {_.map(getDistinctCities(), (itm, idx) => (
            <Box key={idx}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '30px',
                }}
              >
                <span>{itm.name}</span>
                <span>{`${formatter.format(itm.weight * 100)}%`}</span>
              </Box>
              <Box className="ui-bar-comp">
                <Box
                  className="ui-bar-progress"
                  sx={{ width: `${itm.weight * 100}%` }}
                ></Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        className="wrapper-grid"
        sx={{ gridTemplateColumns: '1fr 2fr', marginTop: '.5rem' }}
      >
        <Box className="box-wrapper-shadow grid-item">
          <Box>
            <Box className="subtitle1" sx={{ display: 'flex' }}>
              {lang[locale].genderSplit}
              <RoundInfo
                sx={{ marginLeft: '.5rem' }}
                caption={lang[locale].genderSplitInfo}
              />
            </Box>
            <svg
              viewBox="0 0 160 160"
              style={{ width: '90px', height: '90px' }}
            >
              <g>
                <circle
                  className="ui-pie-male"
                  cx="80"
                  cy="80"
                  r="60"
                  strokeDasharray="376.99111843077515"
                  transform="rotate(0, 80, 80)"
                  fill="transparent"
                ></circle>
              </g>
              <g>
                <circle
                  className="ui-pie-female"
                  cx="80"
                  cy="80"
                  r="60"
                  strokeDasharray="376.99111843077515"
                  strokeDashoffset={`${getMaleOrFemale(true) * 365}`}
                  transform="rotate(0, 80, 80)"
                  fill="transparent"
                ></circle>
              </g>
            </svg>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#1377EB',
                }}
              ></Box>
              <span style={{ marginLeft: '.5rem' }}>{lang[locale].male}</span>
              <span style={{ marginLeft: 'auto' }}>{`${formatter.format(
                getMaleOrFemale(true) * 100,
              )}%`}</span>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#C48BFF',
                }}
              ></Box>
              <span style={{ marginLeft: '.5rem' }}>{lang[locale].female}</span>
              <span style={{ marginLeft: 'auto' }}>{`${formatter.format(
                getMaleOrFemale(false) * 100,
              )}%`}</span>
            </Box>
          </Box>
        </Box>
        <Box className="box-wrapper-shadow grid-item">
          <Box className="subtitle1" sx={{ display: 'flex' }}>
            {lang[locale].ageAndGenderSplit}
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].ageAndGenderSplitInfo}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            {_.map(data?.gendersPerAge, (itm, idx) => (
              <Box key={idx} className="bar-chat-item">
                <Box sx={{ display: 'flex' }}>
                  <Box className="bar-chat-candle">
                    <Box
                      className="bar-candle first"
                      sx={{ height: `${itm.female * 100}%` }}
                    ></Box>
                    <Box className="bar-candle-caption">{`${formatter.format(
                      itm.female * 100,
                    )}%`}</Box>
                  </Box>
                  <Box className="bar-chat-candle">
                    <Box
                      className="bar-candle second"
                      sx={{ height: `${itm.male * 100}%` }}
                    ></Box>
                    <Box className="bar-candle-caption">{`${formatter.format(
                      itm.male * 100,
                    )}%`}</Box>
                  </Box>
                </Box>
                <Box>{itm.code}</Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        className="wrapper-grid"
        sx={{ gridTemplateColumns: '1fr 1fr', marginTop: '.5rem' }}
      >
        <Box className="box-wrapper-shadow grid-item leftalign">
          <Box className="subtitle1" sx={{ display: 'flex' }}>
            {lang[locale].brandAffinity}
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].brandAffinityInfo}
            />
          </Box>
          {_.map(
            data?.brandAffinity,
            (itm, idx) =>
              idx < 5 && (
                <Box
                  key={idx}
                  className="interest-span"
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span>{itm.name}</span>
                  <span>{`${formatter.format(itm.weight * 100)}%`}</span>
                </Box>
              ),
          )}
        </Box>
        <Box className="box-wrapper-shadow grid-item leftalign">
          <Box className="subtitle1" sx={{ display: 'flex' }}>
            {lang[locale].interests}
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].interestsInfo}
            />
          </Box>
          {_.map(
            data?.interests,
            (itm, idx) =>
              idx < 5 && (
                <Box
                  key={idx}
                  className="interest-span"
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span>{getMatchInterests(itm.name)}</span>
                  <span>{`${formatter.format(itm.weight * 100)}%`}</span>
                </Box>
              ),
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AudienceData;
