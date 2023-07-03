/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';

const TagSection = ({ data }) => {
  const [tags, setTags] = useState({});

  useEffect(() => {
    let hashtags = [];
    let mentions = [];
    let tags = [];
    JSON.parse(JSON.stringify(data ?? [])).map((item) => {
      (item?.contents ?? []).map((content) => {
        hashtags.push(...(content?.hashtags ?? []));
        mentions.push(...(content?.mentions ?? []));
        tags.push(...(content?.tags ?? []));
      });
    });
    setTags({
      hashtags,
      mentions,
      tags,
    });
  }, [data]);
  
  return (
    <Box className="tag_bar box">
      <Typography className="normal_text">使用された#と@</Typography>
      <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
        {(tags?.hashtags ?? []).map((item, key) => {
          return (
            <Box className="badge hashtag" key={key}>
              {'#' + item}
            </Box>
          );
        })}
        {(tags?.mentions ?? []).map((item, key) => {
          return (
            <Box className="badge mention" key={key}>
              {'@' + item}
            </Box>
          );
        })}
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
        {(tags?.tags ?? []).map((item, key) => {
          return (
            <Box className="badge tag" key={key}>
              {'#' + item}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default TagSection;
