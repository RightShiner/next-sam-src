/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import clsx from 'clsx';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useMainContext } from 'context/MainContext';
import { SaveDlg } from 'views/Common';
import Keyword from 'constants/lang';
import RelativeImage from 'components/RelativeImage';
import { evaluateValue, getSortedTags } from 'constants/constants';
import { useRouter } from 'next/router';

export default function SearchItem({
  itm,
  cattype,
  setCampaign,
  disabled,
  isShowEngagementRateOnly = false,
}) {
  const { locale } = useRouter();
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const {
    setInfluencerCollapsable,
    setSelectedInfluencer,
    selectedInfluencer,
  } = useMainContext();

  const closeDlg = () => {
    setAnchorEl(null);
  };

  const influencerClicked = (e) => {
    // if (itm.profile?.isPrivate) return;

    setInfluencerCollapsable(false);
    setSelectedInfluencer({
      id: itm.userId,
      username: itm.profile.username,
      type: cattype,
      avgViews: itm.profile?.averageViews ?? 0,
    });
  };

  return (
    <Box
      className={clsx(
        'research-content-item',
        'research-content-account-grid',
        'box-wrapper-shadow',
        `${disabled ? 'disabled' : ''}`,
        `${
          selectedInfluencer && selectedInfluencer.id === itm.userId
            ? 'influencer-detail-active'
            : ''
        }`,
      )}
      onClick={influencerClicked}
    >
      <Box className="profile">
        <RelativeImage
          isRound
          isAvatar
          imgSrc={itm.profile.picture}
          sx={{
            width: '3.125rem !important',
            height: '3.125rem !important',
            margin: '1rem',
          }}
        />
        <Box className="instagram">
          <Box>{itm.profile.fullname}</Box>
          <a
            className="instagram-link"
            href={itm.profile.url}
            target="_blank"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {itm.profile.username
              ? '@' + itm.profile.username
              : itm.profile.fullname}
          </a>
        </Box>
      </Box>
      <Box className="followers">
        <Box className="first">{evaluateValue(itm.profile.followers)}</Box>
        <Box className="second">{Keyword[locale].caption.follower}</Box>
      </Box>
      <Box className="followers">
        <Box className="first">
          {!isShowEngagementRateOnly && (
            <>
              {evaluateValue(itm.profile.engagements)}
              <span>{`(${formatter.format(
                itm.profile.engagementRate * 100,
              )}%)`}</span>
            </>
          )}
          {isShowEngagementRateOnly && (
            <>
              <span>{`${formatter.format(
                itm.profile.engagementRate * 100,
              )}%`}</span>
            </>
          )}
        </Box>
        <Box className="second">{Keyword[locale].caption.engagement}</Box>
      </Box>
      <Box
        sx={{
          marginTop: '.5rem',
          display: 'flex',
          alignItems: 'center',
          columnGap: '.5rem',
          rowGap: '.5rem',
          flexWrap: 'wrap',
        }}
      >
        {_.map(getSortedTags(itm.tags), (itm, idx) =>
          _.map(itm.members, (curMem) => (
            <span
              key={curMem._id}
              style={{
                border: `1px solid ${curMem.color}`,
                color: `${curMem.color}`,
                padding: '.2rem',
                borderRadius: '.2rem',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              {curMem.name}
            </span>
          )),
        )}
      </Box>
      <Box
        className="action"
        sx={{ visibility: disabled ? 'hidden' : 'visible' }}
      >
        <Box className="relative-action">
          <Button
            disabled={false /*itm.profile?.isPrivate*/}
            onClick={(e) => {
              e.stopPropagation();
              setAnchorEl(e.currentTarget);
            }}
          >
            <svg
              fill="none"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.67 12l1.33.67V2c0-.73-.6-1.33-1.33-1.33H5.99c-.73 0-1.32.6-1.32 1.33h6.66c.74 0 1.34.6 1.34 1.33V12zM10 3.33H3.33C2.6 3.33 2 3.93 2 4.67v10.66l4.67-2 4.66 2V4.67c0-.74-.6-1.34-1.33-1.34z"></path>
            </svg>
            <span>{Keyword[locale].btn.register}</span>
          </Button>
        </Box>
      </Box>

      <SaveDlg
        anchorEl={anchorEl}
        closeDlg={closeDlg}
        infId={itm.userId}
        catType={cattype}
        avgViews={itm.profile?.averageViews ?? 0}
        setCampaign={setCampaign}
      />
    </Box>
  );
}

SearchItem.propTypes = {
  itm: PropTypes.object.isRequired,
  cattype: PropTypes.string,
};
