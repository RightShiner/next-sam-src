/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Box, Button, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { AccountItem } from './Contents';
import Lang from 'constants/lang';
import { useRouter } from 'next/router';

const lang = {
  en: { noResult: 'There is no search result' },
  jp: { noResult: '検索結果がありません' },
};

const SearchContent = ({ accounts, tags, loadMorePage }) => {
  const { locale } = useRouter();
  const [sortOrder, setSortOrder] = useState('followers');
  const [sortDirection, setSortDirection] = useState('desc');

  const changeSort = (order) => {
    if (order === sortOrder) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
      return;
    }

    setSortOrder(order);
    setSortDirection('desc');
  };

  return (
    <Box className="research-content" sx={{ marginTop: '32px !important' }}>
      <Box className="research-content-header research-content-insight-grid">
        <Box sx={{ textAlign: 'center' }}>
          <Box
            component={LazyLoadImage}
            effect="blur"
            src={'/images/svgs/star.svg'}
            width={'20px'}
            height={'20px'}
          />
        </Box>
        <Box>ID</Box>
        <Box
          style={{ display: 'flex', cursor: 'pointer' }}
          onClick={(e) => changeSort('followers')}
        >
          {Lang[locale].caption.followers}
          {sortOrder === 'followers' && (
            <>
              {sortDirection === 'desc' ? (
                <ArrowDownwardIcon fontSize="small" />
              ) : (
                <ArrowUpwardIcon fontSize="small" />
              )}
            </>
          )}
        </Box>
        <Box
          style={{ display: 'flex', cursor: 'pointer' }}
          onClick={(e) => changeSort('engage')}
        >
          {Lang[locale].caption.engagement}
          {sortOrder === 'engage' && (
            <>
              {sortDirection === 'desc' ? (
                <ArrowDownwardIcon fontSize="small" />
              ) : (
                <ArrowUpwardIcon fontSize="small" />
              )}
            </>
          )}
        </Box>
        <Box>{Lang[locale].caption.tag}</Box>
        <Box></Box>
      </Box>
      {accounts.length < 1 ? (
        <Typography style={{ textAlign: 'center' }}>
          {lang[locale].noResult}
        </Typography>
      ) : (
        _.map(_.orderBy(accounts, [sortOrder], [sortDirection]), (itm) => (
          <AccountItem itm={itm} key={itm._id} tags={tags} />
        ))
      )}
      <Box className="load-more">
        <Button
          className="active"
          onClick={(e) => {
            loadMorePage();
          }}
        >
          {Lang[locale].caption.nextpage}
        </Button>
      </Box>
    </Box>
  );
};

export default SearchContent;
