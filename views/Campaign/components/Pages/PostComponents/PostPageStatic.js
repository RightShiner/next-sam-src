/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Box, Paper, Skeleton } from '@mui/material';
import { avg, evaluateValue } from 'constants/constants';

const PostPageStatic = ({ posts, originData, loading }) => {
  let follower_sum = 0;
  for (const item of originData) {
    follower_sum += item?.infProfile?.profile?.followers ?? 0;
  }

  let alert = 0;
  for (const item of posts) {
    if (item.isMissingTags) alert++;
  }
  let engagement = posts?.map((post) => {
    return post?.engagement ?? 0;
  });
  let like = posts?.map((post) => {
    return post?.like_count ?? 0;
  });
  let comment = posts?.map((post) => {
    return post?.comment_count ?? 0;
  });

  return (
    <Paper className="static">
      <Box className="valueItemContainer">
        <Box className="valueItem">
          <p className="title">投稿</p>
          {loading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{posts?.length}</p>
          )}
        </Box>
        <Box className="valueItem">
          <p className="title">アラート</p>
          {loading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{alert}</p>
          )}
        </Box>
        <Box className="valueItem" sx={{ minWidth: '16%' }}>
          <p className="title">投稿アカウント</p>
          {loading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{originData?.length}</p>
          )}
        </Box>
      </Box>
      <Box className="valueItemContainer">
        <Box className="valueItem">
          <p className="title">合計フォロワー数</p>
          {loading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{follower_sum}</p>
          )}
        </Box>
        <Box className="valueItem">
          <p className="title">平均 EGM</p>
          {loading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{avg(engagement).toFixed(2) + '%'}</p>
          )}
        </Box>
        <Box className="valueItem" sx={{ minWidth: '16%' }}>
          <p className="title">平均 いいね</p>
          {loading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{evaluateValue(avg(like))}</p>
          )}
        </Box>
        <Box className="valueItem">
          <p className="title">平均 コメント</p>
          {loading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value"> {evaluateValue(avg(comment))}</p>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default PostPageStatic;
