/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SearchContent from './SearchContent';
import { InstagramFilter } from './Filters';
import { accountService, modashService } from 'services';
import Constant, { getMatchInterests } from 'constants/constants';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const lang = {
  en: {
    error: 'Cannot search.',
    loading: 'Please wait a moment. ',
  },
  jp: {
    error: '検索できません。',
    loading: 'しばらくお待ちしてください。',
  },
};

const Instagram = ({ user, tags, selected }) => {
  const { locale } = useRouter();
  const [influencers, setInfluencers] = useState([]);
  const [filters, setFilters] = useState(null);
  const [page, setPage] = useState(1);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (interests.length > 0) return;

    return modashService
      .getInterests(Constant.snsInstagram)
      .then((response) => {
        let data = response.data;
        if (data.error !== false) return;

        let results = _.map(data.interests, (itm) => {
          return locale === 'jp'
            ? {
                name: getMatchInterests(itm.name),
                id: itm.id,
                origin: itm.name,
              }
            : {
                name: itm.name,
                id: itm.id,
                origin: itm.name,
              };
        });

        setInterests(results);
      })
      .catch((msg) => {
        toast.error(msg);
      });
  }, []);

  useEffect(() => {
    if (selected === false) return;

    if (influencers.length === 0) {
      loadFromServer(null, 1);
    }
  }, [selected]);

  const loadWithFilter = async (selFilter) => {
    setFilters(selFilter);
    setPage(1);
    await loadFromServer(selFilter, 1);
  };

  const loadMorePage = async () => {
    setPage((prev) => prev + 1);
    await loadFromServer(filters, page + 1);
  };

  const loadFromServer = async (curFilters, curPage) => {
    const loadingId = toast.loading(lang[locale].loading);
    return accountService
      .getInfluencers(user.id, Constant.snsInstagram, curFilters, curPage)
      .then((response) => {
        toast.remove(loadingId);
        if (response.status !== 'ok') {
          toast.error('lang[locale].error');
          return;
        }

        if (curPage === 1) setInfluencers(response.data);
        else setInfluencers([...influencers, ...response.data]);
      })
      .catch((msg) => {
        toast.remove(loadingId);
        toast.error(msg.toString());
      });
  };

  return (
    <Box sx={{ display: `${selected ? 'block' : 'none'}` }}>
      <InstagramFilter
        interests={interests}
        loadFromServer={loadWithFilter}
        userInfo={user}
      />
      <SearchContent
        accounts={influencers}
        tags={tags}
        loadMorePage={loadMorePage}
      />
    </Box>
  );
};

export default Instagram;
