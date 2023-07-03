import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import Constant from 'constants/constants';

const CardImage = ({ data, handleOpen }) => {
  const [hover, setHover] = useState(false);
  const [imageNum, setImageNum] = useState(1);
  const candidate = data?.image_versions2?.candidates[0];
  const aspectRatio = candidate
    ? `${candidate.width}/${candidate.height}`
    : '9/16';

  const getUrl = (src) => {
    return src.startsWith('https://astream-stories-image')
      ? src
      : `/api/imageFetcher?imageUrl=${encodeURIComponent(src)}`;
  };

  const loaderProp = ({ src }) => {
    return getUrl(src);
  };

  const MediaImage = ({ index, src }) => {
    return (
      <Image
        key={index}
        src={src}
        layout="fill"
        loader={loaderProp}
        objectFit={'contain'}
        blurDataURL={Constant.blurImage}
        loading="lazy"
        style={{
          aspectRatio,
        }}
      />
    );
  };

  return (
    <Box
      className="card_image"
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
      onClick={() => handleOpen(data?.pk)}
    >
      <Carousel
        sx={{ aspectRatio }}
        autoPlay={false}
        cycleNavigation={false}
        className="instagram_carousel"
        navButtonsWrapperProps={{
          className: 'nav_button_wrapper',
        }}
        navButtonsAlwaysVisible={hover === true}
        onChange={(now) => setImageNum(now + 1)}
        indicatorContainerProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <img src="/images/panda.png" />
        <img src="/images/images (1).jfif" />
        <img src="/images/images (2).jfif" />
        <video
          className="video"
          autobuffer="true"
          loop
          id="myVideo"
          playsInline
          width="100%"
          height="100%"
          //          poster={getUrl(data?.image_versions2.candidates[0].url)}
          style={{
            zIndex: 10000,
            minWidth: '100%',
            maxWidth: '100%',
            aspectRatio,
          }}
          controls
          preload="none"
        >
          <source src={'/images/rain.mp4'} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        {/* {(data?.carousel_media_count ?? 0) === 0 ? (
          <MediaImage
            src={data?.display_url ?? '/images/instagram_symbol.png'}
          />
        ) : (
          data?.carousel_media?.map((itm, index) => {
            return (
              <MediaImage
                index={index}
                src={itm.display_url ?? '/images/instagram_symbol.png'}
              />
            );
          })
        )} */}
      </Carousel>
      <Box className="symbol">
        <img src="/images/instagram_symbol.png" alt="instagram_symbol" />
        <span style={{ fontWeight: 'bold' }}>{imageNum}</span>
        {hover && <span>/ {data?.carousel_media?.length ?? 0}</span>}
      </Box>
    </Box>
  );
};

export default CardImage;
