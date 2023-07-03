import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material';
import Link from 'next/link';
import { Box, Grid } from '@mui/material';
import { CardFooter, CardMedia, TagErrorDetail } from './common';
import CloseIcon from '@mui/icons-material/Close';
import RelativeImage from 'components/RelativeImage';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import JSZipUtils from 'jszip-utils';

const DetailDialog = ({
  open,
  onClose,
  data,
  date,
  header,
  isError,
  missingTags,
  classes,
}) => {
  const getUrl = (src) => {
    try {
      return src.startsWith('https://astream-stories-image')
        ? src
        : `/api/imageFetcher?imageUrl=${encodeURIComponent(src)}`;
    } catch (e) {
      console.error('detaildialog', data);
    }
  };

  let urls = [];
  let ext = data.type === 'feed' ? '.jpg' : '.mp4';
  if (data.type === 'feed') {
    if ((data?.carousel_media?.length ?? 0) === 0) {
      urls = [getUrl(data?.image_versions2.candidates[0].url)];
    } else {
      urls = data?.carousel_media?.map((itm) => {
        return getUrl(itm.image_versions2.candidates[0].url);
      });
    }
  }
  if (data.type === 'reel') {
    urls = [getUrl(data?.video_url)];
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

  const handleOpen = (e) => e.preventDefault();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        '& .MuiPaper-root ': {
          minWidth: '50em',
          bgcolor: isError && '#ffe4e4',
        },
      }}
    >
      <DialogContent>
        <Grid container spacing={5}>
          <Grid item md={4} xs={12}>
            <Box pb={2}>
              <Button
                className={classes.purpleButton}
                size="small"
                variant="outlined"
                href={`https://www.instagram.com/p/${data.code}`}
                target="_blank"
              >
                Instagramで投稿を見る
              </Button>
            </Box>
            <CardMedia data={data} classes={classes} handleOpen={handleOpen} />
            <Box py={2}>
              <Button
                size="small"
                variant="contained"
                onClick={handleDownload}
                startIcon={<CloudDownloadIcon />}
              >
                コンテンツをダウンロード
              </Button>
            </Box>
            <CardFooter data={data} classes={classes} />
          </Grid>
          <Grid
            item
            md={8}
            xs={12}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Box
              py={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {date}
              </Typography>
              <IconButton
                aria-label="close"
                size="small"
                onClick={onClose}
                sx={{
                  p: 0,
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box py={1} className={classes.modalAvatar}>
              <Avatar
                alt="Remy Sharp"
                src={header?.picture}
                aria-label="recipe"
              />
              <Link
                variant="body"
                component={'a'}
                target="_blank"
                href={header?.url ?? ''}
              >
                <a target="_blank">{'@' + header?.username}</a>
              </Link>
            </Box>
            <Box py={1} className={classes.person}>
              {data.usertags?.in?.map((itm, key) => {
                return (
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', m: '0.3em' }}
                  >
                    <RelativeImage
                      isRound
                      imgSrc={`/api/imageFetcher?imageUrl=${encodeURIComponent(
                        itm.user.profile_pic_url,
                      )}`}
                      sx={{
                        width: '1.3em!important',
                        height: '1.3em!important',
                        mr: '0.3em',
                      }}
                    />
                    <Link
                      component={'a'}
                      href={`https://www.instagram.com/${itm.user.full_name}`}
                    >
                      {'@' + itm.user.full_name}
                    </Link>
                  </Box>
                );
              })}
            </Box>
            <Box
              sx={{
                maxHeight: '22em',
                flex: '1 1 auto',
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                  width: '0px',
                  background: 'transparent',
                },
              }}
            >
              <Typography
                py={1}
                variant="body2"
                color="text.secondary"
                paragraph
                sx={{ lineHeight: '1.7em' }}
              >
                {data?.caption?.text}
              </Typography>
            </Box>
            {isError && <TagErrorDetail missingTags={missingTags} />}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
