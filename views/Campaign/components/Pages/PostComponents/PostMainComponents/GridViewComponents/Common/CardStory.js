import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';

import { numToDuration } from 'libs/commonFunc';
import Constant from 'constants/constants';

const CardStory = ({ data, handleOpen }) => {
  let username = [];
  let mentions = data?.reel_mentions ?? [];
  mentions.map((mention) => {
    username.push('@' + mention?.user.username);
  });
  const candidate = data?.image_versions2?.candidates[0];
  const aspectRatio = candidate
    ? `${candidate?.width ?? 9}/${candidate?.height ?? 16}`
    : '9/16';
  const isVideo = (data?.video_versions?.[0]?.url ?? '').startsWith(
    'https://astream-stories',
  );

  const videoElement = useRef(null);

  const loaderProp = ({ src }) => {
    return getUrl(src);
  };

  const getUrl = (src) => {
    return src.startsWith('https://astream-stories-image')
      ? src
      : `/api/imageFetcher?imageUrl=${encodeURIComponent(src)}`;
  };

  const MediaImage = ({ src }) => {
    return (
      <Image
        src={src}
        layout="fill"
        loader={loaderProp}
        loading="lazy"
        objectFit="contain"
        blurDataURL={Constant.blurImage}
        style={{
          aspectRatio,
        }}
      />
    );
  };

  return (
    <>
      <Box className="card_image" onClick={() => handleOpen(data?.pk)}>
        <Box
          sx={{
            aspectRatio,
            maxHeight: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {isVideo && (
            <Box pb={1} className="card_video">
              <video
                className="video"
                autobuffer="true"
                ref={videoElement}
                loop
                id="myVideo"
                playsInline
                width="100%"
                height="100%"
                poster={getUrl(data?.image_versions2.candidates[0].url)}
                style={{ zIndex: 10000 }}
                controls
                preload="none"
              >
                <source
                  src={getUrl(data?.video_versions[0].url)}
                  type="video/mp4"
                />
                Your browser does not support HTML5 video.
              </video>
              <Box className="symbol">
                <img src="/images/story_symbol.png" alt="story_symbol" />
                <span style={{ fontWeight: 'bold' }}>
                  {numToDuration(data?.video_duration)}
                </span>
              </Box>
            </Box>
          )}
          {!isVideo && (
            <>
              <MediaImage src={data?.image_versions2.candidates[0].url} />
              <Box className="symbol">
                <img src="/images/story_symbol.png" alt="story_symbol" />
                <span style={{ fontWeight: 'bold' }}>ストーリー</span>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CardStory;
