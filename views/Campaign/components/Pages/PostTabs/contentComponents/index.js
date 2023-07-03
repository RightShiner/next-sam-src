/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Button } from '@mui/material';
import ContentPageFilter from './ContentPageFilter';
import ContentPageMain from './ContentPageMain';
import ContentPageStatic from './ContentPageStatic';
import ContentPageHidden from './ContentPageHidden';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { monitoringService, campaignService } from 'services';
import toast from 'react-hot-toast';

const ContentPage = ({ selCampId, catType, setMonitoring }) => {
  const [init, setInit] = useState([]);
  const [data, setData] = useState([]);
  const [fetchDone, setFetchDone] = useState(true);
  const [group, setGroup] = useState(1);
  const [filter, setFilter] = useState({
    date: [],
    influencer: [],
  });
  const [settings, setSettings] = useState({});

  const fetchData = async () => {
    setFetchDone(false);

    const [monitoringSettings, ret] = await Promise.all([
      campaignService.getMonitoring(selCampId),
      monitoringService.getMonitoringById(selCampId),
    ]);

    if (ret.status !== 'ok') {
      toast.error('error occurred');
      return;
    }
    setSettings(monitoringSettings.data);
    const list = ret.list || [];
    setInit(list);
    initDisplayData(list, monitoringSettings.data);

    setFetchDone(true);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    filterData();
  }, [filter]);

  const options = init
    ?.map((item) => {
      return {
        name: item.infProfile.profile.username,
        avatar: item.infProfile.profile.picture,
        followers: item.infProfile.profile.followers,
        userId: item.infProfile.userId,
      };
    })
    ?.filter((itm) => settings.members.includes(itm.userId));

  const numToDate = (num) => {
    const date = new Date(num * 1000).toLocaleDateString('ja-JA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return date;
  };

  const initDisplayData = useCallback((data, settings) => {
    let result = [];
    let from = settings.monitorFrom;
    let to = settings.monitorTo;
    let list = settings.members;

    data?.map((items) => {
      items?.contents?.map((item) => {
        item.taken_at_org = item.taken_at;
        item.taken_at = numToDate(item.taken_at);
        item.username = items.infProfile.profile.username;
        item.inf_profile = items.infProfile;
      });
      items.contents = items?.contents?.filter((item) => {
        return (
          item.taken_at_org >= new Date(from).getTime() / 1000 &&
          item.taken_at_org <= 86400 + new Date(to).getTime() / 1000 &&
          (list.includes(item.user?.pk.toString()) ||
            list.includes(+item.user?.pk))
        );
      });
      result.push(...items.contents);
    });
    setData(result);
    setFilter({
      date: [new Date(from), new Date(to)],
      influencer: result?.map((item) => {
        return item.username;
      }),
    });
  }, []);

  const filterData = () => {
    let filterDataByInfluencer = JSON.parse(JSON.stringify(init))?.filter(
      (value) => {
        return filter.influencer.includes(value.infProfile.profile.username);
      },
    );
    let result = [];
    filterDataByInfluencer?.forEach((influencer) => {
      if (filter.date.length !== 0) {
        let from = filter.date[0];
        let to = filter.date[1];
        influencer.contents = influencer.contents.filter((item) => {
          return (
            new Date(item.taken_at) >= new Date(from) &&
            new Date(item.taken_at) <=
              new Date(new Date(to).getTime() + 60 * 60 * 24 * 1000)
          );
        });
      }
      result.push(...influencer.contents);
    });
    setData(result);
  };

  const [hiddenMode, setHiddenMode] = useState(false);
  const [hiddenList, setHiddenList] = useState([]);

  const memoContentPageMain = useMemo(
    () => (
      <ContentPageMain
        data={data}
        settings={settings}
        group={group}
        fetchDone={fetchDone}
        hiddenMode={hiddenMode}
        hiddenList={hiddenList}
        setHiddenList={setHiddenList}
      />
    ),
    [data, group, fetchDone, hiddenMode, hiddenList, setHiddenList],
  );

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Button
          className="active"
          variant={'outlined'}
          size="medium"
          onClick={() => setMonitoring(false)}
          sx={{ position: 'absolute', top: '-66px', right: '5em' }}
        >
          <ModeEditIcon sx={{ fontSize: 'small', marginRight: '1em' }} />
          Edit
        </Button>
      </Box>
      <ContentPageStatic data={init} fetchDone={fetchDone} />
      <ContentPageFilter
        options={options}
        group={group}
        from={settings.monitorFrom}
        to={settings.monitorTo}
        fetchDone={fetchDone}
        setFilter={setFilter}
        setGroup={setGroup}
        setHiddenMode={setHiddenMode}
      />
      <ContentPageHidden
        selCampId={selCampId}
        hiddenMode={hiddenMode}
        setHiddenMode={setHiddenMode}
        hiddenList={hiddenList}
        setHiddenList={setHiddenList}
        fetchData={fetchData}
      />
      {init.length !== 0 && memoContentPageMain}
    </>
  );
};

export default ContentPage;
