/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, useCallback } from 'react';
import { Box, Stack } from '@mui/material';
import toast from 'react-hot-toast';
import {
  CompareChartSection,
  DataChartSection,
  GridViewSection,
  StaticsSection,
  StatusBar,
  TagSection,
} from './ReportComponents';
import { campaignService, monitoringService } from 'services';
import { groupBy } from 'constants/constants';
import { FilterModal } from './PostComponents';

const ReportPage = ({ selCampId, catType }) => {
  const [fetchDone, setFetchDone] = useState(true);
  const [data, setData] = useState([]);
  const [originData, setOriginData] = useState([]);
  const [statisticData, setStatisticData] = useState([]);
  const [campaignMembers, setCampaignMembers] = useState([]);

  const [open, setOpen] = useState(false);
  const [period, setPeriod] = useState([null, null]);
  const [filter, setFilter] = useState({});

  useEffect(async () => {
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    console.log(period);
    let items = JSON.parse(JSON.stringify(originData));
    if (period.every((el) => el !== null)) {
      items?.map((item) => {
        item.contents = item.contents.filter((item) => {
          return (
            new Date(period[0]) <= new Date(item.taken_at * 1000) &&
            new Date(period[1]) >= new Date(item.taken_at * 1000)
          );
        });
      });
      console.log('file: ReportPage.js:43  items', items);
    }
    formattedData(items);
  }, [period]);

  const fetchData = async () => {
    setFetchDone(false);
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
    console.log('file: ReportPage.js:39  list', list);
    setOriginData(list);
    formattedData(list);
    setFetchDone(true);
  };

  const formattedData = useCallback((data) => {
    let statistics = [];
    JSON.parse(JSON.stringify(data))?.map((items) => {
      items?.contents?.map((item) => {
        statistics.push(...(item?.statistics ?? []));
      });
    });
    (statistics ?? []).map((statistic) => {
      statistic.date = Date.parse(statistic.date);
    });
    let temp = groupBy(statistics, 'date');
    for (const key in temp) {
      temp[key] = temp[key].reduce((previousValue, currentValue) => {
        return {
          like_count:
            +(previousValue?.like_count ?? 0) +
            +(currentValue?.like_count ?? 0),
          comment_count:
            +(previousValue?.comment_count ?? 0) +
            +(currentValue?.comment_count ?? 0),
          save: +(previousValue?.save ?? 0) + +(currentValue?.save ?? 0),
          share: +(previousValue?.share ?? 0) + +(currentValue?.share ?? 0),
        };
      }, {});
    }
    setStatisticData(temp);
    setData(data);
  }, []);

  const handleSearch = () => {
    let items = JSON.parse(JSON.stringify(originData));
    if (filter?.influencer) {
      items = items.filter((item) => {
        return filter?.influencer.includes(item.infProfile.userId);
      });
    }
    if (filter?.period) {
      items?.map((item) => {
        item.contents = item.contents.filter((item) => {
          return (
            new Date(filter?.period[0]) <= new Date(item.taken_at * 1000) &&
            new Date(filter?.period[1]) >= new Date(item.taken_at * 1000)
          );
        });
      });
    }
    if (filter?.type) {
      items?.map((item) => {
        item.contents = item.contents.filter((item) => {
          return filter?.type.includes(item.type);
        });
      });
    }
    // if (filter?.like_count) {
    //   items = items.filter((item) => {
    //     return (
    //       (filter.like_count?.max
    //         ? (item?.like_count ?? 0) <= filter.like_count.max
    //         : true) &&
    //       (filter.like_count?.min
    //         ? (item?.like_count ?? 0) >= filter.like_count.min
    //         : true)
    //     );
    //   });
    // }
    // if (filter?.comment_count) {
    //   items = items.filter((item) => {
    //     return (
    //       (filter.comment_count?.max
    //         ? (item?.comment_count ?? 0) <= filter.comment_count.max
    //         : true) &&
    //       (filter.comment_count?.min
    //         ? (item?.comment_count ?? 0) >= filter.comment_count.min
    //         : true)
    //     );
    //   });
    // }
    setFilter({});
    formattedData(items);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setFilter({});
  };

  return (
    <Stack spacing="12px" className="report-page">
      <StatusBar period={period} setPeriod={setPeriod} setOpen={setOpen} />
      <StaticsSection originData={data} statisticData={statisticData} />
      {fetchDone ? (
        <>
          <DataChartSection
            catType={catType}
            originData={data}
            statisticData={statisticData}
          />
          <CompareChartSection
            catType={catType}
            originData={data}
            statisticData={statisticData}
          />
          {catType === 'instagram' && <TagSection originData={data} />}
          <GridViewSection
            catType={catType}
            selCampId={selCampId}
            originData={data}
          />
        </>
      ) : (
        <Box>loading...</Box>
      )}
      <FilterModal
        open={open}
        catType={catType}
        filter={filter}
        setFilter={setFilter}
        handleSearch={handleSearch}
        campaignMembers={campaignMembers}
        handleClose={handleClose}
      />
    </Stack>
  );
};

export default ReportPage;
