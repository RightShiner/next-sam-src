import _ from 'lodash';
import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import PopularPosts from './PopularPosts';
import AudienceData from './AudienceData';
import AudienceLikes from './AudienceLikes';
import Notable from './Notable';
import HashTag from './HashTag';
import SponsorPosts from './SponsorPosts';

export default function InfluencerDetailInstagram({
  open,
  data,
  feed,
  reels,
  igtv,
  enthinity,
  language,
  ages,
  agesrange,
  countries,
  cities,
  brand,
  interest,
  setDownloadEnabled,
}) {
  return (
    <Box>
      <Header
        data={data.profile}
        stats={data.stats}
        comments={data.avgComments}
      />
      <PopularPosts
        data={data.popularPosts ?? []}
        feed={feed}
        reels={reels}
        igtv={igtv}
        followers={data.profile.followers}
        statHistory={data.statHistory ?? []}
        recentPosts={data.recentPosts ?? []}
        hashtags={data.hashtags ?? []}
        mentions={data.mentions ?? []}
        hashtagengage={data.hashtagengage ?? []}
        brandAffinity={data.brandAffinity ?? []}
        interests={data.interests ?? []}
        lookalikes={data.audience?.audienceLookalikes ?? []}
        open={open}
      />
      <AudienceData data={data.audience} />
      {data.audienceLikers && <AudienceLikes data={data.audienceLikers} />}
      <Notable
        open={open}
        followers={data.audience?.notableUsers ?? []}
        likers={data.audienceLikers?.notableUsers ?? []}
        lookalikes={data.audience?.audienceLookalikes ?? []}
        setDownloadEnabled={setDownloadEnabled}
      />
      <HashTag
        followers={data.profile.followers}
        avgs={data.stats ? data.stats.avgLikes.value : 0}
        data={data.hashtags}
        engage={data.hashtagengage}
        mentions={data.mentions}
        genderlikers={data.audienceLikers?.genders ?? []}
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
      {data.sponsoredPosts && data.sponsoredPosts.length > 0 && (
        <SponsorPosts data={data.sponsoredPosts} open={open} />
      )}
    </Box>
  );
}
