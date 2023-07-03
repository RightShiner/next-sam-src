import React, { useState, useRef } from 'react';
import { Box } from '@mui/material';

import { numToDuration } from 'libs/commonFunc';

const CardVideo = ({ data, handleOpen }) => {
  const videoElement = useRef(null);

  const candidate = data?.image_versions2?.candidates[0];
  const aspectRatio = candidate
    ? `${candidate.width}/${candidate.height}`
    : '9/16';

  const getUrl = (src) => {
    try {
      return src.startsWith('https://astream-stories-image')
        ? src
        : `/api/imageFetcher?imageUrl=${encodeURIComponent(src)}`;
    } catch (e) {
      console.error('cardvideo', e);
    }
  };

  return (
    <>
      <Box pb={1} onClick={() => handleOpen(data?.pk)} className="card_video">
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
          style={{
            zIndex: 10000,
            minWidth: '100%',
            maxWidth: '100%',
            aspectRatio,
          }}
          controls
          preload="none"
        >
          <source src={getUrl(data?.video_url)} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <Box className="symbol">
          <img src="/images/reel_symbol.png" alt="reel_symbol" />
          <span style={{ fontWeight: 'bold' }}>
            {numToDuration(data?.video_duration)}
          </span>
        </Box>
      </Box>
    </>
  );
};

export default CardVideo;
