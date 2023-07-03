import React, { useContext } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Avatar,
  IconButton,
  DialogTitle,
  Stack,
  DialogActions,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
import { Box, Grid } from '@mui/material';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import JSZipUtils from 'jszip-utils';

import {
  CardImage,
  CardStory,
  CardVideo,
  CardMedia,
  TagErrorDetail,
} from '../PostMainComponents/GridViewComponents/Common';
import { modalContext } from '../PostPageMain';
import { evaluateValue } from 'constants/constants';
import { numToTime } from 'libs/commonFunc';

const getUrl = (src) => {
  return src?.startsWith('https://astream-stories-image')
    ? src.replace('.ap-northeast-1', '')
    : `/api/imageFetcher?imageUrl=${encodeURIComponent(src)}`;
};

const PostDetailDialog = ({ open, onClose, data, handleNext, handlePrev }) => {
  const { handleMenuOpen } = useContext(modalContext);
  const constant = {
    feed: { src: '/images/instagram_logo.png', text: 'instagram' },
    reel: { src: '/images/instagram_logo.png', text: 'instagram' },
    story: { src: '/images/instagram_logo.png', text: 'instagram' },
    tiktok: { src: '/images/tiktok_logo.png', text: 'tiktok' },
    movie: { src: '/images/youtube_logo.png', text: 'youtube' },
    short: { src: '/images/youtube_logo.png', text: 'youtube' },
  };

  let urls = [];
  let ext = '';
  if (data.type === 'feed') {
    ext = '.jpg';
    if ((data?.carousel_media?.length ?? 0) === 0) {
      urls = [getUrl(data?.display_url)];
    } else {
      urls = data?.carousel_media?.map((itm) => {
        return getUrl(itm.display_url);
      });
    }
  } else if (data.type === 'reel') {
    ext = '.mp4';
    urls = [getUrl(data?.video_url)];
  } else if (data.type === 'story') {
    const isVideo = data?.video_versions ? true : false;
    ext = isVideo ? '.mp4' : '.jpg';
    urls = isVideo
      ? [getUrl(data?.video_versions[0].url)]
      : [getUrl(data?.image_versions2.candidates[0].url)];
  } else {
    ext = data?.display_url?.[0].type === 'image' ? '.jpg' : '.mp4';
    urls = [getUrl(data?.display_url?.[0].url)];
  }

  const handleDownload = () => {
    const zip = new JSZip();
    const zipFilename = `${data?.inf_profile.profile.username}_${data?.pk}.zip`;
    urls.map(function(url, index) {
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(url, function(err, data) {
        if (err) {
          throw err; // or handle the error
        }
        zip.file(index + ext, data, { binary: true });
        if (index + 1 === urls.length) {
          zip
            .generateAsync({ type: 'blob' })
            .then((content) => saveAs(content, zipFilename));
        }
      });
    });
  };

  const handleOpen = () => (e) => e.preventDefault();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="post-dialog"
      sx={{
        '& .MuiPaper-root ': {
          minWidth: '50em',
          // bgcolor: isError && '#ffe4e4',
        },
      }}
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <img src={constant[data?.type]?.src} alt="logo" />
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
            投稿の詳細
          </Typography>
        </Stack>
        <Box aria-label="close" className="cross_symbol" onClick={onClose}>
          <span>&#10006;</span>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box className="post_detail_content">
          <Stack sx={{ minWidth: '42%' }} spacing="12px">
            {data?.type === 'feed' ? (
              <CardImage data={data} handleOpen={handleOpen} />
            ) : data?.type === 'reel' ? (
              <CardVideo data={data} handleOpen={handleOpen} />
            ) : data?.type === 'story' ? (
              <CardStory data={data} handleOpen={handleOpen} />
            ) : (
              <CardMedia data={data} handleOpen={handleOpen} />
            )}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <IconButton
                className="bar_download_button"
                sx={{ p: '8px!important' }}
                onClick={handleDownload}
              >
                <img src={'/images/monitoring/download.png'} alt="download" />
              </IconButton>
              <Button
                className="bar_download_button"
                sx={{
                  backgroundColor: '#814BC7!important',
                  color: '#fff!important',
                }}
              >
                {constant[data?.type]?.text + 'で確認'}
              </Button>
            </Stack>
          </Stack>
          <Stack spacing={2} flex="1">
            <Box display="flex" justifyContent="space-between">
              <Box className="account_detail_box">
                <Avatar
                  alt="account"
                  src={data?.inf_profile?.profile?.picture}
                  aria-label="recipe"
                  sx={{ width: '52px', height: '52px' }}
                />
                <Box>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {data?.inf_profile?.profile?.fullname}
                  </Typography>
                  <Typography sx={{ fontSize: '14px', color: '#3670C6' }}>
                    {'@' + data?.inf_profile?.profile?.username}
                  </Typography>
                </Box>
              </Box>
              <IconButton size="small">
                <MoreHorizIcon
                  onClick={handleMenuOpen(data?.pk)}
                  sx={{ color: 'rgba(48, 48, 48, 0.5)' }}
                />
              </IconButton>
            </Box>
            <Typography style={{ color: '#303030', fontSize: '14px' }}>
              {data?.caption?.text}
            </Typography>
            <Typography>
              <span style={{ color: '#814BC7' }}>
                {data?.hashtags?.map((item) => {
                  return '#' + item + ' ';
                })}
                {data?.mentions?.map((item) => {
                  return '@' + item + ' ';
                })}
              </span>
            </Typography>
            <Stack spacing={2} direction="row">
              <Stack spacing="4px" direction="row" alignItems="center">
                <img src="/images/small_engage.png" alt="engagement" />
                <span style={{ fontSize: '13px', color: '#303030' }}>
                  {' '}
                  {data?.engagement?.toFixed(2) + '%'}
                </span>
              </Stack>
              <Stack spacing="4px" direction="row" alignItems="center">
                <img src="/images/small_heart.png" alt="heart" />
                <span style={{ fontSize: '13px', color: '#303030' }}>
                  {data?.like_count < 0
                    ? '-'
                    : evaluateValue(data?.like_count ?? 0)}
                </span>
              </Stack>
              <Stack spacing="4px" direction="row" alignItems="center">
                <img src="/images/small_post.png" alt="small_post" />
                <span style={{ fontSize: '13px', color: '#303030' }}>
                  {data?.comment_count < 0
                    ? '-'
                    : evaluateValue(data?.comment_count ?? 0)}
                </span>
              </Stack>
            </Stack>
            <Box className="card_footer">
              <Typography>{data.taken_at}</Typography>
              <Typography>{numToTime(data.taken_at_org)}</Typography>
            </Box>
            {data?.isMissingTags && (
              <TagErrorDetail missingTags={data?.missingTags} />
            )}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          '& .MuiSvgIcon-root': {
            width: '12px',
            height: '12px',
          },
        }}
      >
        <IconButton>
          <ArrowBackIosIcon onClick={handlePrev} />
        </IconButton>
        <IconButton>
          <ArrowForwardIosIcon onClick={handleNext} />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default PostDetailDialog;
