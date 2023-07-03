import React from 'react';
import { Box, Avatar, IconButton, Skeleton } from '@mui/material';
import Link from 'next/link';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import JSZipUtils from 'jszip-utils';

const CardHeader = ({ data, headerData, classes }) => {
  const getUrl = (src) => {
    try {
      return src.startsWith('https://astream-stories-image')
        ? src
        : `/api/imageFetcher?imageUrl=${encodeURIComponent(src)}`;
    } catch (e) {
      console.error('cardheader', data);
    }
  };

  let urls = [];
  let ext = data.type === 'reel' ? '.mp4' : '.jpg';
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
  if (data.type === 'story') {
    urls = [getUrl(data?.image_versions2.candidates[0].url)];
  }

  const handleDownload = () => {
    const zip = new JSZip();
    let count = 0;
    const zipFilename = `${data?.inf_profile.profile.username}_${data?.pk}.zip`;
    urls.map(function(url, index) {
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(
        `/api/imageFetcher?imageUrl=${encodeURIComponent(url)}`,
        function(err, data) {
          if (err) {
            throw err; // or handle the error
          }
          zip.file(index + ext, data, { binary: true });
          count++;
          if (count == urls?.length) {
            zip.generateAsync({ type: 'blob' }).then(function(content) {
              saveAs(content, zipFilename);
            });
          }
        },
      );
    });
  };

  return (
    <Box pb={1} className={classes.header}>
      <Avatar alt="Remy Sharp" src={headerData?.picture} aria-label="recipe" />
      <Link variant="body" component={'a'} href={headerData?.url ?? ''}>
        <a target="_blank">{'@' + headerData?.username}</a>
      </Link>
      <IconButton variant="outlined" size="small">
        <CloudDownloadIcon onClick={handleDownload} />
      </IconButton>
    </Box>
  );
};

export default CardHeader;
