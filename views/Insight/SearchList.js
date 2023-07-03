import _ from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { Instagram, YouTube, TikTok } from './components';
import { FilterSelect, InfluencerBrief } from '../Common';
import Lang from 'constants/lang';
import Constant from 'constants/constants';
import { useRouter } from 'next/router';

const SearchList = ({ user, tags }) => {
  const { locale } = useRouter();
  const [selType, onSelect] = useState(Constant.snsInstagram);

  return (
    <Fixed userInfo={user} paidOnly={true}>
      <Container className="research content-wrapper">
        <Box marginTop={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            {Lang[locale].nav.insightlist}
          </Typography>
          <Typography gutterBottom>{Lang[locale].label.searchfromsite}</Typography>
        </Box>
        <Box marginTop={4}>
          <FilterSelect curType={selType} onSelect={onSelect} />
        </Box>
        <Box marginTop={2}>
          <Instagram
            user={user}
            tags={tags}
            selected={selType === Constant.snsInstagram}
          />
          <YouTube
            user={user}
            tags={tags}
            selected={selType === Constant.snsYoutube}
          />
          <TikTok
            user={user}
            tags={tags}
            selected={selType === Constant.snsTiktok}
          />
        </Box>
        <InfluencerBrief />
      </Container>
    </Fixed>
  );
};

SearchList.propTypes = {
  accounts: PropTypes.array,
};

export default SearchList;
