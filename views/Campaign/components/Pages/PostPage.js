/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';

import {
  PostCampaignBar,
  PostPageEmpty,
  PostPageMain,
  PostPageStatic,
  PostStatusBar,
  MonitoringModal,
  FilterModal,
} from './PostComponents';
import { campaignService, monitoringService } from 'services';
import { numToDate } from 'libs/commonFunc';

const PostPage = ({ userInfo, selCampId, catType }) => {
  const [modalShow, setModalShow] = useState({
    monitoring: false,
    filter: false,
    delete: false,
  });
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);
  const [isMonitoring, setMonitoring] = useState(false);
  const [monitoringStatus, setMonitoringStatus] = useState('none');
  const [monitoringData, setMonitoringData] = useState({});
  const [campaignMembers, setCampaignMembers] = useState([]);
  const [manualModal, setManualModal] = useState(false);
  const [originData, setOriginData] = useState([]);
  const [reload, setReload] = useState(true);

  const [apiData, setApiData] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const [orderBy, setOrderBy] = useState('taken_at_org');

  useEffect(async () => {
    setLoading(true);

    let ret = await campaignService
      .getCampaignDetail(selCampId, 'list')
      .catch(console.error);
    let members = ret?.data?.members ?? [];
    setCampaignMembers(members);
    let res = await monitoringService.getMonitoringById(selCampId, catType);
    if (res.status !== 'ok') {
      toast.error('error occurred');
      return;
    }
    const list = res.list || [];

    setOriginData(list);

    if (catType === 'instagram') {
      let ret = await campaignService.getMonitoring(selCampId);
      setMonitoring(ret.data.isSet);
      setMonitoringData(ret.data);

      if (ret.data.isSet) {
        let today = new Date();
        let monitoringFrom = new Date(ret.data.monitorFrom);
        let monitoringTo = new Date(ret.data.monitorTo);

        formattedData(list, members, ret.data);

        if (today < monitoringFrom) {
          setMonitoringStatus('hold');
        } else if (today < monitoringTo) {
          setMonitoringStatus('start');
        } else if (today > monitoringTo) {
          setMonitoringStatus('end');
        }
      }
    } else {
      if (list) {
        setMonitoringStatus('start');

        formattedData(list, members);
      } else {
        setMonitoringStatus('none');
      }
    }
    setLoading(false);
  }, [reload]);

  const formattedData = useCallback((data, members, settings) => {
    let result = [];
    let from = settings?.monitorFrom;
    let to = settings?.monitorTo;

    JSON.parse(JSON.stringify(data))?.map((items) => {
      let followersCount = items?.infProfile?.profile.followers ?? 0;
      items?.contents?.map((item) => {
        let lastStatistic = item?.statistics
          ? getLastStatistic(item.statistics)
          : null;

        item.like_count =
          item.like_count ??
          (lastStatistic ? +(lastStatistic?.like_count ?? 0) : 0);
        item.comment_count =
          item.comment_count ??
          (lastStatistic ? +(lastStatistic?.comment_count ?? 0) : 0);

        item.engagement =
          followersCount > 0
            ? ((item.like_count + item.comment_count) / followersCount) * 100
            : 0;
        item.followers_count = followersCount;
        item.taken_at_org = item.taken_at;
        item.taken_at = numToDate(item.taken_at);
        item.username = items.infProfile.profile.username;
        item.inf_profile = items.infProfile;

        if (settings) {
          item.member = members.find((member) => {
            return member.infId === items.infProfile.userId;
          });
        }
        if (
          ['feed', 'reel'].includes(item.type) &&
          !settings.hasAllTagAndMention
        ) {
          let missingHashtag = settings?.hashtag.filter((el) => {
            return (item?.hashtags ?? []).indexOf(el) === -1;
          });
          let missingMention = settings?.mention.filter((el) => {
            return (item?.mentions ?? []).indexOf(el) === -1;
          });

          let isMissingTags =
            missingHashtag?.length !== 0 || missingMention?.length !== 0;
          let missingTags = {
            missingHashtag,
            missingMention,
          };
          item.isMissingTags = isMissingTags;
          item.missingTags = missingTags;
        }
      });
      if (settings) {
        items.contents = items?.contents?.filter((item) => {
          if (item?.method === 'manual') return true;
          else {
            return (
              item.taken_at_org >= new Date(from).getTime() / 1000 &&
              item.taken_at_org <= 86400 + new Date(to).getTime() / 1000
            );
          }
        });
      }
      result.push(...items.contents);
    });
    setApiData(result);
    setData(result);
  }, []);

  const getLastStatistic = (statistics) => {
    let lastStatistic = statistics[0];
    for (let i = 1; i < statistics.length; i++) {
      if (new Date(lastStatistic.date) < new Date(statistics[i].date)) {
        lastStatistic = statistics[i];
      }
    }
    return lastStatistic;
  };

  const handleManualModal = () => {
    setManualModal(true);
    setModalShow((prev) => ({ ...prev, monitoring: true }));
  };

  const handleSearch = () => {
    let items = apiData;
    if (filter?.influencer) {
      items = items.filter((item) => {
        return filter?.influencer.includes(item.inf_profile.userId);
      });
    }
    if (filter?.period) {
      items = items.filter((item) => {
        return (
          new Date(filter?.period[0]) <= new Date(item.taken_at) &&
          new Date(filter?.period[1]) >= new Date(item.taken_at)
        );
      });
    }
    if (filter?.type) {
      items = items.filter((item) => {
        return filter?.type.includes(item.type);
      });
    }
    if (filter?.like_count) {
      items = items.filter((item) => {
        return (
          (filter.like_count?.max
            ? (item?.like_count ?? 0) <= filter.like_count.max
            : true) &&
          (filter.like_count?.min
            ? (item?.like_count ?? 0) >= filter.like_count.min
            : true)
        );
      });
    }
    if (filter?.comment_count) {
      items = items.filter((item) => {
        return (
          (filter.comment_count?.max
            ? (item?.comment_count ?? 0) <= filter.comment_count.max
            : true) &&
          (filter.comment_count?.min
            ? (item?.comment_count ?? 0) >= filter.comment_count.min
            : true)
        );
      });
    }
    setFilter({});
    setData(items);
    setModalShow((prev) => ({ ...prev, filter: false }));
  };

  const memoPostPageMain = useMemo(
    () => (
      <PostPageMain
        data={data}
        catType={catType}
        orderBy={orderBy}
        viewMode={viewMode}
        selCampId={selCampId}
        setReload={setReload}
      />
    ),
    [data, catType, orderBy, selCampId, viewMode, reload],
  );

  return (
    <Box className="post-page">
      <PostPageStatic
        posts={apiData}
        loading={loading}
        originData={originData}
      />
      {loading ? (
        <Box
          sx={{
            width: '100%',
            height: '50vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress
            sx={{
              color: '#1377eb',
            }}
          />
        </Box>
      ) : (
        <>
          {((isMonitoring && catType === 'instagram') ||
            (monitoringStatus !== 'none' && catType !== 'instagram')) && (
            <PostCampaignBar
              orderBy={orderBy}
              setReload={setReload}
              setOrderBy={setOrderBy}
              setOpen={setModalShow}
              setViewMode={setViewMode}
              handleManualModal={handleManualModal}
            />
          )}

          {isMonitoring && (
            <PostStatusBar
              data={monitoringData}
              monitoringStatus={monitoringStatus}
              setOpen={setModalShow}
            />
          )}
          {((monitoringStatus === 'none' || monitoringStatus === 'hold') &&
            catType === 'instagram') ||
          (monitoringStatus === 'none' && catType !== 'instagram') ? (
            <PostPageEmpty
              monitoringStatus={monitoringStatus}
              setOpen={setModalShow}
            />
          ) : (
            memoPostPageMain
          )}
          <MonitoringModal
            catType={catType}
            userInfo={userInfo}
            selCampId={selCampId}
            manualModal={manualModal}
            open={modalShow.monitoring}
            isMonitoring={isMonitoring}
            setReload={setReload}
            setMonitoring={setMonitoring}
            handleClose={() =>
              setModalShow((prev) => ({ ...prev, monitoring: false }))
            }
          />
          <FilterModal
            open={modalShow.filter}
            filter={filter}
            setFilter={setFilter}
            catType={catType}
            handleSearch={handleSearch}
            campaignMembers={campaignMembers}
            handleClose={() =>
              setModalShow((prev) => ({ ...prev, filter: false }))
            }
          />
        </>
      )}
    </Box>
  );
};

export default PostPage;
