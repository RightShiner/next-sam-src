import React from 'react';
import Box from '@mui/material/Box';
import GridOnIcon from '@mui/icons-material/GridOn';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import Tooltip from './Tooltip';
import Constant from 'constants/constants';

const CardMedia = ({ data, classes, handleOpen }) => {
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
      console.error('cardmedia', src);
    }
  };

  const loaderProp = ({ src }) => {
    return getUrl(src);
  };

  const MediaImage = ({ src, handleOpen }) => {
    return (
      <Image
        src={src}
        objectFit={'contain'}
        layout="fill"
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

  return (
    <Box pb={1} className={classes.media}>
      <Carousel
        sx={{ aspectRatio }}
        autoPlay={false}
        navButtonsProps={{
          style: {
            width: '33px',
            height: '33px',
          },
        }}
        indicatorContainerProps={{
          style: {
            position: 'absolute',
            bottom: '0px',
            zIndex: 1,
          },
        }}
        indicatorIconButtonProps={{
          style: {
            cursor: 'pointer',
            transition: '200ms',
            padding: 0,
            margin: '5px',
            color: '#afafaf',
            background: 'transparent',
            '&:hover': {
              color: '#1f1f1f',
            },
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: '#494949',
          },
        }}
      >
        {(data?.carousel_media_count ?? 0) === 0 ? (
          <MediaImage
            src={data?.image_versions2.candidates[0].url}
            handleOpen={handleOpen}
          />
        ) : (
          data?.carousel_media?.map((itm) => {
            return (
              <MediaImage
                src={itm.image_versions2.candidates[0].url}
                handleOpen={handleOpen}
              />
            );
          })
        )}
      </Carousel>
      <Box className={classes.typeTopRight}>
        <Tooltip title="フィード" placement="top">
          <GridOnIcon />
        </Tooltip>
      </Box>
    </Box>
  );
};

export default CardMedia;
