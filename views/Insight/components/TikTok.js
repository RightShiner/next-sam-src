/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SearchContent from './SearchContent';
import { TiktokFilter } from './Filters';
import { accountService } from 'services';
import Constant from 'constants/constants';
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

const TikTok = ({ user, tags, selected }) => {
  const { locale } = useRouter();
  const [influencers, setInfluencers] = useState([]);
  const [filters, setFilters] = useState(null);
  const [page, setPage] = useState(1);

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
      .getInfluencers(user.id, Constant.snsTiktok, curFilters, curPage)
      .then((response) => {
        toast.remove(loadingId);
        if (response.status !== 'ok') {
          toast.error(lang[locale].error);
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
      <TiktokFilter loadFromServer={loadWithFilter} />
      <SearchContent
        accounts={influencers}
        tags={tags}
        loadMorePage={loadMorePage}
      />
    </Box>
  );
};

export default TikTok;
