import React, { useState, useRef } from 'react';
import { Box } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import Tooltip from './Tooltip';

const CardVideo = ({ data, classes }) => {
  const [hover, setHover] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
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
      console.error('cardvideo', data);
    }
  };

  const controlPlay = () => {
    setPlaying(!isPlaying);
    if (isPlaying) {
      videoElement.current.pause();
    } else {
      videoElement.current.play();
    }
  };

  const components = {
    false: PlayCircleOutlineIcon,
    true: PauseCircleOutlineIcon,
  };

  const TogglePlay = components[isPlaying];

  return (
    <>
      <Box
        pb={1}
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseOut={() => {
          setHover(false);
        }}
        className={classes.video}
      >
        <video
          class="video"
          autobuffer="true"
          ref={videoElement}
          loop
          id="myVideo"
          playsInline
          width="100%"
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
        <Box className="play">
          <TogglePlay
            onClick={controlPlay}
            sx={{ opacity: hover ? '1' : '0', transition: '200ms' }}
          />
        </Box>
        <Box className={classes.typeTopRight}>
          <Tooltip title="リール" placement="top">
            <MovieIcon />
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};

export default CardVideo;
