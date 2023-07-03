/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { ListPageStatic, ListPageTable } from '../Table';
import { campaignService } from 'services';
import toast from 'react-hot-toast';
import { modashService } from 'services';
import { useRouter } from 'next/router';
//import jsPDF from 'jspdf';
//import html2canvas from 'html2canvas';

const lang = {
  en: {
    noMoreInfo: "Couldn't find any detailed information.",
    timeRemaining: 'Estimated Completion Time Remaining',
    minute: 'min',
    second: 'sec',
    completed: 'Completed',
    failToSave: 'Failed to save state',
    updated: 'Updated Successfully',
  },
  jp: {
    noMoreInfo: '詳しい情報を見つけてないです。',
    timeRemaining: '推定の完了時間は残り',
    minute: '分',
    second: '秒',
    completed: '完了しました。',
    failToSave: '状態保存に失敗しました。',
    updated: '更新しました。',
  },
};

const ListPage = ({ selCampId, catType }) => {
  const { locale } = useRouter();
  const [tags, setTags] = useState([]);
  const [data, setData] = useState({ name: '', members: [] });
  const [updatedMembers, setUpdatedMembers] = useState([]);
  const [loadingTotalData, setLoadingTotalData] = useState(true);
  const timerHandler = useRef(null);
  const toastLoadingId = useRef(null);
  const respondTime = useRef(null);
  const [page, setPage] = useState(1);

  const getStaticInfos = useCallback(() => {
    return updatedMembers;
  }, [updatedMembers]);

  const getMembers = useCallback(() => {
    return data.members;
  }, [data]);

  useEffect(() => {
    if (data.name.length < 1) {
      loadFromServer(1);
      loadFromServer(-1);
    }
  }, [selCampId]);

  const loadFromServer = async (curPage) => {
    if (!selCampId) return;

    return campaignService
      .getCampaignDetail(selCampId, 'list', curPage)
      .then((ret) => {
        if (ret.status !== 'ok') {
          toast.error(lang[locale].noMoreInfo);
          return;
        }

        if (!ret.data) {
          if (curPage > 0) {
            setData({ name: ' ', members: curPage === 1 ? [] : data.members });
          } else {
            setLoadingTotalData(false);
          }

          return;
        }

        ret.data.members.forEach((element) => {
          element.eg = element.detail_doc.profile.engagementRate;
        });

        if (curPage === 1) {
          setData(ret.data);
        } else if (curPage > 1) {
          setData({
            name: ret.data.name,
            members: [...data.members, ...ret.data.members],
          });
        } else {
          setUpdatedMembers([...ret.data.members]);
          setLoadingTotalData(false);
        }

        setTags(ret.tags);
        // setUpdatedMembers([...data.members]);
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  const waitingRespond = () => {
    if (toastLoadingId.current) {
      toast.remove(toastLoadingId.current);
      toastLoadingId.current = null;
    }

    let remainMinutes = Math.floor(respondTime.current / 6);
    let remainSeconds = respondTime.current % 6;
    respondTime.current = respondTime.current - 1;

    let msg = `${lang[locale].timeRemaining}${
      remainMinutes > 0 ? `${remainMinutes}` + lang[locale].minute : ''
    }${
      remainSeconds > 0 ? `${remainSeconds * 10}` + lang[locale].second : ''
    }です。\r\n\r\n・推定時間はあくまでも目標になります。実際はこの時間よりも「早く」「遅く」完了する場合がございます。\r\n\r\n・ファイル読み込みがうまくいかない場合は、リスト内の人数を減らしていただけるとスムーズに進行されます。\r\n\r\n・ファイルを読み込みながら、Astream内の他の操作をすることは問題ございません。\r\n\r\n・しかし、Astreamを閉じてしまうと、読み込みは中断されますのでご注意ください。`; //TODO

    toastLoadingId.current = toast.loading(msg, { duration: 100 * 1000 });
  };

  const reloadMembers = async (keys) => {
    respondTime.current = Math.ceil((keys.length / 20) * 6);

    waitingRespond();

    timerHandler.current = setInterval(() => {
      waitingRespond();
    }, 1000 * 10);

    let curr = 0;
    while (true) {
      try {
        const keysSlice = keys.slice(15 * curr, 15 * curr + 15);
        curr++;
        if (!(keysSlice?.length > 0)) {
          break;
        }

        const response = await modashService.setInfluencers(
          catType,
          keysSlice,
          selCampId,
        );

        if (response.status !== 'ok') {
          toast.error(response.msg);
          return;
        }

        setData({ ...data, members: response.data });
        setUpdatedMembers([...response.data]);
      } catch (msg) {
        toast.remove(loadingId);
        toast.error(msg);
        break;
      }
    }

    clearInterval(timerHandler.current);
    if (toastLoadingId.current) toast.remove(toastLoadingId.current);
    toast.success(lang[locale].completed);
  };

  const loadMorePage = async () => {
    setPage((prev) => prev + 1);
    await loadFromServer(page + 1);
  };

  const saveMemberStatus = (idx, status) => {
    return campaignService
      .updateMemberStatus(selCampId, 1, data.members[idx]._id, status)
      .then((ret) => {
        if (ret.status !== 'ok') {
          toast.error(lang[locale].failToSave);
          return;
        }
        toast.success(lang[locale].updated);

        updatedMembers[idx].status = status;
        setUpdatedMembers([...updatedMembers]);
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  return (
    <Box className="list-page">
      <ListPageStatic
        isloading={loadingTotalData}
        updatedInfos={getStaticInfos}
        selCampId={selCampId}
        catType={catType}
      />
      <ListPageTable
        catType={catType}
        getMembers={getMembers}
        handleSaveMember={saveMemberStatus}
        tags={tags}
        reload={reloadMembers}
        loadMorePage={loadMorePage}
      />
    </Box>
  );
};

export default ListPage;
