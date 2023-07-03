/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Box, Paper, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';

const lang = {
  en: {
    people: 'Number of people',
    follower: 'Follower',
    money: 'Amount of money',
    cancel: 'Stop',
    shipped: 'Item shipped',
    draft: 'Waiting for draft',
    post: 'Waiting for post',
    insight: 'Waiting for insight',
    end: 'End',
  },
  jp: {
    people: '人数',
    follower: 'フォロワー',
    money: '金額',
    cancel: '中止',
    shipped: '商品発送済み',
    draft: '下書き待ち',
    post: '本投稿待ち',
    insight: 'インサイト待ち',
    end: '終了',
  },
};

const PostPageStatic = ({ isloading, getMembers }) => {
  const { locale } = useRouter();
  const formatterInt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });
  const [staticInfo, setStaticInfo] = useState({
    mems: 0,
    followers: 0,
    amount: 0,
    stops: 0,
    sells: 0,
    writings: 0,
    posts: 0,
    insights: 0,
    completes: 0,
  });

  useEffect(() => {
    let datas = getMembers();
    if (!datas || datas.length < 1) return;

    let followers = 0,
      amount = 0,
      stops = 0,
      sells = 0;
    let writings = 0,
      posts = 0,
      insights = 0,
      completes = 0;

    _.map(datas, (itm) => {
      if (itm.pstatus === 1) {
        //中止,
        stops++;
      } else if (itm.pstatus === 2) {
        //商品発送済み
        sells++;
      } else if (itm.pstatus === 3) {
        //下書き待ち
        writings++;
      } else if (itm.pstatus === 4) {
        //本投稿待ち
        posts++;
      } else if (itm.pstatus === 5) {
        //インサイト待ち
        insights++;
      } else {
        //終了
        completes++;
      }

      followers += itm.followers;
      amount += itm.amount;
    });

    setStaticInfo({
      mems: datas.length,
      followers: followers,
      amount: amount,
      stops: stops,
      sells: sells,
      writings: writings,
      posts: posts,
      insights: insights,
      completes: completes,
    });
  }, [getMembers]);

  return (
    <Paper
      sx={{
        padding: '10px 0',
      }}
    >
      <Box className="valueItemContainer">
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.mems)}</p>
          )}
          <p className="title">{lang[locale].people}</p>
        </Box>
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.followers)}</p>
          )}
          <p className="title">{lang[locale].follower}</p>
        </Box>
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.amount)}</p>
          )}
          <p className="title">{lang[locale].money}</p>
        </Box>
      </Box>
      <Box className="valueItemContainer">
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.stops)}</p>
          )}
          <p className="title">{lang[locale].cancel}</p>
        </Box>
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.sells)}</p>
          )}
          <p className="title">{lang[locale].shipped}</p>
        </Box>
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.writings)}</p>
          )}
          <p className="title">{lang[locale].draft}</p>
        </Box>
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.posts)}</p>
          )}
          <p className="title">{lang[locale].post}</p>
        </Box>
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.insights)}</p>
          )}
          <p className="title">{lang[locale].insight}</p>
        </Box>
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.completes)}</p>
          )}
          <p className="title">{lang[locale].end}</p>
        </Box>
      </Box>
    </Paper>
  );
};

export default PostPageStatic;
