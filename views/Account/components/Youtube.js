/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Pagination,
  Stack,
  Typography,
  TextField,
} from '@mui/material';
import { SaveAllDlg } from 'views/Common';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchItem from './SearchItem';
import SearchItemLoading from './SearchItemLoading';
import YoutubeFilter from './YoutubeFilter';
import Constants from 'constants/constants';
import Keyword from 'constants/lang';
import { modashService } from 'services';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const lang = {
  en: {
    userSearch: 'Influencers found by username search.',
    bulkRegistration: 'Bulk registration',
    account: 'accounts',
    nextRegistration: 'Bulk registration of the following 15 people',
    error: 'Cannot search.',
    downloading: 'Downloading. Please wait.',
  },
  jp: {
    userSearch: '人のインフルエンサーがユーザーネーム検索で見つかりました。',
    bulkRegistration: '一括登録',
    account: 'アカウント',
    nextRegistration: '以下の15人を一括登録',
    nextRegistration: '以下の15人を一括登録',
    error: '検索できません。',
    downloading: 'ダウンロード中です。しばらくお待ちください。',
  },
};

export default function Youtube({
  selected,
  interests,
  languages,
  campaigns,
  isShowCSVButton,
  isShowGrowthRate,
  ...rest
}) {
  const { locale } = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [curpage, setPageNum] = useState(0);
  const [totals, setTotals] = useState(0);
  const [filters, setFilters] = useState(null);
  const [goPageNum, setGoPageNum] = useState(1);

  const [sortOrder, setSortOrder] = useState('followers');
  const [sortDirection, setSortDirection] = useState('desc');
  const changeSort = (order) => {
    let sOrders = 'desc';
    if (order === sortOrder) {
      sOrders = sortDirection === 'desc' ? 'asc' : 'desc';
      setSortDirection(sOrders);
    } else {
      setSortOrder(order);
      setSortDirection(sOrders);
    }

    setAccounts([]);
    if (filters) {
      searchFromServer(0, order, sOrders, filters);
    } else {
      loadFromServer(0, order, sOrders, null);
    }
  };

  const [directs, setDirects] = useState([]);
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    if (selected === false) return;

    let youtubeFilters = JSON.parse(localStorage.getItem('youtubeFilters'));
    youtubeFilters =
      youtubeFilters !== undefined && youtubeFilters !== null
        ? youtubeFilters
        : null;

    let camps = JSON.parse(localStorage.getItem('youtubeCamps'));
    camps = camps !== undefined && camps !== null ? camps : [];

    setExceptCampaigns(camps);
    setFilters(youtubeFilters);

    if (accounts.length === 0) {
      loadFromServer(0, sortOrder, sortDirection, youtubeFilters);
    }
  }, [selected]);

  const loadFromServer = (
    pageNum,
    sortField,
    sortDir,
    searchFilters,
    isReload = true,
  ) => {
    sortField ||= 'followers';
    sortDir ||= 'desc';

    if (searchFilters !== null) {
      searchFromServer(pageNum, sortField, sortDir, searchFilters, isReload);
      return;
    }

    setLoading(true);
    setAccounts([]);
    setPageNum(pageNum);

    return modashService
      .getAccounts(
        Constants.snsYoutube,
        pageNum,
        sortField === null ? {} : { field: sortField, direction: sortDir },
        isReload,
      )
      .then((response) => {
        if (response.status !== 'ok') {
          setLoading(false);
          toast.error(response.msg ?? lang[locale].error);
          return;
        }

        const data = response.data;

        if (sortField === 'followers') {
          const sorted = data.data.sort(
            (a, b) =>
              (sortDir === 'asc' ? 1 : -1) *
              (a.profile.followers - b.profile.followers),
          );
          setAccounts([...sorted]);
        } else {
          setAccounts([...data.data]);
        }

        setTotals(data.total);
        setLoading(false);
      })
      .catch((msg) => {
        setLoading(false);
        toast.error(msg);
      });
  };

  const distinctFunc = (value, index, self) => {
    const findIdx = self.findIndex((itm) => itm.userId === value.userId);
    return findIdx === index;
  };

  const searchFromServer = (
    pageNum,
    sortField,
    sortDir,
    filters,
    isReload = true,
  ) => {
    localStorage.setItem('youtubeCamps', JSON.stringify(exceptCamps));

    sortField ||= 'followers';
    sortDir ||= 'desc';

    setLoading(true);
    setAccounts([]);
    setPageNum(pageNum);

    let audience = {};

    audience.gender = filters.audience.gender || null;
    audience.age = [];

    if (filters?.audience?.age) {
      audience.age = filters.audience.age.map((itm) => itm.id);
    }

    audience.fake = null;
    audience.interests = [];
    audience.language = null;
    audience.location = [];

    let influencer = {};

    influencer.followers = filters.influencer.followers || {};
    influencer.views = filters.influencer.views || {};
    influencer.gender = filters.influencer.gender || null;
    influencer.lastposted = filters.influencer.lastposted || null;
    influencer.engagementRate = filters.influencer.engagementRate || null;
    influencer.keywords = filters.influencer.keywords || '';
    influencer.followersGrowthRate = null;
    influencer.hasContactDetails = null;
    influencer.interests = [];
    influencer.language = null;
    influencer.location = [];
    influencer.type = null;
    influencer.views = {};

    if (filters?.influencer?.followersGrowthRate) {
      influencer.followersGrowthRate = {
        interval: filters.influencer.followersGrowthRate?.interval,
        value: filters.influencer.followersGrowthRate.weight?.value,
        operator: filters.influencer.followersGrowthRate.weight?.operator,
      };
    }

    influencer.userlist = [];

    if (filters?.influencer?.userlist) {
      filters.influencer.userlist = filters.influencer.userlist?.slice(0, 15);

      if (
        filters.influencer.userlist !== '' &&
        filters.influencer.userlist.length > 0
      ) {
        influencer.userlist = Array.prototype.map.call(
          filters.influencer.userlist,
          (a) => '@' + a.value,
        );
      }
    }

    let filterInfo = {
      influencer,
      audience,
    };

    // check if there is influencer.topics field and merge to influencer.relevance
    if (filterInfo.influencer && filterInfo.influencer.topics) {
      filterInfo.influencer.userlist &&
        (filterInfo.influencer.relevance = [
          ...filterInfo.influencer.userlist,
          ...filterInfo.influencer.topics,
        ]);

      !filterInfo.influencer.userlist &&
        (filterInfo.influencer.relevance = [...filterInfo.influencer.topics]);

      // delete filterInfo.influencer.topics;
      // delete filterInfo.influencer.userlist;
    } else if (filterInfo.influencer.userlist) {
      filterInfo.influencer.relevance = [...filterInfo.influencer.userlist];
    }

    return modashService
      .searchAccounts(
        Constants.snsYoutube,
        pageNum,
        sortField === null ? {} : { field: sortField, direction: sortDir },
        filterInfo,
        isReload,
      )
      .then((response) => {
        if (response.status !== 'ok') {
          setLoading(false);
          if (response.status != 'no' || response.msg != 'no_result')
            toast.error(lang[locale].error);
          return;
        }

        const data = response.data;

        // if (pageNum === 0) setAccounts([...data.data]);
        // else setAccounts([...data.data]);
        if (sortField === 'followers') {
          const sorted = data.data.sort(
            (a, b) =>
              (sortDir === 'asc' ? 1 : -1) *
              (a.profile.followers - b.profile.followers),
          );
          setAccounts([...sorted]);
        } else {
          setAccounts([...data.data]);
        }

        if (data?.directs) {
          let distinctDirects = data.directs.filter(distinctFunc);
          setDirects(distinctDirects);
        }

        setTotals(data.total);
        setLoading(false);
      })
      .catch((msg) => {
        setLoading(false);
        toast.error(msg);
      });
  };

  const saveFromServer = async (searchFilters) => {
    let toastId = toast.loading(lang[locale].downloading, {
      duration: 1000000 * 1000,
    });
    setLoading(true);
    setAccounts([]);

    let page = 0;
    let influencerlist = [];
    let breakSignal = false;
    let csvData = '';

    if (searchFilters === null) {
      while (!breakSignal) {
        console.log('page', page);

        await modashService
          .getAccounts(Constants.snsYoutube, page, {})
          .then((response) => {
            if (response.status !== 'ok') {
              breakSignal = true;
              return;
            }

            const data = response.data;

            if (data.error) {
              breakSignal = true;
            } else {
              data.data.forEach((itm) => {
                modashService
                  .getProfileReport(itm.userId, Constants.snsYoutube, 0)
                  .then((response) => {
                    console.log('response.data', response.data);
                    influencerlist = [...influencerlist, data];
                  })
                  .catch((e) => {
                    console.log('error', e);
                  });
              });
            }
          })
          .catch((msg) => {
            console.log(msg);
            breakSignal = true;
          });

        page++;
      }
    } else {
      while (!breakSignal && page < 666) {
        console.log('page', page);

        await modashService
          .searchAccounts(Constants.snsYoutube, page, {}, searchFilters)
          .then(async (response) => {
            if (response.status !== 'ok') {
              console.log('response', response);
              page--;
              // breakSignal = true;
              return;
            }

            const data = response.data;

            if (data.error) {
              breakSignal = true;
            } else {
              await data.data.forEach(async (itm) => {
                await modashService
                  .getProfileReport(itm.userId, Constants.snsYoutube, 0)
                  .then((response) => {
                    if (response.data.profile) {
                      csvData =
                        csvData +
                        [
                          response.data?.profile?.username, // username
                          response.data?.country, // country
                          response.data?.profile?.fullname, // fullname
                          response.data?.profile?.followers, // followers
                          (
                            response.data?.profile?.engagementRate * 100
                          ).toFixed(2), // engagementRates
                          (
                            response.data?.audience?.genders?.[0]?.weight * 100
                          ).toFixed(2), // Male
                          (
                            response.data?.audience?.genders?.[1]?.weight * 100
                          ).toFixed(2), // Female
                          (
                            response.data?.audience?.gendersPerAge?.[0]?.male *
                            100
                          ).toFixed(2), // 13-17 Male
                          (
                            response.data?.audience?.gendersPerAge?.[0]
                              ?.female * 100
                          ).toFixed(2), // 13-17 Female
                          (
                            response.data?.audience?.gendersPerAge?.[1]?.male *
                            100
                          ).toFixed(2), // 18-24 Male
                          (
                            response.data?.audience?.gendersPerAge?.[1]
                              ?.female * 100
                          ).toFixed(2), // 18-24 Female
                          (
                            response.data?.audience?.gendersPerAge?.[2]?.male *
                            100
                          ).toFixed(2), // 25-34 Male
                          (
                            response.data?.audience?.gendersPerAge?.[2]
                              ?.female * 100
                          ).toFixed(2), // 25-34 Female
                          (
                            response.data?.audience?.gendersPerAge?.[3]?.male *
                            100
                          ).toFixed(2), // 35-44 Male
                          (
                            response.data?.audience?.gendersPerAge?.[3]
                              ?.female * 100
                          ).toFixed(2), // 35-44 Female
                          (
                            response.data?.audience?.gendersPerAge?.[4]?.male *
                            100
                          ).toFixed(2), // 45-64 Male
                          (
                            response.data?.audience?.gendersPerAge?.[4]
                              ?.female * 100
                          ).toFixed(2), // 45-64 Female
                          response.data?.audience?.geoCountries?.[0]?.name ??
                            '', // TOP 1 country
                          response.data?.audience?.geoCountries?.[1]?.name ??
                            '', // TOP 2 country
                          response.data?.audience?.geoCountries?.[2]?.name ??
                            '', // TOP 3 country
                          response.data?.avgLikes, // AvgLikes
                          response.data?.profile?.averageViews, // AvgViews
                          response.data?.avgComments, // AvgComments
                        ].join(',') +
                        '\n';

                      localStorage.setItem('csv', csvData);
                    }
                  })
                  .catch((e) => {
                    console.log('error', e);
                  });
              });
            }
          })
          .catch((msg) => {
            console.log(msg);
            breakSignal = true;
          });

        page++;
      }
    }

    setLoading(false);
    toast.remove(toastId);
  };

  const loadFromServerWithFilter = (searchFilters, isRequirePoint) => {
    setAccounts([]);
    setDirects([]);
    setFilters(searchFilters);
    if (searchFilters === null)
      loadFromServer(
        0,
        sortOrder,
        sortDirection,
        searchFilters,
        !isRequirePoint,
      );
    else searchFromServer(0, null, null, searchFilters, !isRequirePoint);
  };

  const formatterInt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const closeDlg = () => {
    setAnchorEl(null);
  };

  const [saves, setSaves] = useState([]);

  const [exceptCamps, setExceptCampaigns] = useState([]);

  const isShowable = (infCampaigns) => {
    if (!selected || !infCampaigns || infCampaigns.length < 1) return true;

    let result = exceptCamps.filter((itm) => infCampaigns.includes(itm));

    return result.length < 1;
  };

  const setCampToInfluencer = (campId, infId) => {
    const temp = accounts.map((itm) => {
      if (itm.userId !== infId) return itm;

      if (!itm.campaigns) return { ...itm, campaigns: [campId] };

      return { ...itm, campaigns: [...itm.campaigns, campId] };
    });

    setAccounts(temp);
  };

  const setCampToInfluencerAll = (campId, infIds) => {
    const temp = accounts.map((itm) => {
      if (infIds.includes(itm.userId) === false) return itm;

      if (!itm.campaigns) return { ...itm, campaigns: [campId] };

      return { ...itm, campaigns: [...itm.campaigns, campId] };
    });

    setAccounts(temp);
  };

  const handleGoPageNum = (e) => {
    let inputGoPageNum = Math.ceil(Number(e.target.value));

    if (inputGoPageNum <= 0) {
      inputGoPageNum = 1;
    } else if (inputGoPageNum > Math.ceil(totals / 15)) {
      inputGoPageNum = Math.ceil(totals / 15);
    }

    setGoPageNum(inputGoPageNum);
  };

  const handleGoPage = (e) => {
    loadFromServer(goPageNum - 1, sortOrder, sortDirection, filters);
  };

  return (
    <Box {...rest}>
      <YoutubeFilter
        interests={interests}
        languages={languages}
        campaigns={campaigns}
        searchFromServer={loadFromServerWithFilter}
        setCampaigns={setExceptCampaigns}
        saveFromServer={saveFromServer}
        isShowCSVButton={isShowCSVButton}
        isShowGrowthRate={isShowGrowthRate}
      />
      <Box marginTop={2} data-aos={'fade-up'}>
        {directs.length > 0 && (
          <Box
            className="research-content"
            sx={{ marginTop: '32px !important' }}
          >
            <Box className="research-content-header research-content-account-grid">
              {formatterInt.format(directs.length)}
              {lang[locale].userSearch}
            </Box>
            <Box className="research-content-header research-content-account-grid">
              <div>{Keyword[locale].caption.influencer}</div>
              <div
                style={{ display: 'flex', cursor: 'pointer' }}
                onClick={(e) => changeSort('followers')}
              >
                {Keyword[locale].caption.followers}
                {sortOrder === 'followers' && (
                  <>
                    {sortDirection === 'desc' ? (
                      <ArrowDownwardIcon fontSize="small" />
                    ) : (
                      <ArrowUpwardIcon fontSize="small" />
                    )}
                  </>
                )}
              </div>
              <div
                style={{ display: 'flex', cursor: 'pointer' }}
                onClick={(e) => changeSort('engagements')}
              >
                {Keyword[locale].caption.engagement}
                {sortOrder === 'engagements' && (
                  <>
                    {sortDirection === 'desc' ? (
                      <ArrowDownwardIcon fontSize="small" />
                    ) : (
                      <ArrowUpwardIcon fontSize="small" />
                    )}
                  </>
                )}
              </div>
              <div>{Keyword[locale].caption.tag}</div>
              <div
                style={{
                  textAlign: 'center',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: '#16acf3',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSaves(directs.filter((itm) => isShowable(itm.campaigns)));
                  setAnchorEl(e.currentTarget);
                }}
              >
                {lang[locale].bulkRegistration}
              </div>
            </Box>
            {_.map(
              directs,
              (itm) =>
                isShowable(itm.campaigns) && (
                  <SearchItem
                    key={itm.userId}
                    itm={itm}
                    cattype={Constants.snsYoutube}
                    setCampaign={setCampToInfluencer}
                    disabled={!isShowable(itm.campaigns)}
                  />
                ),
            )}
          </Box>
        )}
        <Box className="research-content" sx={{ marginTop: '32px !important' }}>
          <Box className="research-content-header research-content-account-grid">
            <div>
              {formatterInt.format(totals)} {lang[locale].account}
            </div>
            <div
              style={{ display: 'flex', cursor: 'pointer' }}
              onClick={(e) => changeSort('followers')}
            >
              {Keyword[locale].caption.followers}
              {sortOrder === 'followers' && (
                <>
                  {sortDirection === 'desc' ? (
                    <ArrowDownwardIcon fontSize="small" />
                  ) : (
                    <ArrowUpwardIcon fontSize="small" />
                  )}
                </>
              )}
            </div>
            <div
              style={{ display: 'flex', cursor: 'pointer' }}
              onClick={(e) => changeSort('engagements')}
            >
              {Keyword[locale].caption.engagement}
              {sortOrder === 'engagements' && (
                <>
                  {sortDirection === 'desc' ? (
                    <ArrowDownwardIcon fontSize="small" />
                  ) : (
                    <ArrowUpwardIcon fontSize="small" />
                  )}
                </>
              )}
            </div>
            <div>{Keyword[locale].caption.tag}</div>
            <div
              style={{
                textAlign: 'center',
                textDecoration: 'underline',
                cursor: 'pointer',
                color: '#16acf3',
                padding: '.5rem 0',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSaves(
                  accounts
                    .slice(0, 15)
                    .filter((itm) => isShowable(itm.campaigns)),
                );
                setAnchorEl(e.currentTarget);
              }}
            >
              {lang[locale].nextRegistration}
            </div>
          </Box>
          {isLoading &&
            Array.from({ length: 10 }, (_, i) => i).map((itm) => (
              <SearchItemLoading key={itm} />
            ))}
          {_.map(accounts, (itm, index) => (
            <>
              {index % 15 === 0 && index / 15 > 0 && (
                <Box className="research-content-header research-content-account-grid">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div
                    style={{
                      textAlign: 'center',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      color: '#16acf3',
                      padding: '.5rem 0',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSaves(
                        accounts
                          .slice(index, index + 15)
                          .filter((itm) => isShowable(itm.campaigns)),
                      );
                      setAnchorEl(e.currentTarget);
                    }}
                  >
                    {lang[locale].nextRegistration}
                  </div>
                </Box>
              )}
              {isShowable(itm.campaigns) && (
                <SearchItem
                  key={itm.userId}
                  itm={itm}
                  cattype={Constants.snsYoutube}
                  setCampaign={setCampToInfluencer}
                  disabled={!isShowable(itm.campaigns)}
                />
              )}
            </>
          ))}
          {Math.ceil(totals / 15) > 1 && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
              marginTop="4rem"
            >
              <Box display="flex" alignItems="center">
                {curpage > 0 && (
                  <Typography
                    sx={{
                      color: '#16acf3',
                      cursor: 'pointer',
                      paddingRight: '1rem',
                      fontSize: '16px',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                    onClick={(e) =>
                      loadFromServer(
                        curpage - 1,
                        sortOrder,
                        sortDirection,
                        filters,
                      )
                    }
                  >
                    Prev
                  </Typography>
                )}
                <Stack spacing={2}>
                  <Pagination
                    count={Math.ceil(totals / 15)}
                    page={curpage + 1}
                    onChange={(e) =>
                      loadFromServer(
                        Number(e.target.innerText) - 1,
                        sortOrder,
                        sortDirection,
                        filters,
                      )
                    }
                    hidePrevButton
                    hideNextButton
                    size="medium"
                  />
                </Stack>

                {curpage + 1 < Math.ceil(totals / 15) && (
                  <Typography
                    sx={{
                      color: '#16acf3',
                      cursor: 'pointer',
                      fontSize: '16px',
                      paddingLeft: '1rem',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                    onClick={(e) =>
                      loadFromServer(
                        curpage + 1,
                        sortOrder,
                        sortDirection,
                        filters,
                      )
                    }
                  >
                    Next
                  </Typography>
                )}
              </Box>
              <Box display="flex" alignItems="center">
                Go to Page
                <TextField
                  type="number"
                  size="small"
                  placeholder=""
                  value={goPageNum}
                  sx={{
                    width: '5em',
                    '& input': {
                      height: '17px',
                      cursor: 'pointer',
                    },
                    margin: 'auto 10px',
                  }}
                  onChange={handleGoPageNum}
                />
                <Button
                  className="inactive btn-pagination-go"
                  variant={'rounded'}
                  sx={{ marginLeft: '0px', padding: '10px !important' }}
                  onClick={handleGoPage}
                >
                  Go
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <SaveAllDlg
        influencers={saves}
        anchorEl={anchorEl}
        closeDlg={closeDlg}
        catType={Constants.snsYoutube}
        setCampaign={setCampToInfluencerAll}
      />
    </Box>
  );
}
