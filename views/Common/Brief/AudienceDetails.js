import _ from 'lodash';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RoundInfo from 'components/RoundInfo';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import {
  evaluateValue,
  getMatchInterests,
  getMatchLocations,
} from 'constants/constants';
import { useRouter } from 'next/router';

const lang = {
  en: {
    followerAnalysis: 'Follower analysis',
    followerAnalysisInfo: 'For more information, please see "Full Report".',
    activeRate: 'Active rate',
    activeRateInfo:
      'Actual percentage of followers (active percentage). Accounts with no activity within a month are considered inactive. Please note that if it is less than 70%, it will affect the advertising effect.',
    genderRatio: 'Gender ratio',
    genderRatioInfo: "Male to female ratio of the influencer's followers.",
    male: 'Male',
    female: 'Female',
    country: 'Country',
    countryInfo: 'Which country or city are your followers in? ',
    city: 'City',
    genderAgeRatio: 'Gender ratio by age',
    genderAgeRatioInfo: 'Gender ratio of followers by age group.',
    popular: 'Popular # and @',
    popularInfo: 'Hashtags and mentions frequently used by influencers.',
    hashtagEngagement: 'Hashtag engagement',
    hashtagEngagementInfo:
      'What hashtags do you post with more reactions from your followers?',
    similar: 'Similar account',
    similarInfo: 'Accounts with similar followers',
    interest: 'Interest',
    interestInfo:
      'What are your followers interested in? It is comprehensively measured by a unique algorithm based on "posts liked", "accounts followed", "posted content", etc.',
  },
  jp: {
    followerAnalysis: 'フォロワー分析',
    followerAnalysisInfo:
      'もっと詳しく知りたい場合は「フルレポート」をご覧ください。',
    activeRate: 'アクティブ率',
    activeRateInfo:
      'フォロワーの実在率(アクティブ率)。1ヶ月以内に動きがないアカウントを非アクティブと見なしています。70%を下回ると広告効果に影響をもたらすので注意です。',
    genderRatio: '男女比',
    genderRatioInfo: 'インフルエンサーのフォロワーの男女比率。',
    male: '男',
    female: '女',
    country: '国',
    countryInfo: 'フォロワーがどこの国や都市にいるのか。',
    city: '都市',
    genderAgeRatio: '年代別男女比',
    genderAgeRatioInfo: 'フォロワーの年代別男女比率。',
    popular: '人気の#と@',
    popularInfo:
      'インフルエンサ―が頻繁に使用しているハッシュタグとメンション。',
    hashtagEngagement: 'ハッシュタグエンゲージメント',
    hashtagEngagementInfo:
      'どのハッシュタグをつけた際の投稿が、フォロワーからよりリアクションされているか。',
    similar: '類似アカウント',
    similarInfo: '似たフォロワーをもつアカウント',
    interest: '興味',
    interestInfo:
      'フォロワーがどんな物事に興味関心を抱いているか。フォロワーが「いいねしている投稿」「フォローしているアカウント」「投稿内容」などから、総合的に独自のアルゴリズムで測っています。',
  },
};

const AudienceDetails = ({
  data,
  lookalikes,
  hashtags,
  mentions,
  hashtagengage,
}) => {
  const { locale } = useRouter();
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

      if (topThree.findIndex((itm) => itm === jpName) === -1)
        topThree.push(jpName);

      if (topThree.length === 3) break;
    }

    return topThree;
  };

  return (
    <Box className="audiencedetails">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <svg
          fill="none"
          height="11"
          viewBox="0 0 15 11"
          width="15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.25 5.5C6.6975 5.5 7.875 4.26643 7.875 2.75C7.875 1.23357 6.6975 0 5.25 0C3.8025 0 2.625 1.23357 2.625 2.75C2.625 4.26643 3.8025 5.5 5.25 5.5ZM5.25 1.57143C5.8725 1.57143 6.375 2.09786 6.375 2.75C6.375 3.40214 5.8725 3.92857 5.25 3.92857C4.6275 3.92857 4.125 3.40214 4.125 2.75C4.125 2.09786 4.6275 1.57143 5.25 1.57143ZM5.25 6.875C3.495 6.875 0 7.79429 0 9.625V10.2143C0 10.6464 0.3375 11 0.75 11H9.75C10.1625 11 10.5 10.6464 10.5 10.2143V9.625C10.5 7.79429 7.005 6.875 5.25 6.875ZM1.755 9.42857C2.385 8.97286 3.9075 8.44643 5.25 8.44643C6.5925 8.44643 8.115 8.97286 8.745 9.42857H1.755ZM10.53 6.92214C11.4 7.58214 12 8.46214 12 9.625V11H14.25C14.6625 11 15 10.6464 15 10.2143V9.625C15 8.03786 12.375 7.13429 10.53 6.92214ZM9.75 5.5C11.1975 5.5 12.375 4.26643 12.375 2.75C12.375 1.23357 11.1975 0 9.75 0C9.345 0 8.97 0.102143 8.625 0.275C9.0975 0.974286 9.375 1.83071 9.375 2.75C9.375 3.66929 9.0975 4.52571 8.625 5.225C8.97 5.39786 9.345 5.5 9.75 5.5Z"
            fill="#000"
          ></path>
        </svg>
        <span>{lang[locale].followerAnalysis}</span>
        <RoundInfo
          sx={{ marginLeft: '.5rem' }}
          caption={lang[locale].followerAnalysisInfo}
        />
      </Box>
      <Box className="wrapper-grid" sx={{ gridTemplateColumns: '1fr 1fr' }}>
        <Box>
          <Box
            className="box-wrapper-shadow grid-item"
            sx={{
              marginBottom: '.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
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
            <Box className="subtitle">{`${formatter.format(
              (data?.credibility ?? 0) * 100,
            )}%`}</Box>
            <span>{lang[locale].activeRate}</span>
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].activeRateInfo}
            />
          </Box>
          <Box className="box-wrapper-shadow grid-item">
            <Box sx={{ display: 'flex' }}>
              <Box className="subtitle1">{lang[locale].genderRatio}</Box>
              <RoundInfo
                sx={{ marginLeft: '.5rem' }}
                caption={lang[locale].genderRatioInfo}
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
                className="ui-pie-male-bk"
                sx={{ width: '8px', height: '8px', borderRadius: '50%' }}
              ></Box>
              <span style={{ marginLeft: '.5rem' }}>{lang[locale].male}</span>
              <span style={{ marginLeft: 'auto' }}>{`${formatter.format(
                getMaleOrFemale(true) * 100,
              )}%`}</span>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                className="ui-pie-female-bk"
                sx={{ width: '8px', height: '8px', borderRadius: '50%' }}
              ></Box>
              <span style={{ marginLeft: '.5rem' }}>{lang[locale].female}</span>
              <span style={{ marginLeft: 'auto' }}>{`${formatter.format(
                getMaleOrFemale(false) * 100,
              )}%`}</span>
            </Box>
          </Box>
        </Box>
        <Box className="box-wrapper-shadow grid-item">
          <Box sx={{ display: 'flex' }}>
            <Box className="subtitle1">{lang[locale].country}</Box>
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].countryInfo}
            />
          </Box>
          <Box sx={{ marginTop: '30px' }} />
          {_.map(
            data?.geoCountries,
            (country, idx) =>
              idx < 3 && (
                <Box key={idx}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>{country.name}</span>
                    <span>{`${formatter.format(country.weight * 100)}%`}</span>
                  </Box>
                  <Box className="ui-bar-comp">
                    <Box
                      className="ui-bar-progress"
                      sx={{ width: `${country.weight * 100}%` }}
                    ></Box>
                  </Box>
                </Box>
              ),
          )}
          <Box
            sx={{ display: 'flex', marginTop: '30px', marginBottom: '10px' }}
          >
            <Box className="subtitle2">{lang[locale].city} TOP3</Box>
          </Box>
          {_.map(getDistinctCities(), (city, idx) => (
            <Box key={idx} sx={{ display: 'flex' }}>
              <span>{`${idx + 1}. ${city}`}</span>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="wrapper-box box-wrapper-shadow">
        <Box sx={{ display: 'flex' }}>
          <Box className="subtitle1">{lang[locale].genderAgeRatio}</Box>
          <RoundInfo
            sx={{ marginLeft: '.5rem' }}
            caption={lang[locale].genderAgeRatioInfo}
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
            <Box className="bar-chat-item" key={idx}>
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
      {
        <Box className="wrapper-box box-wrapper-shadow">
          <Box sx={{ display: 'flex' }}>
            <Box className="subtitle1">{lang[locale].popular}</Box>
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].popularInfo}
            />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <>
              {_.map(
                hashtags,
                (itm, idx) =>
                  idx < 4 && (
                    <Box
                      key={idx}
                      className="genre-span"
                      sx={{ fontSize: '0.8rem' }}
                    >
                      #{`${itm.tag}`}
                    </Box>
                  ),
              )}
              {_.map(
                mentions,
                (itm, idx) =>
                  idx < 4 && (
                    <Box
                      key={idx}
                      className="genre-span"
                      sx={{ fontSize: '0.8rem' }}
                    >
                      @{`${itm.tag}`}
                    </Box>
                  ),
              )}
            </>
          </Box>
        </Box>
      }
      <Box className="wrapper-box box-wrapper-shadow">
        <Box sx={{ display: 'flex' }}>
          <Box className="subtitle1">{lang[locale].hashtagEngagement}</Box>
          <RoundInfo
            sx={{ marginLeft: '.5rem' }}
            caption={lang[locale].hashtagEngagementInfo}
          />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {_.map(
            _.orderBy(hashtagengage, ['weight'], ['desc']),
            (itm, idx) =>
              idx < 9 && (
                <Box
                  key={idx}
                  className="genre-span"
                  sx={{ fontSize: '0.8rem' }}
                >
                  #{`${itm.tag}`}
                </Box>
              ),
          )}
        </Box>
      </Box>
      {lookalikes && lookalikes.length > 0 && (
        <Box className="wrapper-box box-wrapper-shadow">
          <Box sx={{ display: 'flex' }}>
            <Box className="subtitle1">{lang[locale].similar}</Box>
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].similarInfo}
            />
          </Box>
          {_.map(
            lookalikes,
            (itm, idx) =>
              idx < 7 && (
                <Box key={idx}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      className="mgr5"
                      component={LazyLoadImage}
                      effect="blur"
                      src={itm.picture}
                      width={'18px'}
                      height={'18px'}
                      sx={{ borderRadius: '50%', marginTop: '.5rem' }}
                    />
                    <Box
                      className="influencer-header-name text-ellipse text-width-150"
                      component="a"
                      href={itm.url}
                    >
                      @{itm.username}
                    </Box>
                  </Box>
                  {/* <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Button variant={'outlined'} className='alike-btn'>
                  <svg fill="none" height="16" width="16" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M12.67 12l1.33.67V2c0-.73-.6-1.33-1.33-1.33H5.99c-.73 0-1.32.6-1.32 1.33h6.66c.74 0 1.34.6 1.34 1.33V12zM10 3.33H3.33C2.6 3.33 2 3.93 2 4.67v10.66l4.67-2 4.66 2V4.67c0-.74-.6-1.34-1.33-1.34z"></path>
                  </svg>
                </Button>
                <Button variant={'outlined'} className='alike-btn' sx={{marginLeft:'.5rem'}}>
                  <svg fill="none" height="16" width="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 11h-.79l-.28-.27a6.5 6.5 0 001.48-5.34c-.47-2.78-2.79-5-5.59-5.34A6.505 6.505 0 00.05 7.32c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 005.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L12.5 11zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z"></path>
                  </svg>
                </Button>
              </Box> */}
                </Box>
              ),
          )}
        </Box>
      )}
      <Box className="wrapper-box box-wrapper-shadow">
        <Box sx={{ display: 'flex' }}>
          <Box className="subtitle1">{lang[locale].interest}</Box>
          <RoundInfo
            sx={{ marginLeft: '.5rem' }}
            caption={lang[locale].interestInfo}
          />
        </Box>
        {_.map(
          data?.interests,
          (itm, idx) =>
            idx < 5 && (
              <Box key={idx} className="interest-span">
                {getMatchInterests(itm.name)}
              </Box>
            ),
        )}
      </Box>
    </Box>
  );
};

export default AudienceDetails;
