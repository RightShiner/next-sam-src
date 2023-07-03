/* eslint-disable react/no-unescaped-entities */
import clsx from 'clsx';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMainContext } from 'context/MainContext';
import RelativeImage from 'components/RelativeImage';
import Keyword from 'constants/lang';
import { CP, SelectTagDlg } from 'views/Common';
import { evaluateValue, getSortedTags } from 'constants/constants';
import { useRouter } from 'next/router';

export default function AccountItem({ itm, tags }) {
  const { locale } = useRouter();
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });
  const [data, setData] = useState(itm);
  const [selId, setAccountId] = useState('');
  const closeCP = (val) => {
    setData({ ...data, star: val.star });
    setCurTags([...val.tags]);
    setAccountId('');
  };

  const cpBtnClicked = (e) => {
    e.stopPropagation();
    setAccountId(data._id);
  };

  const {
    setInfluencerCollapsable,
    setSelectedInfluencer,
    selectedInfluencer,
  } = useMainContext();
  const itemRowClicked = (e) => {
    if (selId !== '') return;

    setInfluencerCollapsable(false);
    setSelectedInfluencer({
      id: itm.infId,
      username: itm.infName,
      type: itm.type,
      avgViews: itm?.recycle ?? 0,
    });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const closeTagDlg = () => {
    setAnchorEl(null);
  };

  const setTags = (_id, name, color, isChecked) => {
    if (isChecked) {
      setCurTags([...curTags, { tagId: _id, name, color }]);
    } else {
      setCurTags(_.filter(curTags, (tag) => tag.tagId !== _id));
    }
  };

  const getCurrentTags = () => {
    let isExists = -1;
    let tmp = _.map(data.tags, (itm) => {
      isExists = _.findIndex(tags, (orgTag) => {
        return orgTag._id === itm;
      });

      if (isExists === -1) return { tagId: '' };

      return {
        tagId: itm,
        name: tags[isExists].name,
        color: tags[isExists].color,
      };
    });

    tmp = _.filter(tmp, (itm) => itm.tagId !== '');
    return tmp;
  };

  const [curTags, setCurTags] = useState(getCurrentTags());

  return (
    <Box
      className={clsx(
        'research-content-item',
        'research-content-insight-grid',
        'box-wrapper-shadow',
        `${
          selectedInfluencer && selectedInfluencer.id === data.infId
            ? 'influencer-detail-active'
            : ''
        }`,
      )}
      onClick={itemRowClicked}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <RelativeImage
          isRound
          imgSrc={itm.avatar}
          sx={{
            width: '3.125rem !important',
            height: '3.125rem !important',
            margin: '.5rem 1rem 0',
          }}
        />
        {/* <Box
          component={LazyLoadImage}
          effect="blur"
          src={'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D'}
          height={'3.125rem'}
          width={'3.125rem'}
          sx={{margin:'.5rem 1rem 0', borderRadius:'50%'}}
        /> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {Array.from({ length: data.star }, (_, i) => i).map((starItm) => (
            <Box
              key={starItm}
              component={LazyLoadImage}
              effect="blur"
              src={'/images/svgs/star.svg'}
              width={'15px'}
              height={'15px'}
            />
          ))}
          {Array.from({ length: 5 - data.star }, (_, i) => i).map((starItm) => (
            <Box
              key={starItm}
              component={LazyLoadImage}
              effect="blur"
              src={'/images/svgs/graystar.svg'}
              width={'15px'}
              height={'15px'}
            />
          ))}
        </Box>
      </Box>
      <Box className="instagram">
        <Box>{data.inf_doc.profile.fullname}</Box>
        <a className="instagram-link" href={data.link} target="_blank">
          @{data.inf_doc.profile.username}
        </a>
      </Box>
      <Box className="followers">
        <Box className="first">
          {evaluateValue(data.inf_doc.profile.followers)}
        </Box>
        <Box className="second">{Keyword[locale].caption.follower}</Box>
      </Box>
      <Box className="followers">
        <Box className="first">
          {evaluateValue(data.inf_doc.profile.engagements)}
          <span>{`(${formatter.format(
            data.inf_doc.profile.engagementRate * 100,
          )}%)`}</span>
        </Box>
        <Box className="second">{Keyword[locale].caption.engagement}</Box>
      </Box>
      <Box className="tags-wrapper">
        <Box
          // key={idx}
          sx={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '.5rem',
            rowGap: '.5rem',
            flexWrap: 'wrap',
            marginBottom: '.5rem',
          }}
        >
          {_.map(getSortedTags(curTags), (itm, idx) =>
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
          <Button
            startIcon={<AddIcon />}
            onClick={(e) => {
              e.stopPropagation();
              setAnchorEl(e.currentTarget);
            }}
          >
            追加
          </Button>
        </Box>
      </Box>
      <Box className="action">
        <Box className="relative-action">
          <Button onClick={cpBtnClicked}>
            <span>DB</span>
          </Button>
        </Box>
      </Box>
      <CP accountId={selId} stars={data.star} setCollapse={closeCP} />
      <SelectTagDlg
        anchorEl={anchorEl}
        closeDlg={closeTagDlg}
        accountId={itm._id}
        setTags={setTags}
      />
    </Box>
  );
}

AccountItem.propTypes = {
  itm: PropTypes.object.isRequired,
  campaigns: PropTypes.array,
};
