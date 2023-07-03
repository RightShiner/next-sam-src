import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import RoundInfo from 'components/RoundInfo';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { getMatchInterests, getMatchLocations } from 'constants/constants';
import { useRouter } from 'next/router';

const lang = {
  jp: {
    title: 'いいねをしてくれた人のデータ',
    titleInfo: 'インフルエンサーの投稿に「いいね」したユーザーのデータです。',
    error:
      '現在、データの表示に問題があります。\r\n数日中に改善されますので、いましばらくお待ちください。',
    activeRate: 'いいねのアクティブ率',
    activeRateInfo:
      'いいねの信憑性。botなどによってのいいねを獲得しているインフルエンサーもいるので、著しく低い場合は要注意です。',
    nonFollowerLikes: 'フォロワー外からのいいね',
    nonFollowerLikesInfo:
      'この数値が高いほど、このインフルエンサ―の投稿は既存のフォロワーの外部に拡散されやすい傾向にあります。',
    locationByCountry: '国',
    locationByCountryInfo:
      'インフルエンサーの投稿にいいねしたユーザーがどこの国にいつのか',
    locationByCity: '都市',
    locationByCityInfo:
      'インフルエンサーの投稿にいいねしたユーザーがどこの都市にいるのか',
    genderSplit: '男女比',
    genderSplitInfo: 'インフルエンサーの投稿にいいねしたユーザーの男女比率',
    male: '男',
    female: '女',
    ageAndGenderSplit: '年代別男女比',
    ageAndGenderSplitInfo:
      'インフルエンサーの投稿にいいねしたユーザーの年代別男女比率',
    brandAffinity: 'ブランド属性',
    brandAffinityInfo:
      'インフルエンサーの投稿にいいねしたユーザーが好むブランドの系統を表しています。どういった種類のPRを依頼したらそのインフルエンサーに共感しやすいユーザーがCVしやすいかを算出する指標です。',
    interests: '興味',
    interestsInfo:
      'インフルエンサーの投稿にいいねしたユーザーがどんな物事に興味関心を抱いているか。フォロワーが「いいねしている投稿」「フォローしているアカウント」「投稿内容」などから、総合的に独自のアルゴリズムで測っています。',
  },
  en: {
    title: 'Audience data by likes',
    titleInfo: "Data of users who liked an influencer's post.",
    error:
      'We are currently having trouble displaying the data. \r\nIt will be improved in a few days, so please wait for a while.',
    activeRate: 'Likers Credibility',
    activeRateInfo:
      'Is this influencer purchasing likes? If an influencer has low likers credibility, they are trying to fake a high engagement rate.',
    nonFollowerLikes: 'Likes from non followers',
    nonFollowerLikesInfo:
      'The higher this number is, the more effective this influencer is at reaching outside of their existing audience and could be a sign of "viral" potential.',
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
  audiencelikes: {
    marginTop: '2rem',
  },

  fontsize12: {
    fontSize: '12px',
  },
});

const AudienceLikes = ({ data }) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });

  const getMaleOrFemale = (isMale) => {
    if (!data.genders || data.genders.length !== 2) return 0;

    if (data.genders[0].code === 'MALE') {
      if (isMale) return data.genders[0].weight;
      else return data.genders[1].weight;
    } else {
      if (isMale) return data.genders[1].weight;
      else return data.genders[0].weight;
    }
  };

  return (
    <Box className={classes.audiencelikes}>
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
      {!data.credibility && !data.nonFollowerLikes && !data.geoCountries ? (
        <Box
          sx={{ whiteSpace: 'pre-wrap', textAlign: 'center', color: '#888' }}
        >
          {lang[locale].error}
        </Box>
      ) : (
        <>
          <Box
            className="wrapper-grid"
            sx={{ gridTemplateColumns: '2fr 1fr 1fr' }}
          >
            <Box className="grid-item">
              <img
                src={'/images/svgs/detaillikes.svg'}
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
                height="16"
                width="18"
                fill="none"
                viewBox="0 0 18 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.2143 15.5319C9.53055 16.1575 8.47795 16.1575 7.79422 15.5229L7.69526 15.4322C2.97207 11.1255 -0.113742 8.30573 0.00321271 4.78783C0.057192 3.24649 0.839891 1.76861 2.1084 0.8982C4.48349 -0.733813 7.41636 0.0277934 8.99975 1.89554C10.5831 0.0277934 13.516 -0.74288 15.8911 0.8982C17.1596 1.76861 17.9423 3.24649 17.9963 4.78783C18.1222 8.30573 15.0274 11.1255 10.3043 15.4503L10.2143 15.5319Z"
                  fill="#e88585"
                ></path>
              </svg>
              <Box className="subtitle">{`${formatter.format(
                (data.credibility ?? 0) * 100,
              )}%`}</Box>
              <span>{lang[locale].activeRate}</span>
              <RoundInfo
                sx={{ marginLeft: '.5rem' }}
                caption={lang[locale].activeRateInfo}
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
              <Box
                className="subtitle"
                sx={{ marginTop: '1rem' }}
              >{`${formatter.format(
                (data.nonFollowerLikes ?? 0) * 100,
              )}%`}</Box>
              <span>{lang[locale].nonFollowerLikes}</span>
              <RoundInfo
                sx={{ marginLeft: '.5rem' }}
                caption={lang[locale].nonFollowerLikesInfo}
              />
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
                data.geoCountries,
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
              {_.map(
                data.geoCities,
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
                        <span>{getMatchLocations(itm.name)}</span>
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
                  <span style={{ marginLeft: '.5rem' }}>
                    {lang[locale].male}
                  </span>
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
                  <span style={{ marginLeft: '.5rem' }}>
                    {lang[locale].female}
                  </span>
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
                {_.map(data.gendersPerAge, (itm, idx) => (
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
                data.brandAffinity,
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
                data.interests,
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
        </>
      )}
    </Box>
  );
};

export default AudienceLikes;
