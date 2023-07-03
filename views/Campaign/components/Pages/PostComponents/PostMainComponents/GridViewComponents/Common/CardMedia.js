import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import Image from 'next/image';

import { numToDuration } from 'libs/commonFunc';

const loaderProp = ({ src }) => {
  return getUrl(src);
};

const getUrl = (src) => {
  return src.startsWith('https://astream-stories-image')
    ? src
    : `/api/imageFetcher?imageUrl=${encodeURIComponent(src)}`;
};

const MediaImage = ({ src }) => {
  return <Image src={src} layout="fill" loader={loaderProp} />;
};

const CardMedia = ({ data, type, handleOpen }) => {
  const aspectRatio = type === 'tiktok' ? '9/16' : '5/3';
  const isVideo = data.display_url[0].type === 'video';

  const [hover, setHover] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const videoElement = useRef(null);

  const controlPlay = () => {
    if (isPlaying) {
      setPlaying(false);
      videoElement.current.pause();
    } else {
      setPlaying(true);
      videoElement.current.play();
    }
  };

  const components = {
    false: PlayCircleOutlineIcon,
    true: PauseCircleOutlineIcon,
  };

  const TogglePlay = components[isPlaying];

  const imgSrc = {
    tiktok: '/images/tiktok_symbol.png',
    movie: '/images/youtube_symbol.png',
    short: '/images/short_symbol.png',
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
            <Box
              pb={1}
              onMouseOver={() => {
                setHover(true);
              }}
              onMouseOut={() => {
                setHover(false);
              }}
              className="card_video"
            >
              <video
                className="video"
                autobuffer="true"
                ref={videoElement}
                loop
                id="myVideo"
                playsInline
                width="100%"
                height="100%"
                style={{ zIndex: 10000 }}
                controls
                preload="none"
              >
                <source src={data?.display_url[0].url} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
              <Box className="play">
                <TogglePlay
                  onClick={controlPlay}
                  sx={{ opacity: hover ? '1' : '0', transition: '200ms' }}
                />
              </Box>
              <Box className="symbol">
                <img src={imgSrc[data?.type]} alt="story_symbol" />
                <span style={{ fontWeight: 'bold' }}>
                  {numToDuration(data?.video_duration)}
                </span>
              </Box>
            </Box>
          )}
          {!isVideo && (
            <>
              <MediaImage src={data?.display_url[0].url} />
              <Box className="symbol">
                <img src={imgSrc[data?.type]} alt="story_symbol" />
                <span style={{ fontWeight: 'bold' }}>0:21</span>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CardMedia;
