import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { FilterSelect, InfluencerBrief, TermsAgree } from '../Common';
import { Instagram, Youtube, Tiktok } from './components';
import Keyword from 'constants/lang';
import Constants, { getMatchInterests } from 'constants/constants';
import { modashService } from 'services';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const Research = ({ userInfo, firstLogin, campaigns }) => {
  const { locale } = useRouter();
  const [isFirstLogin, setFirstLogin] = useState(firstLogin);
  const [selType, onSelect] = useState(Constants.snsInstagram);
  const [interests, setInterests] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    interests.length > 0 ||
      modashService
        .getInterests(Constants.snsInstagram)
        .then((response) => {
          let data = response.data;
          if (data.error !== false) return;

          let results = _.map(data.interests, (itm) => {
            return {
              name: locale === 'jp' ? getMatchInterests(itm.name) : itm.name,
              id: itm.id,
              origin: itm.name,
            };
          });

          setInterests(results);
        })
        .catch((msg) => {
          toast.error(msg);
        });

    languages.length > 0 ||
      modashService
        .getLanguages(Constants.snsInstagram)
        .then((response) => {
          let data = response.data;
          if (data.error !== false) return;

          setLanguages(data.languages);
        })
        .catch((msg) => {
          toast.error(msg);
        });
  }, []);

  const closeTermsDialog = () => {
    setFirstLogin(false);
  };

  const getCampaignList = (type) => {
    let results = _.filter(campaigns, (itm) => itm.sns === type);
    return results;
  };

  const isShowCSVButton = userInfo?.id == '61be26c840a8daea0c2e642a';
  const isShowGrowthRate = [
    '61be26c840a8daea0c2e642a',
    '61ef78e52f67a0525621ab21',
    '61c141d2408a5fb4af9ab7e4',
  ].includes(userInfo?.id);

  return (
    <Fixed userInfo={userInfo} paidOnly={true}>
      <Container className="research content-wrapper">
        <Box marginTop={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            {Keyword[locale].nav.accountresearch}
          </Typography>
          <Typography gutterBottom>
            {Keyword[locale].label.searchfromsite}
          </Typography>
        </Box>
        <Box marginTop={4}>
          <FilterSelect curType={selType} onSelect={onSelect} />
        </Box>
        <Box marginTop={2}>
          <Instagram
            interests={interests}
            languages={languages}
            selected={selType === Constants.snsInstagram}
            campaigns={getCampaignList(Constants.snsInstagram)}
            userInfo={userInfo}
            display={`${selType === Constants.snsInstagram ? 'block' : 'none'}`}
          />
          <Youtube
            interests={interests}
            languages={languages}
            selected={selType === Constants.snsYoutube}
            campaigns={getCampaignList(Constants.snsYoutube)}
            isShowCSVButton={isShowCSVButton}
            isShowGrowthRate={isShowGrowthRate}
            display={`${selType === 'youtube' ? 'block' : 'none'}`}
          />
          <Tiktok
            interests={interests}
            languages={languages}
            selected={selType === Constants.snsTiktok}
            campaigns={getCampaignList(Constants.snsTiktok)}
            isShowCSVButton={isShowCSVButton}
            isShowGrowthRate={isShowGrowthRate}
            userInfo={userInfo}
            display={`${selType === 'tiktok' ? 'block' : 'none'}`}
          />
        </Box>
        <InfluencerBrief research={true} userInfo={userInfo} />
      </Container>
      {process.env.NEXT_PUBLIC_REGION != 'SG' && (
        <TermsAgree
          open={isFirstLogin}
          handleClose={closeTermsDialog}
          userId={userInfo?.id}
        />
      )}
    </Fixed>
  );
};

export default Research;
