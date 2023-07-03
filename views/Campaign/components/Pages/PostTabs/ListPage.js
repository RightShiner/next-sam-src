/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { PostPageTable, PostPageStatic } from '../../Table';
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

const ListPage = ({ selCampId, catType, setDisabled }) => {
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
          setDisabled(true);

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
    <Box sx={{ position: 'relative' }}>
      {false && catType === 'instagram' && !isMonitoring && (
        <Tooltip
          open={true}
          title={
            data?.members.length === 0
              ? 'リストへインフルエンサーを追加して下さい。'
              : 'モニタリング機能の設定をして下さい'
          }
          arrow
          placement="right"
          componentsProps={{
            tooltip: {
              sx: {
                px: '1em',
                maxWidth: '500px',
                fontSize: '1em',
                boxShadow:
                  '1px 1px 1px 0px rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
                backgroundColor: '#e07070',
              },
            },
            arrow: {
              sx: {
                color: '#e07070',
              },
            },
          }}
        >
          <Button
            sx={{
              position: 'absolute',
              top: '-66px',
              left: '12em',
              visibility: 'hidden',
            }}
          >
            Arrow
          </Button>
        </Tooltip>
      )}
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

export default ListPage;
