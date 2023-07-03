import React from 'react';
import Box from '@mui/material/Box';
import RoundInfo from 'components/RoundInfo';
import { evaluateValue } from 'constants/constants';
import { useRouter } from 'next/router';

const lang = {
  en: {
    avgLikes: 'AVG LIKES',
    avgLikesInfo: 'The average sum of likes on the last 30 posts.',
    followers: 'FOLLOWERS',
    followersInfo: 'How many total followers the influencer has on Instagram.',
    engagement: 'ENGAGEMENT RATE',
    engagementInfo:
      'This is an indication of how engaged the influencer’s audience is. It is calculated as likes, comments etc. ÷ followers. The average Instagram engagement rate is 2%.',
    prPerformances: 'PAID POST PERFORMANCE',
    prPerformancesInfo:
      'If this influencer has indicated sponsored posts, paid post performance shows how well that content performs compared to normal content on their account.',
    followerAnalysis: 'Audience Details',
    followerAnalysisInfo:
      'This is what the audience of this profile looks like. To get a more detailed overview, Click “View full report” above.',
    activeRate: 'REAL FOLLOWERS',
    activeRateInfo:
      'Does this influencer have a real audience? Less than 70% of real followers is typically a sign of fraud.',
    genderRatio: 'Gender Split',
    genderRatioInfo: 'What gender categories does the influencer reach?',
    male: 'Male',
    female: 'Female',
    country: 'Location by Country',
    countryInfo:
      'This indicates the counties the influencer’s audience is located in.',
    cityTop3: 'Location by City',
    genderAgeRatio: 'Age and Gender Split',
    genderAgeRatioInfo:
      'A breakdown of the age and gender an influencer reaches.',
    popularTagsAndMentions: 'Popular # and @',
    popularTagsAndMentionsInfo:
      'These are the hashtags and other users that are frequently adding to their content.',
    hashtagEngagement: 'Hashtag Engagement',
    hashtagEngagementInfo:
      'What hashtags are the followers reacting to when the influencer post?',
  },
  jp: {
    avgLikes: '平均いいね',
    avgLikesInfo: '直近30投稿の平均いいね。',
    followers: 'フォロワー',
    followersInfo: '合計フォロワー数。',
    engagement: 'エンゲージメント',
    engagementInfo:
      '直近10投稿のエンゲージメント。エンゲージメント率は「(いいね＋コメント)÷フォロワー」で算出しています。Instagramの平均エンゲージメント率は2%です。',
    prPerformances: 'PRパフォーマンス',
    prPerformancesInfo: 'タイアップ投稿をした際のエンゲージメント率。',
    followerAnalysis: '登録者分析',
    followerAnalysisInfo:
      'プロフィール内のキーワードでインフルエンサーを検索します。',
    activeRate: 'アクティブ率',
    activeRateInfo:
      'フォロワーの実在率(もしくはアクティブ率)。70%を下回ると広告効果に影響をもたらすので注意です。',
    genderRatio: '男女比',
    genderRatioInfo: 'インフルエンサーがリーチできるフォロワーの男女比率。',
    male: '男',
    female: '女',
    country: '国',
    countryInfo: 'フォロワーがどこの国や都市にいるのか。',
    cityTop3: '都市 TOP3',
    genderAgeRatio: '年代別男女比',
    genderAgeRatioInfo:
      'インフルエンサーがリーチできるフォロワーの年代別男女比。',
    popularTagsAndMentions: '人気の#と@',
    popularTagsAndMentionsInfo: '投稿に頻繁に使用されている#と@。',
    hashtagEngagement: 'ハッシュタグエンゲージメント',
    hashtagEngagementInfo:
      'どのハッシュタグをつけた際の投稿がフォロワーからリアクションされているか。',
  },
};

const InfluencerBriefOverflow = ({ data }) => {
  const { locale } = useRouter();
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });
  return (
    <Box>
      <Box className="lastupdates">
        <Box
          className="wrapper-grid"
          sx={{
            gridTemplateColumns: `${
              data.paidPostPerformance ? '1fr 1fr' : '1fr 1fr 1fr'
            }`,
          }}
        >
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
            <Box className="subtitle">{evaluateValue(data.avgLikes ?? 0)}</Box>
            <span className="subtitle-help">{lang[locale].avgLikes}</span>
            <RoundInfo caption={lang[locale].avgLikesInfo} />
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
              height="14"
              viewBox="0 0 22 14"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 6C16.66 6 17.99 4.66 17.99 3C17.99 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 4.66 13.34 6 15 6ZM7 6C8.66 6 9.99 4.66 9.99 3C9.99 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3C4 4.66 5.34 6 7 6ZM7 8C4.67 8 0 9.17 0 11.5V13C0 13.55 0.45 14 1 14H13C13.55 14 14 13.55 14 13V11.5C14 9.17 9.33 8 7 8ZM15 8C14.71 8 14.38 8.02 14.03 8.05C14.05 8.06 14.06 8.08 14.07 8.09C15.21 8.92 16 10.03 16 11.5V13C16 13.35 15.93 13.69 15.82 14H21C21.55 14 22 13.55 22 13V11.5C22 9.17 17.33 8 15 8Z"
                fill="#447D91"
              ></path>
            </svg>
            <Box className="subtitle">
              {evaluateValue(data.profile.followers)}
            </Box>
            <span className="subtitle-help">{lang[locale].followers}</span>
            <RoundInfo caption={lang[locale].followersInfo} />
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
              height="11"
              width="24"
              viewBox="0 0 24 11"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.22.24c-2-.6-4.06-.04-5.39 1.29L12 4.04l-1.52 1.34h.01L7.8 7.77c-.81.81-1.95 1.15-3.12.92A3.354 3.354 0 012.11 6.2 3.39 3.39 0 015.4 2c.91 0 1.76.35 2.44 1.03l.47.41c.38.34.95.34 1.33 0 .45-.4.45-1.1 0-1.5l-.42-.36A5.37 5.37 0 005.4 0C2.42 0 0 2.42 0 5.38s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53L12 6.73l.01.01 1.51-1.36h-.01l2.69-2.39c.81-.81 1.95-1.15 3.12-.92 1.25.25 2.28 1.25 2.57 2.49a3.39 3.39 0 01-3.29 4.2c-.9 0-1.76-.35-2.44-1.03l-.48-.42a.995.995 0 00-1.33 0c-.45.4-.45 1.1 0 1.5l.42.37a5.386 5.386 0 003.82 1.57c3.27 0 5.86-2.9 5.33-6.25-.3-1.99-1.77-3.69-3.7-4.26z"
                fill="#61339C"
              ></path>
            </svg>
            <Box className="subtitle">{`${formatter.format(
              data.profile.engagementRate * 100,
            )}%`}</Box>
            <span className="subtitle-help">エンゲージメント</span>
            <RoundInfo
              caption={
                '直近10投稿のエンゲージメント。エンゲージメント率は「(いいね＋コメント)÷フォロワー」で算出しています。Instagramの平均エンゲージメント率は2%です。'
              }
            />
          </Box>
          {data.paidPostPerformance && (
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
                height="16"
                viewBox="0 0 18 16"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.76458 0.366293L5.30123 4.93919C5.00314 5.2446 4.83395 5.66557 4.83395 6.10305V14.3491C4.83395 15.2571 5.55904 16 6.44527 16H13.6962C14.3407 16 14.9208 15.6038 15.1786 15.0012L17.805 8.71968C18.4818 7.08532 17.3136 5.26937 15.5814 5.26937H11.0295L11.7948 1.48888C11.8754 1.07617 11.7546 0.655194 11.4645 0.358038C10.9892 -0.120713 10.2319 -0.120713 9.76458 0.366293ZM1.61132 16C2.49754 16 3.22263 15.2571 3.22263 14.3491V7.74567C3.22263 6.83769 2.49754 6.0948 1.61132 6.0948C0.725092 6.0948 0 6.83769 0 7.74567V14.3491C0 15.2571 0.725092 16 1.61132 16Z"
                  fill="#FA8F38"
                ></path>
              </svg>
              <Box className="subtitle">{`${formatter.format(
                data.paidPostPerformance * 100,
              )}%`}</Box>
              <span className="subtitle-help">
                {lang[locale].prPerformances}
              </span>
              <RoundInfo caption={lang[locale].prPerformancesInfo} />
            </Box>
          )}
        </Box>
      </Box>
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
              <Box className="subtitle" style={{ filter: 'blur(4px)' }}>
                23.5%
              </Box>
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
                style={{ width: '90px', height: '90px', filter: 'blur(4px)' }}
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
                    strokeDashoffset="234.7"
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
                <span style={{ marginLeft: 'auto', filter: 'blur(4px)' }}>
                  45.6%
                </span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  className="ui-pie-female-bk"
                  sx={{ width: '8px', height: '8px', borderRadius: '50%' }}
                ></Box>
                <span style={{ marginLeft: '.5rem' }}>
                  {lang[locale].female}
                </span>
                <span style={{ marginLeft: 'auto', filter: 'blur(4px)' }}>
                  45.6%
                </span>
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
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ filter: 'blur(4px)' }}>ABCDEFEE</span>
                <span style={{ filter: 'blur(4px)' }}>34.5%</span>
              </Box>
              <Box className="ui-bar-comp">
                <Box
                  className="ui-bar-progress"
                  sx={{ width: '84.6%', filter: 'blur(4px)' }}
                ></Box>
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ filter: 'blur(4px)' }}>ABCDEFEE</span>
                <span style={{ filter: 'blur(4px)' }}>34.5%</span>
              </Box>
              <Box className="ui-bar-comp">
                <Box
                  className="ui-bar-progress"
                  sx={{ width: '65.6%', filter: 'blur(4px)' }}
                ></Box>
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ filter: 'blur(4px)' }}>ABCDEFEE</span>
                <span style={{ filter: 'blur(4px)' }}>34.5%</span>
              </Box>
              <Box className="ui-bar-comp">
                <Box
                  className="ui-bar-progress"
                  sx={{ width: '32.6%', filter: 'blur(4px)' }}
                ></Box>
              </Box>
            </Box>
            <Box
              sx={{ display: 'flex', marginTop: '30px', marginBottom: '10px' }}
            >
              <Box className="subtitle2">{lang[locale].cityTop3}</Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <span style={{ filter: 'blur(4px)' }}>Tokyo</span>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <span style={{ filter: 'blur(4px)' }}>Osaka</span>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <span style={{ filter: 'blur(4px)' }}>Sapporo</span>
            </Box>
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
              filter: 'blur(4px)',
            }}
          >
            <Box className="bar-chat-item">
              <Box sx={{ display: 'flex' }}>
                <Box className="bar-chat-candle">
                  <Box
                    className="bar-candle first"
                    sx={{ height: '50%' }}
                  ></Box>
                  <Box className="bar-candle-caption">50%</Box>
                </Box>
                <Box className="bar-chat-candle">
                  <Box
                    className="bar-candle second"
                    sx={{ height: '50%' }}
                  ></Box>
                  <Box className="bar-candle-caption">50%</Box>
                </Box>
              </Box>
              <Box>ABC</Box>
            </Box>
            <Box className="bar-chat-item">
              <Box sx={{ display: 'flex' }}>
                <Box className="bar-chat-candle">
                  <Box
                    className="bar-candle first"
                    sx={{ height: '50%' }}
                  ></Box>
                  <Box className="bar-candle-caption">50%</Box>
                </Box>
                <Box className="bar-chat-candle">
                  <Box
                    className="bar-candle second"
                    sx={{ height: '50%' }}
                  ></Box>
                  <Box className="bar-candle-caption">50%</Box>
                </Box>
              </Box>
              <Box>ABC</Box>
            </Box>
            <Box className="bar-chat-item">
              <Box sx={{ display: 'flex' }}>
                <Box className="bar-chat-candle">
                  <Box
                    className="bar-candle first"
                    sx={{ height: '50%' }}
                  ></Box>
                  <Box className="bar-candle-caption">50%</Box>
                </Box>
                <Box className="bar-chat-candle">
                  <Box
                    className="bar-candle second"
                    sx={{ height: '50%' }}
                  ></Box>
                  <Box className="bar-candle-caption">50%</Box>
                </Box>
              </Box>
              <Box>ABC</Box>
            </Box>
            <Box className="bar-chat-item">
              <Box sx={{ display: 'flex' }}>
                <Box className="bar-chat-candle">
                  <Box
                    className="bar-candle first"
                    sx={{ height: '50%' }}
                  ></Box>
                  <Box className="bar-candle-caption">50%</Box>
                </Box>
                <Box className="bar-chat-candle">
                  <Box
                    className="bar-candle second"
                    sx={{ height: '50%' }}
                  ></Box>
                  <Box className="bar-candle-caption">50%</Box>
                </Box>
              </Box>
              <Box>ABC</Box>
            </Box>
            <Box className="bar-chat-item">
              <Box sx={{ display: 'flex' }}>
                <Box className="bar-chat-candle">
                  <Box
                    className="bar-candle first"
                    sx={{ height: '50%' }}
                  ></Box>
                  <Box className="bar-candle-caption">50%</Box>
                </Box>
                <Box className="bar-chat-candle">
                  <Box
                    className="bar-candle second"
                    sx={{ height: '50%' }}
                  ></Box>
                  <Box className="bar-candle-caption">50%</Box>
                </Box>
              </Box>
              <Box>ABC</Box>
            </Box>
          </Box>
        </Box>
        <Box className="wrapper-box box-wrapper-shadow">
          <Box sx={{ display: 'flex' }}>
            <Box className="subtitle1">
              {lang[locale].popularTagsAndMentions}
            </Box>
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].popularTagsAndMentionsInfo}
            />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Box style={{ filter: 'blur(4px)' }} className="genre-span">
              #ABC
            </Box>
            <Box style={{ filter: 'blur(4px)' }} className="genre-span">
              #DEFGH
            </Box>
            <Box style={{ filter: 'blur(4px)' }} className="genre-span">
              #HIJKLK
            </Box>
            <Box style={{ filter: 'blur(4px)' }} className="genre-span">
              #LMNOPQRE
            </Box>
            <Box style={{ filter: 'blur(4px)' }} className="genre-span">
              @HIJKLK
            </Box>
            <Box style={{ filter: 'blur(4px)' }} className="genre-span">
              @LMNOPQRE
            </Box>
          </Box>
        </Box>
        <Box className="wrapper-box box-wrapper-shadow">
          <Box sx={{ display: 'flex' }}>
            <Box className="subtitle1">{lang[locale].hashtagEngagement}</Box>
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].hashtagEngagementInfo}
            />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Box style={{ filter: 'blur(4px)' }} className="genre-span">
              #ABCDEFE
            </Box>
            <Box style={{ filter: 'blur(4px)' }} className="genre-span">
              #ABCDEFE
            </Box>
            <Box style={{ filter: 'blur(4px)' }} className="genre-span">
              #ABCDEFE
            </Box>
            <Box style={{ filter: 'blur(4px)' }} className="genre-span">
              #ABCDEFE
            </Box>
            <Box style={{ filter: 'blur(4px)' }} className="genre-span">
              #ABCDEFE
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InfluencerBriefOverflow;
