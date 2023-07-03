/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';

import { numToDate } from 'libs/commonFunc';
import { PostPageMain } from '../PostComponents';

const GridViewSection = ({ catType, selCampId, originData }) => {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    formattedData(originData);
  }, [originData]);

  const formattedData = (data) => {
    let result = [];
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
      });
      result.push(...items.contents);
    });
    setData(result);
  };

  const getLastStatistic = (statistics) => {
    let lastStatistic = statistics[0];
    for (let i = 1; i < statistics.length; i++) {
      if (new Date(lastStatistic.date) < new Date(statistics[i].date)) {
        lastStatistic = statistics[i];
      }
    }
    return lastStatistic;
  };

  return (
    <PostPageMain
      report
      data={data}
      catType={catType}
      orderBy={'taken_at_org'}
      viewMode={'grid'}
      selCampId={selCampId}
      setReload={setReload}
    />
  );
};

export default GridViewSection;
