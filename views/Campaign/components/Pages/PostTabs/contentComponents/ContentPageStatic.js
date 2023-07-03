/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Box, Paper, Skeleton } from '@mui/material';
import { avg, evaluateValue } from 'constants/constants';

const ContentPageStatic = ({ data, fetchDone }) => {
  let posts = [];
  data?.map((item, key) => {
    posts.push(...item.contents);
  });
  let todayPosts = posts?.filter((post) => {
    const today = new Date().toLocaleDateString('ja-JA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return post.taken_at === today;
  });
  let engagement = posts?.map((post) => {
    let likesCount = post?.like_count ?? 0;
    let commentsCount = post?.comment_count ?? 0;
    let followersCount = post?.inf_profile?.profile.followers ?? 0;
    return followersCount > 0
      ? ((likesCount + commentsCount) / followersCount) * 100
      : 0;
  });
  let like = posts?.map((post) => {
    return post?.like_count ?? 0;
  });
  let comment = posts?.map((post) => {
    return post?.comment_count ?? 0;
  });
  let play = posts?.map((post) => {
    return post?.play_count ?? 0;
  });
  let view = posts?.map((post) => {
    return post?.view_count ?? 0;
  });

  return (
    <Paper
      sx={{
        padding: '10px 0',
        position: 'relative',
      }}
    >
      <Box className="valueItemContainer">
        <Box className="valueItem">
          {!fetchDone ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{posts.length}</p>
          )}
          <p className="title">総投稿数</p>
        </Box>
        <Box className="valueItem">
          {!fetchDone ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{todayPosts.length}</p>
          )}
          <p className="title">本日投稿数</p>
        </Box>
        <Box className="valueItem" sx={{ minWidth: '16%' }}>
          {!fetchDone ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{avg(engagement).toFixed(2) + '%'}</p>
          )}
          <p className="title">平均エンゲージメント</p>
        </Box>
        <Box className="valueItem">
          {!fetchDone ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value"> {evaluateValue(avg(like))}</p>
          )}
          <p className="title">平均いいね数</p>
        </Box>
        <Box className="valueItem">
          {!fetchDone ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{evaluateValue(avg(comment))}</p>
          )}
          <p className="title">平均コメント数</p>
        </Box>
        <Box className="valueItem">
          {!fetchDone ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{evaluateValue(avg(play))}</p>
          )}
          <p className="title">平均再生数</p>
        </Box>
        <Box className="valueItem">
          {!fetchDone ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{evaluateValue(avg(view))}</p>
          )}
          <p className="title">平均動画閲覧数</p>
        </Box>
      </Box>
    </Paper>
  );
};

export default ContentPageStatic;
