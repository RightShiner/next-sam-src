import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RoundInfo from 'components/RoundInfo';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import RelativeImageDetail from 'components/RelativeImageDetail';
import { evaluateValue } from 'constants/constants';
import { imageService } from 'services';
import { useRouter } from 'next/router';

const lang = {
  jp: {
    followers: 'フォロワー',
    dateFormat: 'YYYY年M月D日',
    likes: 'いいね',
    popularPosts: '人気投稿',
    recentPosts: '最新投稿',
    followersThisMonth: 'フォロワー推移',
    followersThisMonthInfo: '過去半年のフォロワー増減の推移。',
    engagementForRecentPosts: 'エンゲージメント推移',
    engagementForRecentPostsInfo: '直近投稿のエンゲージメントの推移。',
    likesThisMonth: 'いいね推移',
    likesThisMonthInfo: '半年間の月毎の平均いいね数の推移',
  },
  en: {
    followers: 'Followers',
    dateFormat: 'MMM D, YYYY',
    likes: 'Likes',
    popularPosts: 'Popular Posts',
    recentPosts: 'Recent Posts',
    followersThisMonth: 'Followers this month',
    followersThisMonthInfo:
      'The number of followers the influencer has gained or lost in the last 30 days.',
    engagementForRecentPosts: 'Engagement for recent posts',
    engagementForRecentPostsInfo:
      "A breakdown of engagements made on the infleucer's recent posts. Date's on the X-axis mark the date a post was created.",
    likesThisMonth: 'Likes this month',
    likesThisMonthInfo:
      'How many likes the influencer received on their posts in the last 30 days.',
  },
};

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const useStyles = makeStyles({
  popularposts: {
    marginTop: '2rem',
  },

  ellipseWrapper: {
    padding: '.5rem 0',
  },

  ellipseCaption: {
    fontSize: '12px',
    display: '-webkit-box',
    overflow: 'hidden',
    lineHeight: 1.4,
    textOverflow: 'ellipsis',
    '-webkitBoxOrient': 'vertical',
    '-webkitLineClamp': 4,
  },

  lookname: {
    fontSize: '14px',
    fontWeight: 600,
  },

  lookshortname: {
    fontSize: '12px',
    textDecoration: 'none',
    color: 'black',
  },

  fontsize12: {
    fontSize: '12px',
  },
});

const PopularPostsTiktok = ({ data, recentPosts, open, statHistory }) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });

  const chartOptions1 = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    colors: ['#300086'],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 0,
    },
    grid: {
      borderColor: '#eee',
    },
    markers: {
      strokeColors: '#300086',
      size: 2,
      hover: {
        sizeOffset: 1,
      },
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        return `<div class="arrow_box"><span>${lang[locale].followers}: ${series[seriesIndex][dataPointIndex]}</span></div>`;
      },
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        formatter: (value) => {
          return evaluateValue(value);
        },
      },
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
      categories: _.map(statHistory, (itm) => {
        return itm.month;
      }),
    },
  };

  const chartSeries1 = [
    {
      name: 'Followers',
      data: _.map(statHistory, (itm) => {
        return itm.followers ?? 0;
      }),
    },
  ];

  const getFollowingRate = () => {
    if (!statHistory || statHistory.length < 2) {
      return 0;
    }

    let lastVal = statHistory[statHistory.length - 1].followers;
    let prevVal = statHistory[statHistory.length - 2].followers;

    return ((lastVal - prevVal) / prevVal) * 100;
  };

  const chartOptions3 = {
    chart: {
      background: 'transparent',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ['#300086', '#4aabed'],
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: '#eee',
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2,
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
      categories: _.map(recentPosts, (itm) => {
        return moment(itm.created).format(lang[locale].dateFormat);
      })
        .slice(0, 6)
        .reverse(),
      labels: {
        rotate: 0,
        formatter: function(value, timestamp, opts) {
          return value;
        },
      },
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        offsetX: -12,
        formatter: (value) => {
          return evaluateValue(value);
        },
      },
    },
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        return `<div class="arrow_box"><span>${series[seriesIndex][dataPointIndex]}</span></div>`;
      },
    },
  };

  const chartSereise3 = [
    {
      data: _.map(recentPosts, (itm) => {
        return itm.likes ?? 0;
      })
        .slice(0, 6)
        .reverse(),
    },
    {
      data: _.map(recentPosts, (itm) => {
        return itm.comments ?? 0;
      })
        .slice(0, 6)
        .reverse(),
    },
  ];

  const chartOptions4 = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    colors: ['#300086'],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 0,
    },
    grid: {
      borderColor: '#eee',
    },
    markers: {
      strokeColors: '#300086',
      size: 2,
      hover: {
        sizeOffset: 1,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        return `<div class="arrow_box"><span>${lang[locale].likes}: ${series[seriesIndex][dataPointIndex]}</span></div>`;
      },
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        formatter: (value) => {
          return evaluateValue(value);
        },
      },
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
      categories: _.map(statHistory, (itm) => {
        return itm.month;
      }),
    },
  };

  const chartSeries4 = [
    {
      name: 'Followings',
      data: _.map(statHistory, (itm) => {
        return itm.avgLikes;
      }),
    },
  ];

  const getLikesRate = () => {
    if (!statHistory || statHistory.length < 2) {
      return 0;
    }

    let lastVal = statHistory[statHistory.length - 1].avgLikes;
    let prevVal = statHistory[statHistory.length - 2].avgLikes;

    return ((lastVal - prevVal) / prevVal) * 100;
  };

  const [thumbs, setThumbs] = useState(
    Array.from({ length: !data ? 0 : data.length }, (_, i) => {
      return data[i].thumbnail;
    }),
  );
  useEffect(() => {
    if (!open || !data) return;

    async function fetchFromServer() {
      for (let _itm of data) {
        // console.log(`Popular${idx} done`);
        let result = null;
        try {
          result = await imageService
            .getImageURL(encodeURIComponent(encodeURIComponent(_itm.thumbnail)))
            .then(async (res) => {
              if (!res.ok || res.status !== 200) return null;

              const blob = await res.text();
              return JSON.parse(blob);
            })
            .catch((ex) => {
              console.log(ex.toString());
              return null;
            });
        } catch (ex) {
          console.log(ex.toString());
          continue;
        }

        if (!result) continue;

        thumbs[idx] = `data:${result.type};base64,${result.blob}`;
      }
      setThumbs([...thumbs]);
    }

    fetchFromServer();
  }, [data, open]);

  return (
    <Box className={classes.popularposts}>
      <Box sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}>
        <span>{lang[locale].popularPosts}</span>
      </Box>

      <Box className="wrapper-grid" sx={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        {_.map(
          data,
          (itm, idx) =>
            idx < 6 && (
              <Box
                key={idx}
                className="box-wrapper-shadow grid-item nopadding"
                sx={{ maxWidth: '220px' }}
              >
                <Box className="subtitle1 mgl5 mgt5">
                  {process.env.NEXT_PUBLIC_REGION == 'SG'
                    ? new Date(itm.created).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : new Date(itm.created).getFullYear() +
                      '年' +
                      (new Date(itm.created).getMonth() + 1) +
                      '月' +
                      new Date(itm.created).getDate() +
                      '日'}
                </Box>
                <Box component="a" href={`${itm.url}`} target="_blank">
                  <RelativeImageDetail
                    sx={{ height: '150px !important' }}
                    imgSrc={thumbs[idx]}
                  />
                </Box>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-around' }}
                  className="mgb5 mgt5"
                >
                  <Box
                    sx={{
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <svg
                      fill="none"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      className="tt-single-post-comp_iconSpace_4Ojp1"
                    >
                      <path
                        d="M8.75 1.37l-3.7 3.7c-.24.24-.38.58-.38.94v6.66c0 .73.6 1.33 1.33 1.33h6c.53 0 1.01-.32 1.23-.8l2.17-5.08a2 2 0 00-1.84-2.79H9.79l.64-3.05a1 1 0 00-1.68-.9zM2 14c.73 0 1.33-.6 1.33-1.33V7.33C3.33 6.6 2.73 6 2 6 1.27 6 .67 6.6.67 7.33v5.34C.67 13.4 1.27 14 2 14z"
                        fill="#447D91"
                      ></path>
                    </svg>
                    {itm.likes < 0 ? '-' : evaluateValue(itm.likes)}
                  </Box>
                  <Box
                    sx={{
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <svg
                      fill="none"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      className="tt-single-post-comp_iconSpace_4Ojp1"
                    >
                      <path
                        d="M8 3A7.88 7.88 0 00.67 8a7.88 7.88 0 0014.66 0c-1.15-2.93-4-5-7.33-5zm0 8.33a3.33 3.33 0 110-6.67 3.33 3.33 0 010 6.67zM8 6a2 2 0 100 4 2 2 0 000-4z"
                        fill="#FA8F38"
                      ></path>
                    </svg>
                    {itm.views < 0 ? '-' : evaluateValue(itm.views)}
                  </Box>
                  <Box
                    sx={{
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <svg
                      fill="none"
                      height="12"
                      viewBox="0 0 12 12"
                      width="12"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mgr10"
                    >
                      <path
                        d="M10.8 0H1.2C0.54 0 0 0.54 0 1.2V8.4C0 9.06 0.54 9.6 1.2 9.6H9.6L12 12V1.2C12 0.54 11.46 0 10.8 0ZM9 7.2H3C2.67 7.2 2.4 6.93 2.4 6.6C2.4 6.27 2.67 6 3 6H9C9.33 6 9.6 6.27 9.6 6.6C9.6 6.93 9.33 7.2 9 7.2ZM9 5.4H3C2.67 5.4 2.4 5.13 2.4 4.8C2.4 4.47 2.67 4.2 3 4.2H9C9.33 4.2 9.6 4.47 9.6 4.8C9.6 5.13 9.33 5.4 9 5.4ZM9 3.6H3C2.67 3.6 2.4 3.33 2.4 3C2.4 2.67 2.67 2.4 3 2.4H9C9.33 2.4 9.6 2.67 9.6 3C9.6 3.33 9.33 3.6 9 3.6Z"
                        fill="#4aabed"
                      ></path>
                    </svg>
                    {itm.comments < 0 ? '-' : evaluateValue(itm.comments)}
                  </Box>
                </Box>
                <Box className={classes.ellipseWrapper}>
                  <Typography className={classes.ellipseCaption}>
                    {itm.text}
                  </Typography>
                </Box>
              </Box>
            ),
        )}
      </Box>

      <Box
        className="wrapper-grid"
        sx={{ gridTemplateColumns: '1fr', marginTop: '.5rem' }}
      >
        <Box className="box-wrapper-shadow grid-item leftalign">
          <Box
            className="subtitle1"
            sx={{ display: 'flex', alignItems: 'flex-end' }}
          >
            {lang[locale].followersThisMonth}
            {getFollowingRate() >= 0 && (
              <ArrowDropUpIcon
                fontSize="small"
                style={{
                  color: 'rgb(0, 0, 255)',
                }}
              />
            )}
            {getFollowingRate() < 0 && (
              <ArrowDropDownIcon
                fontSize="small"
                style={{
                  color: 'rgb(255,0,0)',
                }}
              />
            )}
            <span
              style={{
                color: `${
                  getFollowingRate() >= 0 ? 'rgb(0, 0, 255)' : 'rgb(255,0,0)'
                }`,
              }}
            >
              {Math.abs(getFollowingRate()).toFixed(2)}%
            </span>
            &nbsp;
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].followersThisMonthInfo}
            />
          </Box>
          <Box>
            <Chart
              height="250"
              options={chartOptions1}
              series={chartSeries1}
              type="area"
            />
          </Box>
        </Box>
      </Box>

      <Box
        className="wrapper-grid"
        sx={{ gridTemplateColumns: '1fr', marginTop: '.5rem' }}
      >
        <Box className="box-wrapper-shadow grid-item leftalign">
          <Box
            className="subtitle1"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {lang[locale].engagementForRecentPosts}
              <RoundInfo
                sx={{ marginLeft: '.5rem' }}
                caption={lang[locale].engagementForRecentPostsInfo}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <svg
                height="12"
                width="12"
                fill="none"
                viewBox="0 0 18 16"
                xmlns="http://www.w3.org/2000/svg"
                className="mgr10"
              >
                <path
                  d="M10.2143 15.5319C9.53055 16.1575 8.47795 16.1575 7.79422 15.5229L7.69526 15.4322C2.97207 11.1255 -0.113742 8.30573 0.00321271 4.78783C0.057192 3.24649 0.839891 1.76861 2.1084 0.8982C4.48349 -0.733813 7.41636 0.0277934 8.99975 1.89554C10.5831 0.0277934 13.516 -0.74288 15.8911 0.8982C17.1596 1.76861 17.9423 3.24649 17.9963 4.78783C18.1222 8.30573 15.0274 11.1255 10.3043 15.4503L10.2143 15.5319Z"
                  fill="#e88585"
                ></path>
              </svg>
              <span style={{ marginRight: '.5em' }}>Likes&nbsp;</span>
              <svg
                fill="none"
                height="12"
                viewBox="0 0 12 12"
                width="12"
                xmlns="http://www.w3.org/2000/svg"
                className="mgr10"
              >
                <path
                  d="M10.8 0H1.2C0.54 0 0 0.54 0 1.2V8.4C0 9.06 0.54 9.6 1.2 9.6H9.6L12 12V1.2C12 0.54 11.46 0 10.8 0ZM9 7.2H3C2.67 7.2 2.4 6.93 2.4 6.6C2.4 6.27 2.67 6 3 6H9C9.33 6 9.6 6.27 9.6 6.6C9.6 6.93 9.33 7.2 9 7.2ZM9 5.4H3C2.67 5.4 2.4 5.13 2.4 4.8C2.4 4.47 2.67 4.2 3 4.2H9C9.33 4.2 9.6 4.47 9.6 4.8C9.6 5.13 9.33 5.4 9 5.4ZM9 3.6H3C2.67 3.6 2.4 3.33 2.4 3C2.4 2.67 2.67 2.4 3 2.4H9C9.33 2.4 9.6 2.67 9.6 3C9.6 3.33 9.33 3.6 9 3.6Z"
                  fill="#4aabed"
                ></path>
              </svg>
              <span>Comments</span>
            </Box>
          </Box>
          <Box>
            <Chart
              height="250"
              options={chartOptions3}
              series={chartSereise3}
              type="bar"
            />
          </Box>
        </Box>
      </Box>

      <Box
        className="wrapper-grid"
        sx={{ gridTemplateColumns: '1fr', marginTop: '.5rem' }}
      >
        <Box className="box-wrapper-shadow grid-item leftalign">
          <Box
            className="subtitle1"
            sx={{
              display: 'flex',
              justifyContent: 'normal',
              alignItems: 'flex-end',
            }}
          >
            {lang[locale].likesThisMonth}
            {getLikesRate() >= 0 && (
              <ArrowDropUpIcon
                fontSize="small"
                style={{
                  color: 'rgb(0, 0, 255)',
                }}
              />
            )}
            {getLikesRate() < 0 && (
              <ArrowDropDownIcon
                fontSize="small"
                style={{
                  color: 'rgb(255,0,0)',
                }}
              />
            )}
            <span
              style={{
                color: `${
                  getLikesRate() >= 0 ? 'rgb(0, 0, 255)' : 'rgb(255,0,0)'
                }`,
              }}
            >
              {Math.abs(getLikesRate()).toFixed(2)}%
            </span>
            &nbsp;
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].likesThisMonthInfo}
            />
          </Box>
          <Box>
            <Chart
              height="200"
              options={chartOptions4}
              series={chartSeries4}
              type="area"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PopularPostsTiktok;
