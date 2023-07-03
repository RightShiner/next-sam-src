/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { PostPageTable, PostPageStatic } from '../Table';
import { campaignService } from 'services';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const lang = {
  en: {
    error: "Couldn't find any detailed information.",
    failed: 'Failed to save state.',
    success: 'Updated successfully',
  },
  jp: {
    error: '詳しい情報を見つけてないです。',
    failed: '状態保存に失敗しました。',
    success: '更新しました。',
  },
};

const StatusPage = ({ selCampId, catType }) => {
  const { locale } = useRouter();
  const [tags, setTags] = useState([]);
  const [data, setData] = useState({ name: '', members: [] });
  const [isMonitoring, setMonitoring] = useState(true);
  const [updatedMembers, setUpdatedMembers] = useState([]);

  const getDatas = useCallback(() => {
    return data.members;
  }, [data]);

  const getStaticInfos = useCallback(() => {
    return updatedMembers;
  }, [updatedMembers]);

  useEffect(() => {
    if (!selCampId) return;

    return campaignService
      .getCampaignDetail(selCampId, 'post')
      .then((ret) => {
        if (ret.status !== 'ok') {
          toast.error(lang[locale].error);
          return;
        }

        if (!ret.data) {
          setData({ name: ' ', members: [] });
          setMonitoring(false);

          return;
        }

        ret.data.members.forEach((element) => {
          element.eg = element.engagementRate;
        });

        setData(ret.data);
        setTags(ret.tags);
        setMonitoring(ret.data.isMonitoring);
        setUpdatedMembers([...ret.data.members]);
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  }, [selCampId]);

  const saveMemberAmount = (idx, amount) => {
    amount = +amount || 0;

    return campaignService
      .updateMemberAmount(
        selCampId,
        data.members[idx]._id,
        data.members[idx].accountId,
        amount,
      )
      .then((ret) => {
        if (ret.status !== 'ok') {
          toast.error(lang[locale].failed);
          return;
        }
        toast.success(lang[locale].success);

        updatedMembers[idx].amount = amount;
        setUpdatedMembers([...updatedMembers]);
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  const saveMemberStatus = (mId, status) => {
    return campaignService
      .updateMemberStatus(selCampId, 2, mId, status)
      .then((ret) => {
        if (ret.status !== 'ok') {
          toast.error(lang[locale].failed);
          return;
        }

        setUpdatedMembers([
          ...updatedMembers.map((member) => {
            if (member._id === mId) {
              member.status = status;
            }
            return member;
          }),
        ]);

        setUpdatedMembers([...updatedMembers]);
        toast.success(lang[locale].success);
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  return (
    <Box className="post-page">
      <PostPageStatic
        isloading={data.name.length < 1}
        getMembers={getStaticInfos}
      />
      <PostPageTable
        catType={catType}
        getMembers={getDatas}
        handleSaveAmount={saveMemberAmount}
        handleSaveMember={saveMemberStatus}
        tags={tags}
      />
    </Box>
  );
};

export default StatusPage;
