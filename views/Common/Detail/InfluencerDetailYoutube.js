import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Dialog, DialogContent } from '@mui/material';
import HeaderYoutube from './HeaderYoutube';
import PopularPostsYoutube from './PopularPostsYoutube';
import AudienceDataYoutube from './AudienceDataYoutube';
import AudienceCommentersYoutube from './AudienceCommentersYoutube';
import NotableYoutube from './NotableYoutube';
import HashTagYoutube from './HashTagYoutube';
import SponsorPostsYoutube from './SponsorPostsYoutube';

export default function InfluencerDetailYoutube({
  open,
  setDownloadEnabled,
  data,
  enthinity,
  language,
  ages,
  agesrange,
  countries,
  cities,
  brand,
  interest,
}) {
  return (
    <Box>
      <HeaderYoutube
        data={data.profile}
        views={data.avgViews}
        comments={data.avgComments}
        engagements={data.avgEngagements}
        likes={data.avgLikes}
        recents={data.recentPosts ?? []}
      />
      <PopularPostsYoutube
        data={data.recentPosts ?? []}
        statHistory={data.statHistory ?? []}
        recentPosts={data.recentPosts ?? []}
        lookalikes={data.audience?.audienceLookalikes ?? []}
        open={open}
      />
      <AudienceDataYoutube data={data.audience} open={open} />
      {data.audienceCommenters && (
        <AudienceCommentersYoutube data={data.audienceCommenters} />
      )}
      <NotableYoutube
        followers={data.audience?.notableUsers ?? []}
        commenters={data.audienceCommenters?.notableUsers ?? []}
        lookalikes={data.audience?.audienceLookalikes ?? []}
        open={open}
        setDownloadEnabled={setDownloadEnabled}
      />
      <HashTagYoutube
        followers={data.profile.followers}
        avgs={data.stats ? data.stats.avgLikes.value : 0}
        data={data.hashtags}
        mentions={data.mentions}
        genderCommenters={data.audienceCommenters?.genders ?? []}
        genderfollowers={data.audience?.genders ?? []}
        enthinity={enthinity}
        language={language}
        agesrange={agesrange}
        ages={ages}
        countries={countries}
        cities={cities}
        brand={brand}
        interest={interest}
      />
      <SponsorPostsYoutube data={data.popularPosts} open={open} />
    </Box>
  );
}
