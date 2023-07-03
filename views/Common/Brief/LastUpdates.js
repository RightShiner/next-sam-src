import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RoundInfo from 'components/RoundInfo';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import { evaluateValue } from 'constants/constants';
import { useRouter } from 'next/router';

const lang = {
  en: {
    avgLikes: 'Average likes',
    avgLikesInfo: 'Average likes for the last 30 posts.',
    follower: 'Followers',
    followerInfo: 'Total followers',
    engagement: 'Engagements',
    engagementInfo:
      'Engagement of last 10 posts. The engagement rate is calculated as "(likes + comments) ÷ followers". The average engagement rate on Instagram is 2%.',
    performance: 'PR performance',
    performanceInfo: 'Engagement rate when posting a tie-up.',
  },
  jp: {
    avgLikes: '平均いいね',
    avgLikesInfo: '直近30投稿の平均いいね。',
    follower: 'フォロワー',
    followerInfo: '合計フォロワー数。',
    engagement: 'エンゲージメント',
    engagementInfo:
      '直近10投稿のエンゲージメント。エンゲージメント率は「(いいね＋コメント)÷フォロワー」で算出しています。Instagramの平均エンゲージメント率は2%です。',
    performance: 'PRパフォーマンス',
    performanceInfo: 'タイアップ投稿をした際のエンゲージメント率。',
  },
};

const LastUpdates = ({ data, stats }) => {
  const { locale } = useRouter();
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });
  return (
    <Box className="lastupdates">
      {/*
        <Box sx={{display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '1rem',
              paddingBottom: '1rem'}}>
        <span>Last data updates:Sep 21, 2021</span>
        <Button variant={'outlined'}>
          <svg height="16" width="16" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M7.33 5.83V8.3c0 .23.13.45.33.57l2.08 1.23a.5.5 0 0 0 .69-.17.5.5 0 0 0-.18-.69L8.34 8.1V5.83c0-.27-.23-.5-.5-.5a.5.5 0 0 0-.5.5zm6.67.5V2.81c0-.3-.36-.45-.57-.24l-1.18 1.19a6 6 0 1 0 1.7 4.99.67.67 0 0 0-.66-.75.66.66 0 0 0-.66.57 4.68 4.68 0 0 1-4.7 4.1 4.74 4.74 0 0 1-4.6-4.6A4.67 4.67 0 0 1 11.3 4.7L9.9 6.1a.33.33 0 0 0 .24.57h3.53c.18 0 .33-.15.33-.34z" fill="#1377EB"></path></svg>
          <span style={{marginLeft:'5px'}}>更新</span>
        </Button>
      </Box>
      */}
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
          <span className="subtitle-help">{lang[locale].follower}</span>
          <RoundInfo caption={lang[locale].followerInfo} />
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
          <span className="subtitle-help">{lang[locale].engagement}</span>
          <RoundInfo caption={lang[locale].engagementInfo} />
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
            <span className="subtitle-help">{lang[locale].performance}</span>
            <RoundInfo caption={lang[locale].performanceInfo} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LastUpdates;
