import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import RoundInfo from 'components/RoundInfo';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import Constants, { getDataUri } from 'constants/constants';
import { evaluateValue } from 'constants/constants';
import { useRouter } from 'next/router';

const lang = {
  jp: {
    avgLikes: '平均高評価数',
    avgLikesInfo: '直近30投稿の平均高評価数',
    avgComments: '平均コメント',
    avgCommentsInfo: '直近30投稿の平均コメント数。',
    subscribers: '登録者数',
    subscribersInfo: '合計登録者数。',
    engagement: 'エンゲージメント',
    engagementInfo:
      'エンゲージメント率は直近10投稿の「(いいね＋コメント)÷平均再生回数」で算出しています。',
    avgViews: '平均再生回数',
    avgViewsInfo: '直近30投稿の平均再生回数。',
  },
  en: {
    avgLikes: 'AVG LIKES',
    avgLikesInfo: 'The average sum of likes on the last 30 posts.',
    avgComments: 'AVG COMMENTS',
    avgCommentsInfo: 'The average sum of comments on the last 30 posts.',
    subscribers: 'SUBSCRIBERS',
    subscribersInfo: 'How many total followers the influencer has on Youtube.',
    engagement: 'ENGAGEMENT RATE',
    engagementInfo:
      'This is an indication of how engaged the influencer’s audience is. It is calculated as likes, comments etc. ÷ followers. The average Instagram engagement rate is 2%.',
    avgViews: 'AVG VIEWS',
    avgViewsInfo: 'The average sum of views on the last 30 posts.',
  },
};

const useStyles = makeStyles({
  showFront: {
    zIndex: 2,
  },
  profileBackground: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    zIndex: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  gridwrapper: {
    gridTemplateColumns: '1fr 1fr 1fr',
    marginTop: '1rem',
  },
});

const HeaderYoutube = ({
  data,
  views,
  comments,
  engagements,
  likes,
  recents,
}) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });

  const [avatarSrc, setAvatarSrc] = useState(data ? data.picture : '');
  useEffect(() => {
    if (!data) return;

    getDataUri(data.picture, setAvatarSrc);
  }, [data]);

  return (
    <Box sx={{ marginTop: '3rem', width: '100%' }}>
      {/* <svg fill="none" height="445" viewBox="0 0 595 445" width="595" xmlns="http://www.w3.org/2000/svg" className={classes.profileBackground}>
        <path d="M398.594 -95.3898C369.085 -87.1341 342.711 -70.2265 322.803 -46.8037C302.895 -23.3808 290.348 5.50609 286.747 36.2068C283.146 66.9074 288.653 98.044 302.571 125.682C316.49 153.32 338.195 176.219 364.945 191.485C391.695 206.751 422.289 213.699 452.86 211.451C483.431 209.204 512.609 197.861 536.704 178.857C560.8 159.852 578.733 134.039 588.238 104.679C597.742 75.3193 598.391 43.7302 590.102 13.9036C584.576 -5.92074 575.239 -24.4734 562.624 -40.695C550.008 -56.9166 534.362 -70.4894 516.579 -80.6384C498.795 -90.7873 479.223 -97.3137 458.979 -99.8447C438.735 -102.376 418.216 -100.862 398.594 -95.3898ZM468.495 156.152C448.785 161.576 427.892 160.978 408.456 154.431C389.02 147.885 371.913 135.685 359.296 119.372C346.679 103.058 339.118 83.3642 337.568 62.7772C336.018 42.1901 340.55 21.6337 350.589 3.70489C360.629 -14.224 375.726 -28.7209 393.974 -37.9545C412.222 -47.1882 432.802 -50.7443 453.115 -48.1736C473.427 -45.6028 492.56 -37.0207 508.097 -23.5112C523.634 -10.0018 534.878 7.82887 540.407 27.7282C544.071 40.9685 545.118 54.7936 543.487 68.4137C541.855 82.0338 537.579 95.1822 530.901 107.108C524.223 119.034 515.274 129.503 504.567 137.918C493.859 146.333 481.602 152.529 468.495 156.152Z" fill="white"></path>
        <path d="M201.259 67.423C194.647 69.2438 189.02 73.6086 185.594 79.5749L108.486 217.582L-28.7698 139.145C-34.7843 135.806 -41.8544 134.97 -48.4587 136.817C-55.035 138.578 -60.6386 142.893 -64.0384 148.816C-67.4381 154.739 -68.3559 161.784 -66.5901 168.404L3.30014 419.907C5.27665 426.428 9.70964 431.922 15.6514 435.213C21.5931 438.504 28.572 439.332 35.096 437.519C41.62 435.706 47.1713 431.396 50.5631 425.511C53.9549 419.626 54.918 412.633 53.2464 406.027L0.183608 215.078L105.516 275.366C111.527 278.703 118.591 279.544 125.195 277.709C131.798 275.874 137.415 271.509 140.843 265.549L199.969 159.56L253.032 350.509C255.008 357.03 259.441 362.524 265.383 365.815C271.325 369.106 278.304 369.934 284.828 368.121C291.352 366.308 296.903 361.998 300.295 356.113C303.686 350.228 304.649 343.235 302.978 336.629L233.088 85.1261C231.182 78.5466 226.76 72.9874 220.793 69.6685C214.826 66.3497 207.801 65.5421 201.259 67.423Z" fill="white"></path>
      </svg> */}
      <Box className={classes.header}>
        <img
          src={avatarSrc}
          style={{ width: '175px', height: '175px', borderRadius: '50%' }}
        />
        <Box className={`mgt10 ${classes.showFront}`}>
          <span style={{ fontSize: '20px', fontWeight: 600 }}>
            {data.fullname}
          </span>
        </Box>
        <a
          className={classes.showFront}
          href={data.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>@{data.username}</span>
        </a>
      </Box>
      <Box className={`wrapper-grid ${classes.gridwrapper}`}>
        <Box
          className={`box-wrapper-shadow grid-item ${classes.showFront}`}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
          <Box className="subtitle">{evaluateValue(data.followers)}</Box>
          <span>{lang[locale].subscribers}</span>
          <RoundInfo
            caption={lang[locale].subscribersInfo}
            sx={{ marginLeft: '.5rem' }}
          />
        </Box>
        <Box
          className={`box-wrapper-shadow grid-item ${classes.showFront}`}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
            data.engagementRate * 100,
          )}%`}</Box>
          <span>{lang[locale].engagement}</span>
          <RoundInfo
            caption={lang[locale].engagementInfo}
            sx={{ marginLeft: '.5rem' }}
          />
        </Box>
        <Box
          className={`box-wrapper-shadow grid-item ${classes.showFront}`}
          sx={{
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
              d="M12 4.5C7 4.5 2.73 7.61 1 12a11.83 11.83 0 0022 0c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z"
              fill="#FA8F38"
            ></path>
          </svg>
          <Box className="subtitle">
            {views < 0 ? '-' : evaluateValue(views)}
          </Box>
          <span>{lang[locale].avgViews}</span>
          <RoundInfo
            caption={lang[locale].avgViewsInfo}
            sx={{ marginLeft: '.5rem' }}
          />
        </Box>
      </Box>
      <Box className={`wrapper-grid ${classes.gridwrapper}`}>
        <Box
          className={`box-wrapper-shadow grid-item ${classes.showFront}`}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
          <Box className="subtitle">
            {comments < 0 ? '-' : evaluateValue(comments)}
          </Box>
          <span>{lang[locale].avgComments}</span>
          <RoundInfo
            caption={lang[locale].avgCommentsInfo}
            sx={{ marginLeft: '.5rem' }}
          />
        </Box>
        <Box
          className={`box-wrapper-shadow grid-item ${classes.showFront}`}
          sx={{
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
              d="M13.12 2.06L7.58 7.6A2 2 0 007 9.01V19c0 1.1.9 2 2 2h9c.8 0 1.52-.48 1.84-1.21l3.26-7.61A3 3 0 0020.34 8h-5.65l.95-4.58a1.49 1.49 0 00-2.52-1.36zM3 21a2 2 0 002-2v-8a2 2 0 00-2-2 2 2 0 00-2 2v8c0 1.1.9 2 2 2z"
              fill="#447D91"
            ></path>
          </svg>
          <Box className="subtitle">
            {likes < 0 ? '-' : evaluateValue(likes)}
          </Box>
          <span>{lang[locale].avgLikes}</span>
          <RoundInfo
            caption={lang[locale].avgLikesInfo}
            sx={{ marginLeft: '.5rem' }}
          />
        </Box>
        {/*
        <Box className={`box-wrapper-shadow grid-item ${classes.showFront}`} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <svg fill="none" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.88 21.94l5.53-5.54a2 2 0 00.58-1.41V5a2 2 0 00-2-2H6c-.8 0-1.52.48-1.83 1.21L.91 11.82A3 3 0 003.66 16h5.65l-.95 4.58a1.49 1.49 0 002.52 1.36zM21 3a2 2 0 00-2 2v8c0 1.1.9 2 2 2a2 2 0 002-2V5a2 2 0 00-2-2z" fill="#F18583"></path>
          </svg>
          <Box className='subtitle'>{evaluateValue(0)}</Box>
          <span>平均低評価数</span>
          <RoundInfo caption='平均低評価数' sx={{marginLeft: '.5rem'}} />
        </Box>
        */}
      </Box>
    </Box>
  );
};

export default HeaderYoutube;
