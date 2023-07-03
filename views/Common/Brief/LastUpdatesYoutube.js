import React from 'react';
import Box from '@mui/material/Box';
import RoundInfo from 'components/RoundInfo';
import { evaluateValue } from 'constants/constants';
import { useRouter } from 'next/router';

const lang = {
  en: {
    subscribers: 'Subscribers',
    subscribersInfo: 'Total number of subscribers.',
    avgViews: 'Average views',
    avgViewsInfo: 'The average number of views for the last 30 posts.',
    engagement: 'Engagements',
    engagementInfo:
      'The engagement rate is calculated by "(like + comment) ÷ average number of views" of the last 10 posts.',
    avgLikes: 'Average likes',
    avgLikesInfo: 'The number of likes for the last 30 posts.',
  },
  jp: {
    subscribers: '登録者数',
    subscribersInfo: '合計登録者数。',
    avgViews: '平均再生回数',
    avgViewsInfo: '直近30投稿の平均再生回数。',
    engagement: 'エンゲージメント',
    engagementInfo:
      'エンゲージメント率は直近10投稿の「(いいね＋コメント)÷平均再生回数」で算出しています。',
    avgLikes: '平均いいね数',
    avgLikesInfo: '直近30投稿のいいね数。',
  },
};

const LastUpdatesYoutube = ({ data, stats }) => {
  const { locale } = useRouter();
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });

  return (
    <Box className="lastupdates">
      <Box className="wrapper-grid" sx={{ gridTemplateColumns: '1fr 1fr' }}>
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
            {evaluateValue(data.profile.followers ?? 0)}
          </Box>
          <span className="subtitle-help">{lang[locale].subscribers}</span>
          <RoundInfo caption={lang[locale].subscribersInfo} />
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
              d="M12 4.5C7 4.5 2.73 7.61 1 12a11.83 11.83 0 0022 0c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z"
              fill="#FA8F38"
            ></path>
          </svg>
          <Box className="subtitle">{evaluateValue(data.avgViews ?? 0)}</Box>
          <span className="subtitle-help">{lang[locale].avgViews}</span>
          <RoundInfo caption={lang[locale].avgViewsInfo} />
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
            height="24"
            width="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.99 4A2 2 0 0020 2H4a2 2 0 00-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 14H7a1 1 0 01-1-1 1 1 0 011-1h10a1 1 0 011 1 1 1 0 01-1 1zm0-3H7a1 1 0 01-1-1 1 1 0 011-1h10a1 1 0 011 1 1 1 0 01-1 1zm0-3H7a1 1 0 01-1-1 1 1 0 011-1h10a1 1 0 011 1 1 1 0 01-1 1z"
              fill="#4AABE9"
            ></path>
          </svg>
          <Box className="subtitle">{evaluateValue(data.avgLikes ?? 0)}</Box>
          <span className="subtitle-help">{lang[locale].avgLikes}</span>
          <RoundInfo caption={lang[locale].avgLikesInfo} />
        </Box>
      </Box>
    </Box>
  );
};

export default LastUpdatesYoutube;
