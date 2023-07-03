import React from 'react';
import { Box, Typography } from '@mui/material';
import Tooltip from './Tooltip';
import Image from 'next/image';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
const { useState, useRef } = React;
import Constant from 'constants/constants';

const CardStory = ({ data, classes }) => {
  let username = [];
  let mentions = data?.reel_mentions ?? [];
  mentions.map((mention) => {
    username.push('@' + mention?.user.username);
  });
  const candidate = data?.image_versions2?.candidates[0];
  const aspectRatio = candidate
    ? `${candidate.width}/${candidate.height}`
    : '9/16';
  const isVideo = (data?.video_versions?.[0]?.url ?? '').startsWith(
    'https://astream-stories',
  );

  const [hover, setHover] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const videoElement = useRef(null);

  const loaderProp = ({ src }) => {
    return getUrl(src);
  };

  const getUrl = (src) => {
    try {
      return src.startsWith('https://astream-stories-image')
        ? src
        : `/api/imageFetcher?imageUrl=${encodeURIComponent(src)}`;
    } catch (e) {
      console.error('cardstory', data);
    }
  };

  const MediaImage = ({ src, handleOpen }) => {
    return (
      <Image
        src={src}
        layout="fill"
        objectFit="contain"
        onClick={handleOpen}
        loader={loaderProp}
        blurDataURL={Constant.blurImage}
        loading="lazy"
        style={{
          aspectRatio,
        }}
      />
    );
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
      <Box className={classes.story}>
        <Box sx={{ aspectRatio }}>
          {isVideo && (
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
                height="100%"
                poster={getUrl(data?.image_versions2.candidates[0].url)}
                style={{ zIndex: 10000, maxWidth: '100%', aspectRatio }}
                controls
                preload="none"
              >
                <source
                  src={getUrl(data?.video_versions[0].url)}
                  type="video/mp4"
                />
                Your browser does not support HTML5 video.
              </video>
              <Box className="play">
                <TogglePlay
                  onClick={controlPlay}
                  sx={{ opacity: hover ? '1' : '0', transition: '200ms' }}
                />
              </Box>
            </Box>
          )}
          {!isVideo && (
            <MediaImage src={data?.image_versions2.candidates[0].url} />
          )}
        </Box>
        <Box className={classes.typeTopRight}>
          <Tooltip title="ストーリ" placement="top">
            <Image
              src={data?.inf_profile.profile.picture}
              width="100%"
              height="100%"
              loading="lazy"
            />
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ maxWidth: '240px', padding: '8px', display: 'flex' }}>
        <Typography
          sx={{
            fontSize: '1.4rem',
            color: '#868984',
            textDecoration: 'underline',
            wordBreak: 'break-all',
          }}
        >
          {username.join(', ')}
        </Typography>
      </Box>
      <Box className={classes.detail}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {data.taken_at}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default CardStory;
