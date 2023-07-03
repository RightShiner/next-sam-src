import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Divider,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Slider from 'react-slick';

import RelativeImage from 'components/RelativeImage';
import { evaluateValue } from 'constants/constants';
import { numToDate, numToTime } from 'libs/commonFunc';
import {
  propertyKeys,
  mainPropertyKeys,
  audiencePropertyKeys,
} from 'constants/propertyKeys';
import { StatisticsTableBody, StatisticsTableHead } from './components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const type = {
  feed: 'フィード',
  reel: 'リール',
  story: 'ストーリー',
  movie: '動画',
  short: 'YouTubeショート',
};

const ManualStepConfirm = ({ members, property, catType, detailInfo }) => {
  return (
    <Box className="step_confirm">
      <Stack spacing={5} divider={<Divider flexItem />}>
        <Stack spacing={3}>
          <Typography className="title">アカウント</Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
          >
            <RelativeImage
              isRound
              imgSrc={members[0].avatar}
              sx={{
                width: '3.125rem !important',
                height: '3.125rem !important',
                margin: '.5rem',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ fontSize: '15px', color: '#303030' }}>
                {members[0].name}
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: 'rgba(48, 48, 48, 0.5)',
                }}
              >
                @{members[0].infName}
              </Typography>
            </Box>
            <Typography className="plain_text">
              {evaluateValue(members[0].followers)}
            </Typography>
            <Typography className="plain_text">
              {(members[0].engagerate * 100).toFixed(2)}%
            </Typography>
            <Typography className="plain_text">--</Typography>
          </Box>
          {catType !== 'tiktok' && (
            <>
              <Typography className="title">種類</Typography>
              <Typography px="10px" fontWeight="bold">
                {type[property.type]}
              </Typography>
            </>
          )}
          <Typography className="title">投稿日時</Typography>
          <Typography px="10px" fontWeight="bold">
            {numToDate(property.post_date)}
            <br />
            {numToTime(property.post_date)}
          </Typography>
        </Stack>
        <Stack spacing={3}>
          <Typography className="title">コンテンツ</Typography>
          <Slider
            className="slider"
            speed={500}
            arrows={false}
            infinite={false}
            autoplay={true}
            slidesToScroll={1}
            autoplaySpeed={2000}
            slidesToShow={5}
          >
            {property.display_url.map((item, key) => {
              return (
                <div key={key}>
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt="carousel"
                      width="140px"
                      height="175px"
                    />
                  ) : (
                    <video
                      class="video"
                      autobuffer="true"
                      loop
                      id="myVideo"
                      playsInline
                      width="100%"
                      height="100%"
                      style={{ zIndex: 10000 }}
                      controls
                      preload="none"
                    >
                      <source src={item.url} type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  )}
                </div>
              );
            })}
          </Slider>
          {catType === 'tiktok' && (
            <>
              <Typography className="title">使用された曲</Typography>
              <Typography
                px="10px"
                fontWeight="bold"
                sx={{ wordBreak: 'break-all' }}
              >
                {property?.song_used}
              </Typography>
            </>
          )}
          <Typography className="title">文章</Typography>
          <Typography
            px="10px"
            fontWeight="bold"
            sx={{ wordBreak: 'break-all' }}
          >
            {property?.caption}
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Box className="table_button_container">
            <TableContainer sx={{ minWidth: 420 }}>
              <Table
                size="small"
                stickyHeader
                aria-label="a dense table sticky table"
              >
                <StatisticsTableHead
                  kind="confirm"
                  columns={(property?.statistics ?? [{}]).length}
                  property={property}
                  title={catType === 'instagram' ? '項目' : 'パフォーマンス'}
                />
                <StatisticsTableBody
                  type="main"
                  kind="confirm"
                  columns={(property?.statistics ?? [{}]).length}
                  property={property}
                  rows={
                    catType === 'instagram' ? propertyKeys : mainPropertyKeys
                  }
                />
              </Table>
            </TableContainer>
          </Box>
          {catType !== 'instagram' && (
            <Box className="table_button_container">
              <TableContainer sx={{ minWidth: 420 }}>
                <Table
                  size="small"
                  stickyHeader
                  aria-label="a dense table sticky table"
                >
                  <StatisticsTableHead
                    title="視聴者"
                    kind="confirm"
                    columns={(property?.statistics ?? [{}]).length}
                    property={property}
                  />
                  <StatisticsTableBody
                    type="audience"
                    kind="confirm"
                    columns={(property?.statistics ?? [{}]).length}
                    property={property}
                    rows={audiencePropertyKeys}
                  />
                </Table>
              </TableContainer>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ManualStepConfirm;
