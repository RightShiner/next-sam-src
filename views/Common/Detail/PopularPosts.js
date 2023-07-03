import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import dynamic from 'next/dynamic';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RoundInfo from 'components/RoundInfo';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import RelativeImageDetail from 'components/RelativeImageDetail';
import {
  getDataUri,
  evaluateValue,
  getMatchInterests,
} from 'constants/constants';
import { useRouter } from 'next/router';

const lang = {
  jp: {
    popularPosts: '人気投稿',
    feed: 'フィード',
    feedInfo:
      '最新10投稿の平均「いいね・コメント・エンゲージメント」を表示します。',
    recentPosts: '最新投稿',
    reels: 'リール',
    reelsInfo:
      '最新10投稿の平均「いいね・コメント・エンゲージメント・再生数」を表示します。',
    followersThisMonth: 'フォロワー推移',
    followersThisMonthInfo: '過去半年のフォロワー増減の推移。',
    following: 'フォロー推移',
    followingInfo: '過去半年のフォロー増減の推移。',
    engagementForRecentPosts: 'エンゲージメント推移',
    engagementForRecentPostsInfo: '直近投稿のエンゲージメントの推移。',
    lookalikes: '類似アカウント',
    lookalikesInfo: '似たフォロワーをもつアカウント',
    likesThisMonth: 'いいね推移',
    likesThisMonthInfo: '半年間の月毎の平均いいね数の推移',
    popularHashtagsAndMentions: '人気の#と@',
    popularHashtagsAndMentionsInfo:
      'インフルエンサ―が頻繁に使用しているハッシュタグとメンション。',
    hashtagEngagement: 'ハッシュタグエンゲージメント',
    hashtagEngagementInfo:
      'ハッシュタグエンゲージメントは、以下のように算出しております。\r\n\r\n1.過去の投稿の中で、もっともエンゲージメント􏰀高かったTOP10の投稿を抽出\r\n2.その投稿内で使用されているハッシュタグを抽出\r\n3.ハッシュタグごとの平均エンゲージメントを算出\r\n\r\n(例)\r\nA投稿 #ママコーデ EG3.4%\r\nB投稿 #ママコーデ EG3.6%\r\n↓\r\n#ママコーデのハッシュタグをつけた際の投稿EG􏰃3.5%と言った算出方法になります。',
    brandAffinity: 'ブランド属性',
    brandAffinityInfo:
      '独自のアルゴリズムにより、インフルエンサーが好む傾向にあるブランドを算出しています。そのインフルエンサーがどんな投稿をすることを好むのかを判断するときに有効です。',
    interests: '興味',
    interestsInfo:
      'フォロワーがどんな物事に興味関心を抱いているか。フォロワーが「いいねしている投稿」「フォローしているアカウント」「投稿内容」などから、総合的に独自のアルゴリズムで測っています。',
  },
  en: {
    popularPosts: 'Popular Posts',
    feed: 'Feed',
    feedInfo:
      '最新10投稿の平均「いいね・コメント・エンゲージメント」を表示します。',
    recentPosts: 'Recent Posts',
    reels: 'Reels',
    reelsInfo:
      'It contains the information of likes/comments/engagements/plays of the last 10 reels.',
    followersThisMonth: 'Followers this month',
    followersThisMonthInfo:
      'The number of followers the influencer has gained or lost in the last 30 days.',
    following: 'Following',
    followingInfo: 'The number of people an influencer is following.',
    engagementForRecentPosts: 'Engagement for recent posts',
    engagementForRecentPostsInfo:
      "A breakdown of engagements made on the infleucer's recent posts. Date's on the X-axis mark the date a post was created.",
    lookalikes: 'Lookalikes',
    lookalikesInfo:
      'These are accounts with similar topics. Topics are measured with keywords and determining the overall grouping of topics associated with an account.',
    likesThisMonth: 'Likes this month',
    likesThisMonthInfo:
      'How many likes the influencer received on their posts in the last 30 days.',
    popularHashtagsAndMentions: 'Popular # and @',
    popularHashtagsAndMentionsInfo:
      'These are the hashtags and other users that are frequently adding to their content.',
    hashtagEngagement: 'Hashtag Engagement',
    hashtagEngagementInfo:
      'ハッシュタグエンゲージメントは、以下のように算出しております。\r\n\r\n1.過去の投稿の中で、もっともエンゲージメント􏰀高かったTOP10の投稿を抽出\r\n2.その投稿内で使用されているハッシュタグを抽出\r\n3.ハッシュタグごとの平均エンゲージメントを算出\r\n\r\n(例)\r\nA投稿 #ママコーデ EG3.4%\r\nB投稿 #ママコーデ EG3.6%\r\n↓\r\n#ママコーデのハッシュタグをつけた際の投稿EG􏰃3.5%と言った算出方法になります。',
    brandAffinity: 'Brand Affinity',
    brandAffinityInfo:
      'Brand affinity shows which brands the audience frequently interacts with on Instagram.',
    interests: 'Interests',
    interestsInfo:
      'These are the topics the audience posts about and interacts with the most often.',
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

const PopularPosts = ({
  open,
  data,
  feed,
  reels,
  igtv,
  followers,
  statHistory,
  recentPosts,
  hashtags,
  mentions,
  hashtagengage,
  brandAffinity,
  interests,
  lookalikes,
}) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });

  const [feedLikes, setFeedLikes] = useState(0);
  const [feedComments, setFeedComments] = useState(0);
  const [feedEngagement, setFeedEngagement] = useState(0);

  const [reelsLikes, setReelsLikes] = useState(0);
  const [reelsComments, setReelsComments] = useState(0);
  const [reelsEngagement, setReelsEngagement] = useState(0);
  const [reelsViews, setReelsViews] = useState(0);

  const [igtvLikes, setIgtvLikes] = useState(0);
  const [igtvComments, setIgtvComments] = useState(0);
  const [igtvEngagement, setIgtvEngagement] = useState(0);
  const [igtvViews, setIgtvViews] = useState(0);

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
        return (
          '<div class="arrow_box">' +
          '<span>フォロワー: ' +
          series[seriesIndex][dataPointIndex] +
          '</span>' +
          '</div>'
        );
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

  const chartOptions2 = {
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
        return (
          '<div class="arrow_box">' +
          '<span>フォロー: ' +
          series[seriesIndex][dataPointIndex] +
          '</span>' +
          '</div>'
        );
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

  const chartSeries2 = [
    {
      name: 'Followings',
      data: _.map(statHistory, (itm) => {
        return itm.following ?? 0;
      }),
    },
  ];

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
        return moment(itm.created).format('YYYY.MM.DD');
      })
        .slice(0, 6)
        .reverse(),
      labels: {
        rotate: -45,
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
        return (
          '<div class="arrow_box">' +
          '<span>' +
          series[seriesIndex][dataPointIndex] +
          '</span>' +
          '</div>'
        );
      },
    },
  };

  const chartSeries3 = [
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
        return (
          '<div class="arrow_box">' +
          '<span>いいね: ' +
          series[seriesIndex][dataPointIndex] +
          '</span>' +
          '</div>'
        );
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
    Array.from({ length: 24 }, (_, i) => {
      return 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif';
    }),
  );

  useEffect(() => {
    if (!data || !open) return;

    let cnt = Math.min(data.length, 6);
    for (let idx = 0; idx < cnt; idx++) {
      getDataUri(data[idx].thumbnail, updateThumbSrc, idx);
    }
  }, [data, open]);

  useEffect(() => {
    if (!feed || !feed.items || feed.items.length == 0) {
      return;
    }

    feed.items.sort((a, b) => {
      return b.taken_at - a.taken_at;
    });

    let cnt = Math.min(feed.items.length, 6);
    for (let idx = 0; idx < cnt; idx++) {
      getDataUri(feed.items[idx].display_url, updateThumbSrc, 6 + idx);
    }

    if (feed.items && feed.items.length > 0) {
      let totalLikes = 0;
      let totalComments = 0;
      feed.items.forEach((itm) => {
        totalLikes += isNaN(itm.like_count) ? 0 : itm.like_count;
        totalComments += isNaN(itm.comment_count) ? 0 : itm.comment_count;
      });
      setFeedLikes(totalLikes / feed.items.length);
      setFeedComments(totalComments / feed.items.length);
      setFeedEngagement(
        (totalLikes + totalComments) / feed.items.length / followers,
      );
    }
  }, [feed]);

  useEffect(() => {
    if (!reels || !reels.items || reels.items.length == 0) {
      return;
    }

    reels.items.sort((a, b) => {
      return b.taken_at - a.taken_at;
    });

    let cnt = Math.min(reels.items.length, 6);
    for (let idx = 0; idx < cnt; idx++) {
      getDataUri(reels.items[idx].display_url, updateThumbSrc, 12 + idx);
    }

    if (reels.items && reels.items.length > 0) {
      let totalLikes = 0;
      let totalComments = 0;
      let totalViews = 0;
      reels.items.forEach((itm) => {
        totalLikes += isNaN(itm.like_count) ? 0 : itm.like_count;
        totalComments += isNaN(itm.comment_count) ? 0 : itm.comment_count;
        totalViews += isNaN(itm.view_count) ? 0 : itm.view_count;
      });
      setReelsLikes(totalLikes / reels.items.length);
      setReelsComments(totalComments / reels.items.length);
      setReelsEngagement(
        (totalLikes + totalComments) / reels.items.length / followers,
      );
      setReelsViews(totalViews / reels.items.length);
    }
  }, [reels]);

  useEffect(() => {
    if (!igtv || !igtv.items || igtv.items.length == 0) {
      return;
    }

    igtv.items.sort((a, b) => {
      return b.taken_at - a.taken_at;
    });

    let cnt = Math.min(igtv.items.length, 6);
    for (let idx = 0; idx < cnt; idx++) {
      getDataUri(igtv.items[idx].display_url, updateThumbSrc, 18 + idx);
    }

    if (igtv.items && igtv.items.length > 0) {
      let totalLikes = 0;
      let totalComments = 0;
      let totalViews = 0;
      igtv.items.forEach((itm) => {
        totalLikes += itm.like_count;
        totalComments += itm.comment_count;
        totalViews += itm.view_count;
      });
      setIgtvLikes(totalLikes / igtv.items.length);
      setIgtvComments(totalComments / igtv.items.length);
      setIgtvEngagement(
        (totalLikes + totalComments) / igtv.items.length / followers,
      );
      setIgtvViews(totalViews / igtv.items.length);
    }
  }, [igtv]);

  const updateThumbSrc = (dataUrl, idx) => {
    thumbs[idx] = dataUrl;
    // console.log(`Thumb${idx} done`);
    if (idx === thumbs.length - 1) setThumbs([...thumbs]);
  };

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
                    imgSrc={thumbs[idx] ?? ''}
                  />
                </Box>
                <Box display={'flex'} className="mgb5 mgt5">
                  <Box
                    className="mgr5 mgl5"
                    sx={{
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={'/images/smallheart.png'}
                      style={{ width: '12px', height: '10px' }}
                      className="mgr10"
                    />
                    {itm.likes < 0 ? '-' : evaluateValue(itm.likes)}
                  </Box>
                  <Box
                    className="mgr5 mgl5"
                    sx={{
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <svg
                      fill="none"
                      height="12"
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

      {feed && feed.items && feed.items.length > 0 && (
        <>
          <Box
            sx={{
              fontSize: '16px',
              fontWeight: '600',
              marginTop: '2rem',
              marginBottom: '.8rem',
              borderLeft: '.4rem solid #3161BE',
              paddingLeft: '.5rem',
              display: 'flex',
              alignItems: 'center',
              height: '1.5em',
            }}
          >
            <img
              src={'/images/feed.png'}
              style={{ width: 'auto', height: '14px' }}
              className="mgr10"
            />
            <h3>{lang[locale].feed}</h3>
            <RoundInfo
              caption={lang[locale].feedInfo}
              sx={{ marginLeft: '.5rem' }}
            />
          </Box>

          <Box
            className="wrapper-grid"
            sx={{ gridTemplateColumns: '1fr 1fr 1fr' }}
          >
            <Box
              className="box-wrapper-shadow grid-item nopadding"
              sx={{
                maxWidth: '220px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '3rem',
              }}
            >
              <img
                src={'/images/heart.png'}
                style={{ width: 'auto', height: '1.5rem' }}
                className="mgr10"
              />
              <span sx={{ fontSize: '24px', fontWeight: '500' }}>
                {feedLikes < 0 ? '-' : evaluateValue(feedLikes)}
              </span>
            </Box>
            <Box
              className="box-wrapper-shadow grid-item nopadding"
              sx={{
                maxWidth: '220px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '3rem',
              }}
            >
              <img
                src={'/images/comment.png'}
                style={{ width: 'auto', height: '1.5rem' }}
                className="mgr10"
              />
              <span sx={{ fontSize: '24px', fontWeight: '500' }}>
                {feedComments < 0 ? '-' : evaluateValue(feedComments)}
              </span>
            </Box>
            <Box
              className="box-wrapper-shadow grid-item nopadding"
              sx={{
                maxWidth: '220px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '3rem',
              }}
            >
              <img
                src={'/images/engagement.png'}
                style={{ width: 'auto', height: '1.5rem' }}
                className="mgr10"
              />
              <span sx={{ fontSize: '24px', fontWeight: '500' }}>
                {(feedEngagement * 100).toFixed(2)} %
              </span>
            </Box>
          </Box>

          <Box
            sx={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '.5rem',
              marginTop: '1rem',
            }}
          >
            <span>{lang[locale].recentPosts}</span>
          </Box>

          <Box
            className="wrapper-grid"
            sx={{ gridTemplateColumns: '1fr 1fr 1fr' }}
          >
            {_.map(
              feed.items,
              (itm, idx) =>
                idx < 6 && (
                  <Box
                    key={idx}
                    className="box-wrapper-shadow grid-item nopadding"
                    sx={{ maxWidth: '220px' }}
                  >
                    <Box className="subtitle1 mgl5 mgt5">
                      {process.env.NEXT_PUBLIC_REGION == 'SG'
                        ? new Date(itm.taken_at * 1000).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            },
                          )
                        : new Date(itm.taken_at * 1000).getFullYear() +
                          '年' +
                          (new Date(itm.taken_at * 1000).getMonth() + 1) +
                          '月' +
                          new Date(itm.taken_at * 1000).getDate() +
                          '日'}
                    </Box>
                    <Box
                      component="a"
                      // href={`${itm.url}`}
                      target="_blank"
                    >
                      <RelativeImageDetail
                        sx={{ height: '150px !important' }}
                        imgSrc={thumbs[6 + idx] ?? ''}
                      />
                    </Box>
                    <Box display={'flex'} className="mgb5 mgt5">
                      <Box
                        className="mgr5 mgl5"
                        sx={{
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={'/images/smallheart.png'}
                          style={{ width: '12px', height: '10px' }}
                          className="mgr10"
                        />
                        {itm.like_count < 0
                          ? '-'
                          : evaluateValue(itm.like_count)}
                      </Box>
                      <Box
                        className="mgr5 mgl5"
                        sx={{
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={'/images/comment.png'}
                          style={{ width: '12px', height: '10px' }}
                          className="mgr10"
                        />
                        {itm.comment_count < 0
                          ? '-'
                          : evaluateValue(itm.comment_count)}
                      </Box>
                    </Box>
                    <Box className={classes.ellipseWrapper}>
                      <Typography className={classes.ellipseCaption}>
                        {itm.caption ? itm.caption.text : ''}
                      </Typography>
                    </Box>
                  </Box>
                ),
            )}
          </Box>
        </>
      )}

      {reels && reels.items && reels.items.length > 0 && (
        <>
          <Box
            sx={{
              fontSize: '16px',
              fontWeight: '600',
              marginTop: '2rem',
              marginBottom: '.8rem',
              borderLeft: '.4rem solid #3161BE',
              paddingLeft: '.5rem',
              display: 'flex',
              alignItems: 'center',
              height: '1.5em',
            }}
          >
            <img
              src={'/images/reel.png'}
              style={{ width: 'auto', height: '14px' }}
              className="mgr10"
            />
            <h3>{lang[locale].reels}</h3>
            <RoundInfo
              caption={lang[locale].reelsInfo}
              sx={{ marginLeft: '.5rem' }}
            />
          </Box>

          <Box
            className="wrapper-grid"
            sx={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}
          >
            <Box
              className="box-wrapper-shadow grid-item nopadding"
              sx={{
                maxWidth: '220px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '3rem',
              }}
            >
              <img
                src={'/images/heart.png'}
                style={{ width: 'auto', height: '1.5rem' }}
                className="mgr10"
              />
              <span sx={{ fontSize: '24px', fontWeight: '500' }}>
                {reelsLikes < 0 ? '-' : evaluateValue(reelsLikes)}
              </span>
            </Box>
            <Box
              className="box-wrapper-shadow grid-item nopadding"
              sx={{
                maxWidth: '220px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '3rem',
              }}
            >
              <img
                src={'/images/comment.png'}
                style={{ width: 'auto', height: '1.5rem' }}
                className="mgr10"
              />
              <span sx={{ fontSize: '24px', fontWeight: '500' }}>
                {reelsComments < 0 ? '-' : evaluateValue(reelsComments)}
              </span>
            </Box>
            <Box
              className="box-wrapper-shadow grid-item nopadding"
              sx={{
                maxWidth: '220px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '3rem',
              }}
            >
              <img
                src={'/images/engagement.png'}
                style={{ width: 'auto', height: '1.5rem' }}
                className="mgr10"
              />
              <span sx={{ fontSize: '24px', fontWeight: '500' }}>
                {(reelsEngagement * 100).toFixed(2)} %
              </span>
            </Box>
            <Box
              className="box-wrapper-shadow grid-item nopadding"
              sx={{
                maxWidth: '220px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '3rem',
              }}
            >
              <img
                src={'/images/play.png'}
                style={{ width: 'auto', height: '1.5rem' }}
                className="mgr10"
              />
              <span sx={{ fontSize: '24px', fontWeight: '500' }}>
                {reelsViews < 0 ? '-' : evaluateValue(reelsViews)}
              </span>
            </Box>
          </Box>

          <Box
            sx={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '.5rem',
              marginTop: '1rem',
            }}
          >
            <span>{lang[locale].recentPosts}</span>
          </Box>

          <Box
            className="wrapper-grid"
            sx={{ gridTemplateColumns: '1fr 1fr 1fr' }}
          >
            {_.map(
              reels.items,
              (itm, idx) =>
                idx < 6 && (
                  <Box
                    key={idx}
                    className="box-wrapper-shadow grid-item nopadding"
                    sx={{ maxWidth: '220px' }}
                  >
                    <Box className="subtitle1 mgl5 mgt5">
                      {process.env.NEXT_PUBLIC_REGION == 'SG'
                        ? new Date(itm.taken_at * 1000).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            },
                          )
                        : new Date(itm.taken_at * 1000).getFullYear() +
                          '年' +
                          (new Date(itm.taken_at * 1000).getMonth() + 1) +
                          '月' +
                          new Date(itm.taken_at * 1000).getDate() +
                          '日'}
                    </Box>
                    <Box
                      component="a"
                      href={`${itm.video_url}`}
                      target="_blank"
                    >
                      <RelativeImageDetail
                        sx={{ height: '150px !important' }}
                        imgSrc={thumbs[12 + idx] ?? ''}
                      />
                    </Box>
                    <Box display={'flex'} className="mgb5 mgt5">
                      <Box
                        className="mgr5 mgl5"
                        sx={{
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={'/images/smallheart.png'}
                          style={{ width: '12px', height: '10px' }}
                          className="mgr10"
                        />
                        {itm.like_count < 0
                          ? '-'
                          : evaluateValue(itm.like_count)}
                      </Box>
                      <Box
                        className="mgr5 mgl5"
                        sx={{
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={'/images/comment.png'}
                          style={{ width: '12px', height: '10px' }}
                          className="mgr10"
                        />
                        {itm.comment_count < 0
                          ? '-'
                          : evaluateValue(itm.comment_count)}
                      </Box>
                      <Box
                        className="mgr5 mgl5"
                        sx={{
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={'/images/play.png'}
                          style={{ width: '12px', height: '10px' }}
                          className="mgr10"
                        />
                        {itm.view_count < 0
                          ? '-'
                          : evaluateValue(itm.view_count)}
                      </Box>
                    </Box>
                    <Box className={classes.ellipseWrapper}>
                      <Typography className={classes.ellipseCaption}>
                        {itm.caption ? itm.caption.text : ''}
                      </Typography>
                    </Box>
                  </Box>
                ),
            )}
          </Box>
        </>
      )}

      <Box
        className="wrapper-grid"
        sx={{ gridTemplateColumns: '1fr 1fr', marginTop: '.5rem' }}
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
        <Box className="box-wrapper-shadow grid-item leftalign">
          <Box className="subtitle1" sx={{ display: 'flex' }}>
            {lang[locale].following}
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].followingInfo}
            />
          </Box>
          <Box>
            <Chart
              height="250"
              options={chartOptions2}
              series={chartSeries2}
              type="area"
            />
          </Box>
        </Box>
      </Box>

      <Box
        className="wrapper-grid"
        sx={{ gridTemplateColumns: '2fr 1fr', marginTop: '.5rem' }}
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
              height="350"
              options={chartOptions3}
              series={chartSeries3}
              type="bar"
            />
          </Box>
        </Box>
        <Box className="box-wrapper-shadow grid-item leftalign">
          <Box
            className="subtitle1"
            sx={{ display: 'flex', alignItems: 'flex-end' }}
          >
            {lang[locale].lookalikes}
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].lookalikesInfo}
            />
          </Box>
          {_.map(
            lookalikes,
            (itm, idx) =>
              idx < 5 && (
                <Box
                  key={idx}
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      className="mgr5"
                      component={LazyLoadImage}
                      effect="blur"
                      src={itm.picture}
                      width={'45px'}
                      height={'45px'}
                      sx={{ borderRadius: '50%', marginTop: '.5rem' }}
                    />
                    <Box>
                      <Box className={classes.lookname}>{itm.fullname}</Box>
                      <Box
                        className={classes.lookshortname}
                        component="a"
                        href={itm.url}
                      >
                        @{itm.username}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ),
          )}
        </Box>
      </Box>

      <Box
        className="wrapper-grid"
        sx={{ gridTemplateColumns: '2fr 1fr', marginTop: '.5rem' }}
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
        <Box className="box-wrapper-shadow grid-item leftalign">
          <Box className="subtitle1" sx={{ display: 'flex' }}>
            {lang[locale].popularHashtagsAndMentions}
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].popularHashtagsAndMentionsInfo}
            />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <>
              {_.map(
                hashtags,
                (itm, idx) =>
                  idx < 6 && (
                    <Box
                      key={idx}
                      className={`genre-span ${classes.fontsize12}`}
                    >
                      #{itm.tag}
                    </Box>
                  ),
              )}
              {_.map(
                mentions,
                (itm, idx) =>
                  idx < 6 && (
                    <Box
                      key={idx}
                      className={`genre-span ${classes.fontsize12}`}
                    >
                      @{itm.tag}
                    </Box>
                  ),
              )}
            </>
          </Box>
        </Box>
      </Box>

      <Box
        className="box-wrapper-shadow grid-item leftalign"
        sx={{ marginTop: '.5rem' }}
      >
        <Box className="subtitle1" sx={{ display: 'flex' }}>
          {lang[locale].hashtagEngagement}
          <RoundInfo
            sx={{ marginLeft: '.5rem' }}
            caption={<Box>{lang[locale].hashtagEngagementInfo}</Box>}
          />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          {_.map(
            _.orderBy(hashtagengage, ['weight'], ['desc']),
            (itm, idx) =>
              idx < 12 && (
                <Box
                  key={idx}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    className={`genre-span ${classes.fontsize12} text-ellipse text-width-120`}
                  >
                    #{itm.tag}
                  </Box>
                  <span>{`${formatter.format(itm.weight)}%`}</span>
                </Box>
              ),
          )}
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
            brandAffinity,
            (itm, idx) =>
              idx < 5 && (
                <Box key={idx} className="interest-span">
                  {itm.name}
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
            interests,
            (itm, idx) =>
              idx < 5 && (
                <Box key={idx} className="interest-span">
                  {getMatchInterests(itm.name)}
                </Box>
              ),
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PopularPosts;
